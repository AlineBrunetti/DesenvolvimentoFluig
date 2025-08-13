var salarioOriginal = "";
var contraproposta1 = "";
var beneficios1 ="";
var tableHistorico;
var columnsHistorico;
var historicoRegistrado = false;
var evento = "";
var candidato1 = ""
$(document).ready(function() {

	numeroProcesso = getWKNumProces();
	numeroAtividade = getWKNumState();
	codigoEmpresa = getTenantCode();
	codigoUsuario = getUserCode();
	loginUsuario = getUserLogin();
	emailUsuario = getUserEmail();
	nomeUsuario = getUserName();
	modoMobile = getWKMobile();
	modoEdicao = getEditMode();
	modoForm = getFormMode();
  
	// carrega controles de zoom (form_zoom)
	setTimeout(function() { carregaZoom(); }, 1);
	fnAtivaData();

	//mascara matricula e numero de telefone

	$('#txtSalario1, #txtSalario, #txtSalarioRecru').on('input', aplicarFormatacao);

	// Força o valor com R$ se já tiver algum valor inicial
	$('#txtSalario1, #txtSalario, #txtSalarioRecru').each(function () {
		if ($(this).val().trim() !== '') {
			aplicarFormatacao({ target: this });
		}
	});

	$('#txtMatCandi').on('input', function () {
		let valor = $(this).val().replace(/\D/g, '');
		$(this).val(valor);
	});

	$('#txtCelCandi').on('input', function() {
		  var phoneNumber = $(this).val().replace(/\D/g, '');
		  if (phoneNumber.length < 10) {
			  $(this).mask('(00) 000-000000');
		  } else {
			  $(this).mask('(00) 00000-0000');
		  }
	});
	
	if ($("#slcAceite").val() != "" && numeroAtividade != 47 && numeroAtividade != 41) {
		var container = $("#divInfoSol").parent();

		var divInfoSol = $("#divInfoSol").detach();
		var divAbeVag = $("#divAbeVag").detach();
		var divAtvDesPerfNec = $("#divAtvDesPerfNec").detach();
		var divInfVag = $("#divInfVag").detach();
		var divInfTec = $("#divInfTec").detach();
		var divRemu = $("#divRemu").detach();
		var divAprov = $("#divAprov").detach();
		var divRecru = $("#divRecru").detach();
		var divMed = $("#divMed").detach();
		var divADMP = $("#divADMP").detach();
		var fieldHistorico = $("#fieldHistorico").detach();
		var rodape = $("#rodape").detach();

		container.append(divInfoSol);
		container.append(fieldHistorico);
		container.append(divADMP);
		container.append(divMed);
		container.append(divRecru);
		container.append(divRemu);
		container.append(divAprov);
		container.append(divAbeVag); 
		container.append(divAtvDesPerfNec);
		container.append(divInfVag); 
		container.append(divInfTec);
		container.append(rodape);
	}

	salarioOriginal = $("#txtSalario1").val();
	contraproposta1 = $("#txtSalario").val();
	beneficios1 = $("#txtBenExtRemu").val();
	candidato1 = $("#txtCandidato").val();

	//Botão de troca de tema
	loadTheme();
	const changeThemeBtn = document.querySelector("#change-theme");
	if (changeThemeBtn) {
	  changeThemeBtn.addEventListener("change", () => {
		toggleDarkMode();
  
		// persiste/remover preferência
		if (document.body.classList.contains("dark")) {
		  localStorage.setItem("dark", "1");
		} else {
		  localStorage.removeItem("dark");
		}
		});
	}

	$("#botaoAnexo").on("click", function (param) {
	JSInterface.showCamera(param);
	});

	// CONFORME ATIVIDADE
	if (numeroAtividade == 0 || numeroAtividade == 4) {
	  	toggleEquipTI();
	  	toggleInfoBI();
	  	toggleInfoFluig();
		toggleSubstituicao()

		$("#slcSubst").on("change", toggleSubstituicao);
	  	$("input[name='slcEquipTI']").on("change", toggleEquipTI);
	  	$("#BI").on("change", toggleInfoBI);
	  	$("#fluig").on("change", toggleInfoFluig);
	}
	if (numeroAtividade == 5 || numeroAtividade == 74) {
		toggleCamposSubstituicao();
		$("#slcMotVag").on("change", toggleCamposSubstituicao);
		if ($("#slcAceite").val() != "") {
			toggleProposta();
			$("input[name='proposta']").on("change", toggleProposta);
			$("#txtBenExtRemu").on("input", validarAlteracaoBeneficios);
			$("#txtSalario").on("input", validarAlteracaoSalario);
		}
	}
	if(numeroAtividade == 18){
		//Atribui a matrícula do CEO ao campo oculto para verificação se ele é o Diretor da área
		var grupo = "AG6";
		var c1 = DatasetFactory.createConstraint("groupId", grupo, grupo, ConstraintType.MUST);

		DatasetFactory.getDataset("colleagueGroup", ["groupId", "colleagueId"], [c1], null, {
			success: function(ds) {
				var login = ds.values[0].colleagueId;
				var campo = document.getElementById("codUsuarioAG6");
				if (campo) campo.value = login;
				console.log("Login preenchido:", login);	
			},
			error: function(err) {
				console.error("Erro ao consultar dataset:", err);
			}
		});
		toggleReadonlyByValue("slcAproDirAre", "txtJusDirAre", "Não");
	}
	if(numeroAtividade == 24 || numeroAtividade == 75){
		toggleReadonlyByValue("slcAproGesRH", "txtJusGesRH", "Não");

		if ($("#slcAceite").val() != "") {
			var container = $("#divInfoSol").parent();
	
			var divInfoSol = $("#divInfoSol").detach();
			var divAbeVag = $("#divAbeVag").detach();
			var divAtvDesPerfNec = $("#divAtvDesPerfNec").detach();
			var divInfVag = $("#divInfVag").detach();
			var divInfTec = $("#divInfTec").detach();
			var divRemu = $("#divRemu").detach();
			var divAprov = $("#divAprov").detach();
			var divRecru = $("#divRecru").detach();
			var divMed = $("#divMed").detach();
			var divADMP = $("#divADMP").detach();
			var fieldHistorico = $("#fieldHistorico").detach();
			var rodape = $("#rodape").detach();
	
			container.append(divInfoSol);
			container.append(fieldHistorico);
			container.append(divADMP);
			container.append(divMed);
			container.append(divRecru);
			container.append(divRemu);
			container.append(divAprov);
			container.append(divAbeVag); 
			container.append(divAtvDesPerfNec);
			container.append(divInfVag); 
			container.append(divInfTec);
			container.append(rodape);
		}
	}
	if(numeroAtividade == 30){
		toggleReadonlyByValue("slcAproCEO", "txtJusCEO", "Não");
	}
	if(numeroAtividade == 36 || numeroAtividade == 97){
		toggleCamposLocalRec();
		toggleDependentes();
		toggleCasado();
		toggleAceite();

		const aceiteOriginal    = $("#slcAceite").val();
		if($("#slcRec").val() == "Interno"){
			var matricula = $("#txtMatCandi").val();
		}else if($("#slcRec").val() == "Externo"){
			var email = $("#txtEmailCandi").val();
			var celular = $("#txtCelCandi").val();
			var calcado = $("#calcado").val();
			var calca = $("#calca").val();
			var camisa = $("#camisaTamanho").val();
			var sexo = $("#slcSexo").val();

			// Radios
			var possuiDependentes = $("input[name='dependentes']:checked").val();
			var ehCasado = $("input[name='casado']:checked").val();

			// Checkboxes - retornar true/false ou "Sim"/"Não"
			var rgCpf = $("#rgCpf").is(":checked");
			var tituloEleitor = $("#tituloEleitor").is(":checked");
			var certReservista = $("#certReservista").is(":checked");
			var agenciaContaItau = $("#agenciaContaItau").is(":checked");
			var comprovEscolaridade = $("#comprovEscolaridade").is(":checked");
			var comprovResidencia = $("#comprovResidencia").is(":checked");
			var cnhEmpilhadeira = $("#cnhEmpilhadeira").is(":checked");
			var certCursosGerais = $("#certCursosGerais").is(":checked");
			var carteiraProfissional = $("#carteiraProfissional").is(":checked");
			var foto3x4 = $("#foto3x4").is(":checked");
			var vacTetanoHepatiteFebre = $("#vacTetanoHepatiteFebre").is(":checked");
			var vacCovid = $("#vacCovid").is(":checked");

			// Dependentes
			var registroFilhos = $("#registroFilhos").is(":checked");
			var cpfFilhos = $("#cpfFilhos").is(":checked");
			var cadernetaVacFilhos = $("#cadernetaVacFilhos").is(":checked");
			var certFreqEscolar = $("#certFreqEscolar").is(":checked");

			// Casado
			var registroCasamento = $("#registroCasamento").is(":checked");
			var rgCpfConjuge = $("#rgCpfConjuge").is(":checked");
		}
		const $opcaoContra      = $("option[value='NegociacaoAceita']");
		var decisaoremuneracao = $('input[name="proposta"]:checked').val();
		var responsavelremuneracao = $("#txtResponsavelRemu2").val();
		var dataremuneracao = $("#txtDataAproRemu2").val();
		var contrapropostacandi = $("#txtSalarioRecru").val();
		var beneficioscandi = $("#txtBenExt").val();
		var localrecru = $("#slcRec").val();
		$("#txtCandidato").on("change", function () {
			
			const candidatoAtual = $(this).val();
			if($("#slcCanApt").val() != ""){
				$("#slcCanApt").val("");
				$("#txtResponsavelMed").val("");
				$("#txtDataAproMed").val("");
			}
			if (candidatoAtual === candidato1) {
				$("#slcAceite").val(aceiteOriginal);
				if(decisaoremuneracao == "proposta_s"){
					$opcaoContra.removeAttr("hidden");
				}
				$("#slcRec").val(localrecru);
				$("#divRemu2").show();
				$("input[name='proposta'][value='" + decisaoremuneracao + "']").prop("checked", true);
				$("#txtResponsavelRemu2").val(responsavelremuneracao);
				$("#txtDataAproRemu2").val(dataremuneracao);
				$("#txtSalario").val(contraproposta1);
				$("#txtBenExtRemu").val(beneficios1);
				$("#txtSalarioRecru").val(contrapropostacandi);
				$("#txtBenExt").val(beneficioscandi);
				if($("#slcRec").val() == "Interno"){
					$("#txtMatCandi").val(matricula);
				}else if($("#slcRec").val() == "Externo"){
					// Inputs e selects
					$("#txtEmailCandi").val(email);
					$("#txtCelCandi").val(celular);
					$("#calcado").val(calcado);
					$("#calca").val(calca);
					$("#camisaTamanho").val(camisa);
					$("#slcSexo").val(sexo);

					// Radios
					$("input[name='dependentes'][value='" + possuiDependentes + "']").prop("checked", true);
					$("input[name='casado'][value='" + ehCasado + "']").prop("checked", true);

					// Checkboxes
					$("#rgCpf").prop("checked", rgCpf);
					$("#tituloEleitor").prop("checked", tituloEleitor);
					$("#certReservista").prop("checked", certReservista);
					$("#agenciaContaItau").prop("checked", agenciaContaItau);
					$("#comprovEscolaridade").prop("checked", comprovEscolaridade);
					$("#comprovResidencia").prop("checked", comprovResidencia);
					$("#cnhEmpilhadeira").prop("checked", cnhEmpilhadeira);
					$("#certCursosGerais").prop("checked", certCursosGerais);
					$("#carteiraProfissional").prop("checked", carteiraProfissional);
					$("#foto3x4").prop("checked", foto3x4);
					$("#vacTetanoHepatiteFebre").prop("checked", vacTetanoHepatiteFebre);
					$("#vacCovid").prop("checked", vacCovid);

					$("#registroFilhos").prop("checked", registroFilhos);
					$("#cpfFilhos").prop("checked", cpfFilhos);
					$("#cadernetaVacFilhos").prop("checked", cadernetaVacFilhos);
					$("#certFreqEscolar").prop("checked", certFreqEscolar);

					$("#registroCasamento").prop("checked", registroCasamento);
					$("#rgCpfConjuge").prop("checked", rgCpfConjuge);

				}
			} else {
				$("#slcRec").val("");
				$("#slcAceite").val("");
				$opcaoContra.attr("hidden", true);
				//info remuneração
				$("#divRemu2").hide();
				$('input[name="proposta"]').prop("checked", false);
				$("#txtResponsavelRemu2").val("");
				$("#txtDataAproRemu2").val("");
				$("#txtSalario").val("");
				$("#txtBenExtRemu").val("");
				$("#txtSalarioRecru").val("");
				$("#txtBenExt").val("");
				//dados candidato
				if($("#slcRec").val() == "Interno"){
					$("#txtMatCandi").val("");
				}else if($("#slcRec").val() == "Externo"){
					// Inputs e selects
					$("#txtEmailCandi").val("");
					$("#txtCelCandi").val("");
					$("#calcado").val("");
					$("#calca").val("");
					$("#camisaTamanho").val("");
					$("#slcSexo").val("");

					// Radios
					$("input[name='dependentes']").prop("checked", false);
					$("input[name='casado']").prop("checked", false);

					// Checkboxes
					$("#rgCpf").prop("checked", false);
					$("#tituloEleitor").prop("checked", false);
					$("#certReservista").prop("checked", false);
					$("#agenciaContaItau").prop("checked", false);
					$("#comprovEscolaridade").prop("checked", false);
					$("#comprovResidencia").prop("checked", false);
					$("#cnhEmpilhadeira").prop("checked", false);
					$("#certCursosGerais").prop("checked", false);
					$("#carteiraProfissional").prop("checked", false);
					$("#foto3x4").prop("checked", false);
					$("#vacTetanoHepatiteFebre").prop("checked", false);
					$("#vacCovid").prop("checked", false);
					$("#registroFilhos").prop("checked", false);
					$("#cpfFilhos").prop("checked", false);
					$("#cadernetaVacFilhos").prop("checked", false);
					$("#certFreqEscolar").prop("checked", false);
					$("#registroCasamento").prop("checked", false);
					$("#rgCpfConjuge").prop("checked", false);

				}
			}
			toggleCamposLocalRec();
			toggleAceite();
		});
		$("#slcAceite").on("change", toggleAceite);
		$("#txtBenExt").on("input", validarAlteracaoBeneficios1);
		$("#txtSalarioRecru").on("input", validarAlteracaoSalario1);
		$("#slcRec").on("change", toggleCamposLocalRec);
		$("input[name='dependentes']").on("change", toggleDependentes);
		$("input[name='casado']").on("change", toggleCasado);
	}
	if(numeroAtividade == 41){
		var container = $("#divInfoSol").parent();

		var divInfoSol = $("#divInfoSol").detach();
		var divAbeVag = $("#divAbeVag").detach();
		var divAtvDesPerfNec = $("#divAtvDesPerfNec").detach();
		var divInfVag = $("#divInfVag").detach();
		var divInfTec = $("#divInfTec").detach();
		var divRemu = $("#divRemu").detach();
		var divAprov = $("#divAprov").detach();
		var divRecru = $("#divRecru").detach();
		var divMed = $("#divMed").detach();
		var divADMP = $("#divADMP").detach();
		var fieldHistorico = $("#fieldHistorico").detach();
		var rodape = $("#rodape").detach();

		container.append(divInfoSol);
		container.append(divMed);
		container.append(divRecru);
		container.append(divRemu);	
		container.append(divAprov);
		container.append(divAbeVag); 
		container.append(divAtvDesPerfNec);
		container.append(divInfVag);
		container.append(divInfTec);
		container.append(divADMP);
		container.append(fieldHistorico);
		container.append(rodape);
	}
	if(numeroAtividade == 47){
		var container = $("#divInfoSol").parent();

		var divInfoSol = $("#divInfoSol").detach();
		var divAbeVag = $("#divAbeVag").detach();
		var divAtvDesPerfNec = $("#divAtvDesPerfNec").detach();
		var divInfVag = $("#divInfVag").detach();
		var divInfTec = $("#divInfTec").detach();
		var divRemu = $("#divRemu").detach();
		var divAprov = $("#divAprov").detach();
		var divRecru = $("#divRecru").detach();
		var divMed = $("#divMed").detach();
		var divADMP = $("#divADMP").detach();
		var fieldHistorico = $("#fieldHistorico").detach();
		var rodape = $("#rodape").detach();

		container.append(divInfoSol);
		container.append(divADMP);
		container.append(divAbeVag); 
		container.append(divMed);
		container.append(divRecru);
		
		container.append(divRemu);	
		container.append(divAprov);
		
		container.append(divAtvDesPerfNec);
		container.append(divInfVag);
		container.append(divInfTec);
		container.append(fieldHistorico);
		container.append(rodape);
	}
  });

