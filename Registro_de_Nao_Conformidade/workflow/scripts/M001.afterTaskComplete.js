function afterTaskComplete(colleagueId,nextSequenceId,userList){
      log.info("P003.AFTERTASKCOMPLETE - INICIO");
	 
	var parametros = new java.util.HashMap();
	var atividade = getValue("WKNumState");
	var linkProcess    = hAPI.getUserTaskLink(atividade);
	var solFluig       = hAPI.getCardValue("solFluig");
	
	var nameSolicitante         = hAPI.getCardValue("NomeSolicitante_131");
	var loginSolicitante         = hAPI.getCardValue("Matrcula_132");
	
      var mailSolicitante          = hAPI.getCardValue("mailSolicitante"); 
	var gestorSolicitante_mail   = hAPI.getCardValue("gestorSolicitante_mail");
	/*var RespoSup_mail            = hAPI.getCardValue("RespoSup_mail");*/
	var RespoRec_mail            = hAPI.getCardValue("RespoRec_mail");
      
      var PA = hAPI.getCardValue("aprovPlanoAcao");
      var setor = "";
      var etapa = "";
      var justificativa = "";

	linkProcess = linkProcess.replace("app_ecm_workflowview_processInstanceId", "app_ecm_workflowview_detailsProcessInstanceID");

      log.info("P003.AFTERTASKCOMPLETE - ATIVIDADE ATUAL > " + atividade);
      log.info("P003.AFTERTASKCOMPLETE - ATIVIDADE DESTINO > " + nextSequenceId);

      //Gestor Solicitante
      if(nextSequenceId == 6 && atividade == 9) {
            etapa = "reproved";
            setor = "Gerência Solicitante";
            justificativa = hAPI.getCardValue("justAprovGestorSolicitante");
      }
      
      //Suprimentos
      if(nextSequenceId == 6 && atividade == 20) {
            etapa = "reproved";
            setor = "Gerência de Suprimentos";
            justificativa = hAPI.getCardValue("JustiSup");
      }

      //Financeiro
      if(nextSequenceId == 6 && atividade == 29) {
            etapa = "reproved";
            setor = "Gerência Financeira";
            justificativa = hAPI.getCardValue("JustiRec");
      }


      //Aprovação Financeira
      if(nextSequenceId == 107 && atividade == 29 && (PA == ""|| PA == null)) {
            etapa = "aproved";
            setor = "Gerência Financeira";
            justificativa = hAPI.getCardValue("JustiRec");
      }


      //Plano de Ação
      //Gestor Solicitante
      if(nextSequenceId == 107 && atividade == 9) {
            etapa = "reprovedPA";
            setor = "Gerência Solicitante";
            justificativa = hAPI.getCardValue("justAprovGrSolicitantePA");
      }
      
      //Suprimentos
      if(nextSequenceId == 107 && atividade == 20) {
            etapa = "reprovedPA";
            setor = "Gerência de Suprimentos";
            justificativa = hAPI.getCardValue("JustiGrSupplyPA");
      }

      //Financeiro
      if(nextSequenceId == 107 && atividade == 29 && PA != "" && PA != null) {
            etapa = "reprovedPA";
            setor = "Gerência Financeira";
            justificativa = hAPI.getCardValue("JustiGrFinanPA");
      }


	log.info("P003.AFTERPROCESSFINISH - linkProcess" + linkProcess);
	if(setor != "" && etapa == "reproved"){
            log.info("------> P003.AFTERTASKCOMPLETE ETAPA REPROVED");
            try{
                  
                  parametros.put("SOLFLUIG"             , hAPI.getCardValue("solFluig"));
                  parametros.put("SETOR"                , setor);
                  parametros.put("JUSTIFICATIVA"        , justificativa);
                  
                  parametros.put("SOLICITANTE"          , nameSolicitante);
                  
                  parametros.put("HOSTPROCESS",    linkProcess);	
                  
                  //Monta lista de destinatários
                  var destinatarios = new java.util.ArrayList();
      
                 if(mailSolicitante != null && mailSolicitante != "") {
			destinatarios.add(mailSolicitante);
                  }
                  
                  if(gestorSolicitante_mail != null && gestorSolicitante_mail != "") {
                        destinatarios.add(gestorSolicitante_mail);
                  }

                  /*if(RespoSup_mail != null && RespoSup_mail != "") {
                        destinatarios.add(RespoSup_mail);
                  }*/
                  
                  if(RespoRec_mail != null && RespoRec_mail != "") {
                        destinatarios.add(RespoRec_mail);
                  }
            
                  //Este parâmetro é obrigatório e representa o assunto do e-mail
                  
                  parametros.put("subject", "RNCI - (" + solFluig + ")");
                  
                  notifier.notify(loginSolicitante, "p003_reproved", parametros, destinatarios, "text/html");

            } catch(e){
                  log.info("------> P003.AFTERTASKCOMPLETE ERROR - " + e); 
            }
      }else if(setor != "" && etapa == "reprovedPA"){
            log.info("------> P003.AFTERTASKCOMPLETE ETAPA REPROVED PA");
            try{
                  
                  parametros.put("SOLFLUIG"             , hAPI.getCardValue("solFluig"));
                  parametros.put("SETOR"                , setor);
                  parametros.put("JUSTIFICATIVA"        , justificativa);
                  
                  parametros.put("SOLICITANTE"          , nameSolicitante);
                  
                  parametros.put("HOSTPROCESS",    linkProcess);	
                  
                  //Monta lista de destinatários
                  var destinatarios = new java.util.ArrayList();
      
                 if(mailSolicitante != null && mailSolicitante != "") {
			destinatarios.add(mailSolicitante);
                  }
                  
                  if(gestorSolicitante_mail != null && gestorSolicitante_mail != "") {
                        destinatarios.add(gestorSolicitante_mail);
                  }

                  /*if(RespoSup_mail != null && RespoSup_mail != "") {
                        destinatarios.add(RespoSup_mail);
                  }*/
                  
                  if(RespoRec_mail != null && RespoRec_mail != "") {
                        destinatarios.add(RespoRec_mail);
                  }
            
                  //Este parâmetro é obrigatório e representa o assunto do e-mail
                  
                  parametros.put("subject", "RNCI - (" + solFluig + ")");
                  
                  notifier.notify(loginSolicitante, "p003_reprovedPA", parametros, destinatarios, "text/html");

            } catch(e){
                  log.info("------> P003.AFTERTASKCOMPLETE ERROR - " + e); 
            }
      }else if(setor != "" && etapa == "aproved"){
            log.info("------> P003.AFTERTASKCOMPLETE ETAPA APROVED");
            try{
                  
                  parametros.put("SOLFLUIG"             , hAPI.getCardValue("solFluig"));
                  parametros.put("SETOR"                , setor);
                  parametros.put("JUSTIFICATIVA"        , justificativa);
                  
                  parametros.put("SOLICITANTE"          , nameSolicitante);
                  
                  parametros.put("HOSTPROCESS",    linkProcess);	
                  
                  //Monta lista de destinatários
                  var destinatarios = new java.util.ArrayList();
      
			destinatarios.add("pagamentos@millpar.com");
                  destinatarios.add("recebimento@millpar.com");
            
                  //Este parâmetro é obrigatório e representa o assunto do e-mail
                  
                  parametros.put("subject", "RNCI - (" + solFluig + ")");
                  
                  notifier.notify(loginSolicitante, "p003_aproved", parametros, destinatarios, "text/html");

            } catch(e){
                  log.info("------> P003.AFTERTASKCOMPLETE ERROR - " + e); 
            }
      }		

	log.info("P003.AFTERTASKCOMPLETE - FIM");
}
  