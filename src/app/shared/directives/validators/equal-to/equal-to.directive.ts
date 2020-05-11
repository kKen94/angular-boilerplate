import { Directive, Input, forwardRef, OnInit } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';

import { equalTo } from './equal-to.validator';

const EQUAL_TO_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  // tslint:disable-next-line:no-forward-ref
  useExisting: forwardRef(() => EqualToValidator),
  multi: true,
};

@Directive({
  selector: '[ceEqualTo][formControlName],[ceEqualTo][formControl],[ceEqualTo][ngModel]',
  providers: [EQUAL_TO_VALIDATOR],
})
export class EqualToValidator implements Validator, OnInit {
  @Input() public equalTo: FormControl;

  private validator: ValidatorFn;

  public ngOnInit(): void {
    this.validator = equalTo(this.equalTo);
  }

  public validate(c: AbstractControl): { [key: string]: any } {
    return this.validator(c);
  }
}
