import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { HumanizedFieldType, RawFieldType } from 'src/app/core/enums/wRevelation.enum';
import { AbstractEntryDataFieldComponent } from '../abstract-entry-data-field.component';

@Component({
  selector: 'wrevelation-entry-field-phone-phonenumber',
  templateUrl: './entry-field-phone-phonenumber.component.html',
  styleUrls: ['./entry-field-phone-phonenumber.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntryFieldPhonePhonenumberComponent),
      multi: true
    }
  ]
})
export class EntryFieldPhonePhonenumberComponent extends AbstractEntryDataFieldComponent {

  protected ID = RawFieldType.PHONE_PHONENUMBER;
  protected KEY = HumanizedFieldType.PHONE_PHONENUMBER;

}
