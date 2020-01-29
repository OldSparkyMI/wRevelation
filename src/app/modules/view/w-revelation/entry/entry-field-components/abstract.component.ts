import { Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HumanizedFieldType } from 'src/app/core/enums/wRevelation.enum';

export abstract class AbstractComponent {

  abstract value: any;
  humanizedFieldType = HumanizedFieldType;
  formControl: FormControl;

  @Input() disabled;
  @Output() valueChange = new Observable<any>();

  constructor() {
    this.formControl = new FormControl({ value: '', disabled: this.disabled });
  }

  writeValue(value: any): void {
    this.value = value;
  }
}
