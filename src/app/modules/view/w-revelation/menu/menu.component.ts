import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { RevelationDataService } from 'src/app/core/services/revelation/revelation-data.service';
import { NativeFileSystemApi } from 'src/app/core/utils/native-file-system-api.utils';

@Component({
  selector: 'wrevelation-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {

  /**
   * If browser supports native file api, we store the file handle here
   * if the browser does not support, we have to download the file
   */
  private fileHandle;

  /**
   * If the browser does not support natife file apie, store the file here to download an preset the filename!
   */
  private file;

  /** check if browser supports native file api */
  hasNativeFS = NativeFileSystemApi.hasNativeFS;

  /**
   * If enabled, the save and save as button are clickable
   */
  @Input() saveSupport = false;

  /**
   * Emits the file from the file open event -> if the user clicked on "open" and selected a file
   */
  @Output() fileOpen: EventEmitter<any> = new EventEmitter();  // File | FileHandle

  /**
   * Emits the file from the file save | save as event -> if the user clicked on "save" or "save as"
   */
  @Output() fileSave: EventEmitter<any> = new EventEmitter();  // File | FileHandle

  /** the <input type="file" element from the menu-raw.component.html file */
  @ViewChild('fileInput') fileInputElement: ElementRef<MatInput>;

  /**
   * Opens a FileChooseDialog
   *
   * Legacy: click on <input type="file" ...
   * NativeFS: window.chooseFileSystemEntries();
   */
  async open() {
    if (this.hasNativeFS) {
      // open file with the browsers native file api
      (window as any).chooseFileSystemEntries().then(fileHandle => {
        this.fileHandle = fileHandle;
        this.fileOpen.emit(fileHandle);
      });
    } else {
      // open lagacy way via hidden: <input type="file" />
      (this.fileInputElement.nativeElement as any).click();
    }
  }

  /**
   * Opens a file in legacy mode
   * This function is called at "onChange" on <input type="file" ...
   * @param fileInput the html input element
   */
  openLegacy(fileInput) {
    if (fileInput.files[0]) {
      this.file = fileInput.files[0];
      this.fileOpen.emit(fileInput.files[0]);
    }
  }

  /**
   * Saves the revelation data to a file
   * Handles legacy with the saveAs fallback and handles the native file browser api
   *
   * Exports the fileHandle to the parent component
   */
  save() {
    if (this.fileHandle) {
      // opened via native file api
      this.fileSave.next(this.fileHandle);
    } else if (this.file) {
      // opened via fileinput
      this.fileSave.next(this.file);
    } else {
      // nothing opened, everrything is new
      this.saveAs();
    }
  }

  /**
   * Saves the revelation data to a user defined file
   * Handles legacy due providing no file handle or lets the user chooses a new file handle
   *
   * Exports the fileHandle to the parent component
   */
  saveAs() {
    if (NativeFileSystemApi.hasNativeFS) {
      (window as any).chooseFileSystemEntries(RevelationDataService.SAVE_OPTIONS).then(fileHandle => this.fileSave.next(fileHandle));
    } else {
      alert('NOT IMPLEMENTED - only available with Native File Api Support (Chromium/Chrome 83 or higher)');
      // this.fileSave.next(null);
    }
  }

}
