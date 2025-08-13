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

	// CONFORME ATIVIDADE
	if (numeroAtividade == 0 || numeroAtividade == 19) {
		toggleJustUrg();
		$("#slcGrauPrioridade").on("change", toggleJustUrg);
	}
	if (numeroAtividade == 4) {
		toggleObsGest();
		$("input[name='aprGestor']").on("change", toggleObsGest);
	}
	if(numeroAtividade == 15){
		toggleObsNorm();
		$("input[name='setorApr']").on("change", toggleObsNorm);
	}
});

//Funções para Painel de Informações do Documento
function toggleJustUrg() {
	var urg = $("#slcGrauPrioridade").val();
	if (urg === "alta") {
		$("#divJustUrg").show();
	} else{
		$("#divJustUrg").hide();
	}
}

//Funções para a aprovação do Gestor do Solicitante
function toggleObsGest() {
	var apv = $("input[name='aprGestor']:checked").val();
	if (apv === "false") {
	  $("#justTxt").show();
	} else {
	  $("#justTxt").hide();
	  $("#txtJusGrc").val("");
	}
}
const style = `
  <style>
    input[type="radio"][name="aprGestor"]:disabled + label::before {
      background-color: #ccc !important;
      border-color: #999 !important;
    }

    input[type="radio"][name="aprGestor"]:disabled + label {
      color: #999 !important;
      cursor: not-allowed;
      opacity: 0.6;
    }
  </style>
`;
$("head").append(style);

//Funções para a aprovação da Normalização
function toggleObsNorm() {
	var norm = $("input[name='setorApr']:checked").val();
	if (norm === "false") {
		$("label[for='txtJusDrt']").text("Justificativa");
		$("#txtJusDrt").val("");
		const $label = $("#labelDescricao"); // ID que demos ao label
		$label.text(norm === "false" ? "Justificativa" : "Descrição");

		// Remove o destaque visual (vermelho/branco)
		$label.css({
			backgroundColor: "",
			color: "",
			padding: "",
			borderRadius: ""
		});

		// Remove também o destaque do span, se existir
		const $destaque = $("#destacarCaminho");
		if ($destaque.length) {
			$destaque.css({
				backgroundColor: "",
				color: "",
				padding: "",
				borderRadius: ""
			});
		}
	} else {
		$("label[for='txtJusDrt']").text("Descrição");
		$("#txtJusDrt").val("");
	}
}

//Função do botão de anexo
$("#botaoAnexo").click(function (param) {
	JSInterface.showCamera("Arquivo para Normalizar");
});

//Função para o botão de descrição do documento
document.getElementById("openModalButton").addEventListener("click", function () {
	var myModal = FLUIGC.modal(
	  {
		title: "Descrição dos Documentos",
		content:
		  '<table class="table">' +
		  '<thead><tr><th>Documento</th><th>Código</th><th>Descrição</th></tr></thead>' +
		  '<tbody>' +
		  '<tr><td>Formulário</td><td>FOR</td><td>Trata-se de uma tabela preenchível.</td></tr>' +
		  '<tr><td>Padrão de Posto de Trabalho</td><td>PPT</td><td>Detalha encargos de uma função, utiliza imagens na descrição.</td></tr>' +
		  '<tr><td>Instrução de Trabalho</td><td>IT</td><td>Detalha encargos de uma função, não utiliza imagens na descrição.</td></tr>' +
		  '<tr><td>Instrução Operacional</td><td>IO</td><td>Dispõe de informações detalhadas, com imagens para a realização de uma determinada atividade.</td></tr>' +
		  '<tr><td>Tabela</td><td>TAB</td><td>Trata-se de informações tabeladas, já definidas, utilizadas para a atividade. Esta, diferente do formulário, não é preenchível após pronto.</td></tr>' +
		  '<tr><td>Procedimento</td><td>PRO</td><td>Se refere a um fluxograma, podendo haver comentários, descrevendo alguma atividade, sem utilizar imagens.</td></tr>' +
		  '<tr><td>Norma Técnica</td><td>NT</td><td>Determina um conjunto de regras a serem seguidas no desempenho da atividade, podendo ser utilizado imagens de desenho técnico.</td></tr>' +
		  '<tr><td>Manual</td><td>MAN</td><td>Explicação detalhada de como a atividade deve ser realizada. Neste documento deve haver capa e sumário.</td></tr>' +
		  '<tr><td>Política</td><td>POL</td><td>Descreve intenções e a direção da organização, é aprovado formalmente pela alta direção, e publicado interna e externamente à empresa.</td></tr>' +
		  '</tbody>' +
		  '</table>',
		id: "modal-tabela-exemplo",
		actions: [
		  {
			label: "Fechar",
			autoClose: true,
		  },
		],
	  },
	  function (err, data) {
		if (err) {
		  // Tratamento de erro, se necessário
		} else {
		  // Manipulação dos dados, se houver retorno
		}
	  }
	);
});

