import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, Route, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthStorageService } from '../storage/auth-storage.service';

@Injectable(
  { providedIn: 'root' }
)
export class AuthGuard  {

  constructor(
    private router: Router,
    private authStorageService: AuthStorageService
  ) { }

  IsUserAuth(): Observable<boolean | UrlTree>
  {

    return this.authStorageService.isLoggedInSub
      .pipe(
        map((isLoggedIn: boolean) => {

          if (!isLoggedIn || this.authStorageService.isExternalLogin){            
          let login: UrlTree = this.router.parseUrl("/auth/login");
            
            return login;
          }

          return true;
      })

    );

  }

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    return this.IsUserAuth();
  }

  canLoad(_route: Route): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    return this.IsUserAuth();
  }

}
