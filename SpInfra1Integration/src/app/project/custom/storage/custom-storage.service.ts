import { Injectable } from '@angular/core';

@Injectable(
  { providedIn: 'root' }
)
export class CustomStorageService {

  constructor() { } 
    
  // #region Propriedades Customizadas para o Componente auth-storage.service.ts

  // indica se objeto já está marcado para salvar os dados no local storage.
  private __isSaving: boolean = false;

  // #endregion Propriedades Customizadas para o Componente auth-storage.service.ts
 
  // #region Métodos Customizadas para o Componente auth-storage.service.ts
  
  // Método executado no auth-storage.service.ts - método: constructor ()
  // Utilizado para inicializações diversas
  public storageConstructor(): void
  {

  }

  // Método executado no auth-storage.service.ts - método: saveLocalInstance ()
  // Utilizado para salvar informações no localStorage
  public storageSaveLocalInstance(): void
  {

  }

  // Método executado no auth-storage.service.ts - método: logout ()
  // Utilizado para inicializar informações no localStorage na logout da aplicação
  public storageLogout(): void
  {

  }

  // Método executado no auth-storage.service.ts - método: reCheckLogin ()
  // Utilizado para inicializações diversas quando o Login exeutado via Pré Portal
  public storageInitializeAutoStorage(): void
  {
 
  }
  
  // Método executado para salvar as propriedades no LocalStorage (não deve ser modificado)
  private async __authStorageSaveLocalInstance(): Promise<void> {

    if (this.__isSaving) {
      return
    }

    this.__isSaving = true

    this.storageSaveLocalInstance();

    this.__authStorageNotSaving()
  }

  // Método executado para salvar as propriedades no LocalStorage (não deve ser modificado)
  private async __authStorageNotSaving(): Promise<void> {
    this.__isSaving = false
  }  

  // #endregion Métodos Customizadas para o Componente auth-storage.service.ts
 
}
