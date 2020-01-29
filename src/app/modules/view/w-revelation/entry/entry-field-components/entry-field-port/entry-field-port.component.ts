import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { HumanizedFieldType, RawFieldType } from 'src/app/core/enums/wRevelation.enum';
import { AbstractEntryDataFieldComponent } from '../abstract-entry-data-field.component';

@Component({
  selector: 'wrevelation-entry-field-port',
  templateUrl: './entry-field-port.component.html',
  styleUrls: ['./entry-field-port.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntryFieldPortComponent),
      multi: true
    }
  ]
})
export class EntryFieldPortComponent extends AbstractEntryDataFieldComponent {

  protected ID = RawFieldType.GENERIC_PORT;
  protected KEY = HumanizedFieldType.GENERIC_PORT;

}
