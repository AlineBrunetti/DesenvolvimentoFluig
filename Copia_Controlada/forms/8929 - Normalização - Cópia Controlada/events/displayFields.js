function displayFields(form,customHTML) {
	var numProces = getValue("WKNumProces");
	var numState = getValue('WKNumState');
	var nextState = getValue('WKNextState');
	var completTask = (getValue('WKCompletTask')=='true');
	var userCode = fluigAPI.getUserService().getCurrent().getCode().trim(); 
	var userLogin = fluigAPI.getUserService().getCurrent().getLogin().trim();
	var userEmail = fluigAPI.getUserService().getCurrent().getEmail().trim();
	var userName = fluigAPI.getUserService().getCurrent().getFullName().trim(); 
	var isMobile = (getValue('WKMobile')=='true');
	var formMode = form.getFormMode();

	//desabilita botão imprimir padrão
	form.setHidePrintLink(true);
	//define funções para o front-end
	setGlobalFunctions(form,customHTML);


	//dados
	if (form.getValue('txtDataSolicitacao') == '' || form.getValue('txtDataSolicitacao') == null) { 
		form.setValue('txtDataSolicitacao', obterDataAtual()); 
	}

	if (form.getValue('hddCodSolic') == '' || form.getValue('hddCodSolic') == null) { 
		form.setValue('hddCodSolic', userCode); 
	}
	
	if (form.getValue('txtSolicitante') == '' || form.getValue('txtSolicitante') == null) {
		form.setValue('txtSolicitante', userName); 
	}

	if (form.getValue('txtEmail') == '' || form.getValue('txtEmail') == null) {
		form.setValue('txtEmail', userEmail); 
	}

	if(numState == 0 || numState == 14) {
		panelShow(form, customHTML, "informativo"        , false);
		enableField(form, customHTML, 'divInfoGerais'  , true);
		enableField(form, customHTML, 'divInfoSetor'  , true);
		var campos = [
			'nomeDoc',
			'qtdCopia',
			'setor',
			'urgencia'
		];
    	removeReadonly(customHTML,campos);
  	}
	if(numState == 5) {
		panelShow(form, customHTML, "informativo"        , true);
		enableField(form, customHTML, 'gestor'            , false);
		enableField(form, customHTML, 'slcTipoDocumento'            , false);
  	}
}	