import { EqualToValidator } from './equal-to/equal-to.directive';
import { NgModule } from '@angular/core';

const VALIDATORS = [EqualToValidator];

@NgModule({
  declarations: [...VALIDATORS],
  exports: [...VALIDATORS],
})
export class ValidatorModule {}
