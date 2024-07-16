import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

import { AuthAplicInterceptor } from './auth/interceptors/auth-aplic.interceptor';
import { AuthInfraInterceptor } from './auth/interceptors/auth-infra.interceptor';

import { InfraModule, SettingsService } from 'ngx-sp-infra';
import { ProjectModule } from './project/project.module';

import ptBr from '@angular/common/locales/pt';

// Locale
registerLocaleData(ptBr);

export function getLocaleId(_settingsService: SettingsService) {
	return _settingsService.getLocaleId();
}

export function getDefaultCurrencyCode(_settingsService: SettingsService) {
	return _settingsService.getDefaultCurrencyCode();
}

getDefaultCurrencyCode;

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		InfraModule,
		ProjectModule,
		AppRoutingModule
	],
	providers: [
		Title,
		{
			provide: LOCALE_ID,
			deps: [SettingsService],
			useFactory: getLocaleId,
		},
		{
			provide: DEFAULT_CURRENCY_CODE,
			deps: [SettingsService],
			useFactory: getDefaultCurrencyCode,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInfraInterceptor,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthAplicInterceptor,
			multi: true
		}
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
