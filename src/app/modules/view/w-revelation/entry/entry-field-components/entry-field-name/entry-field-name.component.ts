import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractComponent } from '../abstract.component';

@Component({
  selector: 'wrevelation-entry-field-name',
  templateUrl: './entry-field-name.component.html',
  styleUrls: ['./entry-field-name.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntryFieldNameComponent),
      multi: true
    }
  ]
})
export class EntryFieldNameComponent extends AbstractComponent {
}
