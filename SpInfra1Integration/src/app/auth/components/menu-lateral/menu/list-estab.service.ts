import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { merge, Observable, of, tap } from 'rxjs';

import { CacheName } from 'src/app/project/utils/cache-name';
import { IEstabelecimento } from '../model/iestabelecimento.model';

@Injectable({
  providedIn: 'root'
})
export class ListEstabService {
  private storage: Storage;

  public readonly menuKey = `${ CacheName.cacheName }_ListaEstabs`; 

  baseUrl = "assets/jsons/lista-estabs.json";

  constructor(private http: HttpClient) { 
    this.storage = window.localStorage;
  }

  getList(): Observable<IEstabelecimento[]> {
    let iMenu: IEstabelecimento[] | null = this.get();
    let httpCall: Observable<IEstabelecimento[]> = this.http.get<IEstabelecimento[]>(this.baseUrl).pipe(
      tap((iMenuFromServer: IEstabelecimento[]) => {
        this.set(iMenuFromServer);
      })
    );

  
    // Caso o menu já esteja gravado no local, é retornado ele no observable e logo em seguida
    // é realizada a chamada HTTP para buscar o mais novo menu.
    if (iMenu) {     
      let obs: Observable<IEstabelecimento[]> = of(iMenu!);
      let obsMerged: Observable<IEstabelecimento[]> = merge(obs, httpCall);

      return obsMerged;
    }

    return httpCall;
  }

  set(value: IEstabelecimento[]): void {
    let iMenuJson = JSON.stringify(value);
    this.storage.setItem(this.menuKey, iMenuJson);
  }

  get(): IEstabelecimento[] | null {
    let possibleIMenus: string | null = this.storage.getItem(this.menuKey);

    if (possibleIMenus) {
      let iMenus: IEstabelecimento[] = JSON.parse(possibleIMenus);

      return iMenus;
    }

    return null;
  }

  remove(): void {
    this.storage.removeItem(this.menuKey);
  }
}
