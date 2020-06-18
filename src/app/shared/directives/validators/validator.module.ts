import { NgModule } from '@angular/core';
import { EqualToValidator } from './equal-to/equal-to.directive';

const VALIDATORS = [EqualToValidator];

@NgModule({
  declarations: [...VALIDATORS],
  exports: [...VALIDATORS],
})
export class ValidatorModule {}
