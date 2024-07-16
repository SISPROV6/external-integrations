import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalComma'
})
export class DecimalCommaPipe implements PipeTransform {

  transform(value: number | string): string {
    if (!isNaN(+value)) return value.toString().replace('.', ',');
    else return '';
  }

}
