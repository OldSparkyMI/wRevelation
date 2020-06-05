import { Injectable } from '@angular/core';
import { EntryType } from 'src/app/core/enums/wRevelation.enum';
import { Entry } from 'src/app/core/interfaces/wRevelation.interface';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

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
