import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'includes',
  pure: false,
})
export class IncludesPipe implements PipeTransform {
  transform(arrayData: any[], value: any): boolean {
    if (arrayData.includes(value)) {
    }
    return arrayData.includes(value);
  }
}
