import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { IReportEmbedConfiguration, models } from 'powerbi-client';
import { PowerBIAngularService } from '../../../../services/power-bi-angular.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtils, MessageService } from 'ngx-sp-infra';
import { GenerateTokenRequestModel } from '../../../models/generateTokenRequest.model';
import { ProjectUtilservice } from 'src/app/project/utils/project-utils.service';
import { GetReportsInGroupResponse } from '../../../models/getReportsInGroupResponse.model';
import { GetGroupsResponseModel } from '../../../models/getGroupsResponse.model';
import { GetDatasetsInGroupResponse } from '../../../models/getDatasetsInGroupResponse.model';
import { GetAppsResponseModel } from '../../../models/getAppsResponse.model';

@Component({
  selector: 'pbi-angular-form',
  standalone: false,
  templateUrl: './pbi-angular-form.component.html',
  styleUrl: './pbi-angular-form.component.scss'
})
export class PbiAngularFormComponent implements OnInit, OnDestroy, OnChanges {
  constructor(
    private _formBuilder: FormBuilder,
    private _messageService: MessageService,
    private _powerBIAngService: PowerBIAngularService,
    private _projectUtilService: ProjectUtilservice
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
  @Input({ required: true }) public embedUrl: string;

  @Input() public workspaceConfigData: GetGroupsResponseModel.Value;
  @Input() public datasetConfigData: GetDatasetsInGroupResponse.Value;
  @Input() public appConfigData: GetAppsResponseModel.Value;
  @Input() public reportConfigData: GetReportsInGroupResponse.Value;

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
  // #endregion FORM VALIDATORS

  // #endregion ==========> FORM BUILDER <==========


  // #region ==========> SERVICE METHODS <==========

  // #region PREPARATION
  // [...]
  // #endregion PREPARATION

  // #region GET
  public getEmbeddedReport(): void {
    if (this.reportForm.valid) {
      let config: IReportEmbedConfiguration = {
        type: this._tipo,
        embedUrl: this._embedURL,
        tokenType: models.TokenType[this._tipoToken],
        accessToken: this._tokenAcesso,
        settings: undefined,
      };

      this.onReportConfig.emit(config);
    }
    else { FormUtils.validateFields(this.reportForm) }
  }
  // #endregion GET

  // #region POST
  public generateEmbedToken(): void {
    let request: GenerateTokenRequestModel = {
      datasets: [ { id: this.datasetConfigData.id } ],
      reports: [
        { id: this.reportConfigData.id, allowEdit: true }
      ]
    };

    this._powerBIAngService.generateEmbedToken(request).subscribe({
      next: response => {
        try {
          if (!response) {
            throw new Error("Ocorreu um erro ao gerar o token de acesso. Tente novamente mais tarde!");
          }

          this.reportForm.controls["_tokenAcesso"].setValue(response.token);
        }
        catch (error) { this._messageService.showAlertDanger("Ocorreu um erro ao gerar o token de acesso. Tente novamente mais tarde!") }
      },
      error: error => { this._projectUtilService.showHttpError(error) }
    });
  }
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
