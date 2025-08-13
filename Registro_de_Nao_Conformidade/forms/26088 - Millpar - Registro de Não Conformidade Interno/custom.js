
var tablePlanoA;
var columnsPlanoA;

$(document).ready(function () {

	var modoForm        = getFormMode();
	var numeroProcesso  = getWKNumProces();
	var numeroAtividade = getWKNumState();
	var codigoEmpresa   = getTenantCode();
	var codigoUsuario   = getUserCode();
	var loginUsuario    = getUserLogin();
	var emailUsuario    = getUserEmail();
	var nomeUsuario     = getUserName();
	var modoMobile      = getWKMobile();
	var modoEdicao      = getEditMode();
	
	 console.log(getFormMode());


	themaLigthDark();	

	//cria datatables do formulário 
		setTimeout(function () {
			criaDatatables();
		}, 1);
	
	if(modoForm == 'VIEW') {
		$(".zoom-click").hide();
		$(".fs-cursor-pointer").hide();
		$(".btn-default").hide();
		//button customizado
		document.getElementById("botaoAnexo").disabled = false;
		fnModoView();
	} else {

		$('#suprimentos').change(function() {
			$('#RNCISuprimentos_153').toggle($(this).is(':checked'));
			$('#AproComprador').toggle(false);
			if($(this).is(':checked')){
				$("#divCollapseDadosRNCS").collapse("show");
			} else {
				$("#divCollapseDadosRNCS").collapse("hide");
			}
			
		}).trigger('change');
	
		$('#recebimento').change(function() {
			$('#RNCIRecebimento_163').toggle($(this).is(':checked'));
			if($(this).is(':checked')){
				$("#divCollapseDadosRNCR").collapse("show");
			} else {
				$("#divCollapseDadosRNCR").collapse("hide");
			}
		}).trigger('change');
	
		$('#pagamentos').change(function() {
			$('#RNCIPagamentos_232').toggle($(this).is(':checked'));
			if($(this).is(':checked')){
				$("#divCollapseDadosRNCP").collapse("show");
				$("#divCollapseDadosFinanceiro").collapse("show");
			} else {
				$("#divCollapseDadosRNCP").collapse("hide");
				$("#divCollapseDadosFinanceiro").collapse("hide");
			}
		}).trigger('change');

		//força abertura dos fieldsets 
		if($('#suprimentos').is(':checked') == true || $('#_suprimentos').is(':checked') == true){
			$("#RNCISuprimentos_153").toggle(true);
			$("#divCollapseDadosRNCS").collapse("hide");
			
			var ids = ["divCollapseDadosRNCP", "divCollapseDadosRNCR", "divCollapseDadosRNCP"];

			ids.forEach(function(id) {
				$("#" + id).collapse("hide");
			});

		} else{
			$("#RNCISuprimentos_153").toggle(false);
		}

		if($('#recebimento').is(':checked') == true || $('#_recebimento').is(':checked') == true){
			$("#RNCIRecebimento_163").toggle(true);
			$("#divCollapseDadosRNCR").collapse("hide");
			ids.forEach(function(id) {
				$("#" + id).collapse("hide");
			});
			   
		} else{
			$("#RNCIRecebimento_163").toggle(false);
		}

		if($('#pagamentos').is(':checked') == true || $('#_pagamentos').is(':checked') == true){
			$("#RNCIPagamentos_232").toggle(true);
			$("#divCollapseDadosRNCP").collapse("hide");
			ids.forEach(function(id) {
				$("#" + id).collapse("hide");
			});
			
		} else{
			$("#RNCIPagamentos_232").toggle(false);
		}

		$('input[name="houveJuros"]').change(function() {
			const houveJuros = $('input[name="houveJuros"]:checked').val() === 'true';
		
			$('label[for="Moeda_205"]').toggle(houveJuros);
			$('#Moeda_205').toggle(houveJuros);
		}).trigger('change');

		document.getElementById("botaoAnexo").disabled = true;

		if(numeroAtividade == 0 || numeroAtividade == 6){
			document.getElementById("botaoAnexo").disabled = false;
			$('#btnAddPlanoA').show();
			$('#btnUpdPlanoA').show();
			$('#btnDelPlanoA').show();
		}

		if(numeroAtividade == 22){
			setTimeout(function () { $("#divCollapseDadosRNCS").collapse("show");}, 5);
			setTimeout(function () { $("#AproComprador").toggle(true)           ;}, 5);
			setTimeout(function () { $("#AprovComp").collapse("show")           ;}, 5);
			setTimeout(function () { $("#divCollapseDadosRNCR").collapse("hide");}, 5);
			setTimeout(function () { $("#divCollapseDadosRNCP").collapse("hide");}, 5);
		}

		$("#botaoAnexo").click(function (param) {
			JSInterface.showCamera("NF");
		  });

		fnAtivaData();	
	}
});

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

