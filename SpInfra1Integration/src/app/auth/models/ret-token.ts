import { IError } from "ngx-sp-infra";

export class RetToken implements IError {
  Error: boolean;
  ErrorMessage: string;
  Token: string;
}