//filtro de money
function formataMoeda(valor) {
	valor = valor.replace(/\D/g, '');
	valor = (valor / 100).toFixed(2);
	valor = valor.replace('.', ',');
	valor = valor.replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
	return valor;
}

function aplicarFormatacao(event) {
	let input = event.target;
	let valor = input.value;

	// Remove tudo que não for número
	valor = valor.replace(/\D/g, '');

	if (valor === '') {
		input.value = 'R$ 0,00';
		return;
	}

	// Aplica a formatação
	valor = (valor / 100).toFixed(2);
	valor = valor.replace('.', ',');
	valor = valor.replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
	
	// Insere o R$
	input.value = 'R$ ' + valor;
}

//Ativação de Calendarios
function fnAtivaData(){
	$('.field-calendar').each(function () {
		let idCalendar = this.id;
		//se o campos existiver em readonly não ativa o calendário
		if ($('#' + idCalendar).attr('readonly') == 'readonly') {
			$('#' + idCalendar).removeClass('field-calendar');
			return;
		}
		FLUIGC.calendar('#' + idCalendar);
		$('#btn_' + idCalendar).on('click', function() {
			$('#' + idCalendar).click();
		});
	});
}

//Função Subst
function toggleSubstituicao() {
	var subst = $("#slcSubst").val();
  
	if (subst == "Sim") {
	  // Mostra Funcionário
	  $("#divZoomFunc").show();
  
	  // Ajusta as larguras
	  $("#divSubst").removeClass("col-md-3").addClass("col-md-2");
	  $("#divZoomCargo").removeClass("col-md-3").addClass("col-md-2");
	} else {
	  // Esconde Funcionário e limpa
	  $("#divZoomFunc").hide();
	  $("#txtFunc").val("");
	  $("#hddFuncCod").val("");
  
	  // Restaura as larguras
	  $("#divSubst").removeClass("col-md-2").addClass("col-md-3");
	  $("#divZoomCargo").removeClass("col-md-2").addClass("col-md-3");
	}
  }

