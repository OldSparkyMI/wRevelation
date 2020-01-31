import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EMPTY, Observable } from 'rxjs';
import { catchError, filter, switchMap } from 'rxjs/operators';
import { Entry } from 'src/app/core/interfaces/wRevelation.interface';
import { RevelationDataService } from 'src/app/core/services/revelation/revelation-data.service';
import { NativeFileSystemApi } from 'src/app/core/utils/native-file-system-api.utils';
import { OpenPasswordDialogComponent } from '../password/open-password-dialog/open-password-dialog.component';

@Component({
  selector: 'wrevelation-w-revelation',
  templateUrl: './w-revelation.component.html',
  styleUrls: ['./w-revelation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WRevelationComponent {

  /** check if browser supports native file api */
  hasNativeFS = NativeFileSystemApi.hasNativeFS;

  /** all the revelation entries ==> the data of the application */
  entries$: Observable<Entry[]>

  /** currently there is only one active entry possible */
  activeEntry: Entry;

  constructor(
    private dialog: MatDialog,
    private revelationDataService: RevelationDataService,
    private matSnackBar: MatSnackBar
  ) { }

  /**
   * Retrieves a File or a FileHandle which the user likes to open
   * But to decrypt we need the password, so retrieve it!
   * @param file File | FileHandle - the revelation file selected by the user (from the menu component)
   */
  onFileOpen(file) {
    this.entries$ = this.dialog.open(OpenPasswordDialogComponent, { data: { mode: 'open', password: '' } })
      .afterClosed()
      .pipe(
        filter(passwordDialogData => passwordDialogData && passwordDialogData.password && file),
        switchMap(passwordDialogData => this.revelationDataService.open(file, passwordDialogData.password)),
        catchError(e => {
          this.matSnackBar.open('Can\'t decrypt file - invalid password or corrupt file?', null, { duration: 5000 });
          return EMPTY;
        })
      );
    this.activeEntry = null;
  }

  onActiveEntry(entry: Entry) {
    this.activeEntry = entry;
  }

  scrollToBottom() {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight)
    }, 500);
  }

}