var beforeSendValidate = function (numState, nextState) {
 
	var atividade = numState;
	var resposta = "";
    
	if(atividade == 0 || atividade == 6){
		if ($("#gestorImediatoName").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (Gestor Imediato)</b> precisa ser preenchido!</b>"
			          + "<br>";
		}
		if ($("#contaContabil").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (Conta Contábil)</b> precisa ser preenchido!</b>"
				   + "<br>";
		}
		
		if ($("#centroCusto").val() == ""){	
			resposta += "<b>O Campo <b style='color:red'> (Centro de Custo)</b> precisa ser preenchido!</b>"
				   + "<br>";
		}
		if ($("#pedido").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (Pedido)</b> precisa ser preenchido!</b>"
				   + "<br>";	
		}
		if ($("#vlrPedido").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (Valor do Pedido)</b> precisa ser preenchido!</b>"
				   + "<br>";
		}
		if ($("#nrNotaFiscal").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (Número NF)</b> precisa ser preenchido!</b>"
				   + "<br>";
		}
		if ($("#Data de Emissão NF").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (Data de Emissão)</b> precisa ser preenchido!</b>"
				   + "<br>";
		}

		//os radios suprimentos, recebimento e pagamentos precisa ser marcado
		if ($("#suprimentos").is(':checked') == false && $("#recebimento").is(':checked') == false && $("#pagamentos").is(':checked') == false){
			resposta += "<b>Um dos Campos <b style='color:red'> (Setores RNCI [Suprimentos]  | [Recebimento] | [Pagamentos])</b> precisa estar setado!</b>"
				   + "<br>";
		}

		if($("#suprimentos").is(':checked') == true){
			if ($("#requisicao").val() == ""){
				resposta += "<b>O Campo <b style='color:red'> (Requisicao)</b> precisa ser preenchido!</b>"
					   + "<br>";
			}

			if ($("#DtAtuVencSup").val() == ""){
				resposta += "<b>O Campo <b style='color:red'> (Data atual de vencimento do boleto)</b> precisa ser preenchido!</b>"
					   + "<br>";
			}

			resposta += messageAprovacao("nfRecebimento", "", "NF lançada pelo recebimento?");

			if ($("#Notas_extraviadas").is(':checked') == false && $("#NFCTESemLanc").is(':checked') == false && $("#PagNreali").is(':checked') == false && $("#ReqAtras").is(':checked') == false && $("#OutrosRNCS").is(':checked') == false){
				resposta += "<b>Um dos Campos <b style='color:red'> (Uma das opções [Nota extraviada, Nota e CTe sem lançamento, Pagamento em atraso, Requisição gerada próxima ao vencimento, Outro])</b> precisa estar setado!</b>"
					   + "<br>";
			}

			if($("#OutrosRNCS").is(':checked') == true){
				if ($("#Outro_161").val() == ""){
					resposta += "<b>O Campo <b style='color:red'> (Outro)</b> precisa ser preenchido!</b>"
						   + "<br>";
				}
			}

		}

		if($("#recebimento").is(':checked') == true){
			if ($("#estabelec").val() == ""){
				resposta += "<b>O Campo <b style='color:red'> (Estabelecimento)</b> precisa ser preenchido!</b>"
					   + "<br>";
			}
			

			if ($("#dataRecebimento").val() == ""){
				resposta += "<b>O Campo <b style='color:red'> (Data)</b> precisa ser preenchido!</b>"
					   + "<br>";
			}
			//os radios [Fora de Competência, Fora do Prazo Interno, Fora do Recebimento Fiscal , Outro] precisa ser marcado
			if ($("#ForaCompet").is(':checked') == false && $("#ForaPrazInt").is(':checked') == false && $("#ForaRecbF").is(':checked') == false && $("#MovOrcament").is(':checked') == false && $("#OutrosRNCR").is(':checked') == false){
				resposta += "<b>Um dos Campos <b style='color:red'> (Motivos)</b> precisa estar setado!</b>"
					   + "<br>";
			}

			if($("#OutrosRNCR").is(':checked') == true){
				if ($("#Outro_193").val() == ""){
					resposta += "<b>O Campo <b style='color:red'> (Outro)</b> precisa ser preenchido!</b>"
						   + "<br>";
				}
			}

		}

		if($("#pagamentos").is(':checked') == true){
			//os radios [Fora do Prazo, Pagamento com Juros, Outro] precisa ser marcado
			if ($("#ForaPrazo").is(':checked') == false && $("#PagamJuros").is(':checked') == false && $("#OutrosRNCP").is(':checked') == false){
				resposta += "<b>Um dos Campos <b style='color:red'> (Motivos)</b> precisa estar setado!</b>"
					   + "<br>";
			}

			if($("#OutrosRNCP").is(':checked') == true){
				if ($("#Outro_194").val() == ""){
					resposta += "<b>O Campo <b style='color:red'> (Outro)</b> precisa ser preenchido!</b>"
						   + "<br>";
				}
			}

			resposta += messageRadio("nfVencida", "", "NF Vencida?");

			if ($("#dataVencimentoPagamentos").val() == ""){
				resposta += "<b>O Campo <b style='color:red'> (Data de Vencimento)</b> precisa ser preenchido!</b>"
					   + "<br>";
			}

			resposta += messageRadio("houveJuros", "", "Houve juros sobre o atraso?");

			if ($("input[name='houveJuros']:checked").val() === "true") {
				if ($("#Moeda_205").val() === "") {
					resposta += "<b>O Campo <b style='color:red'>(Moeda)</b> precisa ser preenchido!</b><br>";
				}
			}
			

			if ($("#formaPagamento").val() == ""){
				resposta += "<b>O Campo <b style='color:red'> (Forma de Pagamento)</b> precisa ser preenchido!</b>"
					   + "<br>";
			}
			if ($("#condPagamento").val() == ""){
				resposta += "<b>O Campo <b style='color:red'> (Condição de Pagamento)</b> precisa ser preenchido!</b>"
					   + "<br>";
			}

			//Deposito, Pix, Boleto
			if ($("#formaPagamento").val() == "Deposito"){
				if ($("#instBancario").val() == ""){
					resposta += "<b>O Campo <b style='color:red'> (Instituição Bancária)</b> precisa ser preenchido!</b>"
						   + "<br>";	
				}
				if ($("#ContaCorrente_215").val() == ""){
					resposta += "<b>O Campo <b style='color:red'> (Conta Corrente)</b> precisa ser preenchido!</b>"	
						   + "<br>";
				}
				if ($("#Agncia_216").val() == ""){
					resposta += "<b>O Campo <b style='color:red'> (Agência)</b> precisa ser preenchido!</b>"
						   + "<br>";
				}
			}

			if ($("#formaPagamento").val() == "Pix"){
				if ($("#ChavePix_217").val() == ""){
					resposta += "<b>O Campo <b style='color:red'> (Chave Pix)</b> precisa ser preenchido!</b>"
						   + "<br>";
				}
			}

			
		}

		if ($("#hddJsonTblPlanoA1").val() === undefined || $("#hddJsonTblPlanoA1").val() == ""){
			resposta += "<b>A tabela <b style='color:red'> (Inclusão de Plano de Ação)</b> precisa ser preenchido!</b>"
				   + "<br>";
		}

		if(resposta != ""){
			throw "<br/>" + resposta;
		}
    }

    if (atividade == 7) {

		if ($("input[name='aprovGrSolicitantePA']").is(':checked')) {
			resposta = messageAprovacao("aprovGrSolicitantePA_", "justAprovGrSolicitantePA", "Gerência Solicitante");
			if (resposta !== "") {
				throw "<br/>" + resposta;
			}
		}else{
			resposta = messageAprovacao("aprovGestorSolicitante_", "justAprovGestorSolicitante", "Gerência Solicitante");
	
			if (resposta !== "") {
				throw "<br/>" + resposta;
			}
		}
	}

	if (atividade == 18) {

		if ($("input[name='AprovGrSupplyPA']").is(':checked')) {
			resposta = messageAprovacao("AprovGrSupplyPA", "JustiGrSupplyPA", "Gerência Supply Chain");
			if (resposta !== "") {
				throw "<br/>" + resposta;
			}
		}else{
			resposta = messageAprovacao("acordoSup", "JustiSup", "Gerência Suprimentos");

			if (resposta !== "") {
				throw "<br/>" + resposta;
			}
		}
		
	}

	if (atividade == 22) {
		resposta = "";

		if($("#suprimentos").is(':checked') == true){
			if ($("#requisicao").val() == ""){
				resposta += "<b>O Campo <b style='color:red'> (Requisicao)</b> precisa ser preenchido!</b>"
					   + "<br>";
			}

			if ($("#DtAtuVencSup").val() == ""){
				resposta += "<b>O Campo <b style='color:red'> (Data atual de vencimento do boleto)</b> precisa ser preenchido!</b>"
					   + "<br>";
			}
			
			if ($("#DtVencComp").val() == ""){
				resposta += "<b>O Campo <b style='color:red'> (Nova data de vencimento)</b> precisa ser preenchido!</b>"
					   + "<br>";
			}

			if ($("#DescriProrrog").val() == ""){
				resposta += "<b>O Campo <b style='color:red'> (Descrição do Acordo)</b> precisa ser preenchido!</b>"
					   + "<br>";
			}

		}
		
		resposta += messageAprovacao("prorrog", "", "Prorrogação Realizada?");
		
		if (resposta !== "") {
			throw "<br/>" + resposta;
		}
	}

	if(atividade == 27) {

		if ($("input[name='acordoGrFinanPA']").is(':checked')) {
			resposta = messageAprovacao("acordoGrFinanPA", "JustiGrFinanPA", "Gerência Financeiro");
			if (resposta !== "") {
				throw "<br/>" + resposta;
			}
		}else{
			resposta = messageAprovacao("acordoRec", "JustiRec", "Gerência Financeiro");

			if (resposta !== "") {
				throw "<br/>" + resposta;
			}
		}
	}

	if(atividade == 107){
		resposta = messageAprovacao("aprovPlanoAcao", "", "Status Plano de Ação");

		if ($("#JustiGPA").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (Descrição Registro)</b> precisa ser preenchido!</b>"
				   + "<br>";
		}
		if (resposta !== "") {
			throw "<br/>" + resposta;
		}
		
	}
}

