import { ChangeDetectionStrategy, Component, forwardRef, NgZone } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { take } from 'rxjs/operators';
import { AbstractStringComponent } from '../abstract-string.component';

@Component({
  selector: 'wrevelation-entry-field-notes',
  templateUrl: './entry-field-notes.component.html',
  styleUrls: ['./entry-field-notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntryFieldNotesComponent),
      multi: true
    }
  ]
})
export class EntryFieldNotesComponent extends AbstractStringComponent {

  constructor(protected ngZone: NgZone) {
    super()
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize && this.autosize.resizeToFitContent(true));
  }

}
