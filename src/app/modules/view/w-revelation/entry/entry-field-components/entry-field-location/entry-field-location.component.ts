import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { HumanizedFieldType, RawFieldType } from 'src/app/core/enums/wRevelation.enum';
import { AbstractEntryDataFieldComponent } from '../abstract-entry-data-field.component';

@Component({
  selector: 'wrevelation-entry-field-location',
  templateUrl: './entry-field-location.component.html',
  styleUrls: ['./entry-field-location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntryFieldLocationComponent),
      multi: true
    }
  ]
})
export class EntryFieldLocationComponent extends AbstractEntryDataFieldComponent {

  protected ID = RawFieldType.GENERIC_LOCATION;
  protected KEY = HumanizedFieldType.GENERIC_LOCATION;

}
