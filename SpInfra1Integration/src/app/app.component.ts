import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';

import { filter } from 'rxjs/operators';

import configVersion from '../app/project/utils/version/version.config.json';

import { AuthStorageService } from './auth/storage/auth-storage.service';

@Component( {
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: [ './app.component.scss' ]
} )
export class AppComponent {
      constructor(
            private location: Location,
            private router: Router,
            private activatedRoute: ActivatedRoute,
            private titleService: Title,
            private httpClient: HttpClient,
            private authStorageService: AuthStorageService
      ) { }

      ngOnInit() {

            // Definimos os headers da página sem cache
            const headers = new HttpHeaders()
                  .set('Cache-control', 'no-cache')
                  .set('Pragma', 'no-cache');

            const version = configVersion.preReleaseLabel ? `${configVersion.preReleaseLabel}${configVersion.version}` : `${configVersion.version}`;

            // Puxamos as informações da versão do localStorage
            console.log("Versão do localStorage: " + localStorage.getItem('version'))

            // Puxamos as informações da versão do servidor
            console.log("Versão atual: " + version);

            // Se a versão que estiver no servidor for diferente da publicada recentemente, atualiza a página limpando o cache
            if (localStorage.getItem('version') == null) {
                  localStorage.setItem('version', version);
            }
            else if (version != localStorage.getItem('version')) {
                  localStorage.setItem('version', version);

                  this.httpClient
                        .get("", { headers, responseType: "text" })
                        .subscribe(() => location.reload());
            }     
            
            // Definição dos Títulos das páginas
            this.router.events.pipe( filter(event => event instanceof NavigationEnd) )
                  .subscribe((event) => {
                        var route = this.getChild(this.activatedRoute)

                        route.data.subscribe((data: { title: string; }) => {

                        this.titleService.setTitle(data.title)})
                  });

            // Definição de Url para redirecionamento
            this.authStorageService.urlRedirect = this.location.path();
      }

      getChild(activatedRoute: ActivatedRoute): any {

            if (activatedRoute.firstChild) {
                  return this.getChild(activatedRoute.firstChild);
            } else {
                  return activatedRoute;
            }

      }

      title = 'Login - SpInfra1Integration';
}
