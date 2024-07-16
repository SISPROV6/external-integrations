export class GetReportsInGroupResponse {
   public "@odata.context": string;
   public value: GetReportsInGroupResponse.Value[];
 
   constructor() {
     this["@odata.context"] = "";
     this.value = [];
   }
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
 
     constructor() {
       this.id = "";
       this.reportType = "";
       this.name = "";
       this.webUrl = "";
       this.embedUrl = "";
       this.isFromPbix = false;
       this.isOwnedByMe = false;
       this.datasetId = "";
       this.datasetWorkspaceId = "";
       this.users = [];
       this.subscriptions = [];
     }
   }
}
