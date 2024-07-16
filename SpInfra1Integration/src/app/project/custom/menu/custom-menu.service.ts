import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

import { IMenuItemStructure } from 'src/app/auth/components/menu-lateral/model/imenu-item-structure.model';
import { IMenu } from 'src/app/auth/components/menu-lateral/model/imenu.model';
import { MenuConfig } from './config/menu-config';

@Injectable(
  { providedIn: 'root' }
)
export class CustomMenuService {

  // #region Propriedade Customizadas do Menu
  
  public get menuDynamic(): boolean {
    return false;
  }
 
  public get moduleName(): string {
    return "Gestão de SpInfra1Integration";
  }    

  public get moduleImg(): string {
    return "assets/icons/gestao-contratos.svg";
  }    

  public get moduleSvg(): string {
    return "";
  }     
  
  public get themeColor(): string {
    return "";
  }

  // #endregion Propriedade Customizadas do Menu

  // #region Propriedade do Menu

  private readonly _MENU_BASE_URL: string = `${environment.SpInfra2MenuWS}`; // SpInfra2MenuWS

  private currentURL: string = "";
  private _menuItems: IMenuItemStructure[];
  private menuList: IMenu[];
  private menuLateralUpdated: IMenuItemStructure[];
  public menuConfig: MenuConfig; 
 
  /** Obtém as opções do menu. */
  public get menuItems(): IMenuItemStructure[] 
  { 
    return this._menuItems;
  }

  public set menuItems(value: IMenuItemStructure[]) { 
    this._menuItems = value;
  }

  // #endregion Propriedade do Menu

  constructor(
    private _router: Router
  ) {
      // inicializações do Menu Dinâmico
      this.currentURL = this._router.url;
  }  

  // #region - Métodos Customizadas para o Menu dinâmico

  // Método executado no menu-lateral.component.ts - método: onInit ()
  // Utilizado para inicializações diversas
  public menuDynamicOnInit(): void
  {

  }

  // Método executado no menu-lateral.component.ts - método: onInit ()
  // Utilizado para inicializações diversas
  public menuStaticOnInit(): void
  {
 
  }

  // Método executado no menu-lateral.component.ts - método: openExpansibleMenu()
  // Utilizado para inicializações ao Exoandir a opção de Menu
  public menuopenExpansibleMenu(ref: HTMLDivElement): void
  {
 
  }

  // #endregion - Métodos Customizadas para o Menu dinâmico

}