function messageAprovacao(id, idJust, descritivo) {
	var resposta = "";
	var aprovacaoS = $('input[id='+id+'s]:checked').val();
	var aprovacaoN = $('input[id='+id+'n]:checked').val();
	var justificativa = "";
	
	if(idJust != "") justificativa = $("#"+idJust).val();

	if (aprovacaoS === undefined && aprovacaoN === undefined) {
		resposta += "<b>Campo <span style='color:red'>Aprovação do "+descritivo+"</span> é mandatório!</b><br>";
	}

	if(idJust != ""){
		if (justificativa == "") {
			resposta += "<b>Campo <span style='color:red'>Justificativa</span> é mandatório!</b><br>";
		}
	}

	return resposta;

}

function messageRadio(id, idJust, descritivo) {
	var resposta = "";
	var aprovacaoS = $('input[id='+id+'s]:checked').val();
	var aprovacaoN = $('input[id='+id+'n]:checked').val();
	var justificativa = "";
	
	if(idJust != "") justificativa = $("#"+idJust).val();

	if (aprovacaoS === undefined && aprovacaoN === undefined) {
		resposta += "<b>Campo <span style='color:red'>"+descritivo+"</span> é mandatório!</b><br>";
	}

	if(idJust != ""){
		if (justificativa == "") {
			resposta += "<b>Campo <span style='color:red'>Justificativa</span> é mandatório!</b><br>";
		}
	}

	return resposta;

}