//Funções para atribuir e retirar valor de gestorMatric
function setSelectedZoomItem(item) {
	console.log(item);
	if (item.inputName == "gestor") {
	  const $gestorMatric = document.querySelector("#gestorMatric");
	  $gestorMatric.value = item.matricula;
	}
} 
function removedZoomItem(item) {
	console.log(item);
	if (item.inputName == "gestor") {
	  const $gestorMatric = document.querySelector("#gestorMatric");
	  $gestorMatric.value = "";
	}
}

var beforeSendValidate = function (numState, nextState) {
	var atividade = numState;
	var resposta = "";
    
	if(numState == 0 || numState == 19){
		if ($("#slcTipoDocumento").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (Tipo de Documento)</b> precisa ser preenchido!</b>"
			+ "<br>";
		}
		if ($("#slcGrauPrioridade").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (Grau de Prioridade)</b> precisa ser preenchido!</b>"
			+ "<br>";
		}
		
		if ($("#gestor").val() == ""){	
			resposta += "<b>O Campo <b style='color:red'> (Gestor)</b> precisa ser preenchido!</b>"
			+ "<br>";
		}
		if ($("#slcGrauPrioridade").val() == "alta" && $("#urgencia").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (Justifique a Urgência)</b> precisa ser preenchido!</b>"
			+ "<br>";	
		}
    }
	if(atividade == 4){
		if ($('input[name="aprGestor"]:checked').val() === undefined) {
			resposta += "<b>O Campo <b style='color:red'> (De acordo?)</b> precisa ser preenchido!</b>"
			+ "<br>";
		}

		if ($('input[name="aprGestor"]:checked').val() === "false" && $("#txtJusGrc").val() == "") {
			resposta += "<b>O Campo <b style='color:red'> (Justificativa)</b> precisa ser preenchido!</b>"
			+ "<br>";
		}
	}
	if(atividade == 15){
		if ($('input[name="setorApr"]:checked').val() === undefined) {
			resposta += "<b>O Campo <b style='color:red'> (De acordo?)</b> precisa ser preenchido!</b>"
			+ "<br>";
		}
		if ($('input[name="setorApr"]:checked').val() === "true" && $("#txtJusDrt").val() == "") {
			resposta += "<b>O Campo <b style='color:red'> (Descrição)</b> precisa ser preenchido!</b>"
			+ "<br>";
		}
		if ($('input[name="setorApr"]:checked').val() === "false" && $("#txtJusDrt").val() == "") {
			resposta += "<b>O Campo <b style='color:red'> (Justificativa)</b> precisa ser preenchido!</b>"
			+ "<br>";
		}
	}
	if(resposta == "<b>O Campo <b style='color:red'> (Descrição)</b> precisa ser preenchido!</b>"
	+ "<br>"){
		const destaque = document.getElementById("destacarCaminho");
		if (destaque) {
			destaque.style.backgroundColor = "red";
			destaque.style.color = "white";
			destaque.style.padding = "2px 4px";
			destaque.style.borderRadius = "3px";
		}
		const labelDescricao = document.getElementById("labelDescricao");
		if (labelDescricao) {
			labelDescricao.style.backgroundColor = "red";
			labelDescricao.style.color = "white";
			labelDescricao.style.padding = "2px 4px";
			labelDescricao.style.borderRadius = "3px";
		}
		throw resposta;
	}
	if (resposta != "") {
		throw resposta;
	}
}