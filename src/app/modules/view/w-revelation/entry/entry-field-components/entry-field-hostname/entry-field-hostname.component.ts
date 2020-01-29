import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { HumanizedFieldType, RawFieldType } from 'src/app/core/enums/wRevelation.enum';
import { AbstractEntryDataFieldComponent } from '../abstract-entry-data-field.component';

@Component({
  selector: 'wrevelation-entry-field-hostname',
  templateUrl: './entry-field-hostname.component.html',
  styleUrls: ['./entry-field-hostname.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntryFieldHostnameComponent),
      multi: true
    }
  ]
})
export class EntryFieldHostnameComponent extends AbstractEntryDataFieldComponent {

  protected ID = RawFieldType.GENERIC_HOSTNAME;
  protected KEY = HumanizedFieldType.GENERIC_HOSTNAME;

}