//Funções de TI
function toggleEquipTI() {
	var equipTI = $("input[name='slcEquipTI']:checked").val();
	$("#radioEquipTI").val(equipTI);
	if (equipTI === "true") {
	  $("#fieldEquip").show();
	  $("#fieldAcess").show();
	  $("#fieldRecursos").show();
	} else {
	  $("#fieldEquip").hide();
	  $("#fieldAcess").hide();
	  $("#fieldRecursos").hide();
	}
}
function toggleInfoBI() {
	if ($("#BI").is(":checked")) {
	$("#divInfoBI").show();
	} else {
	$("#divInfoBI").hide();
	}
}
function toggleInfoFluig() {
	if ($("#fluig").is(":checked")) {
	$("#divInfoFluig").show();
	} else {
	$("#divInfoFluig").hide();
	}
}

//Funções de Remuneração
function toggleCamposSubstituicao() {
  var motivo = $("#slcMotVag").val();

  if (motivo === "Substituição") {
	// Mostra Funcionário
	$("#divfunci").show();
	$("#txtFunc1").val($("#txtFunc").val());
	// Ajusta as larguras
	$("#divSalario1").removeClass("col-md-3").addClass("col-md-2");
	$("#divRespoRemu").removeClass("col-md-3").addClass("col-md-2");
	$("#divDtRespoRemu").removeClass("col-md-3").addClass("col-md-2");
  } else {
	// Esconde Funcionário e limpa
	$("#divfunci").hide();
	$("#txtFunc1").val("");

	// Restaura as larguras
	$("#divSalario1").removeClass("col-md-2").addClass("col-md-3");
	$("#divRespoRemu").removeClass("col-md-2").addClass("col-md-3");
	$("#divDtRespoRemu").removeClass("col-md-2").addClass("col-md-3");
  }
}
function toggleProposta() {
    var proposta = $("input[name='proposta']:checked").val();
	var verificacao = $("#slcAceite").val();
	$("#radioProposta").val(proposta);

    if (proposta === "true" && verificacao === "SolicitarNegociacao") {
		$("#divSalario").show();
		$("#divBenExtrRemu").show();
		$("#txtBenExtRemu").prop("readonly", false);
        $("#txtSalario").prop("readonly", false);
        $("#txtObsRecHum").prop("readonly", false);
		validarAlteracaoSalario();
		validarAlteracaoBeneficios();
    } else {
        // Restaura valor original e aparência
		$("#divSalario").hide();
		$("#divBenExtrRemu").hide();
        $("#txtSalario")
            .prop("readonly", true)
            .val("")
            .css("color", "");

        $("label[for='txtSalario']").text("Contraproposta");

		$("#txtBenExtRemu")
            .prop("readonly", true)
            .val("")
            .css("color", "");

		$("label[for='txtSalario']").text("Benefícios Extras");

        $("#txtObsRecHum").prop("readonly", true);
    }
}
function validarAlteracaoSalario() {
    var salarioAtual = $("#txtSalario").val();
    if (salarioAtual === salarioOriginal || (salarioAtual == ("R$ "+contraproposta1) && contraproposta1 != "")) {
        $("#txtSalario").css("color", "red");
        $("label[for='txtSalario']").text("Obrigatório Alterar");
    } else {
        $("#txtSalario").css("color", "");
        $("label[for='txtSalario']").text("Contraproposta");
    }
}
function validarAlteracaoBeneficios() {
    var beneficiosAtual = $("#txtBenExtRemu").val();
	if(beneficios1 != ""){
		if (beneficiosAtual === beneficios1) {
			$("#txtBenExtRemu").css("color", "red");
			$("label[for='txtBenExtRemu']").text("Obrigatório Alterar");
		} else {
			$("#txtBenExtRemu").css("color", "");
			$("label[for='txtBenExtRemu']").text("Benefícios Extras");
		}
	}
}

