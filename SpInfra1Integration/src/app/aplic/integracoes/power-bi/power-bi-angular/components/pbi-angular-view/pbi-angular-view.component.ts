import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Embed, IReportEmbedConfiguration } from 'embed';
import { models, service } from 'powerbi-client';
import { PowerBIReportEmbedComponent } from 'powerbi-client-angular';
import { PowerBIAngularService } from '../../../services/power-bi-angular.service';
import { PbiAngularFormComponent } from './pbi-angular-form/pbi-angular-form.component';
import { GetGroupsResponseModel } from '../../models/getGroupsResponse.model';
import { ProjectUtilservice } from 'src/app/project/utils/project-utils.service';
import { GetDatasetsInGroupResponse } from '../../models/getDatasetsInGroupResponse.model';
import { PbiInitializationFormComponent } from './pbi-initialization-form/pbi-initialization-form.component';

@Component({
  selector: 'app-pbi-angular-view',
  standalone: false,
  templateUrl: './pbi-angular-view.component.html',
  styleUrl: './pbi-angular-view.component.scss'
})
export class PbiAngularViewComponent implements OnInit, OnDestroy {
  constructor(
    private _powerBIAngService: PowerBIAngularService,
    private _projectUtilService: ProjectUtilservice
  ) {  }

  public ngOnInit(): void { }


  // #region ==========> PROPERTIES <==========

  // #region PRIVATE
  private _workspaceID: string = "";
  private _workspaceName: string = "";
  private _datasetID: string = "";
  private _appID: string = "";
  private _reportID: string = "";
  // #endregion PRIVATE

  // #region PUBLIC

  // Wrapper object to access report properties
  @ViewChild(PowerBIReportEmbedComponent) reportObj!: PowerBIReportEmbedComponent;
  @ViewChild(PbiInitializationFormComponent) public pbiInitializationFormComponent: PbiInitializationFormComponent;

  public workspaceConfigData: GetGroupsResponseModel.Value;
  public datasetConfigData: GetDatasetsInGroupResponse.Value;

  public embeddingReport: boolean = false;

  // #region RESERVED METHODS
  // Track Report embedding status
  isEmbedded = false;

  // Overall status message of embedding
  displayMessage = 'The report is bootstrapped. Click Embed Report button to set the access token.';

  // CSS Class to be passed to the wrapper
  reportClass = 'w-100 h-100';

  // Flag which specify the type of embedding
  phasedEmbeddingFlag = false;

  // Pass the basic embed configurations to the wrapper to bootstrap the report on first load
  // Values for properties like embedUrl, accessToken and settings will be set on click of button
  reportConfig: IReportEmbedConfiguration = {
    type: 'report',
    embedUrl: undefined,
    tokenType: models.TokenType.Embed,
    accessToken: undefined,
    settings: undefined,
  };

  /** Map of event handlers to be applied to the embedded report
   */
  // Update event handlers for the report by redefining the map using this.eventHandlersMap
  // Set event handler to null if event needs to be removed
  // More events can be provided from here
  // https://docs.microsoft.com/en-us/javascript/api/overview/powerbi/handle-events#report-events
  eventHandlersMap = new Map ([
    ['loaded', () => {
        const report = this.reportObj.getReport();
        report.setComponentTitle('Embedded report');
        console.log('Report has loaded');
      },
    ],
    ['rendered', () => console.log('Report has rendered')],
    ['error', (event?: service.ICustomEvent<any>) => {
        if (event) {
          console.error(event.detail);
        }
      },
    ],
    ['visualClicked', () => console.log('visual clicked')],
    ['pageChanged', (event) => console.log(event)],
  ]) as Map<string, (event?: service.ICustomEvent<any>, embeddedEntity?: Embed) => void | null>;
  // #endregion RESERVED METHODS

  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  // #region ==========> FORM BUILDER <==========

  // #region FORM DATA
  // [...]
  // #endregion FORM DATA

  // #region FORM VALIDATORS
  // [...]
  // #endregion FORM VALIDATORS

  // #endregion ==========> FORM BUILDER <==========


  // #region ==========> SERVICE METHODS <==========

  // #region PREPARATION
  // [...]
  // #endregion PREPARATION

  // #region GET
  
