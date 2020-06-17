import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'map',
  pure: false,
})
export class MapPipe implements PipeTransform {
  transform(arrayDaya: any[], key: any): any[] {
    return arrayDaya.map(el => el[key]);
  }
}
