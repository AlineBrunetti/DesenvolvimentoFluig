function afterProcessFinish(processId){
	 
	var parametros			 = new java.util.HashMap();
	var atividade			 = getValue("WKNumState");
	var linkProcess   		 = hAPI.getUserTaskLink(atividade);
	var solFluig			 = getValue("WKNumProces");
	
	var nameSolicitante      = hAPI.getCardValue("txtSolicitante");
	var loginSolicitante     = hAPI.getCardValue("txtMatSolic");
	var dataSolicitacao	 	 = hAPI.getCardValue("txtDataSolicitacao");
	var mailSolicitante      = hAPI.getCardValue("hddMailSol");
	var obs 				 = hAPI.getCardValue("txtJusDrt"); 

	linkProcess = linkProcess.replace("app_ecm_workflowview_processInstanceId", "app_ecm_workflowview_detailsProcessInstanceID");

	try{
		
		parametros.put("SOLFLUIG"        	  , String(solFluig));
		parametros.put("SOLICITANTE"          , nameSolicitante);
		parametros.put("DATASOLICITACAO"      , dataSolicitacao);
		parametros.put("OBSERVACAO"			  , obs);
		parametros.put("HOSTPROCESS"		  , linkProcess);	
		
		//Monta lista de destinatários
		var destinatarios = new java.util.ArrayList();
        destinatarios.add(mailSolicitante);
		
		parametros.put("subject", "NORMALIZAÇÃO FINALIZADA- (" + solFluig + ")");
		
		notifier.notify(loginSolicitante, "N001_finalizado", parametros, destinatarios, "text/html");
	
	} catch(e){
		log.info("------> N001.AFTERPROCESSFINISH ERROR - " + e); 
	}
}