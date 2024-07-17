export class GetDatasetsInGroupResponse {
   public "@odata.context": string;
   public value: GetDatasetsInGroupResponse.Value[];
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
   }
 
   export class QueryScaleOutSettings {
     public autoSyncReadOnlyReplicas: boolean;
     public maxReadOnlyReplicas: number;
   }
}
