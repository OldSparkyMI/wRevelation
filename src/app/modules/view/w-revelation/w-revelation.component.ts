import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { EntryType } from 'src/app/core/enums/wRevelation.enum';
import { Entry } from 'src/app/core/interfaces/wRevelation.interface';
import { RevelationDataService } from 'src/app/core/services/revelation/revelation-data.service';
import { NativeFileSystemApi } from 'src/app/core/utils/native-file-system-api.utils';
import { environment } from 'src/environments/environment';
import { OpenPasswordDialogComponent } from '../password/open-password-dialog/open-password-dialog.component';
import { PasswordService } from '../password/password.service';
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

  /** the hash of the current password */
  passwordHash: string;

  @HostListener('document:keydown.esc', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.activeEntry = null;
  }

  constructor(
    private dialog: MatDialog,
    private revelationDataService: RevelationDataService,
    private matSnackBar: MatSnackBar,
    private entryService: EntryService,
    private passwordService: PasswordService
  ) { }

  /**
   * Retrieves a File or a FileHandle which the user likes to open
   * But to decrypt we need the password, so retrieve it!
   * @param file File | FileHandle - the revelation file selected by the user (from the menu component)
   */
  onFileOpen(file) {
    this.entries$ = this.dialog.open(OpenPasswordDialogComponent, { data: { mode: 'open', password: '', hash: '' } })
      .afterClosed()
      .pipe(
        filter(passwordDialogData => passwordDialogData && passwordDialogData.password && file),
        tap(async passwordDialogData => this.passwordHash = await this.passwordService.hash(passwordDialogData.password)),
        switchMap(async passwordDialogData => await this.revelationDataService.open(file, passwordDialogData.password)),
        catchError(e => {
          this.matSnackBar.open('Can\'t decrypt file - invalid password or corrupt file?', null, { duration: 5000 });
          this.onFileOpen(file);
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
    this.dialog.open(OpenPasswordDialogComponent, { data: { mode: 'save', password: '', hash: this.passwordHash } })
      .afterClosed()
      .pipe(
        filter(passwordDialogData => passwordDialogData && passwordDialogData.password && file),
        tap(passwordDialogData => this.revelationDataService.save(this.entries$, file, passwordDialogData.password)),
        catchError(e => {
          this.matSnackBar.open('Can\'t save file - please raise an issue!', null, { duration: 5000 });
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
          }
          this.entries$ = this.entryService.addEntry(this.entries$, newEntry);
          this.activeEntry = newEntry;
        });
    }
  }

  // TODO: how to integrate the matSnackBar with the undo button?
  onDeleteEntry() {
    if (this.activeEntry) {

      const oldEntry = this.activeEntry;

      this.entries$ = this.entryService.deleteEntry(this.entries$, this.activeEntry, environment.time.dismissedByActionTimeout).pipe(
        tap(() => this.activeEntry = null),
        shareReplay({ bufferSize: 1, refCount: true })
      );

      this.matSnackBar.open(`${oldEntry.name} deleted`, 'Restore', {
        duration: environment.time.dismissedByActionTimeout ?? 10000,
      })
        .afterDismissed()
        .pipe(filter(data => !!data.dismissedByAction))
        .subscribe(() => {
          setTimeout(() => this.entries$ = this.entryService.addEntry(this.entries$, oldEntry), 0);
        });
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 500);
  }

}