//Funções de Recrutamento
function toggleCamposLocalRec() {
  var motivo = $("#slcRec").val();

  if (motivo === "Interno") {
	$("#matriculaCandidato").show();
	$("#DivExterno").hide();
	$("#divDadosCandi").hide();
	$("#divChecklistAdmissao").hide();
	$("#divInfoUniforme").hide();
	$("#nomeCandidato").removeClass("col-md-6").addClass("col-md-4");
  } else if(motivo === "Externo") {
	$("#matriculaCandidato").hide();
	$("#txtMatCandi").val("");
	$("#divDadosCandi").show();
	$("#DivExterno").show();
	$("#divChecklistAdmissao").show();
	$("#divInfoUniforme").show();
	$("#nomeCandidato").removeClass("col-md-4").addClass("col-md-6");
  } else{
	$("#matriculaCandidato").hide();
	$("#txtMatCandi").val("");
	$("#divDadosCandi").hide();
	$("#DivExterno").hide();
	$("#divChecklistAdmissao").hide();
	$("#divInfoUniforme").hide();
	$("#nomeCandidato").removeClass("col-md-4").addClass("col-md-6");
  }
}
function toggleDependentes() {
    var dependentes = $("input[name='dependentes']:checked").val();
	$("#radioDependentes").val(dependentes);

    if (dependentes === "true") {
		$("#divFilhos").show();
    } else {
    	$("#divFilhos").hide();
    }
}
function toggleCasado() {
	var casado = $("input[name='casado']:checked").val();
	$("#radioCasado").val(casado);

	if (casado === "true") {
		$("#divCasado").show();
	} else {
		$("#divCasado").hide();
 	}
}
function toggleAceite(){
	var aceite = $("#slcAceite").val();
	if(aceite == "SolicitarNegociacao"){
		$("#divNegociacao").show();
		$("#divCollapseNeg").show();
		$("#divSalarioRecru").show();
		$("#divBenExtr").show();

		$("#txtSalarioRecru")
            .prop("readonly", false)
 		$("#txtBenExt")
            .prop("readonly", false)

		validarAlteracaoSalario1();
		validarAlteracaoBeneficios1();
	} else{
		$("#divNegociacao").hide();
		$("#divCollapseNeg").hide();
		$("#divSalarioRecru").hide();
		$("#divBenExtr").hide();
		$("#txtSalarioRecru").val("");
		 $("#txtSalarioRecru")
            .prop("readonly", true)
            .val("")
            .css("color", "");

        $("label[for='txtSalarioRecru']").text("Contraproposta");
		$("#txtBenExt").val("");
		 $("#txtBenExt")
            .prop("readonly", true)
            .val("")
            .css("color", "");

        $("label[for='txtBenExt']").text("Benefícios Extras (exemplo: auxilio mobilidade, hotel, passagem...)");
	}
}
function validarAlteracaoSalario1() {
    var salarioAtual = $("#txtSalarioRecru").val();
    if (salarioAtual === salarioOriginal || (salarioAtual == contraproposta1 && contraproposta1 != "")) {
        $("#txtSalarioRecru").css("color", "red");
        $("label[for='txtSalarioRecru']").text("Obrigatório Alterar");
    } else {
        $("#txtSalarioRecru").css("color", "");
        $("label[for='txtSalarioRecru']").text("Contraproposta");
    }
}
function validarAlteracaoBeneficios1() {
    var beneficiosAtual = $("#txtBenExt").val();
	if(beneficios1 != ""){
		if (beneficiosAtual === beneficios1) {
			$("#txtBenExt").css("color", "red");
			$("label[for='txtBenExt']").text("Obrigatório Alterar");
		} else {
			$("#txtBenExt").css("color", "");
			$("label[for='txtBenExt']").text("Benefícios Extras (exemplo: auxilio mobilidade, hotel, passagem...)");
		}
	}
}

