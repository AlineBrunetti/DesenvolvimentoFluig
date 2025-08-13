function displayFields(form, customHTML) {
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

  if (form.getValue('hddMailSol') == '' || form.getValue('hddMailSol') == null) { 
		form.setValue('hddMailSol', userEmail); 
	}
	
	if (form.getValue('txtDataSolicitacao') == '' || form.getValue('txtDataSolicitacao') == null) { 
		form.setValue('txtDataSolicitacao', obterDataAtual()); 
	}

	if (form.getValue('txtSolicitante') == '' || form.getValue('txtSolicitante') == null) {
		form.setValue('txtSolicitante', userName); 
	}

  if (numState == 4 ) { 
		form.setValue('txtResponsavelGes', userName);
		form.setValue('txtDataAproGes', obterDataAtual()); 
    form.setValue('hddMailGest', userEmail);
	}

  if (numState == 15 ) { 
		form.setValue('txtResponsavelNorm', userName);
    form.setValue('txtMatricNorm', userCode);
    form.setValue('txtMailNorm', userEmail);
		form.setValue('txtDataAproNorm', obterDataAtual()); 
	}

  //Info Solicitante -----------------------------------------------------------------------------------
  panelShow(form, customHTML, "divInfoSol", true);

  //Painel de Informações do Documento -----------------------------------------------------------------
  panelShow(form, customHTML, "divInfoGerais"       , true);
  enableField(form, customHTML, 'slcTipoDocumento'  , false);
  enableField(form, customHTML, 'slcGrauPrioridade' , false);
  enableField(form, customHTML, 'gestor'            , false);
  panelShow(form, customHTML, "divObsGerais"        , !(form.getValue("observacao") == "" ));
  panelShow(form, customHTML, "divJustUrg"          , !(form.getValue("urgencia")   == "" ));

  //Aprovação do Gestor do Solicitante -----------------------------------------------------------------
  panelShow(form, customHTML, "divAprovacaoGrc"     , !(form.getValue("txtResponsavelGes") == "" ));
  enableField(form, customHTML, 'aprGestor_s'       , false);
  enableField(form, customHTML, 'aprGestor_n'       , false);
  panelShow(form, customHTML, "justTxt"             , !(form.getValue("txtJusGrc")  == "" ));

  //Aprovação da Normalização --------------------------------------------------------------------------
  panelShow(form, customHTML, "divAprovacaoNorm"    , !(form.getValue("txtResponsavelNorm") == "" ));
  enableField(form, customHTML, 'setorApr_s'        , false);
  enableField(form, customHTML, 'setorApr_n'        , false);
  panelShow(form, customHTML, "txtNor"              , !(form.getValue("txtJusDrt")  == "" ));

  //Habilita conforme atividade ------------------------------------------------------------------------
  if(numState == 0 || numState == 19) {
    panelShow(form, customHTML, "divObsGerais"        , true);
    enableField(form, customHTML, 'slcTipoDocumento'  , true);
    enableField(form, customHTML, 'slcGrauPrioridade' , true);
    enableField(form, customHTML, 'gestor'            , true);
    var campos = ['observacao', 'urgencia'];
    removeReadonly(customHTML,campos);
  }
  if(numState == 4) {
    panelShow(form, customHTML, "divAprovacaoGrc"     , true);
    enableField(form, customHTML, 'aprGestor_s'       , true);
    enableField(form, customHTML, 'aprGestor_n'       , true);
    var campos = ['txtJusGrc'];
    removeReadonly(customHTML,campos);
  }
  if(numState == 15) {
    panelShow(form, customHTML, "divAprovacaoNorm"     , true);
    panelShow(form, customHTML, "txtNor"             , true);
    enableField(form, customHTML, 'setorApr_s'       , true);
    enableField(form, customHTML, 'setorApr_n'       , true);
    var campos = ['txtJusDrt'];
    removeReadonly(customHTML,campos);
  }
}
