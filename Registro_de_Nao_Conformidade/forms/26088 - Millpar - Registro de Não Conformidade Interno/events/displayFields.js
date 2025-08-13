function displayFields(form,customHTML) {
	log.info("RNCI - displayFields.js");
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

	var solicitatante = getValue("WKUser"); 
	var colaborador = buscaUsuario(solicitatante);

	//desabilita botão imprimir padrão
	form.setHidePrintLink(true);
	
	//define funções para o front-end
	setGlobalFunctions(form,customHTML);

	form.setValue('solFluig', numProces);

	panelShow(form,customHTML,'RNCISuprimentos_153', false);
	panelShow(form,customHTML,'RNCIRecebimento_163', false);
	panelShow(form,customHTML,'RNCIPagamentos_232', false);
	panelShow(form, customHTML, "fsAprovadores", false);
	panelShow(form, customHTML, "fsAprovadoresPA", false);
	
	//dados
	if (form.getValue('hddNumProcess') == '' || form.getValue('hddNumProcess') == null) { 
		form.setValue('hddNumProcess', numProces); 
	}
	
	if (form.getValue('hddCodSolic') == '' || form.getValue('hddCodSolic') == null) { 
		form.setValue('hddCodSolic', userLogin); 
	}
	
	//aprovações

	if(form.getValue("aprovGestorSolicitante") == ""  &&
	   form.getValue("acordoSup") == "" &&
	   form.getValue("acordoRec") == "" && 
	   form.getValue("aprovPlanoAcao") == ""){
		panelShow(form, customHTML, "fsAprovadores", false);
		panelShow(form, customHTML, "fsAprovadoresPA", false);
	} else if (form.getValue("aprovGestorSolicitante") != ""  ||
	form.getValue("acordoSup") != "" ||
	form.getValue("acordoRec") != "" &&
	form.getValue("aprovPlanoAcao") == "") {
		panelShow(form, customHTML, "fsAprovadores", true);
		panelShow(form, customHTML, "fsAprovadoresPA", false);
	}else{
		panelShow(form, customHTML, "fsAprovadoresPA", true);
	}

	panelShow(form, customHTML, "fsGestorSolicitante"   , !(form.getValue("aprovGestorSolicitante") == "" ));
	panelShow(form, customHTML, "AprovSupri"            , !(form.getValue("acordoSup") == "" ));
	panelShow(form, customHTML, "AproComprador", !(form.getValue("RespoProrrog") == "" ));

	if(form.getValue("suprimentos") == "true"){
		panelShow(form, customHTML, "RNCISuprimentos_153", true);
		collapseShow(form, customHTML, "divCollapseDadosRNCS", true);
		panelShow(form, customHTML, "divPlanoA"        , true);
		collapseShow(form, customHTML, "divCollapseDadosIPA"     , true);
	}

	if(form.getValue("recebimento") == "true"){
		panelShow(form, customHTML, "RNCIRecebimento_163", true);
		collapseShow(form, customHTML, "divCollapseDadosRNCI", true);
		panelShow(form, customHTML, "divPlanoA"        , true);
		collapseShow(form, customHTML, "divCollapseDadosIPA"     , true);
	}

	if(form.getValue("pagamentos") == "true"){
		panelShow(form, customHTML, "RNCIPagamentos_232", true);
		collapseShow(form, customHTML, "divCollapseDadosRNCIP", true);
		collapseShow(form, customHTML, "divCollapseDadosFinanceiro", true);
		panelShow(form, customHTML, "divPlanoA"        , true);
		collapseShow(form, customHTML, "divCollapseDadosIPA"     , true);
	}

	if(form.getValue("acordoSup") != ""){
		collapseShow(form, customHTML, "divCollapseDadosRNCS"   , true);
	}

	panelShow(form, customHTML, "AprovReceb"            , !(form.getValue("acordoRec") == "" ));
	panelShow(form, customHTML, "fsGrSolicitantePA", !(form.getValue("aprovGrSolicitantePA") == "" ));
	panelShow(form, customHTML, "fsGrSupplyPA"            , !(form.getValue("AprovGrSupplyPA") == "" ));
	panelShow(form, customHTML, "GrFinanPA"            , !(form.getValue("acordoGrFinanPA") == "" ));
	panelShow(form, customHTML, "GestaoPA"		        , false);

	log.info("PLANO DE ACAO DIV: " + form.getValue("aprovPlanoAcao"));

	var planoA = form.getValue("aprovPlanoAcao");

	if(planoA == "true"){
		log.info("PLANO DE ACAO " + planoA.trim()); 
		panelShow(form, customHTML, "GestaoPA"		    , true);
		collapseShow(form, customHTML, "GestaoPlanoA"       , true);

		panelShow(form, customHTML, "divPlanoA"		    , true);
		collapseShow(form, customHTML, "GestaoPlanoA"       , true);
		
		panelShow(form, customHTML, "fieldsetPlanoA"        , true);
		collapseShow(form, customHTML, "fieldsetPlanoA"     , true);
	}

	//trata comportamento do formulário conforme atividade		
	if (formMode == 'VIEW') {
		panelShow(form,customHTML,'form', true);
		enableContainer(form,customHTML,'form', true);
		if(form.getValue("aprovGrSolicitantePA") != "true" && form.getValue("aprovGrSolicitantePA") != "false" &&
		form.getValue("AprovGrSupplyPA") != "true" && form.getValue("AprovGrSupplyPA") != "false" &&
		form.getValue("acordoGrFinanPA") != "true" && form.getValue("acordoGrFinanPA") != "false" ){
			panelShow(form, customHTML, "fsAprovadoresPA"         , false);
		}else{
			panelShow(form, customHTML, "fsAprovadoresPA"         , true);
		}
		if(form.getValue("acordoGrFinanPA") != "true" && form.getValue("acordoGrFinanPA") != "false" ){
			panelShow(form, customHTML, "fsGrFinanPA", false);
		}
		if(form.getValue("AprovGrSupplyPA") != "true" && form.getValue("AprovGrSupplyPA") != "false" ){
			panelShow(form, customHTML, "fsGrSupplyPA", false);
		}
		
	} else{
		
		panelShow(form, customHTML, "InformaesColaborador_2", true);
		panelShow(form, customHTML, "DadosGerais_142"       , true);
		panelShow(form, customHTML, "divPlanoA"        , true);

		form.setEnabled('suprimentos'    , false);
		form.setEnabled('recebimento'    , false);
		form.setEnabled('pagamentos'     , false);

		form.setEnabled('aprovGestorSolicitante'    , false);
		form.setEnabled('justAprovGestorSolicitante', false);

		form.setEnabled('acordoSup'		, false);
		form.setEnabled('JustiSup'		, false);
		
		form.setEnabled('acordoRec'		, false);
		form.setEnabled('JustiRec'		, false);

		form.setEnabled('aprovGrSolicitantePA'    , false);
		form.setEnabled('justAprovGrSolicitantePA', false);

		form.setEnabled('AprovGrSupplyPA'		, false);
		form.setEnabled('JustiGrSupplyPA'		, false);
		
		form.setEnabled('acordoGrFinanPA'		, false);
		form.setEnabled('JustiGrFinanPA'		, false);
		
		form.setEnabled('nfRecebimento'     , false);
		form.setEnabled('DtAtuVencSup'      , false);
		form.setEnabled('prorrog'		, false);
		form.setEnabled('DtVencComp' 		, false);
		form.setEnabled('DescriProrrog'	, false);
		form.setEnabled('Notas_extraviadas'	, false);
		form.setEnabled('NFCTESemLanc'      , false);
		form.setEnabled('PagNreali'		, false);
		form.setEnabled('ReqAtras'		, false);
		form.setEnabled('OutrosRNCS'		, false);
		form.setEnabled('dataRecebimento'	, false);

		form.setEnabled('ForaCompet'        , false);
		form.setEnabled('ForaPrazInt'		, false);
		form.setEnabled('ForaRecbF'		, false);
		form.setEnabled('MovOrcament'		, false);
		form.setEnabled('OutrosRNCR'		, false);

		form.setEnabled('ForaPrazo'		, false);
		form.setEnabled('PagamJuros'		, false);
		form.setEnabled('OutrosRNCP'		, false);
		form.setEnabled('nfVencida'		, false);
		form.setEnabled('dataVencimentoPagamentos', false);
		form.setEnabled('houveJuros'		, false);
		form.setEnabled('Moeda_205'		, false);
		form.setEnabled('condPagamento'	, false);

		form.setEnabled('aprovPlanoAcao'	, false);
		form.setEnabled('JustiGPA'		, false);

		customHTML.append("<script>");
		customHTML.append("$(document).ready(function() {");
		customHTML.append("  var state = " + numState + ";");

		customHTML.append("  if(state == 0 || state == 6) {");
		customHTML.append("    $('#btnAddPlanoA').show();");
		customHTML.append("    $('#btnUpdPlanoA').show();");
		customHTML.append("    $('#btnDelPlanoA').show();");
		customHTML.append("  } else {");
		customHTML.append("    $('#btnAddPlanoA').hide();");
		customHTML.append("    $('#btnUpdPlanoA').hide();");
		customHTML.append("    $('#btnDelPlanoA').hide();");
		customHTML.append("  }");

		customHTML.append("});");
		customHTML.append("</script>");

		panelShow(form, customHTML, "Outro_161"         , true);
		panelShow(form, customHTML, "Outro_193"         , true);
		panelShow(form, customHTML, "Outro_194"         , true);

		form.setEnabled('Outro_161'		, false);
		form.setEnabled('Outro_193'		, false);
		form.setEnabled('Outro_194'		, false);

		if(numState == 0 || numState == 6) { //Inicio

			if (form.getValue('Matrcula_132') == '' || form.getValue('Matrcula_132') == null) { 
				form.setValue("Matrcula_132",    colaborador.getValue(0, "colleaguePK.colleagueId") );
				form.setValue("mailSolicitante", colaborador.getValue(0, "mail") );
			}
			
			if (form.getValue('DataSolicitao_133') == '' || form.getValue('DataSolicitao_133') == null) { 
				form.setValue('DataSolicitao_133', obterDataAtual()); 
			}
			
			if (form.getValue('NomeSolicitante_131') == '' || form.getValue('NomeSolicitante_131') == null) {
				form.setValue("NomeSolicitante_131",  colaborador.getValue(0, "colleagueName") );
			}

			form.setEnabled('Outro_161', true);
			form.setEnabled('Outro_193', true);
			form.setEnabled('Outro_194', true);


			form.setEnabled('suprimentos'    , true);
			form.setEnabled('recebimento'    , true);
			form.setEnabled('pagamentos'     , true);

			//suprimentos / prorrogacao

			form.setEnabled('nfRecebimento'     , true);
			form.setEnabled('DtAtuVencSup'      , true);
			form.setEnabled('DtVencComp' 		, true);
			form.setEnabled('DescriProrrog'	, true);
			form.setEnabled('Notas_extraviadas'	, true);
			form.setEnabled('NFCTESemLanc'      , true);
			form.setEnabled('PagNreali'		, true);
			form.setEnabled('ReqAtras'		, true);
			form.setEnabled('OutrosRNCS'		, true);
			form.setEnabled('dataRecebimento'	, true);

			
			form.setEnabled('ForaCompet'        , true);
			form.setEnabled('ForaPrazInt'		, true);
			form.setEnabled('ForaRecbF'		, true);
			form.setEnabled('MovOrcament'		, true);
			form.setEnabled('OutrosRNCR'		, true);

			form.setEnabled('ForaPrazo'		, true);
			form.setEnabled('PagamJuros'		, true);
			form.setEnabled('OutrosRNCP'		, true);
			form.setEnabled('nfVencida'		, true);
			form.setEnabled('dataVencimentoPagamentos', true);
			form.setEnabled('houveJuros'		, true);
			form.setEnabled('Moeda_205'		, true);
			form.setEnabled('condPagamento'	, true);
	
		}
		if(numState == 7){ //Gestor Solicitante
			if(form.getValue('aprovPlanoAcao') != ''){
				if (form.getValue('GrSolicitantePA_name') == '' || form.getValue('GrSolicitantePA_name') == null) { 
					form.setValue("GrSolicitantePA_login", colaborador.getValue(0, "colleaguePK.colleagueId") );
					form.setValue("GrSolicitantePA_mail", colaborador.getValue(0, "mail") );
					form.setValue("GrSolicitantePA_name",  colaborador.getValue(0, "colleagueName") );
				}
				
				form.setValue('dtAprovGrSolicitantePA', obterDataAtual()); 

				panelShow(form, customHTML, "fsAprovadores"         , true);
				panelShow(form, customHTML, "fsGestorSolicitante"   , true);

				panelShow(form, customHTML, "fsAprovadoresPA"         , true);
				panelShow(form, customHTML, "fsGrSolicitantePA"   , true);
	
				form.setEnabled('aprovGrSolicitantePA'    , true);
				form.setEnabled('justAprovGrSolicitantePA', true);	
				
				if(form.getValue("suprimentos") == "true"){
					panelShow(form, customHTML, "RNCISuprimentos_153", true);
					collapseShow(form, customHTML, "divCollapseDadosRNCS", true);
				}


				//paineis
				if(form.getValue("acordoGrFinanPA") != "true" && form.getValue("acordoGrFinanPA") != "false" ){
					panelShow(form, customHTML, "fsGrFinanPA", false);
				}
				if(form.getValue("AprovGrSupplyPA") != "true" && form.getValue("AprovGrSupplyPA") != "false" ){
					panelShow(form, customHTML, "fsGrSupplyPA", false);
				}
	
				if(form.getValue("recebimento") == "true"){
					panelShow(form, customHTML, "RNCIRecebimento_163", true);
					collapseShow(form, customHTML, "divCollapseDadosRNCI", true);
				}
	
				if(form.getValue("pagamentos") == "true"){
					panelShow(form, customHTML, "RNCIPagamentos_232", true);
					collapseShow(form, customHTML, "divCollapseDadosRNCIP", true);
					collapseShow(form, customHTML, "divCollapseDadosFinanceiro", true);
				}
			}else{
				if (form.getValue('gestorSolicitante_name') == '' || form.getValue('gestorSolicitante_name') == null) { 
					form.setValue("gestorSolicitante_login", colaborador.getValue(0, "colleaguePK.colleagueId") );
					form.setValue("gestorSolicitante_mail", colaborador.getValue(0, "mail") );
					form.setValue("gestorSolicitante_name",  colaborador.getValue(0, "colleagueName") );
				}
				
				form.setValue('dtAprovGestorSolicitante', obterDataAtual()); 

				panelShow(form, customHTML, "fsAprovadores"         , true);
				panelShow(form, customHTML, "fsGestorSolicitante"   , true);
				collapseShow(form, customHTML, "dvGestorSolicitante", true);
	
				form.setEnabled('aprovGestorSolicitante'    , true);
				form.setEnabled('justAprovGestorSolicitante', true);
	
				//paineis
				if(form.getValue("suprimentos") == "true"){
					panelShow(form, customHTML, "RNCISuprimentos_153", true);
					collapseShow(form, customHTML, "divCollapseDadosRNCS", true);
				}
	
				if(form.getValue("recebimento") == "true"){
					panelShow(form, customHTML, "RNCIRecebimento_163", true);
					collapseShow(form, customHTML, "divCollapseDadosRNCI", true);
				}
	
				if(form.getValue("pagamentos") == "true"){
					panelShow(form, customHTML, "RNCIPagamentos_232", true);
					collapseShow(form, customHTML, "divCollapseDadosRNCIP", true);
					collapseShow(form, customHTML, "divCollapseDadosFinanceiro", true);
				}
			}
		}

		if(numState == 18){ //Suprimentos
			
			if(form.getValue('aprovPlanoAcao') != ''){
				if (form.getValue('RespoGrSupplyPA') == '' || form.getValue('RespoGrSupplyPA') == null) { 
					form.setValue("RespoGrSupplyPA_login", colaborador.getValue(0, "colleaguePK.colleagueId") );
					form.setValue("RespoGrSupplyPA_mail", colaborador.getValue(0, "mail") );
					form.setValue("RespoGrSupplyPA",  colaborador.getValue(0, "colleagueName") );
				}
				
				form.setValue('DataAprovGrSupplyPA', obterDataAtual()); 

				panelShow(form, customHTML, "fsAprovadores"         , true);
				panelShow(form, customHTML, "fsGestorSolicitante"   , true);

				panelShow(form, customHTML, "fsAprovadoresPA"         , true);
				panelShow(form, customHTML, "fsGrSupplyPA"   , true);
	
				form.setEnabled('AprovGrSupplyPA'    , true);
				form.setEnabled('JustiGrSupplyPA', true);	
	
				//paineis
				if(form.getValue("acordoGrFinanPA") != "true" && form.getValue("acordoGrFinanPA") != "false" ){
					panelShow(form, customHTML, "fsGrFinanPA", false);
				}

				if(form.getValue("suprimentos") == "true"){
					panelShow(form, customHTML, "RNCISuprimentos_153", true);
					collapseShow(form, customHTML, "divCollapseDadosRNCS", true);
				}
	
				if(form.getValue("recebimento") == "true"){
					panelShow(form, customHTML, "RNCIRecebimento_163", true);
					collapseShow(form, customHTML, "divCollapseDadosRNCI", true);
				}
	
				if(form.getValue("pagamentos") == "true"){
					panelShow(form, customHTML, "RNCIPagamentos_232", true);
					collapseShow(form, customHTML, "divCollapseDadosRNCIP", true);
					collapseShow(form, customHTML, "divCollapseDadosFinanceiro", true);
				}
			}else{
				if (form.getValue('RespoSup') == '' || form.getValue('RespoSup') == null) { 
					form.setValue("RespoSup", colaborador.getValue(0, "colleagueName") );
					form.setValue("RespoSup_login", colaborador.getValue(0, "colleaguePK.colleagueId") );
					form.setValue("RespoSup_mail",  colaborador.getValue(0, "mail") );
				}

				form.setValue('DataAprovSup', obterDataAtual()); 

				panelShow(form, customHTML, "fsAprovadores"         , true);
				panelShow(form, customHTML, "AprovSupri"            , true);
	
				collapseShow(form, customHTML, "AprovSup"           , true);
	
				panelShow(form, customHTML, "RNCISuprimentos_153", true);
				collapseShow(form, customHTML, "divCollapseDadosRNCS", true);
	
				form.setEnabled('acordoSup'		, true);
				form.setEnabled('JustiSup'		, true);

				//paineis
				if(form.getValue("suprimentos") == "true"){
					panelShow(form, customHTML, "RNCISuprimentos_153", true);
					collapseShow(form, customHTML, "divCollapseDadosRNCS", true);
				}
	
				if(form.getValue("recebimento") == "true"){
					panelShow(form, customHTML, "RNCIRecebimento_163", true);
					collapseShow(form, customHTML, "divCollapseDadosRNCI", true);
				}
	
				if(form.getValue("pagamentos") == "true"){
					panelShow(form, customHTML, "RNCIPagamentos_232", true);
					collapseShow(form, customHTML, "divCollapseDadosRNCIP", true);
					collapseShow(form, customHTML, "divCollapseDadosFinanceiro", true);
				}
			}
		}

		if(numState == 22){ //Prorrogação
			if (form.getValue('RespoProrrog') == '' || form.getValue('RespoProrrog') == null) { 
				form.setValue('RespoProrrog',      colaborador.getValue(0, "colleagueName") ); 
				form.setValue('RespoProrrogLogin', colaborador.getValue(0, "colleaguePK.colleagueId") );
				form.setValue('RespoProrrogMail',  colaborador.getValue(0, "mail") );
			}
			
			if (form.getValue('dataProrrog') == '' || form.getValue('dataProrrog') == null) { 
				form.setValue('dataProrrog', obterDataAtual()); 
			}

			panelShow(form, customHTML, "AproComprador", true);
			collapseShow(form, customHTML, "AprovComp", true);

			panelShow(form, customHTML, "fieldsetPlanoA"        , true);
			collapseShow(form, customHTML, "fieldsetPlanoA"     , true);

			form.setEnabled('prorrog'		, true);
			form.setEnabled('DtVencComp' 		, true);
		 	form.setEnabled('DescriProrrog'	, true);
		}

		if(numState == 27){ //Financeiro

			if(form.getValue('aprovPlanoAcao') != ''){
				if (form.getValue('RespoGrFinanPA') == '' || form.getValue('RespoGrFinanPA') == null) { 
					form.setValue('RespoGrFinanPA',       colaborador.getValue(0, "colleagueName") );
					form.setValue('RespoGrFinanPA_login', colaborador.getValue(0, "colleaguePK.colleagueId") );
					form.setValue('RespoGrFinanPA_mail',  colaborador.getValue(0, "mail") );
				}
				
				form.setValue('DataAprovGrFinanPA', obterDataAtual()); 
	
				panelShow(form, customHTML, "fsAprovadores"         , true);
				panelShow(form, customHTML, "AprovReceb"            , true);
	
				panelShow(form, customHTML, "fsAprovadoresPA"         , true);
				panelShow(form, customHTML, "fsGrFinanPA"   , true);

				form.setEnabled('acordoGrFinanPA'		, true);
				form.setEnabled('JustiGrFinanPA'		, true);

				if(form.getValue("AprovGrSupplyPA") != "true" && form.getValue("AprovGrSupplyPA") != "false" ){
					panelShow(form, customHTML, "fsGrSupplyPA", false);
				}

			}else{
				if (form.getValue('RespoRec') == '' || form.getValue('RespoRec') == null) { 
					form.setValue('RespoRec',       colaborador.getValue(0, "colleagueName") );
					form.setValue('RespoRec_login', colaborador.getValue(0, "colleaguePK.colleagueId") );
					form.setValue('RespoRec_mail',  colaborador.getValue(0, "mail") );
				}
				
				if (form.getValue('DataAprovRec') == '' || form.getValue('DataAprovRec') == null) { 
					form.setValue('DataAprovRec', obterDataAtual()); 
				}
	
				panelShow(form, customHTML, "fsAprovadores"         , true);
				panelShow(form, customHTML, "AprovReceb"            , true);
	
				collapseShow(form, customHTML, "AprovRec"           , true);
	
				panelShow(form, customHTML, "fieldsetPlanoA"        , true);
				collapseShow(form, customHTML, "fieldsetPlanoA"     , true);
	
				form.setEnabled('acordoRec'		, true);
				form.setEnabled('JustiRec'		, true);
			}
		}

		if(numState == 107){ //Gestao Plano

			if(form.getValue("aprovGrSolicitantePA") != "true" && form.getValue("aprovGrSolicitantePA") != "false" &&
			form.getValue("AprovGrSupplyPA") != "true" && form.getValue("AprovGrSupplyPA") != "false" &&
			form.getValue("acordoGrFinanPA") != "true" && form.getValue("acordoGrFinanPA") != "false" ){
				panelShow(form, customHTML, "fsAprovadoresPA"         , false);
			}else{
				panelShow(form, customHTML, "fsAprovadoresPA"         , true);
			}

			if(form.getValue("acordoGrFinanPA") != "true" && form.getValue("acordoGrFinanPA") != "false" ){
				panelShow(form, customHTML, "fsGrFinanPA", false);
			}
			if(form.getValue("AprovGrSupplyPA") != "true" && form.getValue("AprovGrSupplyPA") != "false" ){
				panelShow(form, customHTML, "fsGrSupplyPA", false);
			}

			form.setValue('DataRegistro', obterDataAtual()); 

			form.setEnabled('aprovPlanoAcao'	, true);
			form.setEnabled('JustiGPA'		, true);

			panelShow(form, customHTML, "fsAprovadores"         , true);
			

			panelShow(form, customHTML, "GestaoPA"		    , true);
			collapseShow(form, customHTML, "GestaoPlanoA"       , true);

			panelShow(form, customHTML, "divPlanoA"		    , true);
			collapseShow(form, customHTML, "GestaoPlanoA"       , true);
			
			panelShow(form, customHTML, "fieldsetPlanoA"        , true);
			collapseShow(form, customHTML, "fieldsetPlanoA"     , true);
		}
	} 
}

function buscaUsuario(user) {
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST);
	var constraints = new Array(c1);
	var colaborador = DatasetFactory.getDataset("colleague", null, constraints, null);
	return colaborador;
}