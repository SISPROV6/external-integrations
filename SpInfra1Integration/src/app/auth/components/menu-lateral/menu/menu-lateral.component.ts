import { Component, ContentChild, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subject, filter } from 'rxjs';

import { MessageService } from 'ngx-sp-infra';
import { AuthStorageService } from 'src/app/auth/storage/auth-storage.service';
import { ProjectUtilservice } from 'src/app/project/utils/project-utils.service';
import { CustomMenuService } from 'src/app/project/custom/menu/custom-menu.service';
import { MenuServicesService } from '../menu-services.service';

import { ISecondMenu } from './../model/isecondmenu.model';
import { Usuario_IMG } from '../model/usuario-img';
import { AuthService } from 'src/app/auth/auth.service';
import { IMenuItemStructure } from '../model/imenu-item-structure.model';
import { MenuConfig } from 'src/app/project/custom/menu/config/menu-config';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent implements OnInit {
  constructor(
    public _customMenuService: CustomMenuService,
    private _authStorageService: AuthStorageService,
    private _bsModalService: BsModalService,
    private _menuServices: MenuServicesService,
    private _messageService: MessageService,
    private _projectUtilService: ProjectUtilservice,
    private _router: Router,
    private _authService: AuthService
  ) {
    // Implementação que verifica eventos acionados na classe de service.
    this._menuServices.getNewUserImageEvent().subscribe( () => { this.getMenuUserImg(); })
  }

  public ngOnInit(): void {

    // Inscreva-se no evento NavigationEnd para receber notificações quando a rota mudar, serve para atualizar a seleção do menu corretamente
    this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => { this._customMenuService.menuItems = this._customMenuService.menuConfig.updateRouteSelection(this._router.url, this._customMenuService.menuItems) });

    if (!this._customMenuService.menuDynamic) {
      this._customMenuService.menuConfig = new MenuConfig(true);
 
      this._customMenuService.menuItems = this._customMenuService.menuConfig.initializeMenu(this._router.url);    

      // Método com customizações para inicialização do Menu Estático
      this._customMenuService.menuStaticOnInit();          }
    else
    {
      // Método com customizações para inicialização do Menu Dinâmico
      this._customMenuService.menuDynamicOnInit();      
    }

    this.nomeEstabelecimento = this._authStorageService.infraEstabNome;
    this.footerUserName = this._authStorageService.userName;

    this.checkForCachedImage();

    this.getUserEmail();
  }

  // #region ==========> PROPERTIES <==========

  // #region PRIVATE

  // ERICK: vou manter estes dois por enquanto para quando for necessário estas funcionalidades eu consiga refazê-las sem muito problema
  @ViewChild("notif_menu") private notif_template?: TemplateRef<any>;
  @ViewChild("search_menu") private search_template?: TemplateRef<any>;
  
  // #region PUBLIC
  @ViewChild('menuLink') public menuLink: HTMLAnchorElement;
  @ContentChild(TemplateRef) public desiredContent?: TemplateRef<any>;

  public readonly MODAL_ESTABELECIMENTO: number = 1;
  
  public nomeEstabelecimento: string = 'Estabelecimento padrão';
  public titleSubmenu: string = "";
  public submenuList: (IMenuItemStructure | undefined)[] = [];
  
  public messageIfClicked = new Subject<boolean>();

  /** Esta variável é usada para passar como parâmetro o título para o submenu secundário quando ele for chamado; */
  public titleSecondMenu: string = "";

  /** Esta variável é usada na abertura do submenu e do submenu secundário para 
    * que a função onClickedOutside() que está na segunda div principal do HTML do
    * componente não seja ativada, pois se ela for ativada ela irá fechar o menu
    * lateral, e quando vamos do submenu para o submenu secundário não queremos
    * fechar o menu lateral, e quando vamos do submenu secundário para o submenu
    * também não queremos fechar o menu lateral;
  */
  public closeMenu: boolean = true;

  /** Esta variável é usada para salvar a lista de itens do submenu ao executar a
    * função openSubmenu() para que, ao retornar do submenu secundário para o
    * submenu, possamos passar ela como parâmetro para carregar o submenu
    * novamente (esta variável é necessária pois a lista de itens do submenu é
    * percorrida dentro de um *ngFor, e não temos acesso a essa variável fora do
    * escopo do *ngFor);
  */
  public itemListAux: IMenuItemStructure;

  /** Utilizada como a fonte da imagem de perfil do usuário logado no sistema. */
  public footerUserImgSrc: string;

  /** Emai do usuário logado para ser exibido no popover */
  public footerUserEmail: string;

  /** Nome do usuário logado para ser exibido no rodapé do menu. */
  public footerUserName: string = "Usuário";

  
  public isPopoverVisible: boolean = false;
  public showBalloon: boolean = false;
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========

  // #region ==========> SERVICES <==========

  // #region GET
  private getEstabelecimentoSession(estabID: string): void {
    this._menuServices.getEstabelecimentoSession(estabID).subscribe({
      next: response => { this.nomeEstabelecimento = response.Record.LABEL; },
      error: error => { this._projectUtilService.showHttpError(error); }
    })
  }

  private getMenuUserImg(): void {
    this._menuServices.getImagemMenu().subscribe({
      next: response => { this.footerUserImgSrc = response.InfraUsuarioImg.IMAGEM; },
      error: error => { this._projectUtilService.showHttpError(error); }
    })
  }

  public getUserEmail(): void {
    this._menuServices.getUsuarioEmail().subscribe({
      next: response => { this.footerUserEmail = response.Email; },
      error: error => { this._projectUtilService.showHttpError(error); }
    })
  }
  // #endregion GET

  // #region UPDATE
  public updateLastLogEstabelecimento(estab: string): void {
    this._menuServices.updateLastLogEstabID(estab.split(" - ")[0]).subscribe({
      next: () => {
        this._messageService.showAlertSuccess('Estabelecimento alterado com sucesso!');
        this.getEstabelecimentoSession(estab.split(" - ")[0]);
      }
    })

    this._authStorageService.infraEstabId = estab.split(" - ")[0];
    this._authStorageService.infraEstabNome = estab.split(" - ")[1];
  }
  // #endregion UPDATE

  // #endregion ==========> SERVICES <==========

  // #region ==========> UTILITIES <==========

  public togglePopover() { this.showBalloon = !this.showBalloon; }

  // #region SUBMENU SECUNDÁRIO

  /** Função que serve para capturar o título do submenu secundário a partir de um
   * EventEmitter que está no dynamic-menu component (componente do menu
   * secundário);
   * @param titleSecondMenu Variável em que o título do submenu lateral secundário será armazenado;
  */
  public catchTitleByChild(titleSecondMenu: string): void { this.titleSecondMenu = titleSecondMenu; }

  /** Função que serve para capturar a lista de itens do submenu secundário, e em
   * seguida chama a função openSecondMenu() para abrir o submenu secundário;
   * @param secondMenuList Lista de itens do menu secundário;
   * @param ref Uma referência para a div submenu_ref que é a estrutura do submenu lateral;
   * @param desiredMenu O conteúdo desejado que será mostrado dentro do submenu_ref;
  */
  public catchSecondMenuByChild(secondMenuList: any, ref: HTMLDivElement, desiredMenu: TemplateRef<any>) { this.openSecondMenu(secondMenuList, ref, desiredMenu); }

  /** Função que serve para abrir o submenu secundário;
   * @param secondMenuList Lista de itens do menu secundário;
   * @param ref Uma referência para a div submenu_ref que é a estrutura do submenu lateral;
   * @param desiredMenu O conteúdo desejado que será mostrado dentro do submenu_ref;
  */
  private openSecondMenu(secondMenuList: ISecondMenu[], ref: HTMLDivElement, desiredMenu: TemplateRef<any>) {
    if (secondMenuList.length > 0) {
      this.desiredContent = desiredMenu;
      if (!ref.classList.contains("opened-sub")) { ref.classList.toggle("opened-sub"); }
    }

    this.closeMenu = false;
  }
  // #endregion SUBMENU SECUNDÁRIO

  public dropdownWasOpened(value: boolean): void { this.messageIfClicked.next(value); }

  public openExpansibleMenu(ref: HTMLDivElement): void {
    ref.classList.toggle("closed");
    ref.classList.toggle("col");
    document.querySelector(".sidebar-control")?.classList.toggle("col");
  
    // Método com customizações para inicialização do Menu Estático
    this._customMenuService.menuopenExpansibleMenu(ref);          
  }

  public openSubmenu(menu: IMenuItemStructure, ref: HTMLDivElement, desiredMenu: TemplateRef<any>, abirPeloSecondMenu: boolean = false): void {
    if (menu.children && menu.children.length > 0) {
      this.itemListAux = menu;
      this.titleSubmenu = menu.label
      this.desiredContent = desiredMenu;
      ref.classList.remove("opened-notif-sub");

      if (this.submenuList === menu.children) {
        if (abirPeloSecondMenu == false) {
          ref.classList.toggle("opened-sub");
          this.submenuList = [];
          return;
        }
        else { this.closeMenu = false; }
      }
      else if (!ref.classList.contains("opened-sub")) { ref.classList.toggle("opened-sub"); }

      this.submenuList = menu.children;
    }

    if (menu.children && menu.children.length <= 0) {
      this.submenuList = [];
      ref.classList.toggle("selectedItem");
      this.onClickedOutside(new Event(""), ref);
      this.submenuList = menu.children;
    }
  }

  public onClickedOutside(e: Event, ref: HTMLDivElement): void {
    ref.classList.remove("opened-sub");
    this.submenuList = [];
  }

  // #region MENU FOOTER USER IMAGE
  private validateCachedImg(footerImg: Usuario_IMG | null): boolean {
    let usuarioId: string = this._authStorageService.infraUsuarioId;

    if (!footerImg || footerImg == null) { return true; }
    if (usuarioId != footerImg.USUARIOID) { return true; }
    
    this.footerUserImgSrc = footerImg.FILE;
    return false;
  }

  private checkForCachedImage(): void {
    const isAPIRequestNeeded = this.validateCachedImg(this._menuServices.getMenuFooterImg());
    if (isAPIRequestNeeded) { this.getMenuUserImg(); }
  }
  // #endregion MENU FOOTER USER IMAGE


  public logout(): void { 
    this._authService.logout();
  }

  // #endregion ==========> UTILITIES <==========


  // #region ==========> MODALS <==========

  /** Função simples com o objetivo de abrir os modais no centro da tela.
   * @param template Template HTML do modal que será aberto.
   * @param modalID ID do modal que será aberto, para que possa ser referenciado depois.
  */
  openModal(template: TemplateRef<any>, modalID: number) {
    this._bsModalService.show(template, {
      class: 'modal-dialog-centered modal-lg',
      ignoreBackdropClick: false,
      keyboard: false,
      id: modalID
    });
  }

  /** Função simples com o objetivo de fechar os modais que estiverem abertos (baseados pelo ID).
   * @param modalID ID do modal que será fechado.
   */
  closeModal(modalID: number) {
    this._bsModalService.hide(modalID);
  }

  // #endregion ==========> MODALS <==========

}
