import { Injectable } from '@angular/core';
import { Route, Router, UrlSegment, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthStorageService } from '../storage/auth-storage.service';

/**
 * Protege a página de login de ser carregada quando o usuário já está logado,
 * redirecionando ele para a página home da aplicação.
 */
@Injectable(
  { providedIn: 'root' }
)
export class LoginGuard  {

  constructor(
    private router: Router,
    private authStorageService: AuthStorageService
  ) { }

  /**
   * Verifica se pode carregar a tela de login caso o usuário não esteja logado e 
   * a rota seja de login.
   * 
   * @param route Rota atual
   * @param segments Segmentos.
   * @returns 
   */
  canLoad(_route: Route, _segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (_route.path === "auth/login" && this.authStorageService.isLoggedInSub.value && !this.authStorageService.isExternalLogin) {
      return this.router.createUrlTree(["/home"]);
    }
    
    return true;
  }

}
