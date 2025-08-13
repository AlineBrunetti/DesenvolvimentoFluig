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
	customHTML.append("<script>criaDatatables();</script>");
	enableContainer(form, customHTML, 'fieldHistorico'		, true);
	panelShow(form,customHTML, 'fieldHistorico'			, true);

	//dados
	if (form.getValue('hddNumProcess') == '' || form.getValue('hddNumProcess') == null) { 
		form.setValue('hddNumProcess', numProces); 
	}
	
	if (form.getValue('hddCodSolic') == '' || form.getValue('hddCodSolic') == null) { 
		form.setValue('hddCodSolic', userLogin); 
	}
	if (form.getValue('hddMailSol') == '' || form.getValue('hddMailSol') == null) { 
		form.setValue('hddMailSol', userEmail); 
	}
	
	if (form.getValue('txtMatSolic') == '' || form.getValue('txtMatSolic') == null) { 
		form.setValue('txtMatSolic', userCode); 
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

	if (form.getValue('txtLidImed') == '' || form.getValue('txtLidImed') == null) {
		form.setValue('txtLidImed', userName); 
	}
	
	if (numState == 5 || numState == 74) { 
		if(form.getValue("slcAceite") == "SolicitarNegociacao"){
			form.setValue('txtResponsavelRemu2',userName);
			form.setValue('txtDataAproRemu2', obterDataAtual());
		}else if(form.getValue("slcAceite") != "SolicitarNegociacao"){
			form.setValue('txtResponsavelRemu', userName);
			form.setValue('txtDataAproRemu', obterDataAtual());
		}
		if(form.getValue("slcSubst") == "Sim"){
			form.setValue('txtFunc1', form.getValue("txtFunc"));
			form.setValue('slcMotVag', "Substituição");
		}
	}

	if (numState == 18 ) { 
		form.setValue('txtResponsavelDirAre', userName);
		form.setValue('codResponsavelDirAre', userCode);
		form.setValue('txtDataAproDirAre', obterDataAtual()); 
	}
	
	if (numState == 24 ) { 
		form.setValue('txtResponsavelGesRH', userName); 
		form.setValue('txtDataAproGesRH', obterDataAtual()); 
	}
	
	if (numState == 30 ) { 
		form.setValue('txtResponsavelCEO', userName); 
		form.setValue('txtDataAproCEO', obterDataAtual()); 
	}

	if (numState == 41 ) { 
		form.setValue('txtResponsavelMed', userName); 
		form.setValue('txtDataAproMed', obterDataAtual()); 
	}

	if (numState == 47 ) { 
		form.setValue('txtResponsavelADMP', userName); 
		form.setValue('txtDataAproADMP', obterDataAtual()); 
	}

	//FECHAR FIELDSETS
	if(form.getValue("slcAceite") != ""){
		collapseShow(form, customHTML, "divCollapseInfoSol", false);
		collapseShow(form, customHTML, "divCollapseAbeVag", false);
		collapseShow(form, customHTML, "divCollapseAtvDesPerfNec", false);
		collapseShow(form, customHTML, "divCollapseInfVag", false);
		collapseShow(form, customHTML, "divCollapseInfTec", false);
		collapseShow(form, customHTML, "divCollapseAprov", false);
	}

	//Campos de OBS e Justificativa

	panelShow(form, customHTML, "divAbeVagObs"   , !(form.getValue("txtObsMotVag") == "" ));
	panelShow(form, customHTML, "divObsRemu"   , !(form.getValue("txtObsRecHum") == "" ));
	panelShow(form, customHTML, "divJusGesRH"   , !(form.getValue("txtJusGesRH") == "" ));
	panelShow(form, customHTML, "divJusDirAre"   , !(form.getValue("txtJusDirAre") == "" ));
	panelShow(form, customHTML, "divJusCEO"   , !(form.getValue("txtJusCEO") == "" ));

	//Substituição
	if(form.getValue("slcSubst") == "Sim"){
		panelShow(form, customHTML, "divZoomFunc", true);
		customHTML.append("<script>");
        customHTML.append("$('#divSubst').removeClass('col-md-3').addClass('col-md-2');");
		customHTML.append("$('#divZoomCargo').removeClass('col-md-3').addClass('col-md-2');");
        customHTML.append("</script>");
	}else{panelShow(form, customHTML, "divZoomFunc", false);}
	//TI
	if(form.getValue("slcEquipTI") == "false"){
		panelShow(form, customHTML, "fieldEquip", false);
		panelShow(form, customHTML, "fieldAcess", false);
		panelShow(form, customHTML, "fieldRecursos", false);
		panelShow(form, customHTML, "divInfoBI", false);
		panelShow(form, customHTML, "divInfoFluig", false);
	}else if(form.getValue("slcEquipTI") == "true" && form.getValue("BI") == "BI" && form.getValue("fluig") == "fluig"){
		panelShow(form, customHTML, "fieldEquip", true);
		panelShow(form, customHTML, "fieldAcess", true);
		panelShow(form, customHTML, "fieldRecursos", true);
		panelShow(form, customHTML, "divInfoBI", true);
		panelShow(form, customHTML, "divInfoFluig", true);
	}else if(form.getValue("slcEquipTI") == "true" && form.getValue("BI") == "BI" && form.getValue("fluig") != "fluig"){
		panelShow(form, customHTML, "fieldEquip", true);
		panelShow(form, customHTML, "fieldAcess", true);
		panelShow(form, customHTML, "fieldRecursos", true);
		panelShow(form, customHTML, "divInfoBI", true);
		panelShow(form, customHTML, "divInfoFluig", false);
	}else if(form.getValue("slcEquipTI") == "true" && form.getValue("BI") != "BI" && form.getValue("fluig") == "fluig"){
		panelShow(form, customHTML, "fieldEquip", true);
		panelShow(form, customHTML, "fieldAcess", true);
		panelShow(form, customHTML, "fieldRecursos", true);
		panelShow(form, customHTML, "divInfoBI", false);
		panelShow(form, customHTML, "divInfoFluig", true);
	}else if(form.getValue("slcEquipTI") == "true" && form.getValue("BI") != "BI" && form.getValue("fluig") != "fluig"){
		panelShow(form, customHTML, "fieldEquip", true);
		panelShow(form, customHTML, "fieldAcess", true);
		panelShow(form, customHTML, "fieldRecursos", true);
		panelShow(form, customHTML, "divInfoBI", false);
		panelShow(form, customHTML, "divInfoFluig", false);
	}

	//APROVAÇÕES
	if(form.getValue("txtResponsavelDirAre") == ""  &&
	   form.getValue("txtResponsavelGesRH") == "" &&
	   form.getValue("txtResponsavelCEO") == ""){
		panelShow(form, customHTML, "divAprov", false);
	} else if(form.getValue("txtResponsavelDirAre") != ""  ||
	form.getValue("txtResponsavelGesRH") != "" ||
	form.getValue("txtResponsavelCEO") != "") {
		panelShow(form, customHTML, "divAprov", true);
		panelShow(form, customHTML, "fieldDirAre"   ,  false);
		panelShow(form, customHTML, "fieldGesRH"   , false);
		panelShow(form, customHTML, "fieldCEO"   , false);
	}

	panelShow(form, customHTML, "fieldDirAre"   , !(form.getValue("txtResponsavelDirAre") == "" ));
	panelShow(form, customHTML, "fieldGesRH"   , !(form.getValue("txtResponsavelGesRH") == "" ));
	panelShow(form, customHTML, "fieldCEO"   , !(form.getValue("txtResponsavelCEO") == "" ));

	//REMUNERAÇÃO
	if(form.getValue("txtResponsavelRemu") == ""){
		panelShow(form, customHTML, "divRemu", false);
	} else{
		panelShow(form, customHTML, "divRemu", true);
	}
	if(form.getValue("txtResponsavelRemu2") == ""){
		panelShow(form, customHTML, "divRemu2", false);
	} else{
		panelShow(form, customHTML, "divRemu2", true);
	}

	if(form.getValue("proposta") == "" || form.getValue("proposta") == "false"){
		panelShow(form, customHTML, "divSalario", false);
		panelShow(form, customHTML, "divBenExtrRemu", false);
	} else{
		panelShow(form, customHTML, "divSalario", true);
		panelShow(form, customHTML, "divBenExtrRemu", true);
	}

	if(form.getValue("slcMotVag") == "Substituição"){
		panelShow(form, customHTML, "divfunci", true);
		customHTML.append("<script>");
        customHTML.append("$('#divSalario1').removeClass('col-md-3').addClass('col-md-2');");
        customHTML.append("$('#divRespoRemu').removeClass('col-md-3').addClass('col-md-2');");
        customHTML.append("$('#divDtRespoRemu').removeClass('col-md-3').addClass('col-md-2');");
        customHTML.append("</script>");
	}else{panelShow(form, customHTML, "divfunci", false);}

	//RECRUTAMENTO
	if(form.getValue("txtSalario") != "" || form.getValue("txtBenExtRemu") != ""){
		customHTML.append("<script>");
		customHTML.append("$(\"option[value='NegociacaoAceita']\").removeAttr('hidden');");
		customHTML.append("</script>");
	}
	if(form.getValue("slcAceite") == ""){
		panelShow(form, customHTML, "divRecru", false);
		panelShow(form, customHTML, "divNegociacao", false);
		panelShow(form, customHTML, "divCollapseNeg", false);
		panelShow(form, customHTML, "divSalarioRecru", false);
		panelShow(form, customHTML, "divBenExtr", false);
		panelShow(form, customHTML, "divDTAdmissao", false);
	} else if(form.getValue("slcAceite") != "" && (form.getValue("slcCanApt") == "Não" || form.getValue("slcCanApt") == "")){
		panelShow(form, customHTML, "divRecru", true);
		panelShow(form, customHTML, "divNegociacao", true);
		panelShow(form, customHTML, "divCollapseNeg", true);
		panelShow(form, customHTML, "divSalarioRecru", true);
		panelShow(form, customHTML, "divBenExtr", true);
		panelShow(form, customHTML, "divDTAdmissao", false);
	} else if(form.getValue("slcAceite") != "" && form.getValue("slcCanApt") == "Sim"){
		collapseShow(form, customHTML, "divCollapseRemu", false);
		panelShow(form, customHTML, "divRecru", true);
		panelShow(form, customHTML, "divNegociacao", false);
		panelShow(form, customHTML, "divCollapseNeg", false);
		panelShow(form, customHTML, "divSalarioRecru", false);
		panelShow(form, customHTML, "divBenExtr", false);
		panelShow(form, customHTML, "divDTAdmissao", true);
		customHTML.append("<script>");
        customHTML.append("$('#divRecrut').removeClass('col-md-3').addClass('col-md-2');");
		customHTML.append("$('#divAceite').removeClass('col-md-3').addClass('col-md-2');");
        customHTML.append("</script>");
	}

	if(form.getValue("slcRec") == "Interno"){
		panelShow(form, customHTML, "divDadosCandi", false);
		panelShow(form, customHTML, "DivExterno", false);
		panelShow(form, customHTML, "divChecklistAdmissao", false);
		panelShow(form, customHTML, "divInfoUniforme", false);
		panelShow(form, customHTML, "matriculaCandidato", true);
		customHTML.append("<script>");
        customHTML.append("  $('#nomeCandidato').removeClass('col-md-6').addClass('col-md-4');");
        customHTML.append("</script>");
	}else if(form.getValue("slcRec") == "Externo"){
		panelShow(form, customHTML, "divDadosCandi", true);
		panelShow(form, customHTML, "DivExterno", true);
		panelShow(form, customHTML, "divChecklistAdmissao", true);
		panelShow(form, customHTML, "divInfoUniforme", true);
		panelShow(form, customHTML, "matriculaCandidato", false);
	}else{
		panelShow(form, customHTML, "DivExterno", false);
		panelShow(form, customHTML, "divChecklistAdmissao", false);
		panelShow(form, customHTML, "divInfoUniforme", false);
		panelShow(form, customHTML, "matriculaCandidato", false);}
	
	panelShow(form, customHTML, "divFilhos", false);
	panelShow(form, customHTML, "divCasado", false);

	if(form.getValue("dependentes") == "true"){
		panelShow(form, customHTML, "divFilhos", true);
	}
	if(form.getValue("casado") == "true"){
		panelShow(form, customHTML, "divCasado", true);
	}
	//MEDICINA DO TRABALHO
	panelShow(form, customHTML, "divMed"   , false);
	panelShow(form, customHTML, "divMed"   , !(form.getValue("txtResponsavelMed") == "" ));

	//ADM PESSOAL
	panelShow(form, customHTML, "divADMP"   , false);
	panelShow(form, customHTML, "divADMP"   , !(form.getValue("txtResponsavelADMP") == "" ));

	//Historico
	panelShow(form, customHTML, "fieldHistorico"   , !(form.getValue("txtCandidato") == ""));

	//trata comportamento do formulário conforme atividade	-------------------------------------------------------------
	//Info Solicitante
	panelShow(form, customHTML, "divInfoSol", true);
	//Abertura de Vaga
	panelShow(form, customHTML, "divAbeVag", true);
	enableField(form, customHTML, 'slcEst', false);
	enableField(form, customHTML, 'slcSubst', false);
	//Atividades e Desafios do Futuro Colaborador e Perfil Necessário
	panelShow(form, customHTML, "divAtvDesPerfNec", true);
	//Mais Informações Sobre a Vaga
	panelShow(form, customHTML, "divInfVag", true);
	enableField(form, customHTML, 'slcRegCont', false);
	enableField(form, customHTML, 'slcIng', false);
	enableField(form, customHTML, 'slcEsp', false);
	//TI
	panelShow(form, customHTML, "divInfTecFunc", false);
	panelShow(form, customHTML, "divInfTec", true);
	enableField(form, customHTML,'slcEquipTI_s', false);
	enableField(form, customHTML,'slcEquipTI_n', false);
	enableField(form, customHTML, 'chip', false);
	enableField(form, customHTML, 'celular', false);
	enableField(form, customHTML, 'notebook', false);
	enableField(form, customHTML, 'desktop', false);
	enableField(form, customHTML, 'rede', false);
	enableField(form, customHTML, 'email', false);
	enableField(form, customHTML, 'wifi', false);
	enableField(form, customHTML, 'BI', false);
	enableField(form, customHTML, 'fluig', false);
	//Remuneração
	enableField(form, customHTML, 'slcMotVag', false);
	enableField(form, customHTML, 'proposta_s', false);
	enableField(form, customHTML, 'proposta_n', false);
	//Aprovações
	enableField(form, customHTML, 'slcAproDirAre', false);
	enableField(form, customHTML, 'slcAproGesRH', false);
	enableField(form, customHTML, 'slcAproCEO', false);
	//Recrutamento
	enableField(form, customHTML, 'casado_s', false);
	enableField(form, customHTML, 'casado_n', false);
	enableField(form, customHTML, 'dependentes_s', false);
	enableField(form, customHTML, 'dependentes_n', false);
	enableField(form, customHTML, 'slcRec', false);
	enableField(form, customHTML, 'slcAceite', false);
	enableField(form, customHTML, 'slcSexo', false);
	enableField(form, customHTML, 'rgCpf', false);
	enableField(form, customHTML, 'tituloEleitor', false);
	enableField(form, customHTML, 'certReservista', false);
	enableField(form, customHTML, 'agenciaContaItau', false);
	enableField(form, customHTML, 'comprovEscolaridade', false);
	enableField(form, customHTML, 'comprovResidencia', false);
	enableField(form, customHTML, 'cnhEmpilhadeira', false);
	enableField(form, customHTML, 'certCursosGerais', false);
	enableField(form, customHTML, 'carteiraProfissional', false);
	enableField(form, customHTML, 'foto3x4', false);
	enableField(form, customHTML, 'vacTetanoHepatiteFebre', false);
	enableField(form, customHTML, 'vacCovid', false);
	enableField(form, customHTML, 'registroFilhos', false);
	enableField(form, customHTML, 'cpfFilhos', false);
	enableField(form, customHTML, 'cadernetaVacFilhos', false);
	enableField(form, customHTML, 'certFreqEscolar', false);
	enableField(form, customHTML, 'registroCasamento', false);
	enableField(form, customHTML, 'rgCpfConjuge', false);
	enableField(form, customHTML, 'camisaTamanho', false);
	//Medicina do Trabalho
	enableField(form, customHTML, 'slcCanApt', false);

	if(numState == 0 || numState == 4) {
		panelShow(form, customHTML, "fieldHistorico"   ,false);
		panelShow(form, customHTML, "divAbeVagObs"   ,true);

		//habilita os slc e checkbox
		enableField(form, customHTML,'slcEquipTI_s', true);
		enableField(form, customHTML,'slcEquipTI_n', true);
		enableField(form, customHTML, 'slcSubst', true);
		enableField(form, customHTML, 'slcEst', true);
		enableField(form, customHTML, 'slcRegCont', true);
		enableField(form, customHTML, 'slcIng', true);
		enableField(form, customHTML, 'slcEsp', true);
		enableField(form, customHTML, 'chip', true);
		enableField(form, customHTML, 'celular', true);
		enableField(form, customHTML, 'notebook', true);
		enableField(form, customHTML, 'desktop', true);
		enableField(form, customHTML, 'rede', true);
		enableField(form, customHTML, 'email', true);
		enableField(form, customHTML, 'wifi', true);
		enableField(form, customHTML, 'BI', true);
		enableField(form, customHTML, 'fluig', true);
		enableField(form, customHTML, 'slcMotVag', true);

		customHTML.append("<script>");

		// Readonly
		customHTML.append("var campos = ['txtTurno', 'txtSetor', 'txtHorario', 'txtObsMotVag', 'txtAtvResp', 'txtNecFormAca', 'txtPontFort', 'txtPontCrit', 'txtInadComp', 'txtPegTec', 'txtInfBI', 'txtInfFluig'];");
		customHTML.append("campos.forEach(function(id) {");
		customHTML.append("  $('#' + id).prop('readonly', false);");
		customHTML.append("});");

		// Disabled
		customHTML.append("var botoes = ['btnZoomDirAreImed', 'btnZoomCargo', 'btnZoomCentCus', 'btnZoomFunc'];");
		customHTML.append("botoes.forEach(function(id) {");
		customHTML.append("  $('#' + id).prop('disabled', false);");
		customHTML.append("});");
		customHTML.append("</script>");

	}
	if(numState == 5 || numState == 74){
		panelShow(form, customHTML, "divRemu", true);
		panelShow(form, customHTML, "divObsRemu"   , true);

		if(form.getValue("slcAceite") != ""){
			if(form.getValue("proposta") == "true"){
				collapseShow(form, customHTML, "divCollapseAprov", true);
				panelShow(form, customHTML, "fieldDirAre", false);
				panelShow(form, customHTML, "fieldCEO", false);
			}
			panelShow(form, customHTML, "divRemu2", true);
			enableField(form, customHTML, 'slcMotVag', false);
			enableField(form, customHTML, 'proposta_s', true);
			enableField(form, customHTML, 'proposta_n', true);
			customHTML.append("<script>");

			// Readonly
			customHTML.append("var campos = ['txtSalario', 'txtBenExtRemu'];");
			customHTML.append("campos.forEach(function(id) {");
			customHTML.append("  $('#' + id).prop('readonly', false);");
			customHTML.append("});");

			customHTML.append("</script>");
		}else{
			enableField(form, customHTML, 'slcMotVag', true);

			customHTML.append("<script>");
			// Disabled
			customHTML.append("var botoes = ['btnZoomCargo', 'btnZoomCentCus', 'btnZoomFunc'];");
			customHTML.append("botoes.forEach(function(id) {");
			customHTML.append("  $('#' + id).prop('disabled', false);");
			customHTML.append("});");

			// Readonly
			customHTML.append("var campos = ['txtSalario1', 'txtObsRecHum', 'txtSetor', 'txtFunc1'];");
			customHTML.append("campos.forEach(function(id) {");
			customHTML.append("  $('#' + id).prop('readonly', false);");
			customHTML.append("});");
			customHTML.append("</script>");
		}
	}
	if(numState == 18){
		panelShow(form, customHTML, "divAprov", true);
		panelShow(form, customHTML, "fieldDirAre"   , true);
		panelShow(form, customHTML, "divJusDirAre"   , true);
		enableField(form, customHTML, 'slcAproDirAre', true);
	}
	if(numState == 24 || numState == 75){
		panelShow(form, customHTML, "divAprov", true);
		panelShow(form, customHTML, "fieldGesRH"   , true);
		panelShow(form, customHTML, "divJusGesRH"   , true);
		enableField(form, customHTML, 'slcAproGesRH', true);
		
		if(form.getValue("slcAceite") != ""){
			collapseShow(form, customHTML, "divCollapseAprov", true);
			panelShow(form, customHTML, "fieldDirAre", false);
			panelShow(form, customHTML, "fieldCEO", false);
		}

	}
	if(numState == 30){
		panelShow(form, customHTML, "divAprov", true);
		panelShow(form, customHTML, "fieldCEO"   , true);
		panelShow(form, customHTML, "divJusCEO"   , true);
		enableField(form, customHTML, 'slcAproCEO', true);
	}
	if(numState == 36 || numState == 97){
		if(form.getValue("slcCanApt") == "Sim"){
			panelShow(form, customHTML, "divNegociacao"			, false);
			panelShow(form, customHTML, "divRemu2"				, false);
			customHTML.append("<script>");

			// Readonly
			customHTML.append("var campos = ['txtDataAdmissao'];");
			customHTML.append("campos.forEach(function(id) {");
			customHTML.append("  $('#' + id).prop('readonly', false);");
			customHTML.append("});");

			customHTML.append("</script>");
		}else {
			panelShow(form, customHTML, "divRecru"						, true);
			collapseShow(form, customHTML, "divCollapseDados"			, true);
			enableField(form, customHTML, 'casado_s'	 				, true);
			enableField(form, customHTML, 'casado_n'	 				, true);
			enableField(form, customHTML, 'dependentes_s'				, true);
			enableField(form, customHTML, 'dependentes_n'				, true);
			enableField(form, customHTML, 'slcRec'						, true);
			enableField(form, customHTML, 'slcAceite'					, true);
			enableField(form, customHTML, 'slcSexo'						, true);
			enableField(form, customHTML, 'slcBenExtr'					, true);
			enableField(form, customHTML, 'rgCpf'						, true);
			enableField(form, customHTML, 'tituloEleitor'				, true);
			enableField(form, customHTML, 'certReservista'				, true);
			enableField(form, customHTML, 'agenciaContaItau'			, true);
			enableField(form, customHTML, 'comprovEscolaridade'			, true);
			enableField(form, customHTML, 'comprovResidencia'			, true);
			enableField(form, customHTML, 'cnhEmpilhadeira'				, true);
			enableField(form, customHTML, 'certCursosGerais'			, true);
			enableField(form, customHTML, 'carteiraProfissional'		, true);
			enableField(form, customHTML, 'foto3x4'						, true);
			enableField(form, customHTML, 'vacTetanoHepatiteFebre'		, true);
			enableField(form, customHTML, 'vacCovid'					, true);
			enableField(form, customHTML, 'registroFilhos'				, true);
			enableField(form, customHTML, 'cpfFilhos'					, true);
			enableField(form, customHTML, 'cadernetaVacFilhos'			, true);
			enableField(form, customHTML, 'certFreqEscolar'				, true);
			enableField(form, customHTML, 'registroCasamento'			, true);
			enableField(form, customHTML, 'rgCpfConjuge'				, true);
			enableField(form, customHTML, 'camisaTamanho'				, true);
			customHTML.append("<script>");

			// Readonly
			customHTML.append("var campos = ['txtCandidato', 'txtMatCandi', 'txtEmailCandi', 'txtCelCandi', 'calcado', 'calca', 'txtBenExt', 'txtSalarioRecru'];");
			customHTML.append("campos.forEach(function(id) {");
			customHTML.append("  $('#' + id).prop('readonly', false);");
			customHTML.append("});");

			customHTML.append("</script>");
		}
	}
	if(numState == 41){
		collapseShow(form, customHTML, "divCollapseAbeVag"	, true);
		panelShow(form, customHTML, "divInfoSol"			, true);
		panelShow(form, customHTML, "divAbeVag"				, true);
		panelShow(form, customHTML, "divSubst"				, false);
		panelShow(form, customHTML, "divZoomFunc"			, false);
		panelShow(form, customHTML, "divAtvDesPerfNec"		, false);
		panelShow(form, customHTML, "divInfVag"				, false);
		panelShow(form, customHTML, "divInfTecFunc"			, false);
		panelShow(form, customHTML, "divInfTec"				, false);
		panelShow(form, customHTML, "divRemu"				, false);
		panelShow(form, customHTML, "divAprov"				, false);
		panelShow(form, customHTML, "divRecru"				, true);
		panelShow(form, customHTML, "divNegociacao"			, false);
		panelShow(form, customHTML, "divAceite"				, false);
		panelShow(form, customHTML, "divMed"				, true);
		panelShow(form, customHTML, "divADMP"				, false);
		panelShow(form, customHTML, "fieldHistorico"   		, false);

		enableField(form, customHTML, 'slcCanApt'			, true);
	}
	if(numState == 47){

		collapseShow(form, customHTML, "divCollapseAbeVag"	, true);
		collapseShow(form, customHTML, "divCollapseDados"	, true);
		
		panelShow(form, customHTML, "divInfoSol"			, true);
		panelShow(form, customHTML, "divAbeVag"				, true);
		panelShow(form, customHTML, "divSubst"				, false);
		panelShow(form, customHTML, "divZoomFunc"			, false);
		panelShow(form, customHTML, "divAtvDesPerfNec"		, false);
		panelShow(form, customHTML, "divInfVag"				, false);
		panelShow(form, customHTML, "divInfTecFunc"			, false);
		panelShow(form, customHTML, "divInfTec"				, false);
		panelShow(form, customHTML, "divRemu"				, false);
		panelShow(form, customHTML, "divAprov"				, false);
		panelShow(form, customHTML, "divRecru"				, true);
		panelShow(form, customHTML, "divNegociacao"			, false);
		panelShow(form, customHTML, "divAceite"				, false);
		panelShow(form, customHTML, "divMed"				, true);
		panelShow(form, customHTML, "divADMP"				, true);
		panelShow(form, customHTML, "fieldHistorico"   		, false);

		if(form.getValue("slcAceite") == "NegociacaoAceita"){
			form.setValue("txtSalFinal", form.getValue("txtSalario"))
		}
		if(form.getValue("slcAceite") == "Aceita"){
			form.setValue("txtSalFinal", form.getValue("txtSalario1"))
		}
		customHTML.append("<script>");
		// Readonly
		customHTML.append("var campos = ['txtMatricula'];");
		customHTML.append("campos.forEach(function(id) {");
		customHTML.append("  $('#' + id).prop('readonly', false);");
		customHTML.append("});");
		//troca proposta por sal
		customHTML.append("$('#divAceite').hide();");
		customHTML.append("$('#divSalFinal').show();");
		customHTML.append("</script>");
	}
	if(numState == 121 || numState == 119 || numState == 117 || numState == 115 ){

		collapseShow(form, customHTML, "divCollapseInfTec"	, true);

		form.setValue('txtNomeRecrutado'		, form.getValue("txtCandidato"));
		if(form.getValue("slcRec") == "Interno"){
			form.setValue('txtMatriculaRecrutado'	, form.getValue("txtMatCandi"));
		}else{
			form.setValue('txtMatriculaRecrutado'	, form.getValue("txtMatricula"));
		}
		form.setValue('txtUnidadeRecrutado'		, form.getValue("slcEst"));
		form.setValue('txtCargoRecrutado'		, form.getValue("txtCargo"));
		form.setValue('txtSetorRecrutado'		, form.getValue("txtSetor"));
		form.setValue('txtAdmissaoRecrutado'	, form.getValue("txtDataAdmissao"));

		panelShow(form, customHTML, "divInfoSol"			, false);
		panelShow(form, customHTML, "divAbeVag"				, false);
		panelShow(form, customHTML, "divSubst"				, false);
		panelShow(form, customHTML, "divZoomFunc"			, false);
		panelShow(form, customHTML, "divAtvDesPerfNec"		, false);
		panelShow(form, customHTML, "divInfVag"				, false);
		panelShow(form, customHTML, "divInfTecFunc"			, true);
		panelShow(form, customHTML, "divInfTec"				, true);
		panelShow(form, customHTML, "divRemu"				, false);
		panelShow(form, customHTML, "divAprov"				, false);
		panelShow(form, customHTML, "divRecru"				, false);
		panelShow(form, customHTML, "divNegociacao"			, false);
		panelShow(form, customHTML, "divAceite"				, false);
		panelShow(form, customHTML, "divMed"				, false);
		panelShow(form, customHTML, "divADMP"				, false);
		panelShow(form, customHTML, "fieldHistorico"   		, false);
	}
	if (formMode == 'VIEW') {
		// Sempre inicialize os controles
		var isUser = false;
		var isAcesso = false;
		var isTI = false;
		var isAlmox = false;
	
		// Monta constraints normalmente
		var constraintColleagueGroup1 = DatasetFactory.createConstraint('colleagueGroupPK.colleagueId', userCode, userCode, ConstraintType.MUST);
		var colunasColleagueGroup = new Array('colleagueGroupPK.groupId');
		var datasetColleagueGroup = DatasetFactory.getDataset('colleagueGroup', colunasColleagueGroup, new Array(constraintColleagueGroup1), null);
	
		// Verifica se retornou algo
		if (datasetColleagueGroup != null && datasetColleagueGroup.rowsCount > 0) {
	
			for (var i = 0; i < datasetColleagueGroup.rowsCount; i++) {
				var groupId = datasetColleagueGroup.getValue(i, 'colleagueGroupPK.groupId');
	
				if (groupId != 'AG6' && groupId != 'AG7' && groupId != 'AG5' && groupId != 'AJ1' && groupId != 'AI1' && groupId != 'AI2') {
				   console.log("Modo VIEW USER")
				   isUser = true;
				   break;
				} else if (groupId == 'AG6' || groupId == 'AG7' || groupId == 'AG5' || groupId == 'AJ1' || groupId == 'AI1' || groupId == 'AI2') {
				   console.log("Modo VIEW ACESSO TOTAL")
				   isAcesso = true;
				   break;
				}
			}
	
		} else {
		   console.log("Modo VIEW USER");
			// Se não achou grupo algum, trate como sem permissão (usuário comum)
			isUser = true;
		}
	
		// Agora aplica as regras de visibilidade
		if (isUser) {
			panelShowAll(form, customHTML, false);
			customHTML.append("<div style='position: fixed; top:50%; left:50%; transform: translate(-50%, -50%); color:red; font-size:18px;'>Você não tem permissão para consultar este processo.</div>");
		}
		if (isAcesso) {
		}	
	}
}	