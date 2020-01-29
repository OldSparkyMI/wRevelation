import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { HumanizedFieldType, RawFieldType } from 'src/app/core/enums/wRevelation.enum';
import { AbstractEntryDataFieldComponent } from '../abstract-entry-data-field.component';

@Component({
  selector: 'wrevelation-entry-field-domain',
  templateUrl: './entry-field-domain.component.html',
  styleUrls: ['./entry-field-domain.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntryFieldDomainComponent),
      multi: true
    }
  ]
})
export class EntryFieldDomainComponent extends AbstractEntryDataFieldComponent {

  protected ID = RawFieldType.GENERIC_DOMAIN;
  protected KEY = HumanizedFieldType.GENERIC_DOMAIN;

}
