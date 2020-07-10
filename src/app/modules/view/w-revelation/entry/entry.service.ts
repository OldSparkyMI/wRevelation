import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { filter, map, shareReplay, switchMapTo, tap, switchMap } from 'rxjs/operators';
import { EntryType } from 'src/app/core/enums/wRevelation.enum';
import { Entry } from 'src/app/core/interfaces/wRevelation.interface';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(private matSnackBar: MatSnackBar) {

  }

  /**
   * Rewrites the whole entries list, so that the mat tree datasource can recognize a change
   * @param entries$ all entries as an observable entry array
   * @param newEntry the new entry with PARENT!
   */
  addEntry(entries$: Observable<Entry[]>, newEntry: Entry) {
    if (newEntry && entries$) {
      if (newEntry.parent) {
        return entries$.pipe(
          map(entries => [...entries]),
          shareReplay({ bufferSize: 1, refCount: true })
        );
      } else {
        return entries$.pipe(
          map(entries => [...entries, newEntry]),
          shareReplay({ bufferSize: 1, refCount: true })
        );
      }
    }
  }

  deleteEntry(entries$: Observable<Entry[]>, entryToDelete: Entry, dissmissTime: number) {
    if (entries$ && entryToDelete) {
      return entries$.pipe(
        map(entries => {
          if (entryToDelete.parent) {
            // filter child elements
            entryToDelete.parent.children = entryToDelete.parent.children.filter(entry => entry !== entryToDelete);
          } else {
            // deleting root element, removeing directly from the entries
            entries = entries.filter(entry => entry !== entryToDelete);
          }
          return entries;
        }),
        map(entries => [...entries]),
        shareReplay({ bufferSize: 1, refCount: true })
      );
    }
  }

  /**
   * Generates an empty Entry!
   * @param entryType the type of the new Entry
   */
  getEmptyEntry(entryType: EntryType): Entry {
    const newEntry = {} as Entry;
    newEntry.type = entryType;
    newEntry.children = [];
    newEntry.icon = this.getIcon(entryType);
    newEntry.expandable = EntryType.FOLDER === entryType;
    newEntry.fields = {};
    return newEntry;
  }

  /**
   * Returns the icon for the given entry type
   */
  getIcon(entryType: EntryType) {
    switch (entryType) {
      case EntryType.FOLDER:
        return 'folder';
      case EntryType.GENERIC:
        return 'description';
      case EntryType.WEBSITE:
        return 'web';
      case EntryType.PHONE:
        return 'smartphone';
      case EntryType.CRYPTOKEY:
        return 'vpn_key';
      case EntryType.EMAIL:
        return 'email';
      case EntryType.CREDITCARD:
        return 'credit_card';
      case EntryType.SHELL:
        return 'computer';
      case EntryType.DOOR:
        return 'lock';
      case EntryType.DATABASE:
        return 'storage';
      case EntryType.FTP:
        return 'folder_special';
      case EntryType.VNC:
        return 'desktop_windows';
      case EntryType.REMOTEDESKTOP:
        return 'desktop_mac';
      default:
        console.warn('getIcon: Unkown entry type', entryType);
    }
  }

}
