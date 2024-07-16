import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, take, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { RetRecordsCombobox } from '../models/combobox/ret-records-combobox';
 
@Injectable({
  providedIn: 'root'
})
export class InfraComboboxService {
  private readonly _BASE_URL: string = `${ environment.SpInfra2ComboboxWS }/InfraCombobox`; // SpInfra2ComboboxWS

  constructor( private _httpClient: HttpClient ) {
    this._BASE_URL = !environment.production
      ? this._BASE_URL
      : `${ environment.SpInfra2ComboboxWS }/InfraCombobox`;
  }

  public comboboxEstabelecimentos(tenantId: number, usuarioId: string): Observable<RetRecordsCombobox> {
    const params = new HttpParams()
    .set('tenantId', tenantId)
    .set('usuarioId', usuarioId)
    
    const headers = new HttpHeaders().set("Content-Type", "application/json");

    const url = `${this._BASE_URL}/ComboboxEstabelecimentos`;

    return this._httpClient.get<RetRecordsCombobox>(url, { params: params, headers: headers }).pipe(
      take(1),
      tap((response) => {
        if (response.Error) throw Error(response.ErrorMessage);
      })
    );
  }

  public comboboxUsuarios(tenantId: number, usuarioId: string): Observable<RetRecordsCombobox> {
    const params = new HttpParams()
    .set('tenantId', tenantId)
    .set('usuarioId', usuarioId)
    
    const headers = new HttpHeaders().set("Content-Type", "application/json");

    const url = `${this._BASE_URL}/ComboboxUsuarios`;

    return this._httpClient.get<RetRecordsCombobox>(url, { params: params, headers: headers }).pipe(
      take(1),
      tap((response) => {
        if (response.Error) throw Error(response.ErrorMessage);
      })
    );
  }

}
