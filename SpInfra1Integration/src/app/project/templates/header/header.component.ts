import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component( {
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.scss' ]
} )
export class HeaderComponent implements OnInit {
	constructor () { }

	ngOnInit (): void { }


	@Input() pageTitle: string;

	@Input() menuOption: string | undefined;
	@Input() moduleSubject: string | undefined;
	@Input() actionSubject: string | undefined;

	// @Input() isAuditVisible: boolean = true;
	@Input() isSticky: boolean = true;
	@Input() bgColor: string = "#EEEEEE";

	@Input() modoAditamento: boolean = false;

	@Output() return = new EventEmitter();
	
	returnToList() { this.return.emit(); }
}
