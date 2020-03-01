import { ChangeDetectionStrategy, Component, forwardRef, NgZone } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { take } from 'rxjs/operators';
import { AbstractComponent } from '../abstract.component';

@Component({
  selector: 'wrevelation-entry-field-description',
  templateUrl: './entry-field-description.component.html',
  styleUrls: ['./entry-field-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntryFieldDescriptionComponent),
      multi: true
    }
  ]
})
export class EntryFieldDescriptionComponent extends AbstractComponent {

  constructor(protected ngZone: NgZone) {
    super()
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize && this.autosize.resizeToFitContent(true));
  }

}
