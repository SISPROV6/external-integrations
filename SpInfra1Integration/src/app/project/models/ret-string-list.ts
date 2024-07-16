import { IError } from 'ngx-sp-infra';

export class RetStringList implements IError {
  Error: boolean;
  ErrorMessage: string;
  StringList: string[];
}