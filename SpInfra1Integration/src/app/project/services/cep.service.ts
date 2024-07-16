import { RetCep } from './../models/cep/ret-cep';
import { environment } from './../../../environments/environment';
import { HttpParams } from '@angular/common/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, take, tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CepService {
  private readonly _BASE_URL: string = `${ environment.SpInfra2CepWS }/Cep`; // SpInfra2CepWS
  private readonly _HTTP_HEADERS = new HttpHeaders().set('Content-Type', 'application/json');

  constructor( private _httpClient: HttpClient ) {
    this._BASE_URL = !environment.production
      ? this._BASE_URL
      : `${ environment.SpInfra2CepWS }/Cep`;
  }


  public consultaCEP(cep: string): Observable<RetCep> {
    const params: HttpParams = new HttpParams()
      .set('cep', cep);

    const url: string = `${this._BASE_URL}/GetEnderecoByCEP`;

    return this._httpClient
      .get<RetCep>(url, { 'params': params, 'headers': this._HTTP_HEADERS })
      .pipe(
        take(1),
        tap(response => {
          if (response.Error) throw Error(response.ErrorMessage);
        })
      );
  }

}
