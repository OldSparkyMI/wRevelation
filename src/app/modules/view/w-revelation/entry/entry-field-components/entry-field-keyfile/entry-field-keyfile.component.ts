import { ChangeDetectionStrategy, Component, forwardRef, NgZone } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { HumanizedFieldType, RawFieldType } from 'src/app/core/enums/wRevelation.enum';
import { AbstractEntryDataFieldComponent } from '../abstract-entry-data-field.component';

@Component({
  selector: 'wrevelation-entry-field-keyfile',
  templateUrl: './entry-field-keyfile.component.html',
  styleUrls: ['./entry-field-keyfile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntryFieldKeyfileComponent),
      multi: true
    }
  ]
})
export class EntryFieldKeyfileComponent extends AbstractEntryDataFieldComponent {

  protected ID = RawFieldType.GENERIC_KEYFILE;
  protected KEY = HumanizedFieldType.GENERIC_KEYFILE;

}
