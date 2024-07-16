import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import { AuthStorageService } from 'src/app/auth/storage/auth-storage.service';
import { MessageService } from 'ngx-sp-infra';
import { ProjectUtilservice } from 'src/app/project/utils/project-utils.service';

import { InfraEstabelecimentoFavoritoDefault } from 'src/app/project/models/infra-estabelecimento';
import { MenuServicesService } from '../../menu-services.service';


@Component({
  selector: 'selecao-estabelecimentos-modal',
  templateUrl: './selecao-estabelecimentos-modal.component.html',
  styleUrls: ['./selecao-estabelecimentos-modal.component.scss']
})
export class SelecaoEstabelecimentosModalComponent implements OnInit {
  constructor(
    private _authStorageService: AuthStorageService,
    private _bsModalService: BsModalService,
    private _messageService: MessageService,
    private _projectUtilService: ProjectUtilservice,
    private _menuServicesService: MenuServicesService
  ) { }

  ngOnInit(): void {
    this.getEstabelecimentos("");
  }

  // #region ==========> PROPERTIES <==========

  // #region PRIVATE
  // [...]
  // #endregion PRIVATE

  // #region PUBLIC
  @Output() public onClose = new EventEmitter<any>();
  @Output() public onSelected = new EventEmitter<any>();

  public $estabelecimentosList: InfraEstabelecimentoFavoritoDefault[];

  public page: number = 1;
  public itemsPerPage: number = 10;

  public response_messages = {
    'emptyMessage': 'Consulta não retornou registros...',
    'totalMessage': 'Linhas encontradas.'
  };
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  // #region ==========> FORM BUILDER <==========

  // #region DATA
  // [...]
  // #endregion DATA

  // #region VALIDATORS
  // [...]
  // #endregion VALIDATORS

  // #endregion ==========> FORM BUILDER <==========


  // #region ==========> SERVICES <==========

  // #region PREPARATION

  public refreshList(pesquisa: string): void {
    this.getEstabelecimentos(pesquisa);
  }

  private getEstabelecimentos(pesquisa: string = ""): void {
    this._menuServicesService.getEstabelecimentosModalList(this._authStorageService.infraUsuarioId, pesquisa).subscribe({
      next: response => {
        this.$estabelecimentosList = response.InfraEstabelecimentos;

        this.resetPagination(this.$estabelecimentosList);

        if (response.InfraEstabelecimentos.length == 0) {
          this._messageService.showAlertDanger(this.response_messages.emptyMessage);
        }
      },
      error: error => {
        this._projectUtilService.showHttpError(error);

        this.$estabelecimentosList = [];
      }
    })
  }

  // #endregion PREPARATION

  // #region GET
  // [...]
  // #endregion GET

  // #region CREATE OR UPDATE

  /**
   * Atualiza o estado do Estabelecimento, informando se ele é Padrão ou não.
   * @param estabID ID do Estabelecimento a ser alterado
   * @param isDefault Informa se ele é Padrão ou não
   */
  public defineDefaultEstabelecimento(estabID: string, isDefault: boolean): void {
    this._menuServicesService.defineDefaultEstabelecimento(estabID, this._authStorageService.infraUsuarioId, isDefault).subscribe({
      next: () => {
        this.getEstabelecimentos("");

        isDefault
          ? this._messageService.showAlertSuccess('Novo estabelecimento definido como padrão para o usuário')
          : this._messageService.showAlertSuccess('Estabelecimento padrão removido para o usuário');
      },
      error: error => {
        this._projectUtilService.showHttpError(error);
      }
    })
  }

  // #endregion CREATE OR UPDATE

  // #region DELETE
  // [...]
  // #endregion DELETE

  // #endregion ==========> SERVICES <==========


  // #region ==========> UTILITIES <==========

  /**
   * Envia um sinal ao componente pai com o ID e Nome do Estabelecimento selecionado no Modal
   * @param estabID ID do Estabelecimento que será enviado
   * @param estabNome Nome do Estabelecimento que será enviado
   */
  public selectEstabelecimento(estabID: string, estabNome: string): void {
    this.onSelected.emit(estabID + " - " + estabNome);
  }


  /**
   * Realiza uma nova pesquisa no banco para atualizar a lista a cada 3 caracteres digitados
   * @param pesquisa Texto do input de pesquisa
   */
  public updateSearch(pesquisa: string): void {
    pesquisa.length % 3 == 0
      ? this.getEstabelecimentos(pesquisa)
      : null;
  }

  /**
   * Verifica se a string passada é alfanumérica.
   * @param str String que será verificada
   * @returns TRUE se for alfanumérica, caso contrário FALSE.
   */
  private isAlphanumeric(str: string) {
    var code, i, len;

    for (i = 0, len = str.length; i < len; i++) {
      code = str.charCodeAt(i);
      if (!(code > 47 && code < 58) &&  // (0-9)
        !(code > 64 && code < 91) &&  // (A-Z)
        !(code > 96 && code < 123)) { // (a-z)

        return false;
      }
    }
    return true;
  };

  /** Modifica a quantidade de itens a ser mostrada na lista.
   * @param event parâmetro de evento que irá selecionar a nova quantidade.
   */
  public onSelectChange(event: any) {
    this.itemsPerPage = parseInt(event.target.value, 10);
    this.page = 1;
  }

  /** Reseta a paginação da listagem.
  */
  public resetPagination(list: any[]): void {
    // Cálculo para encontrar o valor inicial do index da página atual
    const startIndex = (this.page - 1) * this.itemsPerPage;

    // Condição para resetar o valor da paginação
    if (list.length <= startIndex) {
      this.page = 1;
    }
  }
  // #endregion ==========> UTILITIES <==========


  // #region ==========> MODALS <==========

  /**
   * Função simples com o objetivo de abrir os modais no centro da tela.
   * @param template Template HTML do modal que será aberto.
   * @param modalID ID do modal que será aberto, para que possa ser referenciado depois.
  */
  public openModal(template: TemplateRef<any>, modalID: number) {
    if (modalID == 4) {
      this._bsModalService.show(template, {
        id: modalID,
        class: 'modal-dialog-centered modal-lg',
        ignoreBackdropClick: false,
        keyboard: false
      });
    } else {
      this._bsModalService.show(template, {
        id: modalID,
        class: 'modal-dialog-centered',
        ignoreBackdropClick: false,
        keyboard: false
      });
    }
  }

  /**
   * Função simples com o objetivo de fechar os modais que estiverem abertos (baseados pelo ID).
   * @param modalID ID do modal que será fechado.
   */
  public closeModal(modalID: number) {
    this._bsModalService.hide(modalID);
  }

  public closeSelf() {
    this.onClose.emit();
  }

  // #endregion ==========> MODALS <==========

}
