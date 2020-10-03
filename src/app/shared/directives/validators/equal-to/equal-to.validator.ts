import { AbstractControl, ValidatorFn } from '@angular/forms';

const equal = (
  equalControl: AbstractControl,
): ((control: AbstractControl) => { [p: string]: boolean } | undefined) => {
  let subscribe = false;

  return (control: AbstractControl): { [key: string]: boolean } | undefined => {
    if (!subscribe) {
      subscribe = true;
      equalControl.valueChanges.subscribe(() => {
        control.updateValueAndValidity();
      });
    }

    const v: string = control.value;

    return equalControl.value === v ? undefined : { equalTo: true };
  };
};

export const equalTo = (equalControl: AbstractControl): ValidatorFn =>
  equal(equalControl) as ValidatorFn;