function themaLigthDark(){
	loadTheme();
	const changeThemeBtn = document.querySelector("#change-theme");
	changeThemeBtn.addEventListener("change", function () {
		toggleDarkMode();

		// Save or remove dark mode from localStorage
		localStorage.removeItem("dark");

		if (document.body.classList.contains("dark")) {
			localStorage.setItem("dark", "1");
		}
	});
}
  
function IncModPlanoA(inOperacao) {

	var numeroAtividade = getWKNumState();
		
	var ROinput1 = ''; 
	
	var ROinput2 = ''; 
	
	var ROinput3 = ''; 
	
	var ROinput4 = ''; 
	
	var ROinput5 = ''; 
	
	var ROinput6 = ''; 
	
	var ROinput7 = ''; 
	
	var ROinput8 = ''; 
	
	var wreadyonly = "";
	if(numeroAtividade != 0 && numeroAtividade != 6){
		wreadyonly = "readOnly";
	}
 
	  ROinput1 = "";
	  if (
		numeroAtividade == 6 // plano de cao
	  ) {
		ROinput2 = "";
	  }
	  var dadosTela =
		"<style>" +
		"   .required:after {" +
		'         content:" *"; ' +
		"         color: red;" +
		"   }" +
		"   .fluig-style-guide .modal-content .modal-header{" +
		"       background-color: #fff !important;" +
		"   }" +
		"   .fluig-style-guide .modal-content .modal-header .close>span:after{" +
		"       background-color: #a3bc38 !important;" +
		"   }" +
		"   .dark .fluig-style-guide .modal-content {" +
		"     background-color:#4a4b48;" +
		"    }" +
		"    .dark .fluig-style-guide .modal-content .modal-header{" +
		"    background-color:#4a4b48 !important;" +
		"    color: #fff !important;" +
		"    }" +
		"    .dark .fluig-style-guide.modal.full {" +
		"    box-shadow:none" +
		"    }" +
		"   .dark .fluig-style-guide .modal-title{" +
		"   color:#fff !important;" +
		"   }" +
		"   .dark .fluig-style-guide.modal{" +
		"   box-shadow:none !important;" +
		"   }" +
		"   .dark table.dataTable.row-border tbody td{" +
		"    background-color: #b6b6b6 !important;" +
		"    }" +
		"    .dark .dataTables_wrapper .dataTables_info{" +
		"    color: #fff !important;" +
		"    }" +
		"    .dark table.dataTable.no-footer{" +
		"    background-color: #b6b6b6 !important;" +
		"    }" +
		"</style>" +
		"<fieldset>" +
		"		<div>" +
		'		<div class="col-sm-12">' +
		'			<label class="required">Descrição do Ocorrido: </label>' +
		'			<textarea rows="3" name="txtDescricao" id="txtDescricao" '+wreadyonly+' class="form-control" ' +
		ROinput6 +
		"></textarea>" +
		"		</div>" +
		"	</div>" +
	  	'</fieldset>'+
		"<fieldset>" +
		"		<div>" +
		'			<label>Descrição do Plano de Ação</label>' +
		'		<div class="col-sm-12">' +
		'			<label class="required">O que?: </label>' +
		'			<textarea rows="3" name="txtOque" id="txtOque" '+wreadyonly+' class="form-control" ' +
		ROinput1 +
		"></textarea>" +
		"		</div>" +
		"	</div>" +

		"		<div>" +
		'		<div class="col-sm-12">' +
		'			<label class="required">Por quê? </label>' +
		'			<textarea rows="3" name="txtPorQue" id="txtPorQue" '+wreadyonly+' class="form-control" ' +
		ROinput2 +
		"></textarea>" +
		"		</div>" +
		"	</div>" +

		"		<div>" +
		'		<div class="col-sm-12">' +
		'			<label class="required">Como? </label>' +
		'			<textarea rows="3" name="txtComo" id="txtComo" '+wreadyonly+' class="form-control" ' +
		ROinput3 +
		"></textarea>" +
		"		</div>" +
		"	</div>" +

		"		<div>" +
		'		<div class="col-sm-12">' +
		'			<label class="required">Onde? </label>' +
		'			<textarea rows="3" name="txtOnde" id="txtOnde" '+wreadyonly+' class="form-control" ' +
		ROinput4 +
		"></textarea>" +
		"		</div>" +
		"	</div>" +

		"		<div>" +
		'		<div class="col-sm-12">' +
		'			<label class="required">Quem? </label>' +
		'			<textarea rows="3" name="txtQuem" id="txtQuem" '+wreadyonly+' class="form-control" ' +
		ROinput5 +
		"></textarea>" +
		"		</div>" +
		"	</div>" +

		"</fieldset>" +

		'<fieldset id="fieldFab">' +
		'	<div class="row">' +
		'		<div class="col-sm-4 col-md-6">' +
		'			<label class="required">Data de Início:</label>' +
		'			<input type="text" name="txtDtInicio" id="txtDtInicio" '+wreadyonly+' class="form-control" ' +
		ROinput7 +
		' mask="00/00/0000"/>' +
		'		</div>' + // FECHANDO A PRIMEIRA DIV CERTINHO
		'		<div class="col-sm-4 col-md-6">' +
		'			<label class="required">Data de Término:</label>' +
		'			<input type="text" name="txtDtFim" id="txtDtFim" '+wreadyonly+' class="form-control" ' +
		ROinput8 +
		' mask="00/00/0000"/>' +
		'		</div>' +
		'	</div>' +
		"</fieldset>";

  
	  fnTelaModal(
		tablePlanoA,
		"tblPlanoA",
		dadosTela,
		inOperacao,
		columnsPlanoA
	  );
  
	  // $("#txtCodItem").mask("00000000000", { reverse: true });
  
	  $("#txtLarg").mask("999.999.999,9999", {
		reverse: true,
		translation: {
		  9: { pattern: /\d/ },
		},
	  });
	  $("#txtEsp").mask("999.999.999,9999", {
		reverse: true,
		translation: {
		  9: { pattern: /\d/ },
		},
	  });
  
	  $("#txtDtInicio").focus(function () {
		var calenderDataInicio = FLUIGC.calendar("#txtDtInicio");
	  });
	  $("#txtDtFim").focus(function () {
		var calenderDtFim = FLUIGC.calendar("#txtDtFim");
	  });

}
  
