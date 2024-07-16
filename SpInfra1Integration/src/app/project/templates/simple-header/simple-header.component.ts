import { Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";

@Component({
  selector: "app-simple-header",
  templateUrl: "./simple-header.component.html",
  styleUrls: ["./simple-header.component.scss"]
})
export class SimpleHeaderComponent implements OnChanges {
  constructor() { }

  ngOnChanges (): void {
    switch(this.mode) {
      case "list":
        this.pageTitle = this.useCustomPageTitle ? this.customPageTitle : this.keyword;
        break;
      
      case "add":
        this.pageTitle = this.useCustomPageTitle ? this.customPageTitle : `Adicionar ${this.keyword}`;
        this.pageAction = "Adicionar";
        break;
      
      case "edit":
        this.pageTitle = this.useCustomPageTitle ? this.customPageTitle : `Editar ${this.keyword}`;
        this.pageAction = "Editar";
        break;
    }
  }

  // #region ==========> PROPERTIES <==========

  // #region PRIVATE
  // [...]
  // #endregion PRIVATE

  // #region PUBLIC
  /**
   * Modo em que o Header será inicializado
   * @default "list"
  */
  @Input() public mode: "add" | "edit" | "list" = "list";

  /**
   * Palavra/termo chave que será replicado em diferentes trechos do Header
   * @default ""
  */
  @Input() public keyword: string = "";

  @Input() public titulo: string = "";

  /**
   * Define se o botão de Auditoria estará visível
   * @default false
  */
  @Input() public visibleAuditBtn: boolean = false;

  /**
   * Informa a opção de Menu selecionada para chegar à tela
   * @default ""
  */
  @Input() public menuGroup: string = "";

  /**
   * Nome da opção que se refere à listagem e retornará para a mesma
   * @default keyword
  */
  @Input() public breadcrumbList: string = "";

  /**
   * Opção que deve ser informada caso você deseje que um dos botões seja escondido
   * @default null
   */
  @Input() public buttonToOmit: "Todos" | "Cancelar" | "Salvar" | string | null = null;

  /**
   * Opção que dev ser informada caso você deseje utilizar as cores e estilos do novo visual do Contratos do Figma
   * @default false
   */
  @Input() public useNewColors: boolean = false;

  @Input() public useCustomPageTitle: boolean = false;

  @Input() public customPageTitle: string = "";

  @Input() public showSpinner: boolean = false;

  /** Deve ser informada para sobreescrever o título principal em situações de múltiplos títulos com base em condições */
  @Input() public pageTitleSecondary: string = "";

  @Input() public customBreadcrumbEnd: string = "";

  @Input() public customBreadcrumbMode: string = "";

  /** Emissor de evento para Retorno */
	@Output() public onReturn = new EventEmitter<void>();

  /** Emissor de evento para Criação */
  @Output() public onCreate = new EventEmitter<void>();

  /** Emissor de evento para Atualização */
  @Output() public onUpdate = new EventEmitter<void>();

  public pageTitle: string | undefined;
  public pageAction: string = "";
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  // #region ==========> UTILITIES <==========

  /** Emite um evento para retornar à página anterior */
  public return(): void {
    this.onReturn.emit();
  }

  /** Emite um evento para informar quando o botão de "Criar" foi clicado */
  public create(): void {
    this.onCreate.emit();
  }
  
  /** Emite um evento para informar quando o botão de "Atualizar" foi clicado */
  public update(): void {
    this.onUpdate.emit();
  }


  public redirectTextByMode(): string {
    if (this.mode == "list") return "Adicionar";
    else return "Salvar";

  }

  // #endregion ==========> UTILITIES <==========

}
