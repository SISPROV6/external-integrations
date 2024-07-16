import { AuthStorageService } from './../../../../../auth/storage/auth-storage.service';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
      selector: 'app-primary-dropdown',
      templateUrl: './primary-dropdown.component.html',
      styleUrls: ['./primary-dropdown.component.scss']
})
export class PrimaryDropdownComponent implements OnInit {

      selectDataState: boolean;

      @Input() buttonWasClicked: Observable<boolean>;

      primaryDropdown: Array<any> = [
            // { id: 1, icon: 'assets/icons/corporativo.svg', label: 'Corporativo', secondary_level: null },
            // { id: 2, icon: 'assets/icons/gestao-pessoas.svg', label: 'Gestão de Pessoas', secondary_level: [{ label: 'Folha de pagamento', URL: '#' }, { label: 'SeuRH', URL: '#' }] },
            { id: 3, icon: 'assets/icons/gestao-contratos.svg', label: 'Gestão de Contratos', secondary_level: null }
      ]

      constructor(private _authStorageService: AuthStorageService) { }

      ngOnInit(): void {
            this.buttonWasClicked.subscribe(() => { this.selectDataState = true });
      }

      openDropdown(id: number, desiredDropdown: TemplateRef<any>) {
            if (desiredDropdown == null) {
                  this.selectDataState = true;
            } else {
                  this.selectDataState = false;
            }
      }

      onClickedOutside(e: Event, ref: HTMLDivElement) {
            if (this.selectDataState = false) {
                  this.selectDataState = true;
            }
      }

      backToPrimary(data: boolean) {
            this.selectDataState = true;
      }

      redirectToPrePortal(): void {
            const hostName: any = `https://${ window.location.hostname }`;
            const urlPrePortal: string = `${ hostName }/SisproErpCloud/PrePortal/`;
            // const url = 'https://siscandesv10.sispro.com.br/SisproErpCloud/PrePortal/auth/login';
            const targetUrl = urlPrePortal + '?token=' + encodeURIComponent(this._authStorageService.authToken);

            // Redirect the user to the target URL
            window.open(targetUrl, '_blank');
      }


}
