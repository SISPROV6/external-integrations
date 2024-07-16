import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, Route, UrlTree } from '@angular/router';

import { Observable, lastValueFrom, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { ServerService } from '../server/server.service';
import { AuthStorageService } from '../storage/auth-storage.service';
import { AuthService } from '../auth.service';

@Injectable(
  { providedIn: 'root' }
)
export class ExternaLoginlGuard  {

  constructor(
    private router: Router,
    private authService: AuthService,
    private authStorageService: AuthStorageService,
		private serverService: ServerService
  ) { }

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    let param: string = atob(_route.paramMap.get('param')!);

    return this.IsUserAuth(param);
  }

  private navigateToError(): UrlTree {
    this.authStorageService.isExternalLogin = true;

    let login: UrlTree = this.router.parseUrl("/error-404");

    return login;
  }

  private IsUserAuth(param: string): Observable<boolean | UrlTree>
  {
    return this.authStorageService.isLoggedInSub
      .pipe(
        take(1),
        switchMap((isLoggedIn: boolean) => {
          // Split dos parâmetros para o login externo
          var params = param.split('$');
          
          let domain = params[0];
          let user = params[1];
          let password = params[2];

          if (isLoggedIn && !this.authStorageService.isExternalLogin && this.authStorageService.dominio.toLowerCase() == domain.toLowerCase())
          {
            return of(true);
          };

          // antes alteração - se precisar voltar
          return this.logOnExternal(domain, user, password);
        })
    );

  }

  //  Executa o Login Externo
  private async logOnExternal(domain: string, user: string, password: string): Promise<boolean | UrlTree> {
    const retConfig: boolean = await this.handleGetServer();

    if (!retConfig) {
      return this.navigateToError();
    }

    try {

      const error: boolean = await lastValueFrom(
              this.authService.loginExternal(domain, user, password)
      );

      if (error) {
        return this.navigateToError();
      }

      return true;
    } catch (error) {
      return this.navigateToError();
    }

  }

  // Retorna os parâmetros de configuração.
  private getServer(): Promise<any> {
    return new Promise((resolve, reject) => {

      this.serverService.getServer().subscribe({
        next: response => {
          resolve(true);
        },
        error: error => {
          reject(error);
        }

      });
    });

  }

  // Handle para busca dos parâmetros de configuração.
  private async handleGetServer(): Promise<boolean> {

    try
    {
      const response = await this.getServer();
 
      return true;
    } catch (error) {
      return false;
    }

  }

}
