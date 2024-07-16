import { Component, EventEmitter, Input, Output, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-simple-search',
  templateUrl: './simple-search.component.html',
  styleUrls: ['./simple-search.component.scss']
})
export class SimpleSearchComponent implements OnDestroy {

  ngOnDestroy(): void {
    this.emitSearch.emit('');
  }


  // #region ==========> PROPERTIES <==========

  // #region PROTECTED
  @Output('search') private emitSearch: EventEmitter<string> = new EventEmitter<string>();

  protected focus: boolean = false;
  // #endregion PROTECTED

  // #region PUBLIC
  @Input() public placeholder: string = '';
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  // #region ==========> UTILITIES <==========
  protected sendSearch(search: string): void { this.emitSearch.emit(search.trim()); }
  // #endregion ==========> UTILITIES <==========


}
