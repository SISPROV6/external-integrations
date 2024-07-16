import { Component, OnInit } from "@angular/core";

import { AuthStorageService } from "src/app/auth/storage/auth-storage.service";
import configVersion from "../../../project/utils/version/version.config.json";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor(private _authStorage: AuthStorageService) { }

  ngOnInit(): void {
    this.nomeUsuario = this._authStorage.user;

    this.version = configVersion.preReleaseLabel ? `${configVersion.preReleaseLabel}${configVersion.version}` : `${configVersion.version}`;
  }

  public version: string;
  public nomeUsuario: string

  public cardsTela = [
    { NOME: "Integração PowerBI (biblioteca Angular)", ROTA: "/integration/power-bi-angular", DESCRICAO: "Integração com PowerBI via biblioteca do Angular chamada <span class='text-primary fw-bold'>powerbi-client-angular</span>.", EQUIPE: "PD&I" },
    { NOME: "Integração PowerBI (REST APIs)", ROTA: "/integration/power-bi-rest", DESCRICAO: "Integração com PowerBI via REST APIs pelo Microsoft Entra ID <span class='fst-italic'>(antigo Azure AD)</span>", EQUIPE: "PD&I" },
  ]

}