function incluirDados(Tbl, TblId, TblColumns) {
	var jsonDados = "";
  
	if ($("#hddJsonT" + TblId.substr(1) + "1")[0] != undefined) {
	  jsonDados += $("#hddJsonT" + TblId.substr(1) + "1").val();
	  jsonDados += $("#hddJsonT" + TblId.substr(1) + "2").val();
	  jsonDados += $("#hddJsonT" + TblId.substr(1) + "3").val();
	  jsonDados += $("#hddJsonT" + TblId.substr(1) + "4").val();
	  jsonDados += $("#hddJsonT" + TblId.substr(1) + "5").val();
	  jsonDados += $("#hddJsonT" + TblId.substr(1) + "6").val();
	  jsonDados += $("#hddJsonT" + TblId.substr(1) + "7").val();
	  jsonDados += $("#hddJsonT" + TblId.substr(1) + "8").val();
	  jsonDados += $("#hddJsonT" + TblId.substr(1) + "9").val();
	  jsonDados += $("#hddJsonT" + TblId.substr(1) + "10").val();
	} else {
	  jsonDados = $("#hddJsonT" + TblId.substr(1)).val();
	}
  
	jsonDados = JSON.parse(jsonDados);
	
	Tbl.rows.add(jsonDados).draw();
	Tbl.columns.adjust().draw(false);
	Tbl.page("last").draw("page");
}
  
