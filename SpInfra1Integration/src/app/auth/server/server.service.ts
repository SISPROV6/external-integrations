import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { RetServerConfig } from './ret-server-config';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private readonly _BASE_URL: string = `${ environment.SpInfra2ConfigWS }/Config`;
  private readonly _HTTP_HEADERS = new HttpHeaders().set('Content-Type', 'application/json');

  constructor( private _httpClient: HttpClient ) {
    this._BASE_URL = !environment.production
      ? this._BASE_URL
      : `${ environment.SpInfra2ConfigWS }/Config`;
  }

  // #region GET Server
  public getServer(): Observable<RetServerConfig> {
    const url = `${ this._BASE_URL }/GetConfig`;

    return this._httpClient
      .post<RetServerConfig>(url, null, { 'headers': this._HTTP_HEADERS })
        .pipe(
          take(1),
          tap(response => {
            localStorage.setItem('configServerUser', response.User);
            localStorage.setItem('configServerPassword', response.Password);
          })
        )
  }
  // #endregion GET Server
}
