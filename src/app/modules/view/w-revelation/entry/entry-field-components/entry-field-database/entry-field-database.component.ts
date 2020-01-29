import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { HumanizedFieldType, RawFieldType } from 'src/app/core/enums/wRevelation.enum';
import { AbstractEntryDataFieldComponent } from '../abstract-entry-data-field.component';

@Component({
  selector: 'wrevelation-entry-field-database',
  templateUrl: './entry-field-database.component.html',
  styleUrls: ['./entry-field-database.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntryFieldDatabaseComponent),
      multi: true
    }
  ]
})
export class EntryFieldDatabaseComponent extends AbstractEntryDataFieldComponent {

  protected ID = RawFieldType.GENERIC_DATABASE;
  protected KEY = HumanizedFieldType.GENERIC_DATABASE;

}
