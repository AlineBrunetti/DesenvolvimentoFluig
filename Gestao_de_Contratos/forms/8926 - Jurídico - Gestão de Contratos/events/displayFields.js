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
	var isTI     = true;

	//desabilita botão imprimir padrão
	form.setHidePrintLink(true);
	
	//define funções para o front-end
	setGlobalFunctions(form,customHTML);
	
	//desabilita todos os campos do formulário
	enableContainer(form, customHTML, 'fieldsetTabGatilhos'	, true);
	enableContainer(form, customHTML, 'fieldsetTabIPCA'		, true);
	enableContainer(form, customHTML, 'fieldHistorico'		, true);
	enableContainer(form, customHTML, 'fieldsetTabHISTC'	, true);
	
	//dados
	if (form.getValue('hddNumProcess') == '' || form.getValue('hddNumProcess') == null) { 
		form.setValue('hddNumProcess', numProces); 
	}
	
	if (form.getValue('hddCodSolic') == '' || form.getValue('hddCodSolic') == null) { 
		form.setValue('hddCodSolic', userLogin); 
	}
	
	if (form.getValue('txtMatSolic') == '' || form.getValue('txtMatSolic') == null) { 
		form.setValue('txtMatSolic', userCode); 
	}
	
	if (form.getValue('txtEmailSol') == '' || form.getValue('txtEmailSol') == null) { 
		form.setValue('txtEmailSol', userEmail); 
	}
	
	if (form.getValue('txtDataSolicitacao') == '' || form.getValue('txtDataSolicitacao') == null) { 
		form.setValue('txtDataSolicitacao', obterDataAtual()); 
	}
	
	if (form.getValue('txtHoraSolicitacao') == '' || form.getValue('txtHoraSolicitacao') == null) { 
		form.setValue('txtHoraSolicitacao', obterHoraAtual()); 
	}
	
	if (form.getValue('txtSolicitante') == '' || form.getValue('txtSolicitante') == null) {
		form.setValue('txtSolicitante', userName); 
	}
	
	//Atribui valores automáticos
	//Aprovação do Gestor do Solicitante
	if(numState == 10 || numState == 38){
		form.setValue('txtResponsavelGesReq', userName); 
		form.setValue('txtDataGesReq', obterDataAtual());
	}
	//Análise Jurídica
	if(numState == 12){
		form.setValue('txtResponsavelJuridico', userName); 
		form.setValue('txtDataResp', obterDataAtual());
	}
	//Aprovação de Planejamento Financeiro
	if(numState == 19){
		form.setValue('txtResponsavelPlanFin', userName); 
		form.setValue('txtDataPlanFin', obterDataAtual());
	}
	//Validação de Minuta Interna / Externa
	if(numState == 64){
		form.setValue('txtResponsavelFor', userName); 
		form.setValue('txtDataFor', obterDataAtual());
	}
	//Aprovação de Suprimentos
	if(numState == 42){
		form.setValue('txtResponsavelGesSup', userName); 
		form.setValue('txtDataGesSup', obterDataAtual());
	}
	//Aprovação de Supply Chain
	if(numState == 46){
		form.setValue('txtResponsavelGerSup', userName); 
		form.setValue('txtDataGerSup', obterDataAtual());
	}

	if(form.getValue("slcDocumento") == "Contrato"){
		document.getElementById("divSlcMinutIntExt").style.display = "";
		document.getElementById("divSlcEspecieDocumento").style.display = "";
		// Exemplo de uso:
		var campos = ["divGestorAprovacao", "divEmailGestorAprovacao"];
		atualizarClasse(campos, "col-md-4", "col-md-3");

	}

	//Dados do Solicitante
	panelShow(form,customHTML, 'fieldDadosSolicitacao', true);
	//Dados Gerais
	panelShow(form,customHTML, 'fieldDadosGerais'	, true);
	//Objeto
	panelShow(form,customHTML, 'fieldObj', true);
	//Ciencia da Diretoria
	panelShow(form,customHTML, 'fieldDadosDiretoria', true);
	//Dados da Contratada
	panelShow(form,customHTML, 'fieldDadosDiretoria', true);
	//Endereço
	panelShow(form,customHTML, 'fieldEndereco', true);
	//Vigencia 2
	panelShow(form,customHTML, 'fieldComparacao', true);
	//Vigencia
	panelShow(form,customHTML, 'fieldVigencia'	, true);
	//Compromisso
	panelShow(form,customHTML, 'fieldDadosCompro'	, true);
	//IPCA
	panelShow(form,customHTML, 'fieldDadosIPCA'	, true);
	//Pagamento
	panelShow(form,customHTML, 'fieldPagamento'	, true);
	//Aprovações
	panelShow(form,customHTML, 'fieldAprovacoes'	, true);
	panelShow(form,customHTML, 'fieldAproGesReq2'	, true);
	panelShow(form,customHTML, 'fieldAproPlanFin'	, true);
	panelShow(form,customHTML, 'fieldAproFor'		, true);
	panelShow(form,customHTML, 'fieldAproGesReq'	, true);
	panelShow(form,customHTML, 'fieldAproGesSup'	, true);
	panelShow(form,customHTML, 'fieldAproGerSup'	, true);
	//Historico
	panelShow(form,customHTML, 'fieldHistorico'			, true);


	//trata comportamento do formulário conforme atividade		
	if (formMode == 'VIEW') {
		
	}else{

		//Dados do Solicitante
		panelShow(form,customHTML, 'fieldDadosSolicitacao', true);
		//Dados Gerais
		panelShow(form,customHTML, 'fieldDadosGerais'	, true);
		enableField(form, customHTML, 'slcDocumento'	, false);
		enableField(form, customHTML, 'slcMinutInt'		, false);
		enableField(form, customHTML, 'slcMinutExt'		, false);
		//Objeto
		panelShow(form,customHTML, 'fieldObj', true);
		//Ciencia da Diretoria
		panelShow(form,customHTML, 'fieldDadosDiretoria', true);
		enableField(form, customHTML, 'diretoriaCiente'	, false);
		//Dados da Contratada
		panelShow(form,customHTML, 'fieldDadosDiretoria', true);
		enableField(form, customHTML, 'slcReco'			, false);
		//Endereço
		panelShow(form,customHTML, 'fieldEndereco', true);
		//Vigencia 2
		panelShow(form,customHTML, 'fieldComparacao', true);
		//Vigencia
		panelShow(form,customHTML, 'fieldVigencia'	, true);
		//Compromisso
		panelShow(form,customHTML, 'fieldDadosCompro'	, true);
		enableField(form, customHTML, 'slcPrePosFix'	, false);
		//IPCA
		panelShow(form,customHTML, 'fieldDadosIPCA'	, true);
		enableField(form, customHTML, 'slcIPCA'		, false);
		//Pagamento
		panelShow(form,customHTML, 'fieldPagamento'	, true);
		enableField(form, customHTML, 'slcFormaPag'	, false);
		enableField(form, customHTML, 'slcMeioPag'	, false);
		enableField(form, customHTML, 'slcPagIni'	, false);
		enableField(form, customHTML, 'slcSerIni'	, false);
		enableField(form, customHTML, 'slcForHomol'	, false);
		enableField(form, customHTML, 'slcCapOpe'	, false);
		//Aprovações
		panelShow(form,customHTML, 'fieldAprovacoes'	, true);
		panelShow(form,customHTML, 'fieldAproGesReq2'	, true);
		enableField(form, customHTML, 'slcAproGesReq1'	, false);
		enableField(form, customHTML, 'slcAproGesReq2'	, false);
		enableField(form, customHTML, 'slcAproOrc'		, false);
		panelShow(form,customHTML, 'fieldAproPlanFin'	, true);
		enableField(form, customHTML, 'slcAproPlanFin'	, false);
		panelShow(form,customHTML, 'fieldAproFor'		, true);
		enableField(form, customHTML, 'slcAproFor'		, false);
		panelShow(form,customHTML, 'fieldAproGesReq'	, true);
		enableField(form, customHTML, 'slcAproGesReq'	, false);
		panelShow(form,customHTML, 'fieldAproGesSup'	, true);
		enableField(form, customHTML, 'slcAproGesSup'	, false);
		panelShow(form,customHTML, 'fieldAproGerSup'	, true);
		enableField(form, customHTML, 'slcAproGerSup'	, false);
		//Historico
		panelShow(form,customHTML, 'fieldHistorico'			, true);
		enableField(form, customHTML, 'slcProsseguirPara'	, false);

		//Inicio
		if(numState == 0 || numState == 7){
			panelShow(form,customHTML, 'fieldHistorico'		, false);
			enableField(form, customHTML, 'slcDocumento'	, true);
			enableField(form, customHTML, 'slcMinutInt'		, true);
			enableField(form, customHTML, 'slcMinutExt'		, true);
			enableField(form, customHTML, 'diretoriaCiente'	, true);
			enableField(form, customHTML, 'slcReco'			, true);
			enableField(form, customHTML, 'slcPrePosFix'	, true);
			enableField(form, customHTML, 'slcIPCA'			, true);
			enableField(form, customHTML, 'slcFormaPag'		, true);
			enableField(form, customHTML, 'slcMeioPag'		, true);
			enableField(form, customHTML, 'slcPagIni'		, true);
			enableField(form, customHTML, 'slcSerIni'		, true);
			enableField(form, customHTML, 'slcForHomol'		, true);
			enableField(form, customHTML, 'slcCapOpe'		, true);

			// Readonly
			customHTML.append("var campos = ['txtIdentDoc', 'txtDescServProd', 'txtRazaoSocial', 'txtCpfCnpj', 'txtTel', 'txtEmailContato', 'txtCep', 'txtZoomPais', 'txtZoomUF', 'txtNumero', 'txtZoomMunicipio', 'txtBairro', 'txtLogradouro', 'txtInfFluig', 'txtDataIniC', 'txtDataFimC', 'txtOutroC', 'txtValorTTA', 'txtDataIni', 'txtDataFim', 'txtOutro', 'txtValorTotal', 'txtVencimento', 'txtParcelas', 'ChavePix_217', 'Agncia_216', 'ContaCorrente_215', 'txtDetalhes', 'txtNumeroTAP'];");
			customHTML.append("campos.forEach(function(id) {");
			customHTML.append("  $('#' + id).prop('readonly', false);");
			customHTML.append("});");

			// Disabled
			customHTML.append("var botoes = ['btnZoomGestorAprovacao', 'btnZoomFornecedorCon', 'btnZoomCentroCusto', 'btnZoomContaCont', 'btnZoomCondPag', 'btnZoomIBancaria'];");
			customHTML.append("botoes.forEach(function(id) {");
			customHTML.append("  $('#' + id).prop('disabled', false);");
			customHTML.append("});");

			customHTML.append("</script>");
		}
		//Aprovação do Gestor do Solicitante
		if(numState == 10){}
		//Análise Jurídica
		if(numState == 12){}
		//Aprovação de Planejamento Financeiro
		if(numState == 19){}
		//Aprovação do Gestor do Solicitante
		if(numState == 38){}
		//Validação de Minuta Interna / Externa
		if(numState == 64){}
		//Análise de questionamentos
		if(numState == 35){}
		//Aprovação de Suprimentos
		if(numState == 42){}
		//Aprovação de Supply Chain
		if(numState == 46){}
		//Envio para Assinatura Digital
		if(numState == 53){}
		//Anexo no GED
		if(numState == 55){}
	}
}