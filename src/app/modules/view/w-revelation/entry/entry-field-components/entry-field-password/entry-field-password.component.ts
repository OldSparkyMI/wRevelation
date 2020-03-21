import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { HumanizedFieldType, RawFieldType } from 'src/app/core/enums/wRevelation.enum';
import { AbstractEntryDataFieldComponent } from '../abstract-entry-data-field.component';

@Component({
  selector: 'wrevelation-entry-field-password',
  templateUrl: './entry-field-password.component.html',
  styleUrls: ['./entry-field-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntryFieldPasswordComponent),
      multi: true
    }
  ]
})
export class EntryFieldPasswordComponent extends AbstractEntryDataFieldComponent {

  showPassword = false;
  protected ID = RawFieldType.GENERIC_PASSWORD;
  protected KEY = HumanizedFieldType.GENERIC_PASSWORD;

}
