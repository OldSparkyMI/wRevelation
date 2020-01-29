import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Input, NgZone, ViewChild } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { HumanizedFieldType, RawFieldType } from 'src/app/core/enums/wRevelation.enum';
import { EntryField } from 'src/app/core/interfaces/wRevelation.interface';
import { AbstractComponent } from './abstract.component';

export abstract class AbstractEntryDataFieldComponent extends AbstractComponent {

  protected abstract ID: RawFieldType;
  protected abstract KEY: HumanizedFieldType;
  protected _value: EntryField;

  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;

  constructor() {
    super();

    this.valueChange = this.formControl.valueChanges.pipe(
      map(value => ({ id: this.ID, key: this.KEY, value }))
    );
  }

  @Input()
  set value(entryDataField: EntryField) {
    if (entryDataField) {
      this.formControl.setValue(entryDataField.value, { emitEvent: false });
    }
  }
  get value(): EntryField {
    return this.formControl.value;
  }
}