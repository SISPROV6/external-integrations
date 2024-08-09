export class GetAppsResponseModel {
   public "@odata.context": string;
   public value: GetAppsResponseModel.Value[];
}
 
export namespace GetAppsResponseModel {
   export class Value {
     public id: string;
     public name: string;
     public lastUpdate: string;
     public description: string;
     public publishedBy: string;
     public workspaceId: string;
     public users: any[];
   }
}
