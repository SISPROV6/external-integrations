import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotAuthorizedComponent } from './components/page-not-authorized/page-not-authorized.component';

const projectRoutes: Routes = [
	{ path: "page-not-authorized", component: PageNotAuthorizedComponent, data: {title: 'Página não autorizada'} },
];

@NgModule({
  imports: [
    RouterModule.forChild(projectRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProjectRoutingModule { }
