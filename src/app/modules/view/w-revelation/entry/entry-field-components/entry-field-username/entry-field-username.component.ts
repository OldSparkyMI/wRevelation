import { ChangeDetectionStrategy, Component, forwardRef, NgZone } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { HumanizedFieldType, RawFieldType } from 'src/app/core/enums/wRevelation.enum';
import { AbstractEntryDataFieldComponent } from '../abstract-entry-data-field.component';

@Component({
  selector: 'wrevelation-entry-field-username',
  templateUrl: './entry-field-username.component.html',
  styleUrls: ['./entry-field-username.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntryFieldUsernameComponent),
      multi: true
    }
  ]
})
export class EntryFieldUsernameComponent extends AbstractEntryDataFieldComponent {

  protected ID = RawFieldType.GENERIC_USERNAME;
  protected KEY = HumanizedFieldType.GENERIC_USERNAME;

}
