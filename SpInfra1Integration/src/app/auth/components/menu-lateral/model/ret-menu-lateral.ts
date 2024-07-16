import { IError } from 'ngx-sp-infra';

import { IMenu } from './imenu.model';

export class RetMenuLateral implements IError {
  public Error: boolean;
  public ErrorMessage: string;

  public MenuLateral: IMenu[];
}
