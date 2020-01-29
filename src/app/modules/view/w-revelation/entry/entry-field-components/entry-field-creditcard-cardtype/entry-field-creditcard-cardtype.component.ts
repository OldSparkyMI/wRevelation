import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { HumanizedFieldType, RawFieldType } from 'src/app/core/enums/wRevelation.enum';
import { AbstractEntryDataFieldComponent } from '../abstract-entry-data-field.component';

@Component({
  selector: 'wrevelation-entry-field-creditcard-cardtype',
  templateUrl: './entry-field-creditcard-cardtype.component.html',
  styleUrls: ['./entry-field-creditcard-cardtype.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntryFieldCreditcardCardtypeComponent),
      multi: true
    }
  ]
})
export class EntryFieldCreditcardCardtypeComponent extends AbstractEntryDataFieldComponent {

  protected ID = RawFieldType.CREDITCARD_CARDTYPE;
  protected KEY = HumanizedFieldType.CREDITCARD_CARDTYPE;

}
