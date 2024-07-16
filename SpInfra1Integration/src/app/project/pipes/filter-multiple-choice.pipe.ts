import { Pipe, PipeTransform } from '@angular/core';
import { RecordCombobox } from '../models/combobox/record-combobox';

@Pipe({
  name: 'filterMultipleChoice'
})
export class FilterMultipleChoicePipe implements PipeTransform {

  transform(options: RecordCombobox[], search: string): any[] {
    return options.filter(e => e.LABEL.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  }

}
