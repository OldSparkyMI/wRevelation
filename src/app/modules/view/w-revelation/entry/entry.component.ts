import { Component, Input } from '@angular/core';
import { Entry } from 'src/app/core/interfaces/wRevelation.interface';
import { EntryType, RawFieldType } from 'src/app/core/enums/wRevelation.enum';

@Component({
  selector: 'wrevelation-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent {

  showPassword = false;
  entryType = EntryType;
  rawFieldType = RawFieldType;

  @Input() entry: Entry;

  emitChange(value) {
    // TODO
    console.log('value :', value);
  }
}
