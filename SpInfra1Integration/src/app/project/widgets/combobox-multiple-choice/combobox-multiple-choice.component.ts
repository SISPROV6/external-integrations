import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { RecordCombobox } from '../../models/combobox/record-combobox';
import { ResetFiltersService } from './reset-filters.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-combobox-multiple-choice',
  templateUrl: './combobox-multiple-choice.component.html',
  styleUrls: ['./combobox-multiple-choice.component.scss']
})
export class ComboboxMultipleChoiceComponent implements OnInit, OnDestroy {

  constructor(
    private readonly _RESET_FILTERS_SERVICE: ResetFiltersService
  ) { }

  public ngOnInit() {
    this.setSelectedLabels();
    this._subscription = this._RESET_FILTERS_SERVICE.callChildMethod$.subscribe(() => this.setSelectedLabels());
  }

  public ngOnDestroy() {
    this._subscription.unsubscribe();
  }


  // #region ==========> PROPERTIES <==========

  // #region PRIVATE
  @Output('resetFilter') private readonly _EMIT_RESET_FILTER: EventEmitter<void> = new EventEmitter<void>();

  private _subscription: Subscription;
  // #endregion PRIVATE

  // #region PROTECTED
  protected search: string = '';
  protected selectedLabels: string = '';

  protected get selectedOptions(): RecordCombobox[] { return this.options.filter(e => e.IS_SELECTED); }
  // #endregion PROTECTED

  // #region PUBLIC
  @Input({ required: true }) public options: RecordCombobox[];
  @Input() public placeholder: string = 'Selecione uma ou mais opções';
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  // #region ==========> UTILITIES <==========
  public setSelectedLabels(): void {
    this.selectedLabels = '';

    this.selectedOptions.forEach(option => {
      this.selectedLabels += this.selectedLabels!.length > 0 ? `, ${option.LABEL}` : option.LABEL
    });
  }

  protected resetFilter(): void {
    this.options.forEach(e => e.IS_SELECTED = false);
    this.setSelectedLabels();
    this._EMIT_RESET_FILTER.emit();
  }
  // #endregion ==========> UTILITIES <==========



}
