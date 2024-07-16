import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProjectModule } from 'src/app/project/project.module';

import { AuthRoutingModule } from './auth.routing.module';

import { LoginComponent } from './components/login/login.component';
import { PrimaryDropdownComponent } from './components/menu-lateral/dropdown/primary-dropdown/primary-dropdown.component';
import { SecondaryDropdownComponent } from './components/menu-lateral/dropdown/secondary-dropdown/secondary-dropdown.component';
import { MenuLateralComponent } from './components/menu-lateral/menu/menu-lateral.component';
import { SelecaoEstabelecimentosModalComponent } from './components/menu-lateral/menu/selecao-estabelecimentos-modal/selecao-estabelecimentos-modal.component';
import { DynamicMenuComponent } from './components/menu-lateral/submenus/dynamic-menu/dynamic-menu.component';
import { NotifSubmenuComponent } from './components/menu-lateral/submenus/notif-submenu/notif-submenu.component';
import { SearchSubmenuComponent } from './components/menu-lateral/submenus/search-submenu/search-submenu.component';
import { SecondSubmenuComponent } from './components/menu-lateral/submenus/second-submenu/second-submenu.component';

@NgModule({
  declarations: [
    LoginComponent,
    MenuLateralComponent,
    SelecaoEstabelecimentosModalComponent,
    DynamicMenuComponent,
    SecondSubmenuComponent,
    SearchSubmenuComponent,
    NotifSubmenuComponent,
    PrimaryDropdownComponent,
    SecondaryDropdownComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
     ProjectModule,
    AuthRoutingModule
  ],
  exports: [
    SelecaoEstabelecimentosModalComponent
  ],

})
export class AuthModule { }
