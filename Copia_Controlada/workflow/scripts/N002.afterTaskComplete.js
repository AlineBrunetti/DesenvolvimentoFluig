function afterTaskComplete(colleagueId, nextSequenceId, userList) {

    var parametros = new java.util.HashMap();
    var atividade = getValue("WKNumState");
    var solFluig = getValue("WKNumProces");

    var loginSolicitante	 = hAPI.getCardValue("hddCodSolic");
    var nameSolicitante      = hAPI.getCardValue("txtSolicitante");
    var dataSolicitacao      = hAPI.getCardValue("txtDataSolicitacao");
    var mailSolicitante      = hAPI.getCardValue("txtEmail");

    if (nextSequenceId == 5 && atividade == 4) {
        try {
            parametros.put("SOLFLUIG"           , String(solFluig));
            parametros.put("SOLICITANTE"        , nameSolicitante);
            parametros.put("DATASOLICITACAO"    , dataSolicitacao);

            var destinatarios = new java.util.ArrayList();
            destinatarios.add("normalizacao@millpar.com");

            parametros.put("subject", "CÓPIA CONTROLADA ABERTA - (" + solFluig + ")");

            notifier.notify(loginSolicitante, "N002_NovaAtividade", parametros, destinatarios, "text/html");

        } catch (e) {
            log.error("Erro ao enviar notificação: " + e);
        }
    }
}
