import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Input, Output, ViewChild, Directive } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HumanizedFieldType } from 'src/app/core/enums/wRevelation.enum';
import { EntryField } from 'src/app/core/interfaces/wRevelation.interface';

export abstract class AbstractComponent {

  humanizedFieldType = HumanizedFieldType;
  formControl: FormControl = new FormControl();

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  @Input()
  set value(value: EntryField | string) {
    if (value) {
      this.formControl.setValue(typeof value === 'string' ? value : value.value, { emitEvent: false });
    }
  }
  get value(): EntryField | string {
    return this.formControl.value;
  }
  @Output() valueChange = this.formControl.valueChanges
}
