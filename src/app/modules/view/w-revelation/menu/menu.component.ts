import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material';
import { of } from 'rxjs';
import { NativeFileSystemApi } from 'src/app/core/utils/native-file-system-api.utils';

@Component({
  selector: 'wrevelation-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {

  /** check if browser supports native file api */
  hasNativeFS = NativeFileSystemApi.hasNativeFS;

  /** toggle enable state of the save button */
  enableSave = of(false);

  /**
   * Emits the file from the file open event if the user clicked on "open" and selected a file
   */
  @Output() fileOpen: EventEmitter<any> = new EventEmitter();  // File | FileHandle

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
      (window as any).chooseFileSystemEntries().then(fileHandle => this.fileOpen.emit(fileHandle))
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
}
