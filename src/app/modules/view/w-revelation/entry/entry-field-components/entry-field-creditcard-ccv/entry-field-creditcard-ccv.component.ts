import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { HumanizedFieldType, RawFieldType } from 'src/app/core/enums/wRevelation.enum';
import { AbstractEntryDataFieldComponent } from '../abstract-entry-data-field.component';

@Component({
  selector: 'wrevelation-entry-field-creditcard-ccv',
  templateUrl: './entry-field-creditcard-ccv.component.html',
  styleUrls: ['./entry-field-creditcard-ccv.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntryFieldCreditcardCcvComponent),
      multi: true
    }
  ]
})
export class EntryFieldCreditcardCcvComponent extends AbstractEntryDataFieldComponent {

  protected ID = RawFieldType.CREDITCARD_CCV;
  protected KEY = HumanizedFieldType.CREDITCARD_CCV;

}
