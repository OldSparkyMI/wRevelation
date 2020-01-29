import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { HumanizedFieldType, RawFieldType } from 'src/app/core/enums/wRevelation.enum';
import { AbstractEntryDataFieldComponent } from '../abstract-entry-data-field.component';

@Component({
  selector: 'wrevelation-entry-field-pin',
  templateUrl: './entry-field-pin.component.html',
  styleUrls: ['./entry-field-pin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntryFieldPinComponent),
      multi: true
    }
  ]
})
export class EntryFieldPinComponent extends AbstractEntryDataFieldComponent {

  protected ID = RawFieldType.GENERIC_PIN;
  protected KEY = HumanizedFieldType.GENERIC_PIN;

}
