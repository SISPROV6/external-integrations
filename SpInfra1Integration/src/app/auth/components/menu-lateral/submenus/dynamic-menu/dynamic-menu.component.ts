import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { IMenuItemStructure } from '../../model/imenu-item-structure.model';

@Component({
  selector: 'app-dynamic-menu',
  templateUrl: './dynamic-menu.component.html',
  styleUrls: ['./dynamic-menu.component.scss']
})
export class DynamicMenuComponent implements OnInit {

  @Output() selectTemplate: EventEmitter<any> = new EventEmitter;

  @Input() submenuRef: HTMLDivElement;

  @Input() recebeParam: Function;

  @Input() titleSubmenu = "";

  @Input() submenuList?: IMenuItemStructure[] = [];

  menuList: IMenuItemStructure[] = [];

  menuStatic: IMenuItemStructure[] = [];

  selectedMenuItem: number[] = [];

  selectedItem: number = -1;

  @ContentChild(TemplateRef) desiredContent?: TemplateRef<any>;

  constructor(public router: Router) { }

  ngOnInit(): void {
    // this._menuServicesService.getList().subscribe(menuList => {
    //   this.menuList = menuList
    // })
  }

  // #region SECOND SUBMENU
  @Output() selectSubmenu: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectTitle: EventEmitter<string> = new EventEmitter<string>();

  public sendSecondMenuForFather(itemList: IMenuItemStructure) {
    this.selectTitle.emit(this.titleSubmenu + " > " + itemList.label);
    this.selectSubmenu.emit(itemList.children);
  }
  // #endregion SECOND SUBMENU

  onClickedOutside(e: Event, ref: HTMLDivElement) {
    ref.classList.remove("opened-sub");
    this.submenuList = [];
    this.indicateSelectedMenuItem();
  }

  indicateSelectedMenuItem() {
    if (this.selectedMenuItem.length) {
      this.selectedItem = this.selectedMenuItem[0];
    }
  }

  openSubmenuDynamic(id: IMenuItemStructure, ref: HTMLDivElement, desiredMenu: TemplateRef<any>, selecao: number) {
    this.selectTemplate.emit(this.openSubmenuDynamic);
    this.titleSubmenu = id.label
    this.desiredContent = desiredMenu;
    ref.classList.remove("opened-notif-sub");
    if (this.submenuList === id.children) {
      ref.classList.toggle("opened-sub")
      this.selectedItem = -1;
      this.submenuList = [];
      return;
    } else if (!ref.classList.contains("opened-sub")) {
      ref.classList.toggle("opened-sub");
    }
    this.submenuList = id.children;
    this.selectedItem = selecao;
  }

  public openSubmenu(itemList: IMenuItemStructure, ref: HTMLDivElement) {

  }

  // openSubmenu(id: IMenu, ref: HTMLDivElement, desiredMenu: TemplateRef<any>, selecao: number) {
  //   this.submenuStaticList = [];
  //   if (id.StructTelaList.length > 0) {
  //     this.titleSubmenu = id.LABEL
  //     this.desiredContent = desiredMenu;
  //     ref.classList.remove("opened-notif-sub");
  //     if (this.submenuList === id.StructTelaList) {
  //       ref.classList.toggle("opened-sub")
  //       this.selectedItem = -1;
  //       this.submenuList = [];
  //       this.indicateSelectedMenuItem();
  //       return;
  //     } else if (!ref.classList.contains("opened-sub")) {
  //       ref.classList.toggle("opened-sub");
  //     }
  //     this.selectedItem = selecao;
  //     this.submenuList = id.StructTelaList;
  //   }
  //   if (id.StructTelaList.length <= 0) {
  //     this.selectedItem = -1;
  //     this.submenuList = [];
  //     ref.classList.toggle("selectedItem");
  //     this.onClickedOutside(new Event(""), ref);
  //     this.router.navigate([id.URL]).then(this.selectActualMenuItem.bind(this))
  //     this.selectedItem = selecao;
  //     this.submenuList = id.StructTelaList;
  //   }
  // }

  changeStar(ref: HTMLButtonElement, id: IMenuItemStructure | undefined) {
    ref.classList.toggle("star");
    ref.classList.toggle("yellow-star");
  }
}
