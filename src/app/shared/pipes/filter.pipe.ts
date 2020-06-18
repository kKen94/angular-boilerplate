import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(arrayDaya: any[], keyToSearch: any, value: any): any[] {
    return arrayDaya.filter(el => el[keyToSearch] === value);
  }
}
