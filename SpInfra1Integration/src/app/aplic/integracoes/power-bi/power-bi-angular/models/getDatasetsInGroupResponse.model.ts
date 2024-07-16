export class GetDatasetsInGroupResponse {
   public "@odata.context": string;
   public value: GetDatasetsInGroupResponse.Value[];
 
   constructor() {
     this["@odata.context"] = "";
     this.value = [];
   }
}
 
export namespace GetDatasetsInGroupResponse {
   export class Value {
     public id: string;
     public name: string;
     public webUrl: string;
     public addRowsAPIEnabled: boolean;
     public configuredBy: string;
     public isRefreshable: boolean;
     public isEffectiveIdentityRequired: boolean;
     public isEffectiveIdentityRolesRequired: boolean;
     public isOnPremGatewayRequired: boolean;
     public targetStorageMode: string;
     public createdDate: string;
     public createReportEmbedURL: string;
     public qnaEmbedURL: string;
     public upstreamDatasets: any[];
     public users: any[];
     public queryScaleOutSettings: GetDatasetsInGroupResponse.QueryScaleOutSettings;
 
     constructor() {
       this.id = "";
       this.name = "";
       this.webUrl = "";
       this.addRowsAPIEnabled = false;
       this.configuredBy = "";
       this.isRefreshable = false;
       this.isEffectiveIdentityRequired = false;
       this.isEffectiveIdentityRolesRequired = false;
       this.isOnPremGatewayRequired = false;
       this.targetStorageMode = "";
       this.createdDate = "";
       this.createReportEmbedURL = "";
       this.qnaEmbedURL = "";
       this.upstreamDatasets = [];
       this.users = [];
       this.queryScaleOutSettings = new GetDatasetsInGroupResponse.QueryScaleOutSettings();
     }
   }
 
   export class QueryScaleOutSettings {
     public autoSyncReadOnlyReplicas: boolean;
     public maxReadOnlyReplicas: number;
 
     constructor() {
       this.autoSyncReadOnlyReplicas = false;
       this.maxReadOnlyReplicas = 0;
     }
   }
}
