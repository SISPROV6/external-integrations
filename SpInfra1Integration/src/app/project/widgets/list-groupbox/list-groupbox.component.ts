import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RecordsComboboxChained } from './models/records-combobox-chained';

@Component({
  selector: 'app-list-groupbox',
  templateUrl: './list-groupbox.component.html',
  styleUrls: ['./list-groupbox.component.scss']
})
export class ListGroupboxComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getListToShow();
    this.firstSavedInInput();
  }


  // #region ==========> PROPERTIES <==========

  // #region PRIVATE
  // #endregion PRIVATE

  // #region PUBLIC
  @Input() public listGeral: RecordsComboboxChained[] = [];
  @Input() public valueSaved: string = '';

  @Output() public returnValue: EventEmitter<string> = new EventEmitter<string>();

  public search: string = '';
  public valueInput: string = '';

  public listToShow: RecordsComboboxChained[] = [];

  public showFakeSelectOption: boolean = false;
  public focusBox: boolean = false;
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  // #region ==========> UTILITIES <==========
  public getListToShow(): void {
    this.listToShow = [];
    this.listGeral.forEach(e => {
      let childIncludeSearch = e.CHILD.filter(e => e.LABEL.toLowerCase().includes(this.search.toLowerCase()));

      if (childIncludeSearch.length >= 1) {
        this.listToShow.push({
          ID: e.ID,
          LABEL: e.LABEL,
          CHILD: childIncludeSearch
        });
      }
    });
  }

  private firstSavedInInput(): void {
    this.listGeral.forEach(e => {
      let childIncludeSearch = e.CHILD.filter(e => e.ID == this.valueSaved).map(e => e.LABEL)[0];

      if (childIncludeSearch) this.valueInput = childIncludeSearch;
    });
  }

  public getValueSelect(value: string, id: string | number): void {
    this.valueInput = value;
    this.returnValue.emit(id.toString());
    this.onCloseSelectInput();
  }

  public getWidthByElement(): string {
    return `${document.getElementById('main-box-select')!.offsetWidth}px`;
  }

  public onCloseSelectInput(): void {
    this.showFakeSelectOption = false;
    this.search = '';
    this.listToShow = this.listGeral;
  }
  // #endregion ==========> UTILITIES <==========


}
