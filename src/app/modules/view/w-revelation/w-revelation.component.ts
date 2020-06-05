import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { EntryType } from 'src/app/core/enums/wRevelation.enum';
import { Entry } from 'src/app/core/interfaces/wRevelation.interface';
import { RevelationDataService } from 'src/app/core/services/revelation/revelation-data.service';
import { NativeFileSystemApi } from 'src/app/core/utils/native-file-system-api.utils';
import { OpenPasswordDialogComponent } from '../password/open-password-dialog/open-password-dialog.component';
import { EntryService } from './entry/entry.service';
import { NewEntryDialogComponent } from './entry/new-entry-dialog/new-entry-dialog.component';

@Component({
  selector: 'wrevelation-w-revelation',
  templateUrl: './w-revelation.component.html',
  styleUrls: ['./w-revelation.component.scss'],
})
export class WRevelationComponent {

  /** check if browser supports native file api */
  hasNativeFS = NativeFileSystemApi.hasNativeFS;

  /** all the revelation entries ==> the data of the application */
  entries$: Observable<Entry[]> = of([]);

  /** currently there is only one active entry possible */
  activeEntry: Entry;

  constructor(
    private dialog: MatDialog,
    private revelationDataService: RevelationDataService,
    private matSnackBar: MatSnackBar,
    private entryService: EntryService
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
        switchMap(async passwordDialogData => await this.revelationDataService.open(file, passwordDialogData.password)),
        catchError(e => {
          this.matSnackBar.open('Can\'t decrypt file - invalid password or corrupt file?', null, { duration: 5000 });
          return EMPTY;
        }),
        shareReplay({ bufferSize: 1, refCount: true }),
      );
    this.activeEntry = null;
  }

  /**
   * Retrieves a FileHandle or null (download) to save the current data
   * But to encrypt we need the password, so retrieve it again!
   */
  onFileSave(file) {
    this.dialog.open(OpenPasswordDialogComponent, { data: { mode: 'save', password: '' } })
      .afterClosed()
      .pipe(
        filter(passwordDialogData => passwordDialogData && passwordDialogData.password && file),
        tap(passwordDialogData => this.revelationDataService.save(this.entries$, file, passwordDialogData.password)),
        catchError(e => {
          this.matSnackBar.open('Can\'t save file - please raise an issue?', null, { duration: 5000 });
          return EMPTY;
        })
      )
      .subscribe();
  }

  onAddEntry(entryType: EntryType) {
    if (entryType) {
      const newEntry = this.entryService.getEmptyEntry(entryType);
      this.dialog.open(NewEntryDialogComponent, { data: newEntry })
        .afterClosed()
        .pipe(filter(data => !!data))
        .subscribe(() => {
          if (this.activeEntry) {
            // try to get the parent folder from the active element
            // if the active element is a folder --> active element is parent
            // if the active element is an entry --> find the next folder
            let parent = this.activeEntry;
            while (parent.type !== EntryType.FOLDER && parent !== null) {
              parent = parent.parent;
            }
            // add as children element of the parent
            newEntry.parent = parent;
            // we add the new folder to the active entry
            parent.children.push(newEntry);
            // because the MatTreeDataSource won't detect these changes, we have to recreate the whole entries to update it!
            this.entries$ = this.entries$.pipe(map(entries => [...entries]));
          } else {
            // entry to root!
            this.entries$ = this.entries$.pipe(
              map(entries => [...entries, newEntry]),
              shareReplay({ bufferSize: 1, refCount: true })
            );
          }
          this.onActiveEntry(newEntry);
        });
    }
  }

  onActiveEntry(entry: Entry) {
    this.activeEntry = entry;
  }

  scrollToBottom() {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 500);
  }

}
