export class GetAppsResponseModel {
   public "@odata.context": string;
   public value: GetAppsResponseModel.Value[];
 
   constructor() {
     this["@odata.context"] = "";
     this.value = [];
   }
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
 
     constructor() {
       this.id = "";
       this.name = "";
       this.lastUpdate = "";
       this.description = "";
       this.publishedBy = "";
       this.workspaceId = "";
       this.users = [];
     }
   }
}
