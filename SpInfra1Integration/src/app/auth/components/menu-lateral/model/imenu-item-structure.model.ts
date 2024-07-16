/** Interface que define a estrutura de um item de menu. */
export interface IMenuItemStructure {
   id: number;
   label: string;
   descricao: string;
   icon: string;
   route: string;
   isSelected: boolean;

   isExpandable: boolean;
   children?: IMenuItemStructure[];
}
