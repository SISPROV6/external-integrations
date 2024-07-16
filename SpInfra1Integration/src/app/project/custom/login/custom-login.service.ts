import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable(
  { providedIn: 'root' }
)
export class CustomLoginService {

  constructor() { } 
    
  // #region Propriedade Customizadas para o Componente login.component.ts
  
  public get loginTitle(): string {
    return "Chega de planilhas <br /> e papéis!";
  }
 
  public get loginSubtitle(): string {
    return "Você no <strong>controle</strong> <br /> do <strong>ciclo de vida</strong> <br /> dos seus <strong>contratos</strong> <br /> de <strong>onde estiver.</strong>";
  }    

  public get loginLogotipo(): string {
    return "assets/imgs/logotipo-contratos.png";
  }    

  public get loginAltLogotipo(): string {
    return "Logo - Sispro SpInfra1Integration";
  }    

  public get loginPageTitle(): string {
    return "Logo - Sispro SpInfra1Integration";
  }    

  public get loginDesenvDomain(): string {
    return "SISPRO";
  }    

  public get loginDesenvUser(): string {
    return "admin";
  }    

  public get loginDesenvPassword(): string {
    return "admin";
  }    

  // #endregion Propriedade Customizadas para o Componente login.component.ts

  // #region Métodos Customizadas para o Componente auth.service.ts
  
  // Método executado no auth.service.ts - método: login ()
  // Utilizado para inicializações diversas
  public authLogin(): void
  {

  }

  // Método executado no auth.service.ts - método: logout ()
  // Utilizado para inicializações diversas
  public authLogout(): void
  {

  }

  // Método executado no auth.service.ts - método: login ()
  // Utilizado para informar o redirecionamento para a tela inicial após o login ok
  public authNavigateToPage(router: Router): void
  {
    router.navigate(["/home"]);
  }

  // #endregion Métodos Customizadas para o Componente auth.service.ts

}
