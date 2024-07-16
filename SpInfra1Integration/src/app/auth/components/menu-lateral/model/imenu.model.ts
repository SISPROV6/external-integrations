export class IMenu {
  ID: number;
  UNICOID: number;
  LABEL: string;
  DESCRICAO: string;
  URL: string;
  CLASS_ICON: string;
  IS_EXIBEMENU: boolean;
  URL_DASHBOARD: string;
  TAG: string;
  FK: number;
    STRUCT_LIST: [] | [{
        ID: number;
        UNICOID: number;
        LABEL: string;
        DESCRICAO: string;
        URL: string;
        CLASS_ICON: string;
        IS_EXIBEMENU: boolean;
        URL_DASHBOARD: string;
        TAG: string;
        FK: number;
        STRUCT_LIST: [] | [{
          ID: number;
          UNICOID: number;
          LABEL: string;
          DESCRICAO: string;
          URL: string;
          CLASS_ICON: string;
          IS_EXIBEMENU: boolean;
          URL_DASHBOARD: string;
          TAG: string;
          FK: number;
          }]
    }]
}