function salvarJson(Tbl, TblId, TblColumns) {
	var jsonDados = [];
  
	Tbl.rows().every(function () {
	  var cells = this.data();
	  var data = {};
  
	  for (var cont = 0; cont < TblColumns.length; cont++) {
		data[TblColumns[cont].data] = cells[TblColumns[cont].data];
	  }
  
	  jsonDados.push(data);
	});
	console.log(jsonDados);
  
	if (Array.isArray(jsonDados) === true && Object.keys(jsonDados).length > 0) {
	  var jsonString = JSON.stringify(jsonDados);
  
	  if ($("#hddJsonT" + TblId.substr(1) + "1")[0] != undefined) {
		if (jsonString.length > 3999) {
		  for (var cont = 0; cont < jsonString.length / 3999; cont++) {
			$("#hddJsonT" + TblId.substr(1) + (cont + 1)).val(
			  jsonString.substring(0 + cont * 3999, 3999 + cont * 3999)
			);
		  }
		} else {
		  $("#hddJsonT" + TblId.substr(1) + "1").val(jsonString);
		}
	  } else {
		$("#hddJsonT" + TblId.substr(1)).val(jsonString);
	  }
	}
}
  
function removeRow(Tbl, TblId, TblColumns) {
	Tbl.rows(".selected").remove().draw(false);
  
	salvarJson(Tbl, TblId, TblColumns);
}
  
function fnTelaModal(tbDatatable, inTabela, inConteudo, inOperacao, inColumns) {
	var iCont, jSonString;
	var qtde = inColumns.length;
	var jAdd = [];
	jMod = [];
	var jActions = [];
	var lSelecao = false;
  
	if (inOperacao == "incluir") {
	  jActions = new Array(
		{ label: "OK", bind: "msg-INC" },
		{ label: "Salvar", bind: "msg-SVA" },
		{ label: "Cancelar", bind: "msg-CAN" }
	  );
	} else {
	  $.each($("#" + inTabela + " > tbody > tr"), function (index, value) {
		if ($(this).hasClass("selected")) {
		  lSelecao = true;
		}
	  });
	  if (lSelecao == false) {
		return;
	  }
  
	  jActions = new Array(
		{ label: "OK", bind: "msg-MOD" },
		{ label: "Cancela", bind: "msg-CAN" }
	  );
	}
  
	var modalCtblFecha = FLUIGC.modal(
	  {
		id: "msg-btCtblFecha",
		title: "Plano de Ação",
		content: "" + inConteudo,
		size: "large",
		formModal: false,
		actions: jActions,
	  },
	  function (err, data) {
		if (inOperacao != "incluir") {
		  var dados = tbDatatable.rows(".selected").data();
  
		  for (var iCont = 0; iCont < qtde; iCont++) {
			$("#" + inColumns[iCont].name).val(dados[0][inColumns[iCont].data]);
		  }
		}
	  }
	);
  
	//inicializaZoomPaiFilho();
  
	$("[msg-INC]").on("click", function (evt) {
	  if (validateModal(inColumns) == false) {
		return false;
	  }
  
	  var jSonString = "{";
	  for (var iCont = 0; iCont < qtde; iCont++) {
		inValCel = $("#" + inColumns[iCont].name).val();
		if (inValCel != null && inValCel != undefined) {
		  jSonString +=
			'"' +
			inColumns[iCont].data +
			'": "' +
			$("#" + inColumns[iCont].name).val() +
			'"';
		  if (iCont + 1 < qtde) jSonString += ",";
		} else {
		  jSonString += '"' + inColumns[iCont].data + '": ""';
		  if (iCont + 1 < qtde) jSonString += ",";
		}
	  }
	  jSonString += "}";
	  jAdd = new Array(JSON.parse(jSonString));
  
	  tbDatatable.rows.add(jAdd).draw();
	  tbDatatable.columns.adjust().draw(false);
	  tbDatatable.page("last").draw("page");
	  salvarJson(tbDatatable, inTabela, inColumns);
  
	  modalCtblFecha.remove();
	});
	$("[msg-SVA]").on("click", function (evt) {
	  if (validateModal(inColumns) == false) {
		return false;
	  }
  
	  var jSonString = "{";
	  for (var iCont = 0; iCont < qtde; iCont++) {
		inValCel = $("#" + inColumns[iCont].name).val();
		if (inValCel != null && inValCel != undefined) {
		  jSonString +=
			'"' +
			inColumns[iCont].data +
			'": "' +
			$("#" + inColumns[iCont].name).val() +
			'"';
		  if (iCont + 1 < qtde) jSonString += ",";
		} else {
		  jSonString += '"' + inColumns[iCont].data + '": ""';
		  if (iCont + 1 < qtde) jSonString += ",";
		}
	  }
	  jSonString += "}";
	  jAdd = new Array(JSON.parse(jSonString));
  
	  tbDatatable.rows.add(jAdd).draw();
	  tbDatatable.columns.adjust().draw(false);
	  tbDatatable.page("last").draw("page");
	  salvarJson(tbDatatable, inTabela, inColumns);
  
	  for (var iCont = 0; iCont < qtde; iCont++) {
		$("#" + inColumns[iCont].name).val("");
	  }
	});
	$("[msg-MOD]").on("click", function (evt) {
	  if (validateModal(inColumns) == false) {
		return false;
	  }
  
	  inRow = tbDatatable.row(".selected").index();
	  jAdd = tbDatatable.rows(".selected").data().draw(false);
  
	  for (var iCont = 0; iCont < qtde; iCont++) {
		inValCel = $("#" + inColumns[iCont].name).val();
		if (inValCel != null && inValCel != undefined) {
		  jAdd[0][inColumns[iCont].data] = inValCel;
		  inCell = tbDatatable.cell(inRow, iCont);
		  inCell.data(inValCel);
		}
	  }
  
	  tbDatatable.rows(".selected").data(jAdd).draw(false);
	  tbDatatable.columns.adjust().draw(false);
	  salvarJson(tbDatatable, inTabela, inColumns);
  
	  $.each($("#" + inTabela + " > tbody > tr"), function (index, value) {
		$(this).removeClass("selected");
	  });
  
	  modalCtblFecha.remove();
	});
	$("[msg-CAN]").on("click", function (evt) {
	  modalCtblFecha.remove();
	});
}
  
