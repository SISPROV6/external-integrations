import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";

import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

import { CheckUrlAndMethodService } from "ngx-sp-infra";

/**
 * \brief Intercepta uma chamada HTTP para inserir a autenticação da Sispro.
 */
@Injectable(
    { providedIn: 'root' }
)
export class AuthInfraInterceptor implements HttpInterceptor {

    constructor(
        private authCheckService: CheckUrlAndMethodService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let changedReq: HttpRequest<any> = req;

        if (this.authCheckService.needsAuthRequest(req.url, req.method, environment.needsAuthInfra)) {
            // Adiciona as autenticações necessárias ao servidor. Autenticação básica.
            let headers: HttpHeaders = req.headers.set(
                "Authorization",
                `Basic ${btoa(`${ localStorage.getItem('configServerUser') }:${ localStorage.getItem('configServerPassword') }`) }
                `);

            changedReq = req.clone({ headers: headers });
        }

        return next.handle(changedReq);
    }

}