import { IError } from 'ngx-sp-infra';

export class RetNumber implements IError {
  public Error: boolean;
  public ErrorMessage: string;
  public Number: number;
}
