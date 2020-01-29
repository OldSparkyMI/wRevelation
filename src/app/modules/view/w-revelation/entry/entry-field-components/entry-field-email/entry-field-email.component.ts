import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { HumanizedFieldType, RawFieldType } from 'src/app/core/enums/wRevelation.enum';
import { AbstractEntryDataFieldComponent } from '../abstract-entry-data-field.component';

@Component({
  selector: 'wrevelation-entry-field-email',
  templateUrl: './entry-field-email.component.html',
  styleUrls: ['./entry-field-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntryFieldEmailComponent),
      multi: true
    }
  ]
})
export class EntryFieldEmailComponent extends AbstractEntryDataFieldComponent {

  protected ID = RawFieldType.GENERIC_EMAIL;
  protected KEY = HumanizedFieldType.GENERIC_EMAIL;

}
