function getMails(grupoPai) {
    var destinatarios = new java.util.ArrayList();

    // 1) Consulta tabela fdn_groupuserrole via DS_TABLE_FLUIG
    var instr = "FOREACH fdn_groupuserrole WHERE group_code = '" + grupoPai + "'";
    var c1 = DatasetFactory.createConstraint("QUERY", instr, instr, ConstraintType.MUST);
    // pegue só a coluna LOGIN para otimizar
    var ds = DatasetFactory.getDataset("DS_TABLE_FLUIG", ["LOGIN"], [c1], null);

    for (var i = 0; i < ds.rowsCount; i++) {
        // pega o LOGIN corretamente
        var login = ds.getValue(i, "LOGIN");
        if (login && login.trim() !== "") {
            login = login.trim();

            // consulta colega pelo login
            var cLogin = DatasetFactory.createConstraint("login", login, login, ConstraintType.MUST);
            var dsColleague = DatasetFactory.getDataset("colleague", ["mail"], [cLogin], null);

            for (var j = 0; j < dsColleague.rowsCount; j++) {
                // pega o e-mail corretamente
                var email = dsColleague.getValue(j, "mail");
                if (email && !destinatarios.contains(email)) {
                    destinatarios.add(email);
                }
            }
        }
    }

    return destinatarios;
}
function enviarEmail(nameSolicitante, solFluig, dataSolicitacao, titulo, mail, loginSolicitante, destinatarios) {
	var mailSuporte = getMails("ZZZ_Fluig");
    var parametros = new java.util.HashMap();
    parametros.put("TITULO"				, titulo);
	parametros.put("SOLICITANTE"		, nameSolicitante);
	parametros.put("SOLFLUIG"			, String(solFluig));
	parametros.put("DATASOLICITACAO"	, dataSolicitacao);
	parametros.put("INFOEMAIL"			, mail);
    parametros.put("SUPORTE"			, mailSuporte);

    log.info("------> R001.Dados - " + loginSolicitante + ", " + parametros + ", " + destinatarios);

	try{
		parametros.put("subject", "Processo Admissional - ( " + solFluig + " )");
		
		notifier.notify(loginSolicitante, "EmailPadronizado", parametros, destinatarios, "text/html");

	} catch(e){
		log.info("------> R001.AFTERTASKCOMPLETE ERROR - " + e); 
	}
}
function afterProcessFinish(processId){
	var solFluig     		 = getValue("WKNumProces");
	var atividade 			 = getValue("WKNumState");
	
	var nameSolicitante      = hAPI.getCardValue("txtSolicitante");
	var loginSolicitante     = hAPI.getCardValue("txtMatSolic");
	var dataSolicitacao	 	 = hAPI.getCardValue("txtDataSolicitacao");
	var mailSolicitante      = hAPI.getCardValue("hddMailSol");

	var nomecandidato 			= hAPI.getCardValue("txtCandidato");
	var matriculacandidato 		= hAPI.getCardValue("txtMatricula");
	var cargocandidato 			= hAPI.getCardValue("txtCargo");
	var setorcandidato 			= hAPI.getCardValue("txtSetor");
	var datacandidato 			= hAPI.getCardValue("txtDataAdmissao");

	var ALMOX				 = hAPI.getCardValue("slcRec");

	var APRODIR				 = hAPI.getCardValue("slcAproDirAre");
	var APROCEO				 = hAPI.getCardValue("slcAproCEO");
	var APRORH				 = hAPI.getCardValue("slcAproGesRH");

	if(APRODIR == "Não"){

		var JUST = hAPI.getCardValue("txtJusDirAre");
		var DIRETOR = hAPI.getCardValue("txtResponsavelDirAre");

		mail = 
            '<tr>'+
            '  <td colspan="3">Prezado(a), <br>'+
            '      Informamos que a Solicitação de Admissão <strong><span style="color: #A3BD31;">'+ String(solFluig) +'</span></strong> forecusada por <strong><span style="color: #A3BD31;">'+ DIRETOR +'</span></strong><br>'+
            '  </td>'+
            '</tr>'+
            '<tr>'+
            '  <td colspan="3">'+
            '      Justificativa de Recusa: '+ JUST +'<br>'+
			'      Sua solicitação foi <strong><span style="color: #FF5B00;">FINALIZADA</span></strong>.'
            '  </td>'+
            '</tr>';
		var destinatariosAproDir = getMails("C002 - Solicitantes");
		destinatariosAproDir.add(mailSolicitante);
		enviarEmail(nameSolicitante, solFluig, dataSolicitacao, "Recusa - Diretor da Área Solicitante", mail, loginSolicitante, destinatariosAproDir);

	}else if(APRORH == "Não" && atividade == 26){

		var JUST = hAPI.getCardValue("txtJusGesRH");
		var DIRETOR = hAPI.getCardValue("txtResponsavelGesRH");

		mail = 
            '<tr>'+
            '  <td colspan="3">Prezado(a), <br>'+
            '      Informamos que a Solicitação de Admissão <strong><span style="color: #A3BD31;">'+ String(solFluig) +'</span></strong> forecusada por <strong><span style="color: #A3BD31;">'+ DIRETOR +'</span></strong><br>'+
            '  </td>'+
            '</tr>'+
            '<tr>'+
            '  <td colspan="3">'+
            '      Justificativa de Recusa: '+ JUST +'<br>'+
			'      Sua solicitação foi <strong><span style="color: #FF5B00;">FINALIZADA</span></strong>.'
            '  </td>'+
            '</tr>';

		var destinatariosAproRH = getMails("C002 - Solicitantes");
		destinatariosAproRH.add(mailSolicitante);
		enviarEmail(nameSolicitante, solFluig, dataSolicitacao, "Recusa - Gestor de RH", mail, loginSolicitante, destinatariosAproRH);
		
	}else if(APROCEO == "Não"){

		var JUST = hAPI.getCardValue("txtJusCEO");
		var DIRETOR = hAPI.getCardValue("txtResponsavelCEO");

		mail = 
            '<tr>'+
            '  <td colspan="3">Prezado(a), <br>'+
            '      Informamos que a Solicitação de Admissão <strong><span style="color: #A3BD31;">'+ String(solFluig) +'</span></strong> forecusada por <strong><span style="color: #A3BD31;">'+ DIRETOR +'</span></strong><br>'+
            '  </td>'+
            '</tr>'+
            '<tr>'+
            '  <td colspan="3">'+
            '      Justificativa de Recusa: '+ JUST +'<br>'+
			'      Sua solicitação foi <strong><span style="color: #FF5B00;">FINALIZADA</span></strong>.'
            '  </td>'+
            '</tr>';

		var destinatariosAproCEO = getMails("C002 - Solicitantes");
		destinatariosAproCEO.add(mailSolicitante);
		enviarEmail(nameSolicitante, solFluig, dataSolicitacao, "Recusa - CEO", mail, loginSolicitante, destinatariosAproCEO);
	}else{
		if(ALMOX == "Interno"){
			//log.info(">>> ALMOX == INTERNO");
			matriculacandidato 		= hAPI.getCardValue("txtMatCandi");
		}

		/*var cardFields = hAPI.getCardData(getValue("WKNumProces"));
		var it = cardFields.keySet().iterator();

		while (it.hasNext()) {
			var key = it.next();
			//log.info(">>> Campo: " + key + " = " + cardFields.get(key));
		}*/

		if(mailSolicitante != "" && ALMOX == "Externo"){
			//log.info(">>> mailSolicitante != '' && ALMOX == 'Externo'");

			var calcadocandidato 	= hAPI.getCardValue("calcado");
			var calcacandidato 		= hAPI.getCardValue("calca");
			var camisetacandidato 	= hAPI.getCardValue("camisaTamanho");
			var sexocandidato		= hAPI.getCardValue("slcSexo");

			mail = 
             	'<tr>'+
         	 	'  <td colspan="3">Prezado(a), <br>'+
         	 	'      Informamos que sua solicitação foi <strong><span style="color: #A3BD31;">finalizada com sucesso</span></strong>!<br>'+
         	 	'  </td>'+
         	 	'</tr>'+
         	 	'<tr>'+
         	 	'  <td colspan="3">'+
         	 	'      Deve-se ser aberta uma <strong><span style="color: #A3BD31;">REQUISIÇÃO DE COMPRA</span></strong> para os uniformes do novo funcionário.'+
         	 	'  </td>'+
         	 	'</tr>'+
         	 	'<tr><td></td></tr>'+
         	 	'<tr>'+
         	 	'  <td colspan="4" style="padding: 0px">'+
         	 	'    <table>'+
         	 	'      <tr>'+
         	 	'        <td style="padding-right: 0px; width: 20%;">'+
         	 	'          <strong>Informações do Funcionário</strong>'+
         	 	'        </td>'+
         	 	'        <td style="padding: 1px; padding-right: 10px; width: 80%;">'+
         	 	'          <table>'+
         	 	'            <tr style="width: 100%;">'+
         	 	'              <td style="padding: 1px; background-color: rgb(0, 0, 0);"></td>'+
         	 	'            </tr>'+
         	 	'          </table>'+
         	 	'        </td>'+
         	 	'      </tr>'+
         	 	'    </table>'+
         	 	'  </td>'+
         	 	'</tr>'+
         	 	'<tr>'+
         	 	'  <td colspan="4" style="padding: 0px">'+
         	 	'    <table>'+
         	 	'      <tr>'+
         	 	'        <td><strong>Nome: </strong><span style="color: #A3BD31;">'+ nomecandidato +'</span></td>'+
         	 	'        <td><strong>N° Matrícula: </strong><span style="color: #A3BD31;">'+ matriculacandidato +'</span></td>'+
         	 	'      </tr>'+
         	 	'      <tr>'+
         	 	'        <td><strong>Cargo: </strong><span style="color: #A3BD31;">'+ cargocandidato +'</span></td>'+
         	 	'        <td><strong>Setor: </strong><span style="color: #A3BD31;">'+ setorcandidato +'</span></td>'+
         	 	'        <td><strong>Admissão: </strong><span style="color: #A3BD31;">'+ datacandidato +'</span></td>'+
         	 	'      </tr>'+
         	 	'      <tr>'+
         	 	'        <td><strong>Calçado: </strong><span>'+ calcadocandidato +'</span></td>'+
         	 	'        <td><strong>Calça: </strong><span>'+ calcacandidato +'</span></td>'+
         	 	'        <td><strong>Camisa/Camiseta: </strong><span>'+ camisetacandidato +'</span></td>'+
         	 	'        <td><strong>Sexo: </strong><span>'+ sexocandidato +'</span></td>'+
         	 	'      </tr>'+
         	 	'  </table>'+
         	 	'  </td> '+
         	 	'</tr>';

			enviarEmail(nameSolicitante, solFluig, dataSolicitacao, "Processo Admissional - FINALIZADO", mail, loginSolicitante, mailSolicitante);
		}

		if(mailSolicitante != "" && ALMOX != "Externo"){
			//log.info(">>> mailSolicitante != '' && ALMOX != 'Externo'");

			mail = 
             	'<tr>'+
                '    <td colspan="3">Prezado(a), <br>'+
                '        Informamos que sua solicitação foi <strong><span style="color: #A3BD31;">finalizada com sucesso</span></strong>!<br>'+
                '    </td>'+
                '</tr>'+
                '<tr><td></td></tr>'+
                '<tr>'+
                '    <td colspan="3" style="padding: 0px">'+
                '        <table>'+
                '            <tr>'+
                '                <td style="padding-right: 0px; width: 20%;">'+
                '                    <strong>Informações do Funcionário</strong>'+
                '                </td>'+
                '                <td style="padding: 1px; padding-right: 10px; width: 80%;">'+
                '                    <table>'+
                '                        <tr style="width: 100%;">'+
                '                            <td style="padding: 1px; background-color: rgb(0, 0, 0);"></td>'+
                '                        </tr>'+
                '                    </table>'+
                '                </td>'+
                '            </tr>'+
                '        </table>'+
                '    </td>'+
                '</tr>'+
                '<tr>'+
                '    <td colspan="3" style="padding: 0px">'+
                '        <table>'+
                '            <tr>'+
                '                <td><strong>Nome: </strong><span style="color: #A3BD31;">'+ nomecandidato +'</span></td>'+
                '                <td><strong>N° Matrícula: </strong><span style="color: #A3BD31;">'+ matriculacandidato +'</span></td>'+
                '            </tr>'+
                '            <tr>'+
                '                <td><strong>Cargo: </strong><span style="color: #A3BD31;">'+ cargocandidato +'</span></td>'+
                '                <td><strong>Setor: </strong><span style="color: #A3BD31;">'+ setorcandidato +'</span></td>'+
                '                <td><strong>Admissão: </strong><span style="color: #A3BD31;">'+ datacandidato +'</span></td>'+
                '            </tr>'+
                '        </table>'+
                '    </td>'+
                '</tr>';

			enviarEmail(nameSolicitante, solFluig, dataSolicitacao, "Processo Admissional - FINALIZADO", mail, loginSolicitante, mailSolicitante);
		}
		
		if(ALMOX == "Externo"){
			//log.info(">>> ALMOX == 'Externo'");

			var calcadocandidato 	= hAPI.getCardValue("calcado");
			var calcacandidato 		= hAPI.getCardValue("calca");
			var camisetacandidato 	= hAPI.getCardValue("camisaTamanho");
			var sexocandidato		= hAPI.getCardValue("slcSexo");
			
			mail = 
             	'<tr>'+
                '    <td colspan="4">Prezados, <br>'+
                '        Informamos que haverá um novo funcionário em nossa empresa!<br>'+
                '    </td>'+
                '</tr>'+
                '<tr>'+
                '    <td colspan="3">'+
                '        Um e-mail foi encaminhado ao gestor responsável, <strong><span style="color: #A3BD31;">'+ nameSolicitante +'</span></strong>, orientando-o a abrir uma requisição de compra referente aos uniformes necessários para o novo funcionário.'+
                '    </td>'+
                '</tr>'+
                '<tr><td></td></tr>'+
                '<tr>'+
                '    <td colspan="4" style="padding: 0px">'+
                '        <table>'+
                '            <tr>'+
                '                <td style="padding-right: 0px; width: 20%;">'+
                '                    <strong>Informações do Funcionário</strong>'+
                '                </td>'+
                '                <td style="padding: 1px; padding-right: 10px; width: 80%;">'+
                '                    <table>'+
                '                        <tr style="width: 100%;">'+
                '                            <td style="padding: 1px; background-color: rgb(0, 0, 0);"></td>'+
                '                        </tr>'+
                '                    </table>'+
                '                </td>'+
                '            </tr>'+
                '        </table>'+
                '    </td>'+
                '</tr>'+
                '<tr>'+
                '    <td colspan="4" style="padding: 0px">'+
                '        <table>'+
                '            <tr>'+
                '                <td><strong>Nome: </strong><span style="color: #A3BD31;">'+ nomecandidato +'</span></td>'+
                '                <td><strong>N° Matrícula: </strong><span style="color: #A3BD31;">'+ matriculacandidato +'</span></td>'+
                '            </tr>'+
                '            <tr>'+
                '                <td><strong>Cargo: </strong><span style="color: #A3BD31;">'+ cargocandidato +'</span></td>'+
                '                <td><strong>Setor: </strong><span style="color: #A3BD31;">'+ setorcandidato +'</span></td>'+
                '                <td><strong>Admissão: </strong><span style="color: #A3BD31;">'+ datacandidato +'</span></td>'+
                '            </tr>'+
                '            <tr>'+
                '                <td><strong>Calçado: </strong><span>'+ calcadocandidato +'</span></td>'+
                '                <td><strong>Calça: </strong><span>'+ calcacandidato +'</span></td>'+
                '                <td><strong>Camisa/Camiseta: </strong><span>'+ camisetacandidato +'</span></td>'+
                '                <td><strong>Sexo: </strong><span>'+ sexocandidato +'</span></td>'+
                '            </tr>'+
                '        </table>'+
                '    </td>'+
                '</tr>';

			var destinatariosAlmox = getMails("C002 - Solicitantes");
			enviarEmail(nameSolicitante, solFluig, dataSolicitacao, "Processo Admissional - FINALIZADO", mail, loginSolicitante, destinatariosAlmox);
		}
	}
}				