import { Injectable, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private readonly _BS_MODAL_SERVICE: BsModalService
  ) { }


  /**
   * Função simples com o objetivo de abrir os modais no centro da tela.
   * @param template Template HTML do modal que será aberto.
   * @param modalID ID do modal que será aberto, para que possa ser referenciado depois.
   * @param modalSize Parâmetro extra caso seja necessário modificar o tamanho do modal.
  */
  public openModal(template: TemplateRef<any>, modalID: number, modalSize: string = ''): void {
    this._BS_MODAL_SERVICE.show(template, {
      id: modalID,
      class: `modal-dialog-centered ${modalSize}`,
      ignoreBackdropClick: false,
      keyboard: false
    });
  }

  /**
   * Função simples com o objetivo de abrir um modal que não é possível sair clicando fora do modal.
   * @param template Template HTML do modal que será aberto.
   * @param modalID ID do modal que será aberto, para que possa ser referenciado depois.
   * @param modalSize Parâmetro extra caso seja necessário modificar o tamanho do modal.
   */
  public openModalBackdrop(template: TemplateRef<any>, modalID: number, modalSize: string = ''): void {
    this._BS_MODAL_SERVICE.show(template, {
      id: modalID,
      class: `modal-dialog-centered ${modalSize}`,
      keyboard: false,
      backdrop: 'static'
    });
  }

  /**
   * Função simples com o objetivo de fechar os modais que estiverem abertos (baseados pelo ID).
   * @param modalID ID do modal que será fechado.
   * @param refreshList Verifica se a listagem é para ser atualizada (depois de um create ou update) ou não.
   */
  public closeModal(modalID: number): void {
    this._BS_MODAL_SERVICE.hide(modalID);
  }


}
