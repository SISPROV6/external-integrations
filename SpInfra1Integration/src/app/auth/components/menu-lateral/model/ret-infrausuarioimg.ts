import { IError } from "ngx-sp-infra";
import { InfraUsuarioImg } from './infrausuarioimg';

export class RetInfraUsuarioImg implements IError{
  Error: boolean;
  ErrorMessage: string;
  InfraUsuarioImg: InfraUsuarioImg = new InfraUsuarioImg();
  uncompressedFileSize?: number | null = 0;
  compressedFileSize?: number | null = 0;
}