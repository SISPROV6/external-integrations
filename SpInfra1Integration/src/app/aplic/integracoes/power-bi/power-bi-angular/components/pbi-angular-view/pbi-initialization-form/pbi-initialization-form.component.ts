import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { models } from 'powerbi-client';
import { IReportEmbedConfiguration } from 'embed';

import { FormUtils, MessageService } from 'ngx-sp-infra';

import { PowerBIAngularService } from '../../../../services/power-bi-angular.service';
import { GetGroupsResponseModel } from '../../../models/getGroupsResponse.model';
import { GetDatasetsInGroupResponse } from '../../../models/getDatasetsInGroupResponse.model';
import { ProjectUtilservice } from 'src/app/project/utils/project-utils.service';
import { GetAppsResponseModel } from '../../../models/getAppsResponse.model';
import { GetReportsInGroupResponse } from '../../../models/getReportsInGroupResponse.model';
import { PbiAngularFormComponent } from '../pbi-angular-form/pbi-angular-form.component';

@Component({
  selector: 'pbi-initialization-form',
  standalone: false,
  templateUrl: './pbi-initialization-form.component.html',
  styleUrl: './pbi-initialization-form.component.scss'
})
export class PbiInitializationFormComponent {
  constructor(
    private _formBuilder: FormBuilder,
    private _messageService: MessageService,
    private _powerBIAngService: PowerBIAngularService,
    private _projectUtilService: ProjectUtilservice
  ) {  }

  public ngOnInit(): void {
    this.createBaseForm();
  }


  // #region ==========> PROPERTIES <==========

  // #region PRIVATE
  // [...]
  // #endregion PRIVATE

  // #region PUBLIC
  @Output() public onReportConfig: EventEmitter<IReportEmbedConfiguration> = new EventEmitter<IReportEmbedConfiguration>();
  
  @ViewChild(PbiAngularFormComponent) public pbiAngularFormComponent: PbiAngularFormComponent;

  public TokenType = models.TokenType;

  public workspaceConfigData: GetGroupsResponseModel.Value;
  public datasetConfigData: GetDatasetsInGroupResponse.Value;
  public appConfigData: GetAppsResponseModel.Value;
  public reportConfigData: GetReportsInGroupResponse.Value;

  public showEmbedForm: boolean = false;
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  // #region ==========> FORM BUILDER <==========
  public reportForm: FormGroup;
  public get FormUtils(): typeof FormUtils { return FormUtils; }

  // #region FORM DATA
  public get _workspaceName(): string { return this.reportForm.get("_workspaceName")?.value; }
  public get _workspaceID(): string { return this.reportForm.get("_workspaceID")?.value; }
  public get _datasetID(): string { return this.reportForm.get("_datasetID")?.value; }
  public get _appID(): string { return this.reportForm.get("_appID")?.value; }
  public get _reportID(): string { return this.reportForm.get("_reportID")?.value; }
  // #endregion FORM DATA

  // #region FORM VALIDATORS
  private createBaseForm(): void {
    this.reportForm = this._formBuilder.group({
      _workspaceName: [ "", [Validators.required]],
      _workspaceID: [ "" ],
      _datasetID: [ "" ],
      _appID: [ "" ],
      _reportID: [ "" ],
    });

    this.reportForm.controls["_workspaceID"].disable();
    this.reportForm.controls["_datasetID"].disable();
    this.reportForm.controls["_appID"].disable();
    this.reportForm.controls["_reportID"].disable();
  }
  // #endregion FORM VALIDATORS

  // #endregion ==========> FORM BUILDER <==========


  // #region ==========> SERVICE METHODS <==========

  // #region PREPARATION
  // [...]
  // #endregion PREPARATION

  // #region GET
  public getGroupByName(): void {
    if (this.reportForm.valid) {
      this._powerBIAngService.getGroups().subscribe({
        next: response => {
          if (!response.value.some(value => value.name === this._workspaceName)) {
            this._messageService.showAlertDanger("Ocorreu um erro ao buscar a Workspace, pode ser que ela não exista com este nome!");
          }
          
          this.workspaceConfigData = response.value.filter(value => value.name === this._workspaceName)[0];
          this.reportForm.controls["_workspaceID"].setValue(this.workspaceConfigData.id);
  
          this.getDatasetsInGroup(this.workspaceConfigData.id);
        },
        error: error => { this._projectUtilService.showHttpError(error) }
      });
    }
    else { FormUtils.validateFields(this.reportForm) }
  }

  public getDatasetsInGroup(groupID: string): void {
    this._powerBIAngService.getDatasetsInGroup(groupID).subscribe({
      next: response => {
        this.datasetConfigData = response.value[0];
        this.reportForm.controls["_datasetID"].setValue(this.datasetConfigData.id);

        this.getApps();
      },
      error: error => { this._projectUtilService.showHttpError(error); }
    });
  }

  public getApps(): void {
    this._powerBIAngService.getApps().subscribe({
      next: response => {
        this.appConfigData = response.value[0];
        this.reportForm.controls["_appID"].setValue(this.appConfigData.id);

        this.getReportsInGroup(this.workspaceConfigData.id);
      },
      error: error => { this._projectUtilService.showHttpError(error); }
    });
  }

  public getReportsInGroup(groupID: string): void {
    this._powerBIAngService.getReportsInGroup(groupID).subscribe({
      next: response => {
        this.showEmbedForm = true;
        
        this.reportConfigData = response.value[0];
        this.reportForm.controls["_reportID"].setValue(this.reportConfigData.id);

        if (this.pbiAngularFormComponent) { this.pbiAngularFormComponent.embedUrl = this.reportConfigData.embedUrl }
      },
      error: error => { this._projectUtilService.showHttpError(error); }
    });
  }


  public getEmbeddedReport(embedConfig: IReportEmbedConfiguration): void {
    if (this.reportForm.valid) {
      let config: IReportEmbedConfiguration = {
        type: embedConfig.type,
        embedUrl: embedConfig.embedUrl,
        tokenType: embedConfig.tokenType,
        accessToken: embedConfig.accessToken,
        settings: undefined,
      };

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
