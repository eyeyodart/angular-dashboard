import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valueUnit',
})
export class ValueUnitPipe implements PipeTransform {
  transform(value: number, unit: string): string {
    return value.toString().concat(unit);
  }
}
