import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, take, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { RetRecordsCombobox } from '../models/combobox/ret-records-combobox';

@Injectable({
  providedIn: 'root'
})
export class CrpComboboxService {
  private readonly _BASE_URL: string = `${ environment.SpCrp2ComboboxWS }/CrpCombobox`; // SpCrp2ComboboxWS
  private readonly _HTTP_HEADERS = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _httpClient: HttpClient) {
    this._BASE_URL = !environment.production ? this._BASE_URL : `${ environment.SpCrp2ComboboxWS }/CrpCombobox`;
  }

  public comboboxPessoas(): Observable<RetRecordsCombobox> {
    const url = `${this._BASE_URL}/ComboboxPessoas`;

    return this._httpClient.get<RetRecordsCombobox>(url, { headers: this._HTTP_HEADERS }).pipe(
      take(1),
      tap((response) => {
        if (response.Error) throw Error(response.ErrorMessage);
      })
    );
  }

  public comboboxPessoasEmail(): Observable<RetRecordsCombobox> {
    const url = `${this._BASE_URL}/ComboboxPessoasEmail`;

    return this._httpClient.get<RetRecordsCombobox>(url, { headers: this._HTTP_HEADERS }).pipe(
      take(1),
      tap((response) => {
        if (response.Error) throw Error(response.ErrorMessage);
      })
    );
  }

  public comboboxPessoasByNatureza(txNome: string): Observable<RetRecordsCombobox> {
    const params: HttpParams = new HttpParams()
      .set('txNome', txNome)

    const url = `${this._BASE_URL}/ComboBoxPessoasByNatureza`;

    return this._httpClient.get<RetRecordsCombobox>(url, { 'params': params, headers: this._HTTP_HEADERS }).pipe(
      take(1),
      tap((response) => {
        if (response.Error) throw Error(response.ErrorMessage);
      })
    );
  }

  public comboboxPapeis(): Observable<RetRecordsCombobox> {
    const url = `${this._BASE_URL}/ComboboxPapeis`;

    return this._httpClient.get<RetRecordsCombobox>(url, { headers: this._HTTP_HEADERS }).pipe(
      take(1),
      tap((response) => {
        if (response.Error) throw Error(response.ErrorMessage);
      })
    );
  }


}
