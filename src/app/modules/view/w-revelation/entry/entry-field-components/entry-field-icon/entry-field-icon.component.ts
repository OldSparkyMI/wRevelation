import { ChangeDetectionStrategy, Component, forwardRef, NgZone } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractStringComponent } from '../abstract-string.component';

@Component({
  selector: 'wrevelation-entry-field-icon',
  templateUrl: './entry-field-icon.component.html',
  styleUrls: ['./entry-field-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntryFieldIconComponent),
      multi: true
    }
  ]
})
export class EntryFieldIconComponent extends AbstractStringComponent {

}
