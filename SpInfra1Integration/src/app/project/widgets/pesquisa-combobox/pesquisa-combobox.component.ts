import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { RecordCombobox } from "../../models/combobox/record-combobox";

@Component({
  selector: "pesquisa-combobox",
  templateUrl: "./pesquisa-combobox.component.html",
  styleUrls: ["./pesquisa-combobox.component.scss"]
})
export class PesquisaComboboxComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }


  // #region ==========> PROPERTIES <==========

  // #region PUBLIC

  /** Define, dentre as opções pré-definidas, qual será a tabela onde o GET será feito */
  @Input() public alvoGet: "pessoas" | "objetos" | "itens" | "contratos" | "usuarios";

  /** Define o texto de placeholder do input */
  @Input() public inputPlaceholder: string;

  /** Opção selecionada dentre a lista */
  @Output() public onSelected = new EventEmitter<any>();

  @ViewChild('dropdownSelect') public dropdownSelect: ElementRef<HTMLDivElement>;

  /** Valor do campo de pesquisa do input */
  public pesquisa: string = "";

  /** Identifica o estado do dropdown, se está expandido ou não */
  public isExpanded: boolean = false;

  /** Listagem de registros e seus IDs que serão mostrados nas opções */
  public $records: RecordCombobox[] = [];

  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========

  // #region ==========> UTILITIES <==========

  /**
   * Emite um evento com o valor do ID do registro selecionado. Será chamado ao clicar no registro.
   * @param id ID do registro que foi selecionado
   */
  public sendSelectedRecord(id: any): void {
    this.onSelected.emit(id);
  }

  // #endregion ==========> UTILITIES <==========

}
