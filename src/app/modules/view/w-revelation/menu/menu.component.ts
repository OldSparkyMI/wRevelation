import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material';
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

  /** check if browser supports native file api */
  hasNativeFS = NativeFileSystemApi.hasNativeFS;

  /**
   * If enabled, the save and save as button are clickable
   */
  @Input() saveSupport: boolean = false;

  /**
   * Emits the file from the file open event -> if the user clicked on "open" and selected a file
   */
  @Output() fileOpen: EventEmitter<any> = new EventEmitter();  // File | FileHandle

  /**
   * Emits the file from the file save | save as event -> if the user clicked on "save" or "save as"
   */
  @Output() fileSave: EventEmitter<any> = new EventEmitter();  // File | FileHandle

  /** the <input type="file" element from the menu-raw.component.html file */
  @ViewChild('fileInput', { static: false }) fileInputElement: ElementRef<MatInput>;

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
        this.fileOpen.emit(fileHandle)
      })
    } else {
      // open lagacy way via hidden: <input type="file" />
      (this.fileInputElement.nativeElement as any).click();
    }
  }

  /**
   * Opens a file in legacy mode
   * This function is called at "onChange" on <input type="file" 
   * @param fileInput the html input element
   */
  openLegacy(fileInput) {
    if (fileInput.files[0]) {
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
      this.fileSave.next(this.fileHandle);
    } else {
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
      this.fileSave.next(null);
    }
  }

}
