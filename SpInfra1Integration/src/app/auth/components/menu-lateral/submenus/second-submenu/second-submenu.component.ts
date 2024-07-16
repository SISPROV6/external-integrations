import { ISecondMenu } from './../../model/isecondmenu.model';
import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-second-submenu',
  templateUrl: './second-submenu.component.html',
  styleUrls: ['./second-submenu.component.scss']
})
export class SecondSubmenuComponent implements OnInit {

  @Output() returnSubmenu: EventEmitter<any> = new EventEmitter<any>();

  @Input() submenuRef: HTMLDivElement;

  @Input() recebeParam: Function;

  @Input() titleSecondMenu = "";

  @Input() submenuList: (ISecondMenu | undefined)[] = [];

  firstTitle: string = "";
  
  secondTitle: string = "";

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
    this.breakTitle();
  }

  private breakTitle() {
    this.firstTitle = this.titleSecondMenu.split(" > ")[0];
    this.secondTitle = this.titleSecondMenu.split(" > ")[1];
  }

  public returnToSubmenuDynamic() {
    this.returnSubmenu.emit();
  }
}
