import { IError } from 'ngx-sp-infra';

export class RetBoolean implements IError {
  Error: boolean;
  ErrorMessage: string;
  Boolean: boolean;
}