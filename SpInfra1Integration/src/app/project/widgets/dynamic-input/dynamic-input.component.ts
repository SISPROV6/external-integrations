import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dynamic-input',
  templateUrl: './dynamic-input.component.html',
  styleUrls: ['./dynamic-input.component.scss']
})
export class DynamicInputComponent {

  constructor() { }


  // #region ==========> PROPERTIES <==========

  // #region PUBLIC
  @Input() public typeInput: string;
  @Input() public qtInteiros: number;
  @Input() public qtDecimais: number;
  @Input() public txConteudoCarac: string = '';

  @Output() private updateCoCarac: EventEmitter<string> = new EventEmitter<string>();

  public intMask: string = '';
  public decMask: string = '';

  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  // #region ==========> UTILITIES <==========
  public sendEventUpdateCoCarac(): void {
    this.updateCoCarac.emit(this.txConteudoCarac);
  }
  // #endregion ==========> UTILITIES <==========


}
