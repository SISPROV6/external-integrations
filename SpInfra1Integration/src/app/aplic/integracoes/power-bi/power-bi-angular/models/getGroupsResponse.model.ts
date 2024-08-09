export class GetGroupsResponseModel {
   public "@odata.context": string;
   public "@odata.count": number;
   public value: GetGroupsResponseModel.Value[];
}


export namespace GetGroupsResponseModel {
   export class Value {
     public id: string;
     public isReadOnly: boolean;
     public isOnDedicatedCapacity: boolean;
     public type: string;
     public name: string;
   }
}
