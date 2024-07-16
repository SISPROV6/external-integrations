import { IError } from 'ngx-sp-infra';
import { RecordCombobox } from './record-combobox';

export class RetRecordsCombobox implements IError {
  Error: boolean;
  ErrorMessage: string;
  Records: RecordCombobox[] = [];
}

export class RetRecordCombobox implements IError {
  Error: boolean;
  ErrorMessage: string;
  Record: RecordCombobox = new RecordCombobox();
}
