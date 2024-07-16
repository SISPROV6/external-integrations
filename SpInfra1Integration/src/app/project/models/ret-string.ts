import { IError } from 'ngx-sp-infra';

export class RetString implements IError {
  Error: boolean;
  ErrorMessage: string;
  String: string;
}