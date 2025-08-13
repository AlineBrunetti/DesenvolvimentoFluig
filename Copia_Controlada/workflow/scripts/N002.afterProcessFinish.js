function afterProcessFinish(processId){
	 
	var parametros			 = new java.util.HashMap();
	var solFluig			 = getValue("WKNumProces");
	
	var loginSolicitante	 = hAPI.getCardValue("hddCodSolic");
	var nameSolicitante      = hAPI.getCardValue("txtSolicitante");
	var dataSolicitacao	 	 = hAPI.getCardValue("txtDataSolicitacao");
	var mailSolicitante      = hAPI.getCardValue("txtEmail");

	try{
		
		parametros.put("SOLFLUIG"        	  , String(solFluig));
		parametros.put("SOLICITANTE"          , nameSolicitante);
		parametros.put("DATASOLICITACAO"      , dataSolicitacao);
		
		//Monta lista de destinatários
		var destinatarios = new java.util.ArrayList();
        destinatarios.add(mailSolicitante);
		
		parametros.put("subject", "CÓPIA CONTROLADA FINALIZADA- (" + solFluig + ")");
		
		notifier.notify(loginSolicitante, "N002_finalizado", parametros, destinatarios, "text/html");
	
	} catch(e){
		log.info("------> N002.AFTERPROCESSFINISH ERROR - " + e); 
	}
}