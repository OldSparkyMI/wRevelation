import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Inject, Input, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { EntryType } from 'src/app/core/enums/wRevelation.enum';
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
   * For the HTML template and addEntry
   */
  EntryType = EntryType;

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

  /**
   * The signal that the user likes to create an new item
   */
  @Output() addEntry: EventEmitter<EntryType> = new EventEmitter();

  /**
   * If enabled, the delete button are activated
   */
  @Input() deleteSupport = false;

  /**
   * Emitted event, when the active entry should be deleted!
   */
  @Output() deleteEntry: EventEmitter<void> = new EventEmitter();

  /** the <input type="file" element from the menu-raw.component.html file */
  @ViewChild('fileInput') fileInputElement: ElementRef<MatInput>;

  constructor(private dialog: MatDialog) {
  }

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
      // but before reset the value so that the (change) will be executed even after selecting the same file again
      (this.fileInputElement.nativeElement as any).value = null;
      (this.fileInputElement.nativeElement as any).click();
    }
  }

  /**
   * Opens a file in legacy mode
   * This function is called at "onChange" on <input type="file" ...
   * @param fileInput the html input element
   */
  openLegacy(fileInput) {
    if (fileInput?.files[0]) {
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
      // ask for filename and download!
      this.dialog.open(FilenameMenuDialogComponent, {data: ''}).afterClosed().subscribe(filename => {
        this.fileSave.next(new File([], filename ? filename.indexOf('.') < 0 ? `${filename}.rvl` : filename : 'aRevelation.rvl'))
      });
    }
  }
}

@Component({
  selector: 'wrevelation-filename-menu-dialog',
  template: `
  <div mat-dialog-content>
    <mat-form-field>
      <mat-label>Filename</mat-label>
      <input matInput [(ngModel)]="filename">
    </mat-form-field>
  </div>
  <div mat-dialog-actions>
    <button mat-button [mat-dialog-close]="filename">Ok</button>
  </div>
  `,
})
export class FilenameMenuDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<FilenameMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public filename: string) { }
}
