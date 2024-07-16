import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { IConfig, NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { provideEnvironmentNgxCurrency, NgxCurrencyInputMode, NgxCurrencyDirective } from 'ngx-currency';
import { NgxBootstrapIconsModule, upload, plus, search, slashCircle, fileEarmark } from 'ngx-bootstrap-icons';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ptBrLocale, defineLocale } from 'ngx-bootstrap/chronos'
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { UiSwitchModule } from 'ngx-ui-switch';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { PopoverModule } from "ngx-bootstrap/popover";

import { InfraModule } from 'ngx-sp-infra';
import { ProjectRoutingModule } from './project.routing.module';

import { Error404Component } from './components/error-404/error-404.component';
import { PageNotAuthorizedComponent } from './components/page-not-authorized/page-not-authorized.component';
import { HeaderComponent } from 'src/app/project/templates/header/header.component';
import { SimpleHeaderComponent } from './templates/simple-header/simple-header.component';
import { FooterComponent } from './templates/footer/footer.component';
import { DisableControlDirective } from './directives/disable-control.directive';
import { HighlightDirective } from './directives/highlight.directive';
import { DecimalCommaPipe } from './pipes/decimal-comma.pipe';
import { TitleCasePipe } from './pipes/title-case-pipe.pipe';
import { OrderSortPipe } from './pipes/order-sort.pipe';
import { FilterMultipleChoicePipe } from './pipes/filter-multiple-choice.pipe';
import { CustomAcordionComponent } from './widgets/custom-acordion/custom-acordion.component';
import { PesquisaComboboxComponent } from './widgets/pesquisa-combobox/pesquisa-combobox.component';
import { SearchFiltersComponent } from './widgets/search-filters/search-filters.component';
import { SideTabsComponent } from './widgets/side-tabs/side-tabs.component';
import { DynamicInputComponent } from './widgets/dynamic-input/dynamic-input.component';
import { ListGroupboxComponent } from './widgets/list-groupbox/list-groupbox.component';
import { PrazoVigenciaComponent } from './widgets/prazo-vigencia/prazo-vigencia.component';
import { PaginationComponent } from './widgets/pagination/pagination.component';
import { SimpleSearchComponent } from './widgets/simple-search/simple-search.component';
import { GenericModalComponent } from './widgets/generic-modal/generic-modal.component';
import { ComboboxMultipleChoiceComponent } from './widgets/combobox-multiple-choice/combobox-multiple-choice.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

//ICONS
const icons = {	upload,
	plus,
	search,
	slashCircle,
	fileEarmark
};

// Define o Locale da aplicação. Válido somente para o ngx-bootstrap.
// Não é aplicado globalmente.
defineLocale('pt-br', ptBrLocale);

@NgModule( {
	declarations: [
		Error404Component,
		PageNotAuthorizedComponent,
		HeaderComponent,
		SimpleHeaderComponent,
		FooterComponent,
		DisableControlDirective,
		HighlightDirective,    
		DecimalCommaPipe,
		TitleCasePipe,
		OrderSortPipe,
		FilterMultipleChoicePipe,
		CustomAcordionComponent,
		PesquisaComboboxComponent,
        SearchFiltersComponent,
		SideTabsComponent,
		DynamicInputComponent,
		ListGroupboxComponent,
		PrazoVigenciaComponent,
		PaginationComponent,
		SimpleSearchComponent,
		GenericModalComponent,
        ComboboxMultipleChoiceComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ModalModule.forRoot(),
		NgxMaskDirective, 
		NgxCurrencyDirective,
		NgxMaskPipe,
		NgxDatatableModule,
		NgxPaginationModule,
		NgxBootstrapIconsModule.pick(icons),
		AccordionModule.forRoot(),
		BsDatepickerModule.forRoot(),
		TooltipModule.forRoot(),
		PopoverModule.forRoot(),
		SelectDropDownModule,
        UiSwitchModule,
        UiSwitchModule.forRoot({
            size: 'medium',
            color: '#86c05c',
            switchColor: '#efefef',
            defaultBgColor: '#ff6868',
            defaultBoColor : 'none',
            checkedLabel: 'Sim',
            uncheckedLabel: 'Não',
            checkedTextColor: "#FFF",
            uncheckedTextColor: "#FFF"
        }),
        TabsModule,
        TimepickerModule,
		RouterModule,
		InfraModule,
		ProjectRoutingModule
	],
	exports: [
		InfraModule,
		ReactiveFormsModule,
		ModalModule,
		NgxBootstrapIconsModule,
		NgxMaskDirective, 
		NgxCurrencyDirective,
		NgxMaskPipe,
		FilterMultipleChoicePipe,
		NgxDatatableModule,
		NgxPaginationModule,
		AccordionModule,
		BsDatepickerModule,
		TooltipModule,
		PopoverModule,
		SelectDropDownModule,
        UiSwitchModule,
        TabsModule,
        TimepickerModule,
		Error404Component,
		PageNotAuthorizedComponent,
		HeaderComponent,
		SimpleHeaderComponent,
		FooterComponent,		
		DisableControlDirective,
		HighlightDirective,
		DecimalCommaPipe,
		TitleCasePipe,
		OrderSortPipe,
		CustomAcordionComponent,
		PesquisaComboboxComponent,
        SearchFiltersComponent,
		SideTabsComponent,
		DynamicInputComponent,
		ListGroupboxComponent,
		PrazoVigenciaComponent,
		PaginationComponent,
		SimpleSearchComponent,
		GenericModalComponent,
        ComboboxMultipleChoiceComponent
	],
	providers: [
		provideNgxMask(),
		provideEnvironmentNgxCurrency({
			align: "left",
			allowNegative: true,
			allowZero: true,
			decimal: ",",
			precision: 2,
			prefix: "",
			suffix: "",
			thousands: ".",
			nullable: false,
			min: null,
			max: null,
			inputMode: NgxCurrencyInputMode.Financial
		})
	]

} )
export class ProjectModule { }
