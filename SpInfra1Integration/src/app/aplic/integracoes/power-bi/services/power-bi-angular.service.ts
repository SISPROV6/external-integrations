import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { ConfigResponse } from '../power-bi-angular/models/config-response.model';
import { GetGroupsResponseModel } from '../power-bi-angular/models/getGroupsResponse.model';
import { GetAppsResponseModel } from '../power-bi-angular/models/getAppsResponse.model';
import { GetDatasetsInGroupResponse } from '../power-bi-angular/models/getDatasetsInGroupResponse.model';
import { GetReportsInGroupResponse } from '../power-bi-angular/models/getReportsInGroupResponse.model';

@Injectable({
  providedIn: 'root'
})
export class PowerBIAngularService {
  constructor(private _httpClient: HttpClient) { }

  // #region ==========> PROPERTIES <==========

  // #region PRIVATE
  private readonly accessToken: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyIsImtpZCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvODE4YTM1NTctZTY4OS00OTQ1LTk0NjgtYTk4YzU5NjFiZjk4LyIsImlhdCI6MTcyMTE2ODg3NywibmJmIjoxNzIxMTY4ODc3LCJleHAiOjE3MjExNzM1NTIsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84WEFBQUExOWRvUE9Md3h6UWloQXBDTmo2ZzZaR29hNnBwaHppaXR4dHUwRWJxT1loYUptUDBTdkJUcjkvTld5VDdjSmx3NXBDREpjcjlhMmZ1ZzBjV0w4SENuQ0tXbW1WdEgvZlZ2bGg4c0JYa3JlTT0iLCJhbXIiOlsicHdkIiwicnNhIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIyIiwiZGV2aWNlaWQiOiI3MDg0YWZlMC0zMjczLTQ1N2MtODhkNS1lMzEyYjM0NmJiZDUiLCJmYW1pbHlfbmFtZSI6IkNhcnZhbGhvIFBhdWxldHRlIGRlIE9saXZlaXJhIiwiZ2l2ZW5fbmFtZSI6IkVyaWNrIiwiaWR0eXAiOiJ1c2VyIiwiaXBhZGRyIjoiMjAxLjE1LjE3My4yMzQiLCJuYW1lIjoiRVJJQ0sgIENhcnZhbGhvIFBhdWxldHRlIGRlIE9saXZlaXJhIiwib2lkIjoiOWQwMTMyZjUtZjU1ZS00OTdiLThkYjMtMjZjNWJhYWY2NTdkIiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTIwNzEzMjA2LTIxNDQwODQwMTMtMTE1NTgyMjQ1NC00NTg1MyIsInB1aWQiOiIxMDAzMjAwMTczQUREMEIyIiwicmgiOiIwLkFTVUFWeldLZ1lubVJVbVVhS21NV1dHX21Ba0FBQUFBQUFBQXdBQUFBQUFBQUFEdEFNWS4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJINzNxSmpUR2pwd2xyMjBCU1RIeFhDanh3ZDZjUEN2UFgxbEVBVUx4VktZIiwidGlkIjoiODE4YTM1NTctZTY4OS00OTQ1LTk0NjgtYTk4YzU5NjFiZjk4IiwidW5pcXVlX25hbWUiOiJlY29saXZlaXJhQHNpc3Byby5jb20uYnIiLCJ1cG4iOiJlY29saXZlaXJhQHNpc3Byby5jb20uYnIiLCJ1dGkiOiJxQVNFTUtyLUpVeW9jcEhhMko1QUFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2lkcmVsIjoiMjYgMSJ9.aDHLO6rNq7c38QVRTLPpE8_h6MsKoX4mXnUGtE9YXCBc8BlyGYlyJF9agilYkqnlT6Rq03G9apmbf3kJ3ov82cOugNgdaPM0RU1tOmRCOe5sDHiKGGnQ6qkzHfrIXPoS9mQAvBg18MwxMmKozSZOrFZgHDs3ThNEUfeQ0qU1t81bH7bvXEc0xmT82tWbaiixcqDCzZ78YICyJvwAFiizNBDoa-59zWYxYodsz-2KFGyXEavn19NeEhAMNUkc_LdsUrLvOiw6E8QyAS5r5GcYfXp0cqP0Ndcb2QDBDb4jXYNKR8HY-Xc23p8rMzbfJekeqKGPXn2gQ1xW1ICRmTjlFw";
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
    const headers = this._HTTP_HEADERS;
    
    const url = `https://api.powerbi.com/v1.0/myorg/groups`;

    return this._httpClient.get<GetGroupsResponseModel>(url, { 'headers': headers })
      .pipe(take(1), tap(response => {  }));
  }

  public getDatasetsInGroup(groupID: string): Observable<GetDatasetsInGroupResponse> {
    const headers = this._HTTP_HEADERS;
    
    const url = `https://api.powerbi.com/v1.0/myorg/groups/${groupID}/datasets`;

    return this._httpClient.get<GetDatasetsInGroupResponse>(url, { 'headers': headers })
      .pipe(take(1), tap(response => {  }));
  }

  public getApps(): Observable<GetAppsResponseModel> {
    const headers = this._HTTP_HEADERS;
    
    const url = `https://api.powerbi.com/v1.0/myorg/apps`;

    return this._httpClient.get<GetAppsResponseModel>(url, { 'headers': headers })
      .pipe(take(1), tap(response => {  }));
  }

  public getReportsInGroup(groupID: string): Observable<GetReportsInGroupResponse> {
    const headers = this._HTTP_HEADERS;
    
    const url = `https://api.powerbi.com/v1.0/myorg/groups/${groupID}/reports`;

    return this._httpClient.get<GetReportsInGroupResponse>(url, { 'headers': headers })
      .pipe(take(1), tap(response => {  }));
  }
  // #endregion GET

  // #region POST
  public refreshDataset(datesetID: string): Observable<any> {
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
