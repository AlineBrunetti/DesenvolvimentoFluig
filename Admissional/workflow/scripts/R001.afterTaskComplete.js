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
	var parametros = new java.util.HashMap();
      var mailSuporte = getMails("ZZZ_Fluig");
      parametros.put("SOLICITANTE"		, nameSolicitante);
	parametros.put("SOLFLUIG"		, String(solFluig));
	parametros.put("DATASOLICITACAO"	, dataSolicitacao);
      parametros.put("TITULO"	            , titulo);
	parametros.put("INFOEMAIL"	      , mail);
      parametros.put("SUPORTE"			, mailSuporte);

      log.info("------> R001.Dados - " + loginSolicitante + ", " + parametros + ", " + destinatarios);

	try{
		parametros.put("subject", "Processo Admissional - ( " + solFluig + " )");
		
		notifier.notify(loginSolicitante, "EmailPadronizado", parametros, destinatarios, "text/html");

	} catch(e){
		log.info("------> R001.AFTERTASKCOMPLETE ERROR - " + e); 
	}
}
function afterTaskComplete(colleagueId,nextSequenceId,userList){

	var solFluig     		 = getValue("WKNumProces");
	var atividade 		 = getValue("WKNumState");
	
	var nameSolicitante      = hAPI.getCardValue("txtSolicitante");
	var loginSolicitante     = hAPI.getCardValue("txtMatSolic");
	var dataSolicitacao	 = hAPI.getCardValue("txtDataSolicitacao");
      var titulo = "";
	var mail = "";

      //ALMOX E TI
      var nomecandidato 	= hAPI.getCardValue("txtCandidato");
	var matriculacandidato  = hAPI.getCardValue("txtMatricula");
	var cargocandidato 	= hAPI.getCardValue("txtCargo");
	var setorcandidato 	= hAPI.getCardValue("txtSetor");
	var datacandidato 	= hAPI.getCardValue("txtDataAdmissao");

	var ALMOX			= hAPI.getCardValue("slcRec");
      var TI 			= hAPI.getCardValue("radioEquipTI");

      var destinatarios = "";

      //Remuneração
      if(nextSequenceId == 5 && atividade == 4) {
            titulo = "Selecionar o Motivo da Vaga";
            mail = 
                  '<tr>'+
                  '  <td colspan="3">Prezado(a), <br>'+
                  '      Informamos que a Solicitação de Admissão <strong><span style="color: #A3BD31;">'+ String(solFluig) +'</span></strong> chegou em sua central de tarefas!<br>'+
                  '  </td>'+
                  '</tr>'+
                  '<tr>'+
                  '  <td colspan="3">'+
                  '      Localização: <strong><span style="color: #A3BD31;">Remuneração - Selecionar o Motivo da Vaga </span></strong><br>'+
                  '  </td>'+
                  '</tr>';
            destinatarios = getMails("C002 - Solicitantes");
            enviarEmail(nameSolicitante, solFluig, dataSolicitacao, titulo, mail, loginSolicitante, destinatarios);
      }else if(nextSequenceId == 74 && (atividade == 80 || atividade == 38)) {
            titulo = "Ofertar Contraproposta";
            mail = 
                  '<tr>'+
                  '  <td colspan="3">Prezado(a), <br>'+
                  '      Informamos que a Solicitação de Admissão <strong><span style="color: #A3BD31;">'+ String(solFluig) +'</span></strong> chegou em sua central de tarefas!<br>'+
                  '  </td>'+
                  '</tr>'+
                  '<tr>'+
                  '  <td colspan="3">'+
                  '      Localização: <strong><span style="color: #A3BD31;">Remuneração - Ofertar Contraproposta </span></strong><br>'+
                  '  </td>'+
                  '</tr>';
            destinatarios = getMails("C002 - Solicitantes");
            enviarEmail(nameSolicitante, solFluig, dataSolicitacao, titulo, mail, loginSolicitante, destinatarios);
      }//Diretor Area Solicitante
      else if(nextSequenceId == 18 && atividade == 5) {
            titulo = "Aprovar a Abertura de Vaga";
            mail = 
                  '<tr>'+
                  '  <td colspan="3">Prezado(a), <br>'+
                  '      Informamos que a Solicitação de Admissão <strong><span style="color: #A3BD31;">'+ String(solFluig) +'</span></strong> chegou em sua central de tarefas!<br>'+
                  '  </td>'+
                  '</tr>'+
                  '<tr>'+
                  '  <td colspan="3">'+
                  '      Localização: <strong><span style="color: #A3BD31;">Diretoria - Aprovar a Abertura de Vaga </span></strong><br>'+
                  '  </td>'+
                  '</tr>';
            destinatarios = getMails("C002 - Solicitantes");
            enviarEmail(nameSolicitante, solFluig, dataSolicitacao, titulo, mail, loginSolicitante, destinatarios);
      }//Gestor RH
      else if(nextSequenceId == 24 && atividade == 20) {
            titulo = "Aprovar a Abertura de Vaga";
            mail = 
                  '<tr>'+
                  '  <td colspan="3">Prezado(a), <br>'+
                  '      Informamos que a Solicitação de Admissão <strong><span style="color: #A3BD31;">'+ String(solFluig) +'</span></strong> chegou em sua central de tarefas!<br>'+
                  '  </td>'+
                  '</tr>'+
                  '<tr>'+
                  '  <td colspan="3">'+
                  '      Localização: <strong><span style="color: #A3BD31;">Gestor de RH - Aprovar a Abertura de Vaga </span></strong><br>'+
                  '  </td>'+
                  '</tr>';
            destinatarios = getMails("C002 - Solicitantes");
            enviarEmail(nameSolicitante, solFluig, dataSolicitacao, titulo, mail, loginSolicitante, destinatarios);
      }else if(nextSequenceId == 75 && atividade == 92) {
            titulo = "Aprovar Contraproposta";
            mail = 
                  '<tr>'+
                  '  <td colspan="3">Prezado(a), <br>'+
                  '      Informamos que a Solicitação de Admissão <strong><span style="color: #A3BD31;">'+ String(solFluig) +'</span></strong> chegou em sua central de tarefas!<br>'+
                  '  </td>'+
                  '</tr>'+
                  '<tr>'+
                  '  <td colspan="3">'+
                  '      Localização: <strong><span style="color: #A3BD31;">Gestor de RH - Aprovar Contraproposta </span></strong><br>'+
                  '  </td>'+
                  '</tr>';
            destinatarios = getMails("C002 - Solicitantes");
            enviarEmail(nameSolicitante, solFluig, dataSolicitacao, titulo, mail, loginSolicitante, destinatarios);
      }//CEO
      else if(nextSequenceId == 30 && atividade == 26) {
            titulo = "Aprovar a Abertura de Vaga";
            mail = 
                  '<tr>'+
                  '  <td colspan="3">Prezado(a), <br>'+
                  '      Informamos que a Solicitação de Admissão <strong><span style="color: #A3BD31;">'+ String(solFluig) +'</span></strong> chegou em sua central de tarefas!<br>'+
                  '  </td>'+
                  '</tr>'+
                  '<tr>'+
                  '  <td colspan="3">'+
                  '      Localização: <strong><span style="color: #A3BD31;">CEO - Aprovar a Abertura de Vaga </span></strong><br>'+
                  '  </td>'+
                  '</tr>';
            destinatarios = getMails("C002 - Solicitantes");
            enviarEmail(nameSolicitante, solFluig, dataSolicitacao, titulo, mail, loginSolicitante, destinatarios);
      }//Recrutamento e Seleção
      else if(nextSequenceId == 36 && (atividade == 32 || atividade == 26 || atividade == 92 || atividade == 80 || atividade == 103)) {
            titulo = "Apontar Candidato";
            mail = 
                  '<tr>'+
                  '  <td colspan="3">Prezado(a), <br>'+
                  '      Informamos que a Solicitação de Admissão <strong><span style="color: #A3BD31;">'+ String(solFluig) +'</span></strong> chegou em sua central de tarefas!<br>'+
                  '  </td>'+
                  '</tr>'+
                  '<tr>'+
                  '  <td colspan="3">'+
                  '      Localização: <strong><span style="color: #A3BD31;">R&S - Apontar Candidato </span></strong><br>'+
                  '  </td>'+
                  '</tr>';
            destinatarios = getMails("C002 - Solicitantes");
            enviarEmail(nameSolicitante, solFluig, dataSolicitacao, titulo, mail, loginSolicitante, destinatarios);
      }else if(nextSequenceId == 97 && atividade == 103) {
            titulo = "Apontar Data de Admissão";
            mail = 
                  '<tr>'+
                  '  <td colspan="3">Prezado(a), <br>'+
                  '      Informamos que a Solicitação de Admissão <strong><span style="color: #A3BD31;">'+ String(solFluig) +'</span></strong> chegou em sua central de tarefas!<br>'+
                  '  </td>'+
                  '</tr>'+
                  '<tr>'+
                  '  <td colspan="3">'+
                  '      Localização: <strong><span style="color: #A3BD31;">R&S - Apontar Data de Admissão </span></strong><br>'+
                  '  </td>'+
                  '</tr>';
            destinatarios = getMails("C002 - Solicitantes");
            enviarEmail(nameSolicitante, solFluig, dataSolicitacao, titulo, mail, loginSolicitante, destinatarios);
      }//Medicina do Trabalho
      else if(nextSequenceId == 41 && atividade == 38) {
            titulo = "Exame Médico";
            mail = 
                  '<tr>'+
                  '  <td colspan="3">Prezado(a), <br>'+
                  '      Informamos que a Solicitação de Admissão <strong><span style="color: #A3BD31;">'+ String(solFluig) +'</span></strong> chegou em sua central de tarefas!<br>'+
                  '  </td>'+
                  '</tr>'+
                  '<tr>'+
                  '  <td colspan="3">'+
                  '      Localização: <strong><span style="color: #A3BD31;">Medicina - Exame Médico </span></strong><br>'+
                  '  </td>'+
                  '</tr>';
            destinatarios = getMails("C002 - Solicitantes");
            enviarEmail(nameSolicitante, solFluig, dataSolicitacao, titulo, mail, loginSolicitante, destinatarios);
      }//ADM Pessoal
      else if(nextSequenceId == 47 && atividade == 98) {
            titulo = "Cadastrar Novo Funcionário";
            mail = 
                  '<tr>'+
                  '  <td colspan="3">Prezado(a), <br>'+
                  '      Informamos que a Solicitação de Admissão <strong><span style="color: #A3BD31;">'+ String(solFluig) +'</span></strong> chegou em sua central de tarefas!<br>'+
                  '  </td>'+
                  '</tr>'+
                  '<tr>'+
                  '  <td colspan="3">'+
                  '      Localização: <strong><span style="color: #A3BD31;">ADM Pessoal - Cadastrar Novo Funcionário </span></strong><br>'+
                  '  </td>'+
                  '</tr>';
            destinatarios = getMails("C002 - Solicitantes");
            enviarEmail(nameSolicitante, solFluig, dataSolicitacao, titulo, mail, loginSolicitante, destinatarios);
      }
      //ALMOX
      if(ALMOX == "Interno"){
		//log.info(">>> ALMOX == INTERNO");
		matriculacandidato 		= hAPI.getCardValue("txtMatCandi");

            //log.info(">>> mailSolicitante != '' && ALMOX != 'Externo'");

            mail = 
            '<tr>'+
       	'  <td colspan="3">Prezado(a), <br>'+
       	'      Informamos que sua solicitação está quase concluída!<br>'+
       	'  </td>'+
       	'</tr>'+
       	'<tr>'+
       	'  <td colspan="3">'+
            '      No momento, ela está com o setor de Tecnologia da Informação.<br>'+
       	'      Você será notificado novamente quando ela for finalizada.'+
       	'  </td>'+
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
		//log.info(">>> mailSolicitante != '' && ALMOX == 'Externo'");
		var calcadocandidato 	= hAPI.getCardValue("calcado");
		var calcacandidato 	= hAPI.getCardValue("calca");
		var camisetacandidato 	= hAPI.getCardValue("camisaTamanho");
		var sexocandidato		= hAPI.getCardValue("slcSexo");

		mail = 
       	'<tr>'+
       	'  <td colspan="3">Prezado(a), <br>'+
       	'      Informamos que sua solicitação está quase concluída!<br>'+
       	'  </td>'+
       	'</tr>'+
       	'<tr>'+
       	'  <td colspan="3">'+
            '      No momento, ela está com o setor de Tecnologia da Informação.<br>'+
       	'      Enquanto isso, pedimos que abra uma <strong><span style="color: #A3BD31;">REQUISIÇÃO DE COMPRA</span></strong> para os uniformes do novo funcionário.'+
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
            enviarEmail(nameSolicitante, solFluig, dataSolicitacao, "Requisitar Uniformes e EPI's", mail, loginSolicitante, destinatarios)
	}
      //TI
      if(TI == "true" && atividade == 130){
		//log.info(">>> TI == 'true'");
            var mailTI = "";
            var tituloTI = "";
            var infoFluig = "";
		var infoBI = "";
		
		var inforecursos = "", inforecursos1 = "";
		var infoequipamentos = "", infoequipamentos1 = "";
		var infoacessos = "", infoacessos1 = "";

            var totvsTF = false;
            var sharepointTF = false;

		if(hAPI.getCardValue("totvs") 		== "on" ||
		hAPI.getCardValue("sharepoint") == "on" ||
		hAPI.getCardValue("BI") 		== "BI" ||
		hAPI.getCardValue("fluig") 		== "fluig" ){
			var col3 = "";
			if (hAPI.getCardValue("totvs") == "totvs"){
                        col3 += "Totvs<br>";
                        totvsTF = true;
                  } 			
			if (hAPI.getCardValue("sharepoint") == "sharepoint"){
                        col3 += "Sharepoint<br>";
                        sharepointTF = true;
                  } 		
			if (hAPI.getCardValue("BI") == "BI"){
				col3 += "Power BI<br>";
                        var BI = hAPI.getCardValue("txtInfBI");
				infoBI = 
					'<table>'+
					'	<tr>'+
					'		<td style="padding-right: 0px; width: 15%;">'+
					'			<strong>Informações BI</strong>'+
					'		</td>'+
					'		<td style="padding: 1px; padding-right: 10px; width: 85%;">'+
					'			<table>'+
					'				<tr style="width: 100%;">'+
					'					<td style="padding: 1px; background-color: rgb(0, 0, 0);"></td>'+
					'				</tr>'+
					'			</table>'+
					'		</td>'+
					'	</tr>'+
					'	<tr>'+
					'		<td>'+
								BI+
					'		</td>'+
					'	</tr>'+
					'</table>';
			}
			if (hAPI.getCardValue("fluig") == "fluig"){
				col3 += "Fluig<br>";
                        var fluig = hAPI.getCardValue("txtInfFluig");
				infoFluig =
					'<table>'+
					' 	<tr>'+
					'   	<td style="padding-right: 0px; width: 15%;">'+
					'      		<strong>Informações Fluig</strong>'+
					'    	</td>'+
					'    	<td style="padding: 1px; padding-right: 10px; width: 85%;">'+
					'      		<table>'+
					'        		<tr style="width: 100%;">'+
					'          			<td style="padding: 1px; background-color: rgb(0, 0, 0);"></td>'+
					'        		</tr>'+
					'      		</table>'+
					'    	</td>'+
					'  </tr>'+
					'  <tr>'+
					'    <td>'+
							fluig+
					'    </td>'+
					'  </tr>'+
					'</table>';
			} 
			inforecursos =
				'<td style="padding-right: 0px; width: 7%;">'+
					'<strong>Recursos</strong>'+
				'</td>'+
				'<td style="padding: 1px; padding-right: 10px; width: 26%; border-right: 1px solid rgb(0, 0, 0);">'+
					'<table>'+
						'<tr style="width: 100%;">'+
							'<td style="padding: 1px; background-color: rgb(0, 0, 0);"></td>'+
						'</tr>'+
					'</table>'+
				'</td>';
			inforecursos1 =
				'<td colspan="2" style="border-right: 1px solid rgb(0, 0, 0);">'+
					col3+
				'</td>';
		}
		if(hAPI.getCardValue("chip") 	== "on" ||
		hAPI.getCardValue("celular") 	== "on" ||
		hAPI.getCardValue("notebook") 	== "on" ||
		hAPI.getCardValue("desktop") 	== "on" ){
			var col1 = "";
			if (hAPI.getCardValue("chip") == "on") 			col1 += "Chip<br>";
			if (hAPI.getCardValue("celular") == "on") 		col1 += "Celular<br>";
			if (hAPI.getCardValue("notebook") == "on") 		col1 += "Notebook<br>";
			if (hAPI.getCardValue("desktop") == "on") 		col1 += "Computador Desktop<br>";
			infoequipamentos =
				'<td style="padding-right: 0px; width: 11%;">'+
                              '<strong>Equipamentos</strong>'+
                        '</td>'+
                        '<td style="padding: 1px; padding-right: 10px; width: 23%; border-right: 1px solid rgb(0, 0, 0);">'+
                              '<table>'+
                              '<tr style="width: 100%;">'+
                                    '<td style="padding: 1px; background-color: rgb(0, 0, 0);"></td>'+
                              '</tr>'+
                              '</table>'+
                        '</td>';
			infoequipamentos1 =
				'<td colspan="2" style="border-right: 1px solid rgb(0, 0, 0);">'+
					col1+
				'</td>';
		}
		if(hAPI.getCardValue("rede") 		== "on" ||
		hAPI.getCardValue("email") 		== "on" ||
		hAPI.getCardValue("wifi") 		== "on"){
                  var col2 = "";
			if (hAPI.getCardValue("rede") == "on") 			col2 += "Rede<br>";
			if (hAPI.getCardValue("email") == "on") 		col2 += "E-mail<br>";
			if (hAPI.getCardValue("wifi") == "on") 			col2 += "Wi-Fi Colaborador<br>";
			infoacessos = 
				'<td style="padding-right: 0px; width: 7%;">'+
                  '<strong>Acessos</strong>'+
              '</td>'+
              '<td style="padding: 1px; padding-right: 10px; width: 26%;">'+
                  '<table>'+
                      '<tr style="width: 100%;">'+
                          '<td style="padding: 1px; background-color: rgb(0, 0, 0);"></td>'+
                      '</tr>'+
                  '</table>'+
              '</td>';
			infoacessos1 =
				'<td colspan="2">'+
					col2+
				'</td>';
		}

		mailTI = 

                  '<tr>'+
                  '    <td colspan="4">Prezados, <br>'+
                  '        Informamos que haverá um novo funcionário em nossa empresa!<br><br>'+
                  '        <span style="background-color: #A3BD31; padding: 5px;">Lembre-se de verificar seu Fluig para concluir sua parte do processo!</span>'+
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
                  '        </table>'+
                  '    </td>'+
                  '</tr>'+
                  '<tr>'+
                  '    <td colspan="4" style="padding: 0px">'+
                  '        <table cellpadding="10" cellspacing="0" border="0" style="background-color: #f9f9f9; border: 1px solid #ccc; width: 100%;">'+
                  '            <tr>'+
                  '                <table>'+
                  '                        <tr>'+
                                                inforecursos +
                                                infoequipamentos +
                                                infoacessos +
                  '                        </tr>'+
                  '                        <tr>'+
                                                inforecursos1 +
                                                infoequipamentos1 +
                                                infoacessos1 +
                  '                        </tr>'+
                  '                  </table>'+
                                    infoFluig+
                                    infoBI+
                  '            </tr>'+
                  '        </table>'+
                  '    </td>'+
                  '</tr>';
            
            if(totvsTF){
                  tituloTI = "Liberar Recurso - Totvs"
                  var destinatariostotvs = getMails("C001 - Planejamento Financeiro")
                  var mailTITotvs = mailTI.replace(
                  "Totvs<br>",
                  'Totvs <span style="background-color: #A3BD31; padding: 3px;">- recurso solicitado</span><br>'
                  );
                  enviarEmail(nameSolicitante, solFluig, dataSolicitacao, tituloTI, mailTITotvs, loginSolicitante, destinatariostotvs);
            }
            if(sharepointTF || hAPI.getCardValue("chip") == "on" ||
		hAPI.getCardValue("celular") 	== "on" || hAPI.getCardValue("notebook") == "on" ||
		hAPI.getCardValue("desktop") 	== "on" || hAPI.getCardValue("rede") == "on" ||
		hAPI.getCardValue("email") == "on" || hAPI.getCardValue("wifi") == "on"){
                  var mailTIEquipAcess = mailTI;
                  var destinatariosInfra = getMails("C001 - Planejamento Financeiro")
                  if(sharepointTF == true){
                        tituloTI = "| Sharepoint "
                        mailTIEquipAcess = mailTIEquipAcess.replace(
                        "Sharepoint<br>",
                        'Sharepoint <span style="background-color: #A3BD31; padding: 3px;">- recurso solicitado</span><br>'
                        );
                  }
                  if(infoequipamentos != ""){
                        tituloTI += "| Equipamentos "
                        mailTIEquipAcess = mailTIEquipAcess.replace(
                        "<strong>Equipamentos</strong>",
                        '<strong style="background-color: #A3BD31; padding: 3px;">Equipamentos</strong>'
                        );
                  }
                  if(infoacessos != ""){
                        tituloTI += "| Acessos"
                        mailTIEquipAcess = mailTIEquipAcess.replace(
                        "<strong>Acessos</strong>",
                        '<strong style="background-color: #A3BD31; padding: 3px;">Acessos</strong>'
                        );
                  }
                  enviarEmail(nameSolicitante, solFluig, dataSolicitacao, tituloTI, mailTIEquipAcess, loginSolicitante, destinatariosInfra);
            }
            if(infoBI != ""){
                  tituloTI = "Liberar Recurso - BI"
                  var destinatariosBI = getMails("C001 - Planejamento Financeiro")
                  var mailTIBI = mailTI.replace(
                  "Power BI<br>",
                  'Power BI <span style="background-color: #A3BD31; padding: 3px;">- recurso solicitado</span><br>'
                  );
                  enviarEmail(nameSolicitante, solFluig, dataSolicitacao, tituloTI, mailTIBI, loginSolicitante, destinatariosBI);
            }
            if(infoFluig != ""){
                  tituloTI = "Liberar Recurso - Fluig"
                  var destinatariosFluig = getMails("C001 - Planejamento Financeiro")
                  var mailTIFluig = mailTI.replace(
                  "Fluig<br>",
                  'Fluig <span style="background-color: #A3BD31; padding: 3px;">- recurso solicitado</span><br>'
                  );
                  enviarEmail(nameSolicitante, solFluig, dataSolicitacao, tituloTI, mailTIFluig, loginSolicitante, destinatariosFluig);
            }
	}
}
  