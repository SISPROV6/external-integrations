import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { ConfigResponse } from '../power-bi-angular/models/config-response.model';
import { GetGroupsResponseModel } from '../power-bi-angular/models/getGroupsResponse.model';
import { GetAppsResponseModel } from '../power-bi-angular/models/getAppsResponse.model';
import { GetDatasetsInGroupResponse } from '../power-bi-angular/models/getDatasetsInGroupResponse.model';
import { GetReportsInGroupResponse } from '../power-bi-angular/models/getReportsInGroupResponse.model';
import { GenerateTokenRequestModel } from '../power-bi-angular/models/generateTokenRequest.model';
import { GenerateTokenResponseModel } from '../power-bi-angular/models/generateTokenResponse.model';

@Injectable({
  providedIn: 'root'
})
export class PowerBIAngularService {
  constructor(private _httpClient: HttpClient) { }

  // #region ==========> PROPERTIES <==========

  // #region PRIVATE
  private readonly accessToken: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktRMnRBY3JFN2xCYVZWR0JtYzVGb2JnZEpvNCIsImtpZCI6IktRMnRBY3JFN2xCYVZWR0JtYzVGb2JnZEpvNCJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvODE4YTM1NTctZTY4OS00OTQ1LTk0NjgtYTk4YzU5NjFiZjk4LyIsImlhdCI6MTcyMzIwODM2OCwibmJmIjoxNzIzMjA4MzY4LCJleHAiOjE3MjMyMTI1MjIsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84WEFBQUFhcXVKaU52YzZHM0NRaEJCQXFVcFpwdmhJNWJsQXZoL2RoZ3NCbXVaKzM4NFdIVTcraXkrZWFQd1JpVHliTVhYSExPVHlrbnBUeVVXR0tQS1k2NnBuUGNZcWtiT0dhNEw5TmtNVFYwczRWTT0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiMThmYmNhMTYtMjIyNC00NWY2LTg1YjAtZjdiZjJiMzliM2YzIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJDYXJ2YWxobyBQYXVsZXR0ZSBkZSBPbGl2ZWlyYSIsImdpdmVuX25hbWUiOiJFcmljayIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjE3Ny4yMjAuMjA4LjEzMCIsIm5hbWUiOiJFUklDSyAgQ2FydmFsaG8gUGF1bGV0dGUgZGUgT2xpdmVpcmEiLCJvaWQiOiI5ZDAxMzJmNS1mNTVlLTQ5N2ItOGRiMy0yNmM1YmFhZjY1N2QiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMjA3MTMyMDYtMjE0NDA4NDAxMy0xMTU1ODIyNDU0LTQ1ODUzIiwicHVpZCI6IjEwMDMyMDAxNzNBREQwQjIiLCJyaCI6IjAuQVNVQVZ6V0tnWW5tUlVtVWFLbU1XV0dfbUFrQUFBQUFBQUFBd0FBQUFBQUFBQUR0QU1ZLiIsInNjcCI6IkFwcC5SZWFkLkFsbCBDYXBhY2l0eS5SZWFkLkFsbCBDYXBhY2l0eS5SZWFkV3JpdGUuQWxsIENvbnRlbnQuQ3JlYXRlIERhc2hib2FyZC5SZWFkLkFsbCBEYXNoYm9hcmQuUmVhZFdyaXRlLkFsbCBEYXRhZmxvdy5SZWFkLkFsbCBEYXRhZmxvdy5SZWFkV3JpdGUuQWxsIERhdGFzZXQuUmVhZC5BbGwgRGF0YXNldC5SZWFkV3JpdGUuQWxsIEdhdGV3YXkuUmVhZC5BbGwgR2F0ZXdheS5SZWFkV3JpdGUuQWxsIEl0ZW0uRXhlY3V0ZS5BbGwgSXRlbS5FeHRlcm5hbERhdGFTaGFyZS5BbGwgSXRlbS5SZWFkV3JpdGUuQWxsIEl0ZW0uUmVzaGFyZS5BbGwgT25lTGFrZS5SZWFkLkFsbCBPbmVMYWtlLlJlYWRXcml0ZS5BbGwgUGlwZWxpbmUuRGVwbG95IFBpcGVsaW5lLlJlYWQuQWxsIFBpcGVsaW5lLlJlYWRXcml0ZS5BbGwgUmVwb3J0LlJlYWRXcml0ZS5BbGwgUmVwcnQuUmVhZC5BbGwgU3RvcmFnZUFjY291bnQuUmVhZC5BbGwgU3RvcmFnZUFjY291bnQuUmVhZFdyaXRlLkFsbCBUZW5hbnQuUmVhZC5BbGwgVGVuYW50LlJlYWRXcml0ZS5BbGwgVXNlclN0YXRlLlJlYWRXcml0ZS5BbGwgV29ya3NwYWNlLkdpdENvbW1pdC5BbGwgV29ya3NwYWNlLkdpdFVwZGF0ZS5BbGwgV29ya3NwYWNlLlJlYWQuQWxsIFdvcmtzcGFjZS5SZWFkV3JpdGUuQWxsIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiSDczcUpqVEdqcHdscjIwQlNUSHhYQ2p4d2Q2Y1BDdlBYMWxFQVVMeFZLWSIsInRpZCI6IjgxOGEzNTU3LWU2ODktNDk0NS05NDY4LWE5OGM1OTYxYmY5OCIsInVuaXF1ZV9uYW1lIjoiZWNvbGl2ZWlyYUBzaXNwcm8uY29tLmJyIiwidXBuIjoiZWNvbGl2ZWlyYUBzaXNwcm8uY29tLmJyIiwidXRpIjoiWUZ3N2wzUG94RU9JYllzdUdyY1dBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19pZHJlbCI6IjEyIDEifQ.bFY31PQdl8KQy3RshLjQSsvNsNPsMPk1BJcB_Txz1gxq2o5cL-fJxlGn3nDbOKek1ENAOcpDsdm0QiOOz3FZ_r_kJiDOni6ZEei3o5KiXISU1shixNYrRTz-QPSQe_Yb6cID0CFbwpZ-MEx6YE9hD6Ka97FyO6DeYnpL0JvyNGfe2oeS2TH1ugbfcpVH_I2Q_tsfwst_XuTTAHsdkuCNgLPixdZ3rtKYWcaxN7M0pQOZdga01_skpQCvZ_9PPVjr0OHKF5hv1F00yT9mdnuBk0AC1Eb-Rj_LSgWisfekPtYt1iIASFijvM3Lnl0mdBxNqHdhDvbaGQEF5ICMtB-bRw";
  private readonly _HTTP_HEADERS = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${this.accessToken}`);
  // #endregion PRIVATE

  // #region PUBLIC
  // [...]
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  // #region ==========> SERVICE METHODS <==========

  // #region PREPARATION
  // [...]
  // #endregion PREPARATION

  // #region GET

  /** @returns embed configuration
   */
  public getEmbedConfig(endpoint: string): Observable<ConfigResponse> {
    return this._httpClient.get<ConfigResponse>(endpoint);
  }


  public getGroups(): Observable<GetGroupsResponseModel> {
    console.log(this._HTTP_HEADERS);

    const headers = this._HTTP_HEADERS;
    
    const url = `https://api.powerbi.com/v1.0/myorg/groups`;

