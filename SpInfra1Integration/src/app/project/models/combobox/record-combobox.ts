export class RecordCombobox implements IRecordsCombobox {
    public ID: string | number = 0;
    public LABEL: string = "";

    public AdditionalStringProperty1?: string = "";
    public AdditionalStringProperty2?: string = "";
    public AdditionalLongProperty1?: number = 0;
    public AdditionalLongProperty2?: number = 0;
    public AdditionalBooleanProperty1?: boolean = false;
    public AdditionalBooleanProperty2?: boolean = false;

    public IS_SELECTED?: boolean | null = false;
}


// #region Interface IRecordsCombobox
export interface IRecordsCombobox {
    ID: string | number;
    LABEL: string;
}
// #endregion Interface IRecordsCombobox