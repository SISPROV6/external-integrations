export interface IMenuItemStruct {
    id: number;    
    label: string;
    descricao: string;
    icon: string;
    route: string;
    isSelected: boolean;

    IsExpandable: boolean;
    children?: IMenuItemStruct[];
  }