//Função geral para retirar ou colocar readonly
function toggleReadonlyByValue(triggerId, targetId, triggerValue) {
    function toggle() {
        const value   = $("#" + triggerId).val();
        const $target = $("#" + targetId);
        const $label  = $("label[for='" + targetId + "']");

        if (value === triggerValue) {          
            $target.prop("readonly", false);
            $label.addClass("required");
        } else {                               
            $target.prop("readonly", true)
                   .val("");                  
            $label.removeClass("required");
        }
    }

    toggle();                       
    $("#" + triggerId).on("change", toggle);
}

//Funções Histórico
function criaDatatables() {
    columnsHistorico = [
		{ data: "Candidato", title: "Candidato", width: '10%' },
		{ data: "Salario1", title: "Oferta Original", width: '5%' },
		{ data: "Salario2", title: "2°Oferta", width: '5%' },
		{ data: "Evento", title: "Evento", width: '10%' },
		{ data: "Data", title: "Data", width: '5%' },
		{ data: "Responsavel", title: "Responsável", width: '10%' }
	];

    tableHistorico = fnCriaDatatable("tblHistorico", columnsHistorico, true);

	// Define a tabela para usar 100% da largura do container e permite que as colunas se ajustem
	$("#tblHistorico").css({
        'width': '100%',
        'table-layout': 'auto'
    });

    // Permite que o texto dentro das células quebre a linha e não estoure a largura da coluna
    $("#tblHistorico td").css('white-space', 'normal');

    // Ajusta as colunas para aplicar as larguras definidas e layout
    setTimeout(function() {
        tableHistorico.columns.adjust().draw();
    }, 100);

    if ($("#hddJsonTblHistorico1").val()) {
        incluirDados(tableHistorico, "tblHistorico", columnsHistorico);
    }
	tableHistorico.order([4, 'desc']).draw();
}
function exibirQuestionamentos() {
	
	if ($('#tblHistorico').DataTable().rows('.selected') != null && 
	    $('#tblHistorico').DataTable().rows('.selected').data().length > 0) {	
		if ($('#tblHistorico').DataTable().rows('.selected').data().length == 1) {
			setValueView('#txtQuestionamento',$('#tblHistorico').DataTable().rows('.selected').data()[0].Quest);
		}
	}
}
function adicionaLinhaHistorico(evento) {
    var tabela = $('#tblHistorico').DataTable();
    var dataAtual = new Date().toLocaleString("pt-BR", {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	});
	
    var nomeCandidato = $('#txtCandidato').val();
    var salario1 = salarioOriginal 
    var salario2 = `Salario: ${$('#txtSalario').val()}<br>Benefícios Extras: ${$('#txtBenExtRemu').val()}`;
    var responsavel = loginUsuario
	var novaLinha = {
		Data: dataAtual,
		Candidato: nomeCandidato,
		Salario1: salario1,
		Salario2: salario2,
		Evento: evento,
		Responsavel: responsavel
	};

    tabela.row.add(novaLinha).draw();
	tabela.order([4, 'desc']).draw();
    salvaHistorico();
}
function salvaHistorico() {
    var dados = $('#tblHistorico').DataTable().rows().data().toArray();
    var blocos = 10;
    var porBloco = Math.ceil(dados.length / blocos);

    for (var i = 0; i < blocos; i++) {
        var parte = dados.slice(i * porBloco, (i + 1) * porBloco);
        var campo = $('#hddJsonTblHistorico' + (i + 1));

        if (parte.length > 0) {
            campo.val(JSON.stringify(parte));
        } else {
            campo.val(""); // Limpa campo se estiver vazio
        }
    }
}