function ocultarColunasVazias(table) {
	table.columns().every(function () {
	  var column = this;
	  var colData = column.data();
	  var isColumnEmpty = true;
  
	  for (var i = 0; i < colData.length; i++) {
		if (colData[i]) {
		  isColumnEmpty = false;
		  break;
		}
	  }
  
	  if (isColumnEmpty) {
		column.visible(false);
	  }
	});
}
  
function validateModal(inColumns) {
	var mensagem = "";

	for (var cont = 0; cont < inColumns.length; cont++) {
		var campo = inColumns[cont];
		var $campo = $("#" + campo.name);

		if (
			$campo.length &&
			!$campo.prop("readonly") &&
			!$campo.prop("disabled") &&
			!$campo.val()
		) {
			mensagem += montarMensagem("- O Campo (" + campo.title + ") precisa ser preenchido.");
		}
	}

	if (mensagem) {
		alerta(mensagem);
		return false;
	}

	return true;
}
  
$("#form").submit(function () {
	$("#slcFormaObtencao").prop("disabled", false);
});

function verificaMarcados() {
	const algumMarcado = $('#suprimentos, #recebimento, #pagamentos').is(':checked');
	
	if (algumMarcado) {
		console.log('Tem pelo menos um marcado!');
		$('#divPlanoA').show();
		$('#fieldsetPlanoA').show();
	} else {
		console.log('Nenhum checkbox marcado!');
		$('#divPlanoA').hide();
		$('#fieldsetPlanoA').hide();
	}
}

function collapsePanel(id,status) {

	if (status == true) {
		$('#' + id).collapse('show');
	}

	if (status == false) {
		$('#' + id).collapse('hide');
	}	
}


function ativarPanel(id) {
	
	$("#"+id+" a").removeClass("down");
	$("#"+id+" a").addClass("up");
	$("#"+id+" div.panel-collapse").addClass("in");
	
}

function AtivaCampoAprova(campo, valor){
	if(valor == 'Não'){
		$('#' + campo).prop("readonly", false);
		$("label[for="+ campo +"]").addClass('required');
	}else{
		$('#' + campo).val('');
		$('#' + campo).prop("readonly", true);
		$("label[for="+ campo +"]").removeClass('required');
	}
}

function panelShow(form, customHTML, divId, show) {
    if (show) {
        $("#" + divId).show();
    } else {
        $("#" + divId).hide();
    }
}

var pre_language = {
	"decimal": ",",
 "emptyTable":     "Sem dados na tabela",
//	    "info":           "Mostrando _START_ para _END_ de _TOTAL_ registros",
 "info":           "_TOTAL_ registros",
 "infoEmpty":      "Exibindo 0 até 0 de 0 registors",
 "infoFiltered":   "(filtro de _MAX_ registros)",
 "infoPostFix":    "",
 "thousands":      ",",
 "lengthMenu":     "Mostrar _MENU_ registros",
 "loadingRecords": "Carregando...",
 "processing":     "Processando...",
 "search":         "Pesquisa:",
 "zeroRecords":    "Nenhum registro localizado",
 "paginate": {
	 "first":      "Primeiro",
	 "last":       "Último",
	 "next":       "Próximo",
	 "previous":   "Anterior"
 },
 "aria": {
	 "sortAscending":  ": Classifica coluna ascendente",
	 "sortDescending": ": Classifica coluna descendente"
 }
};

function criaDatatables() {
	columnsPlanoA = [ 	{ data:"Oque" 	    , title: "O que? ( Ação )"			  , name:"txtOque"	      },
	                    { data:"PorQue"     , title: "Por quê?"			      , name:"txtPorQue"   },
						{ data:"Como"	    , title: "Como?"				  , name:"txtComo"     },
						{ data:"Onde"	    , title: "Onde?"	  	          , name:"txtOnde"	      },
						{ data:"Quem"	    , title: "Quem?"		          , name:"txtQuem"		  },
						{ data:"DtInicio"   , title: "Data de início"	 	  , name:"txtDtInicio"		  },
						{ data:"DtFim"	    , title: "Data de término"	 	  , name:"txtDtFim"		  },
						{ data:"Descricao"  , title: "Descrição do Ocorrido"  , name:"txtDescricao"		  },
						];
	
	tablePlanoA = fnCriaDatatable("tblPlanoA", columnsPlanoA, true);
	
	 attCampos(tablePlanoA);
	
	if($("#hddJsonTblPlanoA1").val() != null && $("#hddJsonTblPlanoA1").val() != "") {
		
		incluirDados(tablePlanoA, "tblPlanoA", columnsPlanoA);
		
	}
	
}

