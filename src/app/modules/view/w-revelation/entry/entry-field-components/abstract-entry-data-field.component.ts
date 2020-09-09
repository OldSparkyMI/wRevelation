import { Output, Directive } from '@angular/core';
import { map } from 'rxjs/operators';
import { HumanizedFieldType, RawFieldType } from 'src/app/core/enums/wRevelation.enum';
import { EntryField } from 'src/app/core/interfaces/wRevelation.interface';
import { AbstractComponent } from './abstract.component';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class AbstractEntryDataFieldComponent extends AbstractComponent {

  protected abstract ID: RawFieldType;
  protected abstract KEY: HumanizedFieldType;
  // tslint:disable-next-line: variable-name
  protected _value: EntryField;

  @Output() valueChange = this.formControl.valueChanges.pipe(
    map(value => ({ id: this.ID, key: this.KEY, value }))
  );
}
