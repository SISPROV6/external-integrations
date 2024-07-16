import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectModule } from 'src/app/project/project.module';

import { HomeRoutingModule } from './home.routing.module';

import { HomeComponent } from './home/home.component';

@NgModule({
	declarations: [
		HomeComponent
	],
	imports: [
		CommonModule, 
		ProjectModule,
		HomeRoutingModule
	],
	exports: [
		HomeComponent
	]
})
export class HomeModule { }