function attCampos(table) {

    let setoresSelecionados = [];


    if ($("#suprimentos").is(":checked")) {
        setoresSelecionados.push("suprimentos");
    }

    if ($("#recebimento").is(":checked")) {
        setoresSelecionados.push("recebimento");
    }

    if ($("#pagamentos").is(":checked")) {
        setoresSelecionados.push("pagamentos");
    }
    console.log("Setores selecionados:", setoresSelecionados);

    if (setoresSelecionados > 0) {
        
        ["txtOque","txtPorQue","txtComo","txtOnde","txtQuem","txtDtInicio","txtDtFim"		,
		"txtDescricao"
		,].forEach(col => {
            mostrarColunaPorNome(table, col);
        });
    }
}

function mostrarColunaPorNome(table, columnName) {
    var columnIndex = table.column(columnName + ':name').index();
    table.column(columnIndex).visible(true);
}

function ocultarColunaPorNome(table, columnName) {
    var columnIndex = table.column(columnName + ':name').index();
    table.column(columnIndex).visible(false);
}

function mostrarTodasColunas(table) {
    table.columns().every(function () {
        this.visible(true);
    });
}

function ocultarTodasColunas(table) {
    table.columns().every(function () {
        this.visible(false);
    });
}

function fnCriaDatatable(inTabela, columnsDatatable, scrollX) {
	
	var tbDatatable = $("#" + inTabela ).DataTable({
		paging: true,
		searching:true,
		info: false,
		dom: 'lsip<t>',
		scrollX: scrollX,
        columns: columnsDatatable,
	    language: pre_language
	});
	
	for (var cont = 0; cont < columnsDatatable.length; cont++) {
		
		$("#"+inTabela+" thead th")[0].style.width = columnsDatatable[cont].width;
		
	}
	
	$("#txtPesq" + inTabela.substr(3)).on({ keyup: function(){
		
	    $.each($("#" + inTabela + " > tbody > tr"), function (index, value) {
	    	
        	$(this).removeClass('selected');
        	
	    });
	    
	    $('#' + inTabela).DataTable().search( $("#txtPesq" + inTabela.substr(3)).val(), true, true ).draw();
	    
	} });
	
	$("#" + inTabela + "_filter").hide();
	
	$('#' + inTabela).on( 'draw.dt', function () {
		
	    $.each($("#" + inTabela + " > tbody > tr"), function (index, value) {
	    	
	    	$(this).removeClass('selected'); 
	    	
	    });
	    
	} );

	$('#' + inTabela).on( 'page.dt', function () {
		
	    $.each($("#" + inTabela + " > tbody > tr"), function (index, value) {
	    	
	    	$(this).removeClass('selected');
	    	
	    });
	    
	} );
	
    $('#' + inTabela).on( 'click', 'tr', function () {
    	
    	var tr = this;
    	
	    $.each($("#" + inTabela + " > tbody > tr"), function (index, value) {
	    	
	        if(this == tr ) {
	        	
	        	if ( !$(this).hasClass('selected') ){
	        		
	        		$(this).toggleClass('selected');
	        		
	        	}
	        	
	        }
	        else
	        	$(this).removeClass('selected');
	        
	    });
	    
    });
    
    $('#' + inTabela).on( 'dblclick', 'tr', function () {
    	
    	var tr = this;
    	
	    $.each($("#" + inTabela + " > tbody > tr"), function (index, value) {
	    	
	        if(this == tr ) {
	        	
	        	if ( !$(this).hasClass('selected') ){
	        		
	        		$(this).toggleClass('selected');
	        		
	        	}
	        	
	    		if($("#btnUpd" + inTabela.substr(3))[0].disabled == false) {$("#btnUpd" + inTabela.substr(3)).click();}
	    		
	        } 
	        else  {
	        	
	        	$(this).removeClass('selected');
	        	
	        }
	        
	    });
	    
    } );
	
    return tbDatatable;
    
}


function toggleDarkMode() {
	document.body.classList.toggle("dark");
}

// Load light or dark mode
function loadTheme() {
  const darkMode = localStorage.getItem("dark");

  if (darkMode) {
    toggleDarkMode();
  }
}

function fnModoView(){
    var node_list = document.getElementsByTagName('*');
    var controle = false;
    for (var i = 0; i < node_list.length; i++) {
		var node = node_list[i];
		if (node.nodeName == "SPAN" && node.className=="form-control") {
			var nodeValue = node.textContent;
			nodeValue = nodeValue.replace(/[\\"]/g, ' ');
			node.textContent = nodeValue;
			node.style.color = "red";
		}
    }
}