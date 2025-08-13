function afterTaskComplete(colleagueId, nextSequenceId, userList) {

    var parametros = new java.util.HashMap();
    var atividade = getValue("WKNumState");
    var solFluig = getValue("WKNumProces");

    var nameSolicitante = hAPI.getCardValue("txtSolicitante");
    var loginSolicitante = hAPI.getCardValue("txtMatSolic");
    var dataSolicitacao = hAPI.getCardValue("txtDataSolicitacao");
    var mailSolicitante = hAPI.getCardValue("hddMailSol");
    var tipo = hAPI.getCardValue("slcTipoDocumento");
    var mailnorm = hAPI.getCardValue("txtMailNorm");

    var pessoa = "";
    var setor = "";
    var obs = "";
    var linkCompleto = "";

    if (nextSequenceId == 19 && atividade == 23) {

        pessoa = hAPI.getCardValue("txtResponsavelGes");
        setor = "seu Gestor";
        obs = hAPI.getCardValue("txtJusGrc");

        var constraints = [];
        constraints.push(DatasetFactory.createConstraint("processHistoryPK.processInstanceId", solFluig, solFluig, ConstraintType.MUST));

        var data = DatasetFactory.getDataset("processHistory", null, constraints, null);
        var movimentos = [];

        if (data != null && data.rowsCount > 0) {
            for (var i = 0; i < data.rowsCount; i++) {
                var movimentoStr = data.getValue(i, "processHistoryPK.movementSequence");
                var movimento = parseInt(movimentoStr, 10);
                if (!isNaN(movimento)) {
                    movimentos.push(movimento);
                }
            }

            if (movimentos.length > 0) {
                var maiorMovimento = Math.max.apply(null, movimentos) +1;

                linkCompleto =
                    "https://intranet.millpar.com/portal/p/Millpar/pageworkflowview" +
                    "?app_ecm_workflowview_processInstanceId=" + solFluig +
                    "&app_ecm_workflowview_currentMovto=" + maiorMovimento +
                    "&app_ecm_workflowview_taskUserId=" + loginSolicitante +
                    "&app_ecm_workflowview_managerMode=false";

                log.info("Link de histórico criado: " + linkCompleto);
            } else {
                log.warn("Nenhum movimento encontrado para o processo: " + solFluig);
            }
        } else {
            log.warn("Dataset 'processHistory' retornou vazio ou null para o processo: " + solFluig);
        }

        try {
            parametros.put("SOLFLUIG"           , String(solFluig));
            parametros.put("SOLICITANTE"        , nameSolicitante);
            parametros.put("DATASOLICITACAO"    , dataSolicitacao);
            parametros.put("PESSOA"             , pessoa);
            parametros.put("SETOR"              , setor);
            parametros.put("OBSERVACAO"         , obs);
            parametros.put("HOSTPROCESS"        , linkCompleto);

            var destinatarios = new java.util.ArrayList();
            destinatarios.add(mailSolicitante);

            parametros.put("subject", "NORMALIZAÇÃO REPROVADA - (" + solFluig + ")");

            notifier.notify(loginSolicitante, "N001_reproved", parametros, destinatarios, "text/html");

        } catch (e) {
            log.error("Erro ao enviar notificação: " + e);
        }
    }
    if(mailnorm != '' && mailnorm != null && nextSequenceId == 15 && atividade == 23){
        loginNorm = hAPI.getCardValue("txtMatricNorm");
        pessoa = hAPI.getCardValue("txtResponsavelGes"); 
        setor = "Gestor do Solicitante"
        obs = hAPI.getCardValue("txtJusDrt");

        var constraints = [];
        constraints.push(DatasetFactory.createConstraint("processHistoryPK.processInstanceId", solFluig, solFluig, ConstraintType.MUST));

        var data = DatasetFactory.getDataset("processHistory", null, constraints, null);
        var movimentos = [];

        if (data != null && data.rowsCount > 0) {
            for (var i = 0; i < data.rowsCount; i++) {
                var movimentoStr = data.getValue(i, "processHistoryPK.movementSequence");
                var movimento = parseInt(movimentoStr, 10);
                if (!isNaN(movimento)) {
                    movimentos.push(movimento);
                }
            }

            if (movimentos.length > 0) {
                var maiorMovimento = Math.max.apply(null, movimentos) +1;

                linkCompleto =
                    "https://intranet.millpar.com/portal/p/Millpar/pageworkflowview" +
                    "?app_ecm_workflowview_processInstanceId=" + solFluig +
                    "&app_ecm_workflowview_currentMovto=" + maiorMovimento +
                    "&app_ecm_workflowview_taskUserId=" + loginNorm +
                    "&app_ecm_workflowview_managerMode=false";

                log.info("Link de histórico criado: " + linkCompleto);
            } else {
                log.warn("Nenhum movimento encontrado para o processo: " + solFluig);
            }
        } else {
            log.warn("Dataset 'processHistory' retornou vazio ou null para o processo: " + solFluig);
        }

        try {
            parametros.put("SOLFLUIG"             , String(solFluig));
            parametros.put("SOLICITANTE"          , nameSolicitante);
            parametros.put("DATASOLICITACAO"      , dataSolicitacao);
            parametros.put("TIPO"                 , tipo);
            parametros.put("OBSERVACAO"           , obs);
            parametros.put("PESSOA"               , pessoa);
            parametros.put("SETOR"                , setor);
            parametros.put("HOSTPROCESS"		  , linkCompleto);

            var destinatarios = new java.util.ArrayList();
            destinatarios.add(mailnorm);

            parametros.put("subject", "NORMALIZAÇÃO APROVADA - (" + solFluig + ")");

            notifier.notify(loginSolicitante, "N001_aproved2", parametros, destinatarios, "text/html");

        } catch (e) {
            log.error("Erro ao enviar notificação: " + e);
        }
    }
    if((mailnorm == '' || mailnorm == null) && nextSequenceId == 15 && atividade == 23) {
        pessoa = hAPI.getCardValue("txtResponsavelGes"); 
        setor = "Gestor do Solicitante"

        linkCompleto = "https://intranet.millpar.com/portal/p/Millpar/home?sol=" + solFluig + "&showRedirect=1";

        try{     
            parametros.put("SOLFLUIG"             , String(solFluig));
            parametros.put("SOLICITANTE"          , nameSolicitante);
            parametros.put("DATASOLICITACAO"      , dataSolicitacao);
            parametros.put("TIPO"                 , tipo);
            parametros.put("PESSOA"               , pessoa);
            parametros.put("SETOR"                , setor);
            parametros.put("HOSTPROCESS"		  , linkCompleto);
            
            //Monta lista de destinatários
            var destinatarios = new java.util.ArrayList();
            destinatarios.add("normalizacao@millpar.com");

            parametros.put("subject", "NORMALIZAÇÃO APROVADA - (" + solFluig + ")");
                    
            notifier.notify(loginSolicitante, "N001_aproved", parametros, destinatarios, "text/html");

        } catch(e){
            log.info("------> N001.AFTERTASKCOMPLETE ERROR - " + e); 
        }
    }
    if(nextSequenceId == 19 && atividade == 45) {
        pessoa = hAPI.getCardValue("txtResponsavelNorm"); 
        setor = "normalização"
        obs = hAPI.getCardValue("txtJusDrt");

        var constraints = [];
        constraints.push(DatasetFactory.createConstraint("processHistoryPK.processInstanceId", solFluig, solFluig, ConstraintType.MUST));

        var data = DatasetFactory.getDataset("processHistory", null, constraints, null);
        var movimentos = [];

        if (data != null && data.rowsCount > 0) {
            for (var i = 0; i < data.rowsCount; i++) {
                var movimentoStr = data.getValue(i, "processHistoryPK.movementSequence");
                var movimento = parseInt(movimentoStr, 10);
                if (!isNaN(movimento)) {
                    movimentos.push(movimento);
                }
            }

            if (movimentos.length > 0) {
                var maiorMovimento = Math.max.apply(null, movimentos) +1;

                linkCompleto =
                    "https://intranet.millpar.com/portal/p/Millpar/pageworkflowview" +
                    "?app_ecm_workflowview_processInstanceId=" + solFluig +
                    "&app_ecm_workflowview_currentMovto=" + maiorMovimento +
                    "&app_ecm_workflowview_taskUserId=" + loginSolicitante +
                    "&app_ecm_workflowview_managerMode=false";

                log.info("Link de histórico criado: " + linkCompleto);
            } else {
                log.warn("Nenhum movimento encontrado para o processo: " + solFluig);
            }
        } else {
            log.warn("Dataset 'processHistory' retornou vazio ou null para o processo: " + solFluig);
        }

        try {
            parametros.put("SOLFLUIG", String(solFluig));
            parametros.put("SOLICITANTE", nameSolicitante);
            parametros.put("DATASOLICITACAO", dataSolicitacao);
            parametros.put("PESSOA", pessoa);
            parametros.put("SETOR", setor);
            parametros.put("OBSERVACAO", obs);
            parametros.put("HOSTPROCESS", linkCompleto);

            var destinatarios = new java.util.ArrayList();
            destinatarios.add(mailSolicitante);

            parametros.put("subject", "NORMALIZAÇÃO REPROVADA - (" + solFluig + ")");

            notifier.notify(loginSolicitante, "N001_reproved", parametros, destinatarios, "text/html");

        } catch (e) {
            log.error("Erro ao enviar notificação: " + e);
        }
    }
}
