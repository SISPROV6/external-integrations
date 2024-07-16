import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { environment } from './../../environments/environment';

import { Login } from './models/login';
import { LoginForm } from './models/login-form';
import { RetLogin } from './models/ret-login';
import { PasswordRecup } from './models/password-recup';
import { ForgottenPasswordForm } from './models/forgotten-password-form';
import { RecupPasswordForm } from './models/recup-password-form';

import { IpServiceService, RetError } from 'ngx-sp-infra';
import { AuthStorageService } from './storage/auth-storage.service';
import { CustomLoginService } from '../project/custom/login/custom-login.service';

@Injectable(
  { providedIn: 'root' }
)

export class AuthService {

  constructor(
    private _httpClient: HttpClient,
    private _router: Router,
    private _authStorageService: AuthStorageService,
    private _ipServiceService: IpServiceService,
    private _customLoginService: CustomLoginService
  ) {
      this._BASE_URL = !environment.production ? this._BASE_URL : `${ environment.SpInfra2WS }/LoginSisproERP`;

      this.getIP();
  }

  // #region ==========> PROPERTIES <==========

  // #region PRIVATE

  private readonly _BASE_URL: string = `${ environment.SpInfra2WS }/LoginSisproERP`; // SpInfra2WS
  private readonly _HTTP_HEADERS = new HttpHeaders().set('Content-Type', 'application/json');
  private ip: string  = "undefined";

  // #endregion PRIVATE

  // #endregion ==========> PROPERTIES <==========
  
// #region ==========> SERVICE METHODS <==========

  // #region GET

  private getIP(): void {
    this.ip = "undefined";

    this._ipServiceService.getIPAddress().subscribe({
        next: (res: any) => {
            this.ip = res.ip;
        },
        error: (error: any) => {
        },
    });
  }
  
  // #endregion GET
  
  // #region POST

   /** Realiza o login no sistema
   * @param login Informações do formulário de login
   * @returns Observable com os dados do login realizado, seja erro ou sucesso
   */
login(parmsLogin: LoginForm): Observable<RetLogin> {
    
    let login: Login = {
      usuario: parmsLogin.usuario,
      senha: parmsLogin.senha
    }

    const params = new HttpParams()
      .set('dominio', parmsLogin.dominio);

    const url = `${ this._BASE_URL }/ValidateLogin`;

    const headers = this._HTTP_HEADERS;
    
    return this._httpClient
      .post<RetLogin>(url, login,  { 'params': params, 'headers': headers })
        .pipe(
          take(1),
          tap((response) => {

            if (response.Error) {
              throw Error(response.ErrorMessage);
            }

            this._authStorageService.ignoreCheckLogin = true;
            
            this._authStorageService.isLoggedInSub.next(true);

            this._authStorageService.ip = this.ip;
            this._authStorageService.tenantId = response.TenantId;
            this._authStorageService.infraUsuarioId = response.InfraUsuarioId;
            this._authStorageService.infraEstabId = response.EstabelecimentoId;
            this._authStorageService.infraEstabNome = response.NomeEstabelecimento;
            this._authStorageService.user = login.usuario;
            this._authStorageService.userName = response.UserName;
            this._authStorageService.authToken = response.Token;
            this._authStorageService.dominio = response.Dominio;
            this._authStorageService.isExternalLogin = false;

            // Método com customizações para inicializações do Login
            this._customLoginService.authLogin();

            if (this._authStorageService.urlRedirect == '' || this._authStorageService.urlRedirect == '/' || this._authStorageService.urlRedirect == '/auth/login') {
              // Método com customizações para redirecionamento da tela inicial após login ok
              this._customLoginService.authNavigateToPage(this._router);
            } else {
              this._router.navigate([this._authStorageService.urlRedirect]);
            }

            this._authStorageService.urlRedirect = "/";
          })
          
        );
  }

  public loginExternal(dominio: string, user: string, password: string): Observable<boolean> {
    
    let login: Login = {
      usuario: user,
      senha: password
    }

    const params = new HttpParams()
      .set('dominio', dominio);

    const url = `${ this._BASE_URL }/ValidateExternalLogin`;

    const headers = this._HTTP_HEADERS;

    return this._httpClient
      .post<RetLogin>(url, login,  { 'params': params, 'headers': headers })
        .pipe(
          take(1),
          tap((response) => {

            if (!response.Error) {
              this._authStorageService.isLoggedInSub.next(true);

              this._authStorageService.ip = this.ip;
              this._authStorageService.tenantId = response.TenantId;
              this._authStorageService.infraUsuarioId = response.InfraUsuarioId;
              this._authStorageService.infraEstabId = response.EstabelecimentoId;
              this._authStorageService.infraEstabNome = response.NomeEstabelecimento;
              this._authStorageService.user = login.usuario;
              this._authStorageService.userName = response.UserName;
              this._authStorageService.authToken = response.Token;
              this._authStorageService.dominio = response.Dominio;
              this._authStorageService.isExternalLogin = true;
            }

          }),
          map((response) => {
            return response.Error;
            }
          ) 
          
        );
  }
  
  logout() {
    this._authStorageService.logout();

    localStorage.removeItem('configsServerUser');
    localStorage.removeItem('configsServerPassword');

    // Método com customizações para inicializações do Logout
    this._customLoginService.authLogout();

    this._router.navigate(["/auth/login"]);
  }

 public forgottenPassword(parms: ForgottenPasswordForm): Observable<RetError> {
    
    const params = new HttpParams()
      .set('domain', parms.dominioFgtPsw)
      .set('user', parms.usuarioFgtPsw)

    const headers = this._HTTP_HEADERS;
    
    const url = `${ this._BASE_URL }/ForgottenPassword`;

    return this._httpClient
      .post<RetError>(url, null, { 'params': params, 'headers': headers })
        .pipe(
          take(1),
          tap((response) => {

            if (response.Error) {
              throw Error(response.ErrorMessage);
            }

          })
        
    );

  }

  public recoverPassword(dominio: string, usuario: string, parms: RecupPasswordForm): Observable<RetError> {
    
    let recupPassword: PasswordRecup = {
      password: parms.senhaRecPsw,
      confirmPassword: parms.confirmSenhaRecPsw,
      recoverCode: parms.recoverCodeRecPsw
    }

    const params = new HttpParams()
      .set('domain', dominio)
      .set('user', usuario)
 
    const headers = this._HTTP_HEADERS;
      
    const url = `${ this._BASE_URL }/RecoverPassword`;

    return this._httpClient
      .post<RetError>(url, recupPassword, { 'params': params, 'headers': headers })
        .pipe(
          take(1),
          tap((response) => {

            if (response.Error) {
              throw Error(response.ErrorMessage);
            }

          })
        
    );

  }

  // #endregion POST

  // #endregion ==========> SERVICE METHODS <==========

}
