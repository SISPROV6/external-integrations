import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderSort',
  pure: false
})
export class OrderSortPipe implements PipeTransform {
  transform(array: any[]): any[] {
    if (!array) {
      return array;
    }

    return array.slice().sort((a, b) => a.order - b.order);
  }
}
