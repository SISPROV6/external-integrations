export class GetGroupsResponseModel {
   public "@odata.context": string;
   public "@odata.count": number;
   public value: GetGroupsResponseModel.Value[];
 
   constructor() {
     this["@odata.context"] = "";
     this["@odata.count"] = 0;
     this.value = [];
   }
}


export namespace GetGroupsResponseModel {
   export class Value {
     public id: string;
     public isReadOnly: boolean;
     public isOnDedicatedCapacity: boolean;
     public type: string;
     public name: string;
 
     constructor() {
       this.id = "";
       this.isReadOnly = false;
       this.isOnDedicatedCapacity = false;
       this.type = "";
       this.name = "";
     }
   }
}
