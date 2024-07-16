// titlecase.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titlecase'
})
export class TitleCasePipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) return '';

    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
