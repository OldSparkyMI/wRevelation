import { ChangeDetectionStrategy, Component, forwardRef, NgZone } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { HumanizedFieldType, RawFieldType } from 'src/app/core/enums/wRevelation.enum';
import { AbstractEntryDataFieldComponent } from '../abstract-entry-data-field.component';

@Component({
  selector: 'wrevelation-entry-field-url',
  templateUrl: './entry-field-url.component.html',
  styleUrls: ['./entry-field-url.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntryFieldUrlComponent),
      multi: true
    }
  ]
})
export class EntryFieldUrlComponent extends AbstractEntryDataFieldComponent {
  protected ID: RawFieldType = RawFieldType.GENERIC_URL;
  protected KEY: HumanizedFieldType = HumanizedFieldType.GENERIC_URL;
}