    return this._httpClient.get<GetGroupsResponseModel>(url, { 'headers': headers })
      .pipe(take(1), tap(response => {  }));
  }

  public getDatasetsInGroup(groupID: string): Observable<GetDatasetsInGroupResponse> {
    console.log(this._HTTP_HEADERS);

    const headers = this._HTTP_HEADERS;
    
    const url = `https://api.powerbi.com/v1.0/myorg/groups/${groupID}/datasets`;

    return this._httpClient.get<GetDatasetsInGroupResponse>(url, { 'headers': headers })
      .pipe(take(1), tap(response => {  }));
  }

  public getApps(): Observable<GetAppsResponseModel> {
    console.log(this._HTTP_HEADERS);

    const headers = this._HTTP_HEADERS;
    
    const url = `https://api.powerbi.com/v1.0/myorg/apps`;

    return this._httpClient.get<GetAppsResponseModel>(url, { 'headers': headers })
      .pipe(take(1), tap(response => {  }));
  }

  public getReportsInGroup(groupID: string): Observable<GetReportsInGroupResponse> {
    console.log(this._HTTP_HEADERS);

    const headers = this._HTTP_HEADERS;
    
    const url = `https://api.powerbi.com/v1.0/myorg/groups/${groupID}/reports`;

    return this._httpClient.get<GetReportsInGroupResponse>(url, { 'headers': headers })
      .pipe(take(1), tap(response => {  }));
  }


  public generateEmbedToken(request: GenerateTokenRequestModel): Observable<GenerateTokenResponseModel> {
    console.log(this._HTTP_HEADERS);

    const headers = this._HTTP_HEADERS;
    
    const url = `https://api.powerbi.com/v1.0/myorg/GenerateToken`;

    return this._httpClient.post<GenerateTokenResponseModel>(url, JSON.stringify(request), { 'headers': headers })
      .pipe(take(1), tap(response => {
        this._HTTP_HEADERS.set("Authorization", `${response.token}`);
      }));
  }
  // #endregion GET

  // #region POST
  public refreshDataset(datesetID: string): Observable<any> {
    console.log(this._HTTP_HEADERS);

    const headers = this._HTTP_HEADERS;
    
    const url = `https://api.powerbi.com/v1.0/myorg/datasets/${datesetID}/refreshes`;

    return this._httpClient.post<any>(url, null, { 'headers': headers })
      .pipe(take(1), tap(response => {  }));
  }

  // #endregion POST

  // #region DELETE
  // [...]
  // #endregion DELETE

  // #endregion ==========> SERVICE METHODS <==========


  // #region ==========> UTILITIES <==========
  // [...]
  // #endregion ==========> UTILITIES <==========

}
