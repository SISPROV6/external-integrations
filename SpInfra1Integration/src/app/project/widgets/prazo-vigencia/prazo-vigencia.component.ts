import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addDays, addMonths, addYears, format, parseISO } from 'date-fns';
import { FormUtils, MessageService } from 'ngx-sp-infra';

@Component({
  selector: 'app-prazo-vigencia',
  templateUrl: './prazo-vigencia.component.html',
  styleUrls: ['./prazo-vigencia.component.scss']
})
export class PrazoVigenciaComponent implements OnInit {

  constructor(
    private readonly _FORM_BUILDER: FormBuilder,
    private readonly _MESSAGE_SERVICE: MessageService
  ) { }

  public ngOnInit(): void {
    this.createBaseForm();
  }


  // #region ==========> PROPERTIES <==========

  // #region PROTECTED
  protected vigenciaOptions: string[] = ['Determinado', 'Indeterminado'];
  protected periodoOptions: string[] = ['Dias', 'Meses', 'Anos'];

  protected get isPrazoDeterminado(): boolean { return this.prazoVigencia === 'Determinado' };
  protected get isCalcular(): boolean { return this.digitarCalcular === 'Calcular data final' };
  // #endregion PROTECTED

  // #region PUBLIC
  @Input() public setPrazoVigencia: 'Determinado' | 'Indeterminado' = 'Indeterminado';
  @Input() public setDtIniVig: Date = new Date();
  @Input() public setDtFimVig: Date = new Date(2099, 11, 31);

  public get getDtIniVig(): Date { return this.dtIniVig; }
  public get getDtFimVig(): string { return !this.isPrazoDeterminado ? this.formatDate(new Date(2099, 11, 31)) : this.formatDate(parseISO(this.dtFimVig.toString())); }
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  // #region ==========> FORM BUILDER <==========
  public form: FormGroup;
  protected get FormUtils(): typeof FormUtils { return FormUtils; }

  // #region FORM DATA
  protected get prazoVigencia(): 'Determinado' | 'Indeterminado' { return this.form.get('prazoVigencia')?.value; }
  protected get digitarCalcular(): string { return this.form.get('digitarCalcular')?.value; }
  protected get quantidade(): number { return this.form.get('quantidade')?.value; }
  protected get periodo(): string { return this.form.get('periodo')?.value; }
  protected get dtIniVig(): Date { return this.form.get('dtIniVig')?.value; }
  protected get dtFimVig(): Date { return this.form.get('dtFimVig')?.value; }
  // #endregion FORM DATA

  // #region FORM VALIDATORS
  private createBaseForm(): void {
    this.form = this._FORM_BUILDER.group({
      prazoVigencia: [this.setPrazoVigencia, [Validators.required]],
      digitarCalcular: ['Digitar data final'],
      quantidade: [''],
      periodo: ['Meses'],
      dtIniVig: [this.formatDate(this.setDtIniVig)],
      dtFimVig: [this.formatDate(this.setDtFimVig)]
    });
  }
  // #endregion FORM VALIDATORS

  // #endregion ==========> FORM BUILDER <==========


  // #region ==========> UTILITIES <==========
  protected calcDtFimVig(): void {
    if (this.quantidade >= 1) {
      const PARSE_DATE: Date = parseISO(this.dtIniVig.toString());

      switch (this.periodo) {
        case 'Dias': this.setValueDtFimVig(this.removeOneDay(addDays(PARSE_DATE, this.quantidade))); break;
        case 'Meses': this.setValueDtFimVig(this.removeOneDay(addMonths(PARSE_DATE, this.quantidade))); break;
        case 'Anos': this.setValueDtFimVig(this.removeOneDay(addYears(PARSE_DATE, this.quantidade))); break;
      }
    }
    else this._MESSAGE_SERVICE.showAlertDanger('Para calcular o fim da vigência a quantidade precisa ser maior ou igual a 1 (um).');
  }

  protected addOrRemoveValidatorDtFimVig(): void {
    const CONTROL = this.form.get('dtFimVig')!;

    this.isPrazoDeterminado ? CONTROL.addValidators(Validators.required) : CONTROL.clearValidators();
    CONTROL.updateValueAndValidity();
  }

  private removeOneDay(date: Date): Date { return addDays(date, -1); }

  private setValueDtFimVig(date: Date): void { this.form.get('dtFimVig')?.setValue(this.formatDate(date)); }

  private formatDate(date: Date): string { return format(date, 'yyyy-MM-dd'); }
  // #endregion ==========> UTILITIES <==========


}