//Funções base para tabelas
var pre_language = {
    "decimal": ",",
    "emptyTable": "Sem dados na tabela",
    "info": "_TOTAL_ registros",
    "infoEmpty": "Exibindo 0 até 0 de 0 registros",
    "infoFiltered": "(filtro de _MAX_ registros)",
    "thousands": ",",
    "lengthMenu": "Mostrar _MENU_ registros",
    "loadingRecords": "Carregando...",
    "processing": "Processando...",
    "search": "Pesquisa:",
    "zeroRecords": "Nenhum registro localizado",
    "paginate": {
        "first": "Primeiro",
        "last": "Último",
        "next": "Próximo",
        "previous": "Anterior"
    },
    "aria": {
        "sortAscending": ": Classifica coluna ascendente",
        "sortDescending": ": Classifica coluna descendente"
    }
};
function incluirDados(Tbl, TblId, TblColumns) {
    var registros = [];

    // Verifica se existe a estrutura paginada (até 10 campos ocultos)
    if ($("#hddJsonT" + TblId.substr(1) + "1")[0] !== undefined) {
        for (var i = 1; i <= 10; i++) {
            var campo = $("#hddJsonT" + TblId.substr(1) + i);
            var valor = campo.val();

            if (valor && valor.trim() !== "") {
                try {
                    var parte = JSON.parse(valor);
                    if (Array.isArray(parte)) {
                        registros = registros.concat(parte);
                    } else {
                        registros.push(parte);
                    }
                } catch (e) {
                    console.warn("JSON inválido em:", campo.attr('id'), e);
                }
            }
        }
    } else {
        // Versão sem particionamento
        var jsonBruto = $("#hddJsonT" + TblId.substr(1)).val();
        if (jsonBruto && jsonBruto.trim() !== "") {
            try {
                registros = JSON.parse(jsonBruto);
            } catch (e) {
                console.error("Erro ao fazer JSON.parse:", e.message);
            }
        }
    }

    // Insere no DataTable
    if (registros.length > 0) {
        Tbl.rows.add(registros).draw();
        Tbl.columns.adjust().draw(false);
        Tbl.page('last').draw('page');
    }
}
function fnCriaDatatable(inTabela, columnsDatatable, scrollX) {
    var tbDatatable = $("#" + inTabela).DataTable({
        paging: true,
        searching: true,
        info: false,
        dom: 'lsip<t>',
        scrollX: scrollX,
        select: { style: 'single', info: false },
        columns: columnsDatatable,
        language: pre_language
    });

    // Ajusta largura
    for (var cont = 0; cont < columnsDatatable.length; cont++) {
		
		$("#"+inTabela+" thead th")[0].style.width = columnsDatatable[cont].width;
		
	}

    // Campo de pesquisa
    $("#txtPesq" + inTabela.substr(3)).on({ keyup: function(){
		
	    $.each($("#" + inTabela + " > tbody > tr"), function (index, value) {
	    	
        	$(this).removeClass('selected');
        	
	    });
	    
	    $('#' + inTabela).DataTable().search( $("#txtPesq" + inTabela.substr(3)).val(), true, true ).draw();
	    
	} });

    $("#" + inTabela + "_filter").hide();

    // Eventos: limpar seleção em paginação ou redesenho
    $('#' + inTabela).on('draw.dt page.dt', function () {
        $("#" + inTabela + " > tbody > tr").removeClass('selected');
    });

    // Seleção de linha
    $('#' + inTabela).on('click', 'tr', function () {
        var $rows = $("#" + inTabela + " > tbody > tr");
        $rows.removeClass('selected');
        $(this).toggleClass('selected');
    });

    // Duplo clique: seleciona e dispara ação
    $('#' + inTabela).on('dblclick', 'tr', function () {
        var $rows = $("#" + inTabela + " > tbody > tr");
        $rows.removeClass('selected');
        $(this).toggleClass('selected');
        var btn = $("#btnUpd" + inTabela.substr(3))[0];
        if (btn && !btn.disabled) btn.click();
    });

    return tbDatatable;
}

//Funções para alteração de tema
function toggleDarkMode () {
	document.body.classList.toggle("dark");
}
function loadTheme () {
	if (localStorage.getItem("dark")) toggleDarkMode();
}

