import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Input, NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { AbstractComponent } from './abstract.component';

export abstract class AbstractStringComponent extends AbstractComponent {

  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;

  @Input()
  set value(value: string) {
    this.formControl.setValue(value, { emitEvent: false });
  };
  get value() {
    return this.formControl.value;
  }

  constructor() {
    super();

    this.valueChange = this.formControl.valueChanges;
  }
}