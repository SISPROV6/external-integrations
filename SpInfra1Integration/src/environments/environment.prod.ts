let hostName: any = window.location.hostname.includes("localhost")
  ? `http://${ window.location.hostname }`
  : `https://${ window.location.hostname }`;
  
export const environment = {
	production: true,

	Sp2LocalhostWS: 'http://localhost:44384/api',

	SpInfra2ConfigWS: `${ hostName }/SisproErpCloud/Service_Private/Infra/SpInfra2ConfigWS/api`,
	SpInfra2WS: `${ hostName }/SisproErpCloud/Service_Private/Infra/SpInfra2WS/api`,
	SpInfra2AplicWS: `${ hostName }/SisproErpCloud/Service_Private/Infra/SpInfra2AplicWS/api`,
	SpInfra2GenericsWS: `${ hostName }/SisproErpCloud/Service_Private/Infra/SpInfra2GenericsWS/api`,
	SpInfra2CepWS: `${ hostName }/SisproErpCloud/Service_Private/Infra/SpInfra2CepWS/api`,
	SpInfra2ComboboxWS: `${ hostName }/SisproErpCloud/Service_Private/Infra/SpInfra2ComboboxWS/api`,
	SpInfra2MenuWS:`${ hostName }/SisproErpCloud/Service_Private/Infra/SpInfra2MenuWS/api`,
	SpInfra2FuncionalidadeWS:`${ hostName }/SisproErpCloud/Service_Private/Infra/SpInfra2FuncionalidadeWS/api`,
	SpInfra2ProxyWS:`${ hostName }/SisproErpCloud/Service_Private/Infra/SpInfra2ProxyWS/api`,

	SpCrp2ComboboxWS: `${ hostName }/SisproErpCloud/Service_Private/Corporativo/SpCrp2ComboboxWS/api`,
  
	SpEst2InfraGrupoWS: `${ hostName }/SisproErpCloud/Service_Private/Estagio/SpEst2InfraGrupoWS/api`,
	
	// URLs que necessitam de autenticação da infra.
	needsAuthInfra: new Map<string, string[]>( Object.entries( {
		[hostName + "/SisproErpCloud/Service_Private/Infra/SpInfra2WS/api/*"]: [ "*" ]
	} ) ),

	// URLs que necessitam de autenticação do usuário para funcionar.
	needsAuthAplic: new Map<string, string[]>( Object.entries( {
		"http://localhost:44384/api/*": [ "*" ],
		[hostName + "/SisproErpCloud/Service_Private/Infra/SpInfra2AplicWS/api/*"]: [ "*" ],
		[hostName + "/SisproErpCloud/Service_Private/Infra/SpInfra2GenericsWS/api/*"]: [ "*" ],
		[hostName + "/SisproErpCloud/Service_Private/Infra/SpInfra2CepWS/api/*"]: [ "*" ],
		[hostName + "/SisproErpCloud/Service_Private/Infra/SpInfra2ComboboxWS/api/*"]: [ "*" ],
		[hostName + "/SisproErpCloud/Service_Private/Infra/SpInfra2MenuWS/api/*"]: ["*"],
		[hostName + "/SisproErpCloud/Service_Private/Infra/SpInfra2FuncionalidadeWS/api/*"]: ["*"],
		[hostName + "/SisproErpCloud/Service_Private/Infra/SpInfra2ProxyWS/api/*"]: ["*"],
		[hostName + "/SisproErpCloud/Service_Private/Corporativo/SpCrp2ComboboxWS/api/*"]: [ "*" ],
		[hostName + "/SisproErpCloud/Service_Private/Estagio/SpEst2InfraGrupoWS/api/*"]: [ "*" ]
	} ) )

};
