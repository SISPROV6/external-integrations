import { EnderecoByCep } from './endereco-by-cep';
import { IError } from 'ngx-sp-infra';

export class RetCep implements IError {
  public Error: boolean;
  public ErrorMessage: string;
  public EnderecoByCep: EnderecoByCep;
}
