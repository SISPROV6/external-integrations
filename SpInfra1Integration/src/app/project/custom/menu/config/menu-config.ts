import { IMenuItemStructure } from "src/app/auth/components/menu-lateral/model/imenu-item-structure.model";

/** Classe responsável por configurar as opções do menu. */
export class MenuConfig {
   constructor(isStaticMenu: boolean) { this._isMenuStatic = isStaticMenu; }


   private _menuOptions: IMenuItemStructure[];

   /** Indica se o menu é estático ou dinâmico. */
   private _isMenuStatic: boolean = false;
   
   /** Obtém as opções do menu. */
   public get menuOptions(): IMenuItemStructure[] { return this._menuOptions; }
   public set menuOptions(value: IMenuItemStructure[]) { this._menuOptions = value; }

   /** Inicializa as opções do menu com base na rota atual e em uma lista personalizada (opcional).
    * @param currentRoute A rota atual da aplicação
    * @param customList Uma lista personalizada de opções de menu (opcional).
    * @returns As opções do menu inicializadas.
    */
   public initializeMenu(currentRoute: string, customList?: IMenuItemStructure[]): IMenuItemStructure[] {

      if (this._isMenuStatic) {
         const menuItems = [
            { id: 1, label: "Início", descricao: "Tela inicial", icon: "casa", route: "home", isSelected: currentRoute.includes("home"), isExpandable: false },
            { id: 2, label: "Power BI", descricao: "Integrações Power BI", icon: "testes", route: "", isSelected: false, isExpandable: true, children: [
               { id: 203, label: "Biblioteca Angular", descricao: "Angular", icon: "", route: "integration/power-bi-angular", isSelected: currentRoute.includes("integration"), isExpandable: false },
               { id: 204, label: "REST APIs", descricao: "REST API", icon: "", route: "integration/power-bi-rest", isSelected: currentRoute.includes("integration"), isExpandable: false }
            ] },
         ];

         this.updateRouteSelection(currentRoute, menuItems);
         return menuItems;
      }

      this.updateRouteSelection(currentRoute, customList ?? []);
      return customList ?? [];
   }

   public updateRouteSelection(currentRoute: string, currentList: IMenuItemStructure[]): IMenuItemStructure[] {
      currentList.forEach((item) => {
         if (item.children) { item.children.forEach(child => { child.isSelected = currentRoute.includes(child.route); }) }

         const anyChildSelected = item.children ? item.children.some(child => child.isSelected === true ) : false;
         item.isSelected = false;

         if (!item.children && currentRoute.includes(item.route)) { item.isSelected = true; }
         else if (item.children && anyChildSelected) { item.isSelected = true; }
      })

      return currentList;
   }
   
}
