function afterProcessFinish(processId){

	log.info("P003.AFTERPROCESSFINISH - INICIO");
	 
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

	linkProcess = linkProcess.replace("app_ecm_workflowview_processInstanceId", "app_ecm_workflowview_detailsProcessInstanceID");

	log.info("P003.AFTERPROCESSFINISH - linkProcess" + linkProcess);
	
				
	try{
		
		parametros.put("SOLFLUIG"             , hAPI.getCardValue("solFluig"));
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
		
		notifier.notify(loginSolicitante, "p003_finalizado", parametros, destinatarios, "text/html");
	
	} catch(e){
		log.info("------> P003.AFTERPROCESSFINISH ERROR - " + e); 
	}

	log.info("P003.AFTERPROCESSFINISH - FIM");

}