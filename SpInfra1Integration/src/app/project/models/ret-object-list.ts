import { IError } from 'ngx-sp-infra';

export class RetObjectList implements IError {
  Error: boolean;
  ErrorMessage: string;
  ObjectList: string[] | number[];
}