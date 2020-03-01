import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EntryType, RawFieldType } from 'src/app/core/enums/wRevelation.enum';
import { Entry } from 'src/app/core/interfaces/wRevelation.interface';

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
}
