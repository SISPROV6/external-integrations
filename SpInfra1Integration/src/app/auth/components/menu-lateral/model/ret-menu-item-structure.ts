import { IError } from 'ngx-sp-infra';
import { IMenuItemStructure } from './imenu-item-structure.model';

export class RetMenuItemStructure implements IError {
  public Error: boolean;
  public ErrorMessage: string;

  public MenuItem: IMenuItemStructure[] = [];
}
