import { Directive, forwardRef, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  NG_VALIDATORS,
  Validator,
  ValidatorFn,
} from '@angular/forms';

import { equalTo } from './equal-to.validator';

const EQUAL_TO_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => EqualToValidator),
  multi: true,
};

@Directive({
  selector:
    '[appEqualTo][formControlName],[appEqualTo][formControl],[appEqualTo][ngModel]',
  providers: [EQUAL_TO_VALIDATOR],
})
export class EqualToValidator implements Validator, OnInit {
  @Input() public equalTo!: FormControl;
  private validator!: ValidatorFn;

  public ngOnInit(): void {
    this.validator = equalTo(this.equalTo);
  }

  public validate(c: AbstractControl): { [key: string]: any } | null {
    return this.validator(c);
  }
}
