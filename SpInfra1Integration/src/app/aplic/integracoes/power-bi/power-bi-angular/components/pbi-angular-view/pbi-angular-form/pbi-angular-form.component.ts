import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { IReportEmbedConfiguration, models } from 'powerbi-client';
import { PowerBIAngularService } from '../../../../services/power-bi-angular.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from 'ngx-sp-infra';

@Component({
  selector: 'pbi-angular-form',
  standalone: false,
  templateUrl: './pbi-angular-form.component.html',
  styleUrl: './pbi-angular-form.component.scss'
})
export class PbiAngularFormComponent implements OnInit, OnDestroy, OnChanges {
  constructor(
    private _formBuilder: FormBuilder,
    private _powerBIAngService: PowerBIAngularService
  ) {  }

  public ngOnInit(): void {  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes["embedUrl"] && changes["embedUrl"].currentValue) {
      let currentValue: string = changes["embedUrl"].currentValue;
      this.createBaseForm(currentValue);
    }
  }

  // #region ==========> PROPERTIES <==========

  // #region PRIVATE
  // [...]
  // #endregion PRIVATE

  // #region PUBLIC
  @Input() public embedUrl: string;
  @Output() public onReportConfig: EventEmitter<IReportEmbedConfiguration> = new EventEmitter<IReportEmbedConfiguration>();

  public TokenType = models.TokenType;
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  // #region ==========> FORM BUILDER <==========
  public reportForm: FormGroup;
  public get FormUtils(): typeof FormUtils { return FormUtils; }

  // #region FORM DATA
  public get _tipo(): string { return this.reportForm.get("_tipo")?.value; }
  public get _tipoToken(): "Aad" | "Embed" { return this.reportForm.get("_tipoToken")?.value; }
  public get _embedURL(): string { return this.reportForm.get("_embedURL")?.value; }
  public get _tokenAcesso(): string { return this.reportForm.get("_tokenAcesso")?.value; }
  public get _configuracoesExtras(): string { return this.reportForm.get("_configuracoesExtras")?.value; }
  // #endregion FORM DATA

  // #region FORM VALIDATORS
  private createBaseForm(embedUrl?: string): void {
    this.reportForm = this._formBuilder.group({
      _tipo: [ null, [Validators.required]],
      _tipoToken: [ null, [Validators.required]],
      _embedURL: [ embedUrl ? embedUrl : "", [Validators.required]],
      _tokenAcesso: [ "", [Validators.required]],
      _configuracoesExtras: [ null ],
    });
  }

  public getSelectedTokenType(): models.TokenType | undefined {
    const selectedValue = this.reportForm.get('_tipoToken')?.value;
    if (selectedValue !== null) {
      const tokenType = Number(selectedValue) as models.TokenType;
      return selectedValue as models.TokenType;
    }

    return undefined;
  }
  // #endregion FORM VALIDATORS

  // #endregion ==========> FORM BUILDER <==========


  // #region ==========> SERVICE METHODS <==========

  // #region PREPARATION
  // [...]
  // #endregion PREPARATION

  // #region GET
  public getGroups(): void {
    this._powerBIAngService.getGroups().subscribe({
      next: response => {
        
      }
    });
  }


  public getEmbeddedReport(): void {
    if (this.reportForm.valid) {
      let config: IReportEmbedConfiguration = {
        type: this._tipo,
        embedUrl: this._embedURL,
        tokenType: models.TokenType[this._tipoToken],
        accessToken: this._tokenAcesso,
        settings: undefined,
      };

      console.log(config);
      this.onReportConfig.emit(config);
    }
    else { FormUtils.validateFields(this.reportForm) }
  }
  // #endregion GET

  // #region POST
  // [...]
  // #endregion POST

  // #region DELETE
  // [...]
  // #endregion DELETE

  // #endregion ==========> SERVICE METHODS <==========


  // #region ==========> UTILITIES <==========
  // [...]
  // #endregion ==========> UTILITIES <==========


  // #region ==========> MODALS <==========
  // [...]
  // #endregion ==========> MODALS <==========


  public ngOnDestroy(): void { }

}
