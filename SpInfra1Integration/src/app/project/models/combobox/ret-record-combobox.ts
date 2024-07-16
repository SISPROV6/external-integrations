import { IError } from 'ngx-sp-infra';
import { RecordCombobox } from './record-combobox';

export class RetRecordCombobox implements IError {
  Error: boolean;
  ErrorMessage: string;

  ComboboxRecord: RecordCombobox;
  GUIDRecord: RecordCombobox;    // Nome será mantido aqui por um tempo até que todas as referências ao "GUIDRecord" sejam substituídas pelo novo "ComboboxRecord"
}