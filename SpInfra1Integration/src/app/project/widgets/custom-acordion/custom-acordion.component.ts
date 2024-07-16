import { Component, Input, OnInit } from '@angular/core';

@Component( {
      selector: 'app-custom-acordion',
      templateUrl: './custom-acordion.component.html',
      styleUrls: [ './custom-acordion.component.scss' ],
} )
export class CustomAcordionComponent implements OnInit {
      constructor () { }
      customClass = 'customClass';

      @Input() public name = 'Filtro Avançado';
      @Input() public haveArrow = true;
      @Input() public haveMarginTop = false;
      @Input() public isOpen = false;

      ngOnInit (): void { }
}
