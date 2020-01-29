import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { HumanizedFieldType, RawFieldType } from 'src/app/core/enums/wRevelation.enum';
import { AbstractEntryDataFieldComponent } from '../abstract-entry-data-field.component';

@Component({
  selector: 'wrevelation-entry-field-code',
  templateUrl: './entry-field-code.component.html',
  styleUrls: ['./entry-field-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntryFieldCodeComponent),
      multi: true
    }
  ]
})
export class EntryFieldCodeComponent extends AbstractEntryDataFieldComponent {

  protected ID = RawFieldType.GENERIC_CODE;
  protected KEY = HumanizedFieldType.GENERIC_CODE;

}