//Validação do Formulário
var beforeSendValidate = function (numState, nextState) {
	var atividade = numState;
	var resposta = "";
    
	if(atividade == 0 || atividade == 4){
		
		if ($("#txtLidImed").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (Líder Imediato)</b> precisa ser preenchido!</b>"
			          + "<br>";
		}
		if ($("#txtDirAreImed").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (Diretor de Área Imediato)</b> precisa ser preenchido!</b>"
				   + "<br>";
		}
		if ($("#txtCargo").val() == ""){	
			resposta += "<b>O Campo <b style='color:red'> (Cargo)</b> precisa ser preenchido!</b>"
				   + "<br>";
		}
		if ($("#slcSubst").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (É substituição?)</b> precisa ser preenchido!</b>"
			          + "<br>";
		}
		if ($("#slcSubst").val() == "Sim"){
			if ($("#txtFunc").val() == ""){
				resposta += "<b>O Campo <b style='color:red'> (Funcionário)</b> precisa ser preenchido!</b>"
						+ "<br>";
			}
		}
		if ($("#txtCentCus").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (Centro de Custos)</b> precisa ser preenchido!</b>"
				   + "<br>";
		}
		if ($("#txtSetor").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (Setor)</b> precisa ser preenchido!</b>"
				   + "<br>";
		}
		if ($("#slcEst").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (Estabelecimento)</b> precisa ser preenchido!</b>"
				   + "<br>";
		}
		if ($("#txtTurno").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (Turno)</b> precisa ser preenchido!</b>"
				   + "<br>";	
		}
		if ($("#txtHorario").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (Horário)</b> precisa ser preenchido!</b>"
				   + "<br>";
		}
		if ($("#txtAtvResp").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (Descreva as Atividades / Responsabilidades)</b> precisa ser preenchido!</b>"
				   + "<br>";
		}
		if ($("#txtNecFormAca").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (Formação acadêmica ou técnica necessária)</b> precisa ser preenchido!</b>"
				   + "<br>";
		}
		if ($("#txtPontFort").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (03 pontos fortes da área)</b> precisa ser preenchido!</b>"
				   + "<br>";
		}
		if ($("#txtPontCrit").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (03 pontos críticos da área)</b> precisa ser preenchido!</b>"
				   + "<br>";
		}
		if ($("#txtInadComp").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (Condutas inadmissíveis)</b> precisa ser preenchido!</b>"
				   + "<br>";
		}
		if ($("#txtPegTec").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (Perguntas técnicas da pré-entrevista)</b> precisa ser preenchido!</b>"
				   + "<br>";
		}
		if ($("#slcRegCont").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (Regime de Contratação)</b> precisa ser preenchido!</b>"
				   + "<br>";
		}
		if ($("#slcIng").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (Inglês)</b> precisa ser preenchido!</b>"
				   + "<br>";
		}
		if ($("#slcEsp").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (Espanhol)</b> precisa ser preenchido!</b>"
				   + "<br>";
		}

		var slcEquipTI = $("input[name='slcEquipTI']:checked").val();

		if (slcEquipTI == "" || slcEquipTI == null){
			resposta += "<b>O Campo <b style='color:red'> (Será necessário equipamentos de TI?)</b> precisa ser preenchido!</b>"
				   + "<br>";
		}

		if (slcEquipTI === "true") {
			// No mínimo 1 equipamento ou acesso precisa ser marcado
			var camposEquipamentos = [
				"chip", "celular", "notebook", "desktop",
				"rede", "email", "wifi", "BI", "fluig"
			];
		
			var algumMarcado = camposEquipamentos.some(function(campo) {
				return $("#" + campo).is(':checked');
			});
		
			if (!algumMarcado) {
				resposta += "<b>Marque pelo menos um <b style='color:red'> (equipamento ou acesso)</b> de TI!</b>"
					   	 + "<br>";
			}
		}
		if($("#BI").is(':checked') == true){
			if ($("#txtInfBI").val() == ""){
				resposta += "<b>O Campo <b style='color:red'> (Informações Power BI)</b> precisa ser preenchido!</b>"
					   	 + "<br>";
			}
		}
		if($("#fluig").is(':checked') == true){
			if ($("#txtInfFluig").val() == ""){
				resposta += "<b>O Campo <b style='color:red'> (Informações Fluig)</b> precisa ser preenchido!</b>"
					   	 + "<br>";
			}
		}
    }
	if(atividade == 5 || atividade == 74){
		if ($("#slcAceite").val() != "SolicitarNegociacao"){
			if ($("#slcMotVag").val() == ""){
				resposta += "<b>O Campo <b style='color:red'> (Motivo da Vaga)</b> precisa ser preenchido!</b>"
						+ "<br>";
			}
			if ($("#slcMotVag").val() == "Substituição"){
				if ($("#txtFunc").val() == ""){
					resposta += "<b>O Campo <b style='color:red'> (Funcionário)</b> precisa ser preenchido!</b>"
							+ "<br>";
				}
			}
			if ($("#txtSalario1").val() == "" || $("#txtSalario1").val() == "R$ 0,00"){
				resposta += "<b>O Campo <b style='color:red'> (Salário)</b> precisa ser preenchido!</b>"
						+ "<br>";
			}
		}
		if ($("#slcAceite").val() == "SolicitarNegociacao"){
			if ($('input[name="proposta"]:checked').val() === undefined) {
				resposta += "<b>O Campo <b style='color:red'> (Decisão)</b> precisa ser preenchido!</b>"
				+ "<br>";
			}
			if ($('input[name="proposta"]:checked').val() === "true") {
				if ($("label[for='txtSalario']").text().trim() === "Obrigatório Alterar") {
					resposta += "<b>É obrigatório alterar o campo <b style='color:red'> (Contraproposta)</b>!</b>"
					+ "<br>";
				}
				if ($("label[for='txtBenExtRemu']").text().trim() === "Obrigatório Alterar") {
					resposta += "<b>É obrigatório alterar o campo <b style='color:red'> (Benefícios Extras)</b>!</b>"
					+ "<br>";
				}
				if($("#txtBenExtRemu").val() == ""  && ($("#txtSalario").val() == "" || $("#txtSalario").val() == "R$ 0,00")){
					resposta += "<b>É obrigatório preencher ao menos <b style='color:red'> (um campo de Negociação)</b>!</b>"
					+ "<br>";
				}
			}
		}
	}
	if(atividade == 18){
		
		if ($("#slcAproDirAre").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (Aprovação)</b> precisa ser preenchido!</b>"
				+ "<br>";
		}
		if ($("#slcAproDirAre").val() == "Não"){
			if ($("#txtJusDirAre").val() == "") {
				resposta += "<b>O Campo <b style='color:red'> (Justificativa)</b> precisa ser preenchido!</b>"
				+ "<br>";
			}
		}
	}
	if(atividade == 24 || atividade == 75){
		
		if ($("#slcAproGesRH").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (Aprovação)</b> precisa ser preenchido!</b>"
				+ "<br>";
		}
		if ($("#slcAproGesRH").val() == "Não"){
			if ($("#txtJusGesRH").val() == "") {
				resposta += "<b>O Campo <b style='color:red'> (Justificativa)</b> precisa ser preenchido!</b>"
				+ "<br>";
			}
		}
	}
	if(atividade == 30){
		
		if ($("#slcAproCEO").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (Aprovação)</b> precisa ser preenchido!</b>"
				+ "<br>";
		}
		if ($("#slcAproCEO").val() == "Não"){
			if ($("#txtJusCEO").val() == "") {
				resposta += "<b>O Campo <b style='color:red'> (Justificativa)</b> precisa ser preenchido!</b>"
				+ "<br>";
			}
		}
	}
	if(atividade == 36 || numeroAtividade == 97){
		var candidatoAtual = $("#txtCandidato").val();
		if(candidatoAtual != candidato1){
			$("#txtSalario").val("");
			$("input[name='proposta']").prop("checked", false);
		}
		if(candidatoAtual == candidato1 && $("#slcAceite").val() == "SolicitarNegociacao" && $("input[name='proposta']:checked").val() == "false"){
			resposta += "<b>Obrigatório <b style='color:red'> (Alterar o candidato)</b> ou <b style='color:red'> (Aceitar a proposta Original)</b>!</b>"
					+ "<br>";
		}
		if(candidatoAtual == candidato1 && $("#slcCanApt").val() == "Não"){
			resposta += "<b>Obrigatório <b style='color:red'> (Alterar o candidato)</b>!</b>"
					+ "<br>";
		}
		if($("#slcCanApt").val() == "Sim"){
			if ($("#txtDataAdmissao").val() == ""){
				resposta += "<b>O Campo <b style='color:red'> (Data de admissão)</b> precisa ser preenchido!</b>"
					+ "<br>";
			}
		}
		if ($("#txtCandidato").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (Nome Candidato)</b> precisa ser preenchido!</b>"
				+ "<br>";
		}
		if ($("#slcRec").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (Local de Recrutamento)</b> precisa ser preenchido!</b>"
				+ "<br>";
		}
		if ($("#slcAceite").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (Proposta)</b> precisa ser preenchido!</b>"
				+ "<br>";
		}
		if ($("#slcAceite").val() == "SolicitarNegociacao") {
				if ($("label[for='txtSalarioRecru']").text().trim() === "Obrigatório Alterar") {
					resposta += "<b>É obrigatório alterar o campo <b style='color:red'> (Contraproposta)</b>!</b>"
					+ "<br>";
				}
				if ($("label[for='txtBenExt']").text().trim() === "Obrigatório Alterar") {
					resposta += "<b>É obrigatório alterar o campo <b style='color:red'> (Benefícios Extras)</b>!</b>"
					+ "<br>";
				}
				if($("#txtSalarioRecru").val() == "" && $("#txtBenExt").val() == ""){
					resposta += "<b>É obrigatório preencher ao menos <b style='color:red'> (um campo de Negociação)</b>!</b>"
					+ "<br>";
				}
		}
		if ($("#slcRec").val() == "Interno"){
			if ($("#txtMatCandi").val() == "") {
				resposta += "<b>O Campo <b style='color:red'> (Matrícula)</b> precisa ser preenchido!</b>"
				+ "<br>";
			}
		}
		if ($("#slcRec").val() == "Externo"){
			if ($("#txtEmailCandi").val() == "") {
				resposta += "<b>O Campo <b style='color:red'> (Email)</b> precisa ser preenchido!</b>"
				+ "<br>";
			}
			if ($("#txtCelCandi").val() == "") {
				resposta += "<b>O Campo <b style='color:red'> (Celular)</b> precisa ser preenchido!</b>"
				+ "<br>";
			}
			if ($("#slcSexo").val() == ""){
				resposta += "<b>O Campo <b style='color:red'> (Sexo)</b> precisa ser preenchido!</b>"
					+ "<br>";
			}
			//VERIFICAÇÃO DO CHECKLIST ADMISSIONAL
				const idsObrigatorios = [
					"rgCpf",
					"tituloEleitor",
					//"certReservista",
					"agenciaContaItau",
					"comprovEscolaridade",
					"comprovResidencia",
					//"cnhEmpilhadeira",
					//"certCursosGerais",
					"carteiraProfissional",
					"foto3x4",
					"vacTetanoHepatiteFebre",
					"vacCovid"
				];

				if ($('input[name="dependentes"]:checked').val() === undefined) {
					resposta += "<b>O Campo <b style='color:red'> (Possui Dependentes?)</b> precisa ser preenchido!</b>"
					+ "<br>";
				}
				if ($('input[name="casado"]:checked').val() === undefined) {
					resposta += "<b>O Campo <b style='color:red'> (É casado?)</b> precisa ser preenchido!</b>"
					+ "<br>";
				}
				if ($('input[name="casado"]:checked').val() === "true") {
					idsObrigatorios.push("registroCasamento", "rgCpfConjuge");
				}
				idsObrigatorios.forEach(function(id) {
					if (!$("#" + id).is(":checked")) {
						// Pega o texto do label associado ao checkbox
						var labelTexto = $("label[for='" + id + "']").text().trim();
						
						resposta += "<b>O Campo <span style='color:red'>(" + labelTexto + ")</span> precisa ser preenchido!</b><br>";
					}
				});
			//VERIFICAÇÃO DO CHECKLIST ADMISSIONAL

			if ($("#calcado").val() == "") {
				resposta += "<b>O Campo <b style='color:red'> (Calçado)</b> precisa ser preenchido!</b>"
				+ "<br>";
			}
			if ($("#calca").val() == "") {
				resposta += "<b>O Campo <b style='color:red'> (Calça)</b> precisa ser preenchido!</b>"
				+ "<br>";
			}
			if ($("#camisaTamanho").val() == "") {
				resposta += "<b>O Campo <b style='color:red'> (Camisa/Camiseta)</b> precisa ser preenchido!</b>"
				+ "<br>";
			}

		}
	}
	if(atividade == 41){
		if ($("#slcCanApt").val() == "") {
			resposta += "<b>O Campo <b style='color:red'> (Candidato Apto?)</b> precisa ser preenchido!</b>"
			+ "<br>";
		}
	}
	if(atividade == 47){
		
		if ($("#txtMatricula").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (Matrícula)</b> precisa ser preenchido!</b>"
				+ "<br>";
		}
	}
	if (resposta != "") {
		historicoRegistrado = false;
		throw resposta;
	}
	
	// SÓ ADICIONA HISTÓRICO SE NÃO TEVE ERROS
	if (!historicoRegistrado) {
		if($("#slcAceite").val() != ""){
			if(atividade == 24 || atividade == 75){
				var aceite = $("#slcAproGesRH").val();
				if (aceite == "Não") {
					adicionaLinhaHistorico("Gestor RH reprovou contraproposta");
				} else if (aceite == "Sim") {
					adicionaLinhaHistorico("Gestor RH aprovou contraproposta");
				}
			}
		}
		if (atividade == 5 || atividade == 74) {
			var proposta = $("input[name='proposta']:checked").val();
			if (proposta === "false") {
				adicionaLinhaHistorico("Remuneração recusou o envio de contraproposta");
			} else if (proposta === "true") {
				adicionaLinhaHistorico("Envio de contraproposta pela Remuneração");
			}
		}
		if(atividade == 36 || numeroAtividade == 97){
			var candidato2 = $("#txtCandidato").val();
			if ($("#slcAceite").val() == "SolicitarNegociacao" && candidato2 != candidato1 && candidato1 != "") {
				adicionaLinhaHistorico("Recrutamento - novo candidato solicitou contraproposta");
			}
			if ($("#slcAceite").val() == "SolicitarNegociacao" && (candidato2 == candidato1 || candidato1 == "")) {
				adicionaLinhaHistorico("Recrutamento - candidato solicitou contraproposta");
			}
			if ($("#slcAceite").val() == "Aceita" && candidato2 != candidato1 && candidato1 != "" ) {
				adicionaLinhaHistorico("Recrutamento - novo candidato aceitou a proposta original");
			}
			if ($("#slcAceite").val() == "Aceita" && (candidato2 == candidato1 || candidato1 == "")) {
				adicionaLinhaHistorico("Recrutamento - candidato aceitou a proposta original");
			}
			if ($("#slcAceite").val() == "NegociacaoAceita" && (candidato2 == candidato1 || candidato1 == "")) {
				adicionaLinhaHistorico("Recrutamento - candidato aceitou a contraproposta");
			}
		}
		if (atividade == 41) {
			var apto = $("#slcCanApt").val();
			if (apto === "Não") {
				adicionaLinhaHistorico("Candidato considerado inapto pela Medicina do Trabalho");
			}
			if (apto === "Sim") {
				adicionaLinhaHistorico("Candidato considerado apto pela Medicina do Trabalho");
			}
		}
		historicoRegistrado = true;
	}
	
	return true;	
}

