import { BasicFilters } from 'src/app/project/models/basic-filters';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss']
})
export class SearchFiltersComponent {

  constructor() { }


  // #region ==========> PROPERTIES <==========

  // #region PRIVATE
  @Output() private _executeGetBySearch: EventEmitter<any> = new EventEmitter<any>();

  @Output() private readonly _EMIT_CLEAR_EXTRA_INPUT: EventEmitter<void> = new EventEmitter<void>();
  // #endregion PRIVATE
  
  // #region PUBLIC
  @Input() public placeholder: string = '';
  @Input() public useIsActive: boolean = true;
  @Input() public useNewStyles: boolean = false;
  
  search: string = '';
  selected: any ;
  isActive: boolean = true;
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  // #region ==========> UTILITIES <==========
  public executeGetBySearch(): void {
    if (this.useIsActive) {
      let basicFilters: BasicFilters = {
        TEXTO_PESQUISA: this.search.trim(),
        IS_ATIVO: this.isActive
      };

      this._executeGetBySearch.emit(basicFilters);

    } else {
      this._executeGetBySearch.emit(this.search.trim());
    }
  }

  clearFilters() {
    this.search = '';
    this.isActive = true;
    this.selected = '';
    this._EMIT_CLEAR_EXTRA_INPUT.emit();
    this.executeGetBySearch();
  }
  
  // #endregion ==========> UTILITIES <==========


}
