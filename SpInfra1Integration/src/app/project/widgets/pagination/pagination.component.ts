import { Component, Input, EventEmitter, Output } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {


  // #region ==========> PROPERTIES <==========

  // #region PRIVATE
  @Output('page') private readonly _EMIT_PAGE: EventEmitter<number> = new EventEmitter<number>();
  @Output('itemsPerPage') private readonly _EMIT_ITEMS_PER_PAGE: EventEmitter<number> = new EventEmitter<number>();
  // #endregion PRIVATE

  // #region PUBLIC
  @Input() public list: any[] = [];

  @Input() public paginationInstance: PaginationInstance;
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  // #region ==========> UTILITIES <==========
  /** Modifica a quantidade de itens a ser mostrada na lista.
   * @param event parâmetro de evento que irá selecionar a nova quantidade.
   */
  protected onSelectChange(event: any) {
    this.paginationInstance.itemsPerPage = parseInt(event.target.value, 10);
    this.paginationInstance.currentPage = 1;

    this.emitValues();
  }

  /**
   * Reseta a paginação da listagem.
   */
  public resetPagination(list: any[]): void {
    const startIndex = (this.paginationInstance.currentPage - 1) * this.paginationInstance.itemsPerPage; // Cálculo para encontrar o valor inicial do index da página atual

    if (list.length <= startIndex) this.paginationInstance.currentPage = 1; // Condição para resetar o valor da paginação

    this.emitValues();
  }

  private emitValues(): void {
    this._EMIT_PAGE.emit(this.paginationInstance.currentPage);
    this._EMIT_ITEMS_PER_PAGE.emit(this.paginationInstance.itemsPerPage);
  }

  protected changePageAndEmitValue(currentPage: number): void {
    this.paginationInstance.currentPage = currentPage;
    this._EMIT_PAGE.emit(this.paginationInstance.currentPage);
  }
  // #endregion ==========> UTILITIES <==========


}