  /**
   * Embeds report
   *
   * @returns Promise<void>
   */
  async embedReport(): Promise<void> {
    // Get the embed config from the service and set the reportConfigResponse
    // try {
    //   this.reportConfig = {
    //     type: 'report',
    //     id: "4e774bb9-277f-465f-9f4c-1182a022d4f6",
    //     embedUrl: "https://app.powerbi.com/reportEmbed?reportId=4e774bb9-277f-465f-9f4c-1182a022d4f6&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUJSQVpJTC1TT1VUSC1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d",
    //     tokenType: models.TokenType.Aad,
    //     accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyIsImtpZCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvODE4YTM1NTctZTY4OS00OTQ1LTk0NjgtYTk4YzU5NjFiZjk4LyIsImlhdCI6MTcyMTA3NTAzNSwibmJmIjoxNzIxMDc1MDM1LCJleHAiOjE3MjEwNzk3MDIsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84WEFBQUFuZ2FQWkxGaTZqNmpaRzlGbU90TTcyMEFFRExGL1A2NEJDMGg5UUE3czFOTWI2NEdobkNvMjd6bjd3MkczbDhpQW9Ldm5ZZHBzWDk1VlpjZmE3bzlEblNxaDN1ZVBnYjgvQUZuNmxnZDhxQT0iLCJhbXIiOlsicHdkIiwicnNhIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIwIiwiZGV2aWNlaWQiOiI3MDg0YWZlMC0zMjczLTQ1N2MtODhkNS1lMzEyYjM0NmJiZDUiLCJmYW1pbHlfbmFtZSI6IkNhcnZhbGhvIFBhdWxldHRlIGRlIE9saXZlaXJhIiwiZ2l2ZW5fbmFtZSI6IkVyaWNrIiwiaWR0eXAiOiJ1c2VyIiwiaXBhZGRyIjoiMTg5LjExNC4xNDYuMiIsIm5hbWUiOiJFUklDSyAgQ2FydmFsaG8gUGF1bGV0dGUgZGUgT2xpdmVpcmEiLCJvaWQiOiI5ZDAxMzJmNS1mNTVlLTQ5N2ItOGRiMy0yNmM1YmFhZjY1N2QiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMjA3MTMyMDYtMjE0NDA4NDAxMy0xMTU1ODIyNDU0LTQ1ODUzIiwicHVpZCI6IjEwMDMyMDAxNzNBREQwQjIiLCJyaCI6IjAuQVNVQVZ6V0tnWW5tUlVtVWFLbU1XV0dfbUFrQUFBQUFBQUFBd0FBQUFBQUFBQUR0QU1ZLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6Ikg3M3FKalRHanB3bHIyMEJTVEh4WENqeHdkNmNQQ3ZQWDFsRUFVTHhWS1kiLCJ0aWQiOiI4MThhMzU1Ny1lNjg5LTQ5NDUtOTQ2OC1hOThjNTk2MWJmOTgiLCJ1bmlxdWVfbmFtZSI6ImVjb2xpdmVpcmFAc2lzcHJvLmNvbS5iciIsInVwbiI6ImVjb2xpdmVpcmFAc2lzcHJvLmNvbS5iciIsInV0aSI6ImtKZUZneTR1VzBLMVM1RjBIUFNsQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfaWRyZWwiOiIxIDIwIn0.VttDiKot_TSEQRBzym5fnb-NU_nTRnTmK4uHKQVkyvUDUE-SBqGnHyhiZ4Jm7JoVOjA0PkpzRkdA9b0SV0WJfhyD5duSGL056eL7U14H7xWKaN59gk8p44C-5wzGrcdfpGatuUZ3HY4L8xqaXvARXGkZCHIlh88_FlWyj9p8EHKOtkeOlJtxLSqbQEV6_FtPsKavpSP2h6-ReNjJ8vDCdVaJemA_eI-8v0b18cQWwMQ0vr-rQwZ33-XZphMFgVMRa_lx8KdxpvP0952g2zXEaEZNBBqxR7vRp4lXIo3YtD0LtLKc2TbYG3F7CBz1EZJfLph4HRPUZ_peaeq0L92ViA",
    //     settings: undefined,
    //   };

    //   await this._powerBIAngService.getEmbedConfig(this._reportURL).subscribe({
    //     next: response => {
    //       // Update the reportConfig to embed the PowerBI report
    //       this.reportConfig = {
    //         ...this.reportConfig,
    //         id: response.Id,
    //         embedUrl: response.EmbedUrl,
    //         accessToken: response.EmbedToken.Token,
    //       };
    //     },
    //     error: error => {
    //       this.displayMessage = `Failed to fetch config for report. Status: ${error.status} ${error.statusText}`;
    //       console.error(this.displayMessage);
    //     }
    //   });
    // }
    // catch (error: any) {
    //   this.displayMessage = `Failed to fetch config for report. Status: ${error.status} ${error.statusText}`;
    //   console.error(this.displayMessage);
    //   return;
    // }

    // // Update embed status
    // this.isEmbedded = true;

    // // Update the display message
    // this.displayMessage = 'Use the buttons above to interact with the report using Power BI Client APIs.';
  }


  public initializeData(): void {
    this.embeddingReport = true;

    if (!this.pbiInitializationFormComponent.showEmbedForm) {
      this.pbiInitializationFormComponent.getGroupByName();
    }
    else {
      if (this.pbiInitializationFormComponent.pbiAngularFormComponent._tokenAcesso != "") {
        this.pbiInitializationFormComponent.pbiAngularFormComponent.getEmbeddedReport();
      }
      else {
        this.pbiInitializationFormComponent.pbiAngularFormComponent.generateEmbedToken();
      }
    }
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
  public embedReportOverride(record: IReportEmbedConfiguration): void {
    this.reportConfig = {
      type: record.type,
      id: record.id,
      embedUrl: record.embedUrl,
      tokenType: record.tokenType,
      accessToken: record.accessToken,
      settings: record.settings,
    };

    this.isEmbedded = true;
    this.displayMessage = 'Use the buttons above to interact with the report using Power BI Client APIs.';
  }
  // #endregion ==========> UTILITIES <==========


  // #region ==========> MODALS <==========
  // [...]
  // #endregion ==========> MODALS <==========


  public ngOnDestroy(): void { }

}
