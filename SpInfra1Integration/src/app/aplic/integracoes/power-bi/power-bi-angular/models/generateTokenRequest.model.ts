export class GenerateTokenRequestModel {
   datasets: GenerateTokenRequest.Dataset[] = [];
   reports: GenerateTokenRequest.Report[] = [];
   identities?: GenerateTokenRequest.Identity[] = [];
   datasourceIdentities?: GenerateTokenRequest.DatasourceIdentity[] = [];
   lifetimeInMinutes?: number = 0;
}

export namespace GenerateTokenRequest {
   export class Dataset {
     id: string = '';
     xmlaPermissions?: string;
   }
 
   export class Report {
     allowEdit?: boolean;
     id: string = '';
   }
 
   export class Identity {
     username: string = '';
     roles: string[] = [];
     datasets: string[] = [];
     reports?: string[] = [];
   }
 
   export class DatasourceIdentity {
     datasources: Datasource[] = [];
     identityBlob: string = '';
   }
 
   export class Datasource {
     datasourceType: string = '';
     connectionDetails: ConnectionDetails = new ConnectionDetails();
   }
 
   export class ConnectionDetails {
     server: string = '';
     database: string = '';
   }
}
