import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Input, Output, ViewChild, Directive } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { HumanizedFieldType } from 'src/app/core/enums/wRevelation.enum';
import { EntryField } from 'src/app/core/interfaces/wRevelation.interface';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class AbstractComponent {

  humanizedFieldType = HumanizedFieldType;
  formControl: UntypedFormControl = new UntypedFormControl();

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  @Input()
  set value(value: EntryField | string) {
    if (typeof value === 'string' || !value) {
      this.formControl.setValue(value, { emitEvent: false });
    } else {
      this.formControl.setValue(value.value, { emitEvent: false });
    }
  }
  get value(): EntryField | string {
    return this.formControl.value;
  }
  @Output() valueChange = this.formControl.valueChanges;
}
