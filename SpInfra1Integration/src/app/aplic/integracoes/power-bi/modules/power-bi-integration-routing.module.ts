import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PbiAngularViewComponent } from '../power-bi-angular/components/pbi-angular-view/pbi-angular-view.component';
import { PbiRestApiViewComponent } from '../power-bi-rest-api/components/pbi-rest-api-view/pbi-rest-api-view.component';

const routes: Routes = [
  { path: "power-bi-angular", component: PbiAngularViewComponent, data: { title: "PowerBI | Integração Angular" } },
  { path: "power-bi-rest", component: PbiRestApiViewComponent, data: { title: "PowerBI | Integração REST APIs" } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PowerBiIntegrationRoutingModule { }
