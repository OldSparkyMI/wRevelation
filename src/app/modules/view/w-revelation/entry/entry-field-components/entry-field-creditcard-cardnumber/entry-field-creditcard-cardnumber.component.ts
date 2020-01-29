import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { HumanizedFieldType, RawFieldType } from 'src/app/core/enums/wRevelation.enum';
import { AbstractEntryDataFieldComponent } from '../abstract-entry-data-field.component';

@Component({
  selector: 'wrevelation-entry-field-creditcard-cardnumber',
  templateUrl: './entry-field-creditcard-cardnumber.component.html',
  styleUrls: ['./entry-field-creditcard-cardnumber.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntryFieldCreditcardCardnumberComponent),
      multi: true
    }
  ]
})
export class EntryFieldCreditcardCardnumberComponent extends AbstractEntryDataFieldComponent {

  protected ID = RawFieldType.CREDITCARD_CARDNUMBER;
  protected KEY = HumanizedFieldType.CREDITCARD_CARDNUMBER;

}
