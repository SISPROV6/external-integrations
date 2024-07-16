import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PowerBiIntegrationRoutingModule } from './power-bi-integration-routing.module';
import { PbiAngularViewComponent } from '../power-bi-angular/components/pbi-angular-view/pbi-angular-view.component';
import { PbiRestApiViewComponent } from '../power-bi-rest-api/components/pbi-rest-api-view/pbi-rest-api-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectModule } from 'src/app/project/project.module';
import { PowerBIEmbedModule } from 'powerbi-client-angular';
import { PbiAngularFormComponent } from '../power-bi-angular/components/pbi-angular-view/pbi-angular-form/pbi-angular-form.component';
import { PbiInitializationFormComponent } from '../power-bi-angular/components/pbi-angular-view/pbi-initialization-form/pbi-initialization-form.component';



@NgModule({
  declarations: [
    PbiAngularViewComponent,
    PbiRestApiViewComponent,

    PbiAngularFormComponent,
    PbiInitializationFormComponent
  ],
  imports: [
    CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ProjectModule,
    PowerBIEmbedModule,

    PowerBiIntegrationRoutingModule
  ],
  exports: [
    PbiAngularViewComponent,
    PbiRestApiViewComponent,
    
    PbiAngularFormComponent,
    PbiInitializationFormComponent
  ]
})
export class PowerBiIntegrationModule { }
