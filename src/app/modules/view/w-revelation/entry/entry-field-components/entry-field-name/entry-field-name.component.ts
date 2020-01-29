import { ChangeDetectionStrategy, Component, forwardRef, NgZone } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractStringComponent } from '../abstract-string.component';

@Component({
  selector: 'wrevelation-entry-field-name',
  templateUrl: './entry-field-name.component.html',
  styleUrls: ['./entry-field-name.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntryFieldNameComponent),
      multi: true
    }
  ]
})
export class EntryFieldNameComponent extends AbstractStringComponent {
}
