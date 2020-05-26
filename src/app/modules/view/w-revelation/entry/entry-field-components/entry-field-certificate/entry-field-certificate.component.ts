import { ChangeDetectionStrategy, Component, forwardRef, NgZone } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { take } from 'rxjs/operators';
import { HumanizedFieldType, RawFieldType } from 'src/app/core/enums/wRevelation.enum';
import { AbstractEntryDataFieldComponent } from '../abstract-entry-data-field.component';

@Component({
  selector: 'wrevelation-entry-field-certificate',
  templateUrl: './entry-field-certificate.component.html',
  styleUrls: ['./entry-field-certificate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntryFieldCertificateComponent),
      multi: true
    }
  ]
})
export class EntryFieldCertificateComponent extends AbstractEntryDataFieldComponent {

  protected ID = RawFieldType.GENERIC_CERTIFICATE;
  protected KEY = HumanizedFieldType.GENERIC_CERTIFICATE;

  constructor(protected ngZone: NgZone) {
    super();
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize && this.autosize.resizeToFitContent(true));
  }

}
