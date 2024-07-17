export class GetReportsInGroupResponse {
   public "@odata.context": string;
   public value: GetReportsInGroupResponse.Value[];
}
 
export namespace GetReportsInGroupResponse {
   export class Value {
     public id: string;
     public reportType: string;
     public name: string;
     public webUrl: string;
     public embedUrl: string;
     public isFromPbix: boolean;
     public isOwnedByMe: boolean;
     public datasetId: string;
     public datasetWorkspaceId: string;
     public users: any[];
     public subscriptions: any[];
   }
}
