import { Output, EventEmitter, Input } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss']
})
export class GenericModalComponent {


  // #region ==========> PROPERTIES <==========

  // #region PROTECTED
  @Output('closeModal') protected readonly EMIT_CLOSE_MODAL: EventEmitter<void> = new EventEmitter<void>();
  // #endregion PROTECTED

  // #region PUBLIC
  @Input({ required: true }) public modalTitle: string;
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


}
