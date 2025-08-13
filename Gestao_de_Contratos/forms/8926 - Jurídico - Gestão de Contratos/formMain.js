//define variáveis das atividades do processo
var atvIni = 7;
var atvAnaSolCliDarAnd = 12;
var atvAnaRetQue = 35;
var atvFinAtuMinAneFlu = 31;
var atvValMinComForViaEmail = 64;
var atvEnvParApr = 29;
var atvAproPlanFin = 19;
var atvAproContGestReq2 = 10;
var atvAproContGestReq = 38;
var atvAproContGestSup = 42;
var atvAproContGerSup = 46;
var atvBaiDocEnvAssDig = 53;
var atvApoAssSalGED = 55;
var rowData = {};
let chartInstance = null;
var tableHistorico;
var columnsHistorico;
var tableTabGatilhos;
var columnsTabGatilhos;

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
	
	//carrega controles de zoom (form_zoom)
	setTimeout(function() { carregaZoom(); }, 1);
	
	//cria datatables do formulário (form_display)
	setTimeout(function() { criaDatatables(); }, 1);
	setTimeout(function() { criaDatatables2(); }, 1);
	setTimeout(function() { criaDatatables3(); }, 1);
	setTimeout(function() { criaDatatables4(); }, 1);  
	
	$('[data-toggle="popover"]').popover({
		  trigger: "hover",
		  delay: {
		    show: 0,
		    hide: 500,
		  }
	});

	$('#txtCpfCnpj').on('input', function () {
		let valor = $(this).val().replace(/\D/g, ''); // Remove tudo que não for número
	  
		if (valor.length <= 11) {
		  // CPF: 000.000.000-00
		  valor = valor.substring(0, 11);
		  if (valor.length > 9) {
			valor = valor.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4');
		  } else if (valor.length > 6) {
			valor = valor.replace(/^(\d{3})(\d{3})(\d{0,3}).*/, '$1.$2.$3');
		  } else if (valor.length > 3) {
			valor = valor.replace(/^(\d{3})(\d{0,3}).*/, '$1.$2');
		  }
		} else {
		  // CNPJ: 00.000.000/0000-00
		  valor = valor.substring(0, 14);
		  if (valor.length > 12) {
			valor = valor.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/, '$1.$2.$3/$4-$5');
		  } else if (valor.length > 8) {
			valor = valor.replace(/^(\d{2})(\d{3})(\d{3})(\d{0,4}).*/, '$1.$2.$3/$4');
		  } else if (valor.length > 5) {
			valor = valor.replace(/^(\d{2})(\d{3})(\d{0,3}).*/, '$1.$2.$3');
		  } else if (valor.length > 2) {
			valor = valor.replace(/^(\d{2})(\d{0,3}).*/, '$1.$2');
		  }
		}
	  
		$(this).val(valor); // Atualiza o valor formatado no campo
	  });
	  
	$('#txtNumero').on('input', function () {
		var numero = $(this).val().replace(/\D/g, ''); 
		$(this).val(numero);
	});
	$('#txtParcelas').on('input', function () {
		var parcelas = $(this).val().replace(/\D/g, ''); 
		$(this).val(parcelas);
	});
	
	$('#txtCep').on('input', function () {
		var cep = $(this).val().replace(/\D/g, ''); 
	  
		if (cep.length > 5) {
		  cep = cep.slice(0, 5) + '-' + cep.slice(5, 8);
		}
	  
		$(this).val(cep);
	});  

	$('#txtTel').on('input', function() {
		  var phoneNumber = $(this).val().replace(/\D/g, '');
		  if (phoneNumber.length < 10) {
			  $(this).mask('(00) 000-000000');
		  } else {
			  $(this).mask('(00) 00000-0000');
		  }
	});
	
	$('#txtLogradouro').on('input', function() {
	    var enderecoCompleto = $(this).val().toLowerCase();
	    var ultimaVirgulaIndex = enderecoCompleto.lastIndexOf(',');
	    if (ultimaVirgulaIndex !== -1) {
	      var endereco = enderecoCompleto.substring(0, ultimaVirgulaIndex).trim();
	      var numero = enderecoCompleto.substring(ultimaVirgulaIndex + 1).trim();
	      $('#txtLogradouro').val(endereco);
	      $('#txtNumero').val(numero);
	    } else {
	      $('#txtNumero').val('');
	    }
	  });
	
	$('#').focus(function(){
		tinhaTexto = $('#txtQuestionamento').val();
	})
	$('#txtQuestionamento , #txtResposta').on('change', function(){
		console.log('Teste');
	    var questionamento = $('#txtQuestionamento').val();
	    var Resposta = $('#txtResposta').val();
	    var Data = $('#txtDataResp').val();
	    var responsavel = $('#txtResponsavelJuridico').val();
	    var ID = $('#hddHistoricoId').val();
	    
	    var exists = false;
	    var lasRow = null;
	    console.log(tableHistorico.rows.length);
	    tableHistorico.rows().every(function() {
	        var rowData = this.data();
	        if (rowData.ID === ID && (numeroAtividade == atvAnaSolCliDarAnd)) {
	            console.log('quest');
	            exists = true;
	            // Atualiza a linha com os novos valores
	            this.data({
	                "ID": ID,
	                "Data": Data,
	                "RespQuest": responsavel,
	                "Quest": questionamento,
	                "DataResposta": '',
	                "RespResposta":'',
	                "Resposta":'',
	            }).draw();
	        } else if ($('#txtQuestionamento').val() == rowData.Quest && (numeroAtividade == atvAnaRetQue)) {
	            console.log('resp' + rowData.ID);
	            exists = true;
	            
	            // Atualiza a linha com os novos valores 
	            this.data({
	                "ID": rowData.ID,
	                "Data": rowData.Data,
	                "RespQuest": rowData.RespQuest,
	                "Quest": rowData.Quest,
	                "DataResposta": Data,
	                "RespResposta": responsavel,
	                "Resposta": Resposta,
	            }).draw();
	        }
	    });


	    if (!exists) {
	    	console.log('not exist');
	        // Adiciona os valores coletados à tabela 'tableHistorico'
	        tableHistorico.row.add({
	            "ID": ID, // Atribui um ID baseado no comprimento atual dos dados
	            "Data": Data, 
	            "RespQuest": responsavel, 
	            "Quest": questionamento,
	            "DataResposta": '',
                "RespResposta":'',
                "Resposta":'',
	        }).draw();
	    }
	    
	    // Salvar os dados atualizados na tabela
	    salvarJson(tableHistorico, "tblHistorico", columnsHistorico);
	    exibirQuestionamentos();    
	});

	$('#txtValorTotal').on('input change', function() {
        let valorRaw = $(this).val();
        let valorLimpo = valorRaw.replace(/\./g, '').replace(',', '.');
        let valor = parseFloat(valorLimpo);

        // Pega valor selecionado no select da diretoria
        let diretoria = $('#diretoriaCiente').val();

        if (!isNaN(valor) && valor > 100000 && diretoria !== "Sim") {
            alert("Para contratos acima de 100.000 é necessário a ciência da diretoria");
        }
    });

	const documento = $('#slcDocumento').val();
	const reco = $('#slcReco').val();
	const formaPag = $('#slcFormaPag').val();
	const capOpe = $('#slcCapOpe').val();
	const compromisso = $('#slcPrePosFix').val();
	const ipca = $('#slcIPCA').val();
	const pag = $('#slcMeioPag').val();

	// Documento inicial
	if (documento != "Contrato") {
		panelShow('form', 'customHTML', 'fieldEndereco', false);
		panelShow('form', 'customHTML', 'fieldVigencia', false);
		panelShow('form', 'customHTML', 'fieldPagamento', false);
		panelShow('form', 'customHTML', 'divTxtNov', false);
		panelShow('form', 'customHTML', 'fieldComparacao', false);
		panelShow('form', 'customHTML', 'fieldDadosCompro', false);
		panelShow('form', 'customHTML', 'fieldDadosIPCA', false);
		panelShow('form', 'customHTML', 'fieldDadosDir', true);
		panelShow('form', 'customHTML', 'divSlcEspecieDocumento', false);
		panelShow('form', 'customHTML', 'divReco', false);
	}

	// Reco inicial
	if (reco != "Sim") {
		panelShow('form', 'customHTML', 'fieldComparacao', false);
		panelShow('form', 'customHTML', 'fieldDadosIPCA', false);
		panelShow('form', 'customHTML', 'fieldVigencia', false);
	}

	if (pag == "") {
		panelShow('form', 'customHTML', 'divZoomCondPag', false);
		panelShow('form', 'customHTML', 'divslcPix', false);
		panelShow('form', 'customHTML', 'divslcInst', false);
		panelShow('form', 'customHTML', 'divslcAgencia', false);
		panelShow('form', 'customHTML', 'divslcConta', false);
	}

	if (compromisso != "Pos") {
		panelShow('form', 'customHTML', 'fieldsetTabGatilhos', false);
		enableContainer('form', 'customHTML', 'fieldsetTabGatilhos', false);
		panelShow('form', 'customHTML', 'fieldJustCompro', false);
		enableContainer('form', 'customHTML', 'fieldJustCompro', false);
	}

	if (ipca != "Sim") {
		panelShow('form', 'customHTML', 'fieldsetTabIPCA', false);
		enableContainer('form', 'customHTML', 'fieldsetTabIPCA', false);
		panelShow('form', 'customHTML', 'fieldJustIPCA', false);
		enableContainer('form', 'customHTML', 'fieldJustIPCA', false);
	}

	// Forma Pagamento inicial
	if (formaPag != "Parcelado") {
		panelShow('form', 'customHTML', 'divParcelas', false);
	}

	// Capex inicial
	if (capOpe != "Capex") {
		panelShow('form', 'customHTML', 'divNumeroTAP', false);
	}

	// Evento de mudança para Documento
	$('#slcDocumento').change(function () {
		const val = $(this).val();
		const isContratoOuChancelamento = (val == "Contrato");
		
		panelShow('form', 'customHTML', 'divTxtNov', isContratoOuChancelamento);
		panelShow('form', 'customHTML', 'fieldEndereco', isContratoOuChancelamento);
		panelShow('form', 'customHTML', 'fieldVigencia', isContratoOuChancelamento);
		panelShow('form', 'customHTML', 'fieldPagamento', isContratoOuChancelamento);
		panelShow('form', 'customHTML', 'fieldDadosCompro', isContratoOuChancelamento);
		panelShow('form', 'customHTML', 'divSlcEspecieDocumento', isContratoOuChancelamento);
		panelShow('form', 'customHTML', 'divReco', isContratoOuChancelamento);
	});

	$('#slcMeioPag').change(function () {
		const val = $(this).val();
		if(val=="Pix"){
			panelShow('form', 'customHTML', 'divZoomCondPag', true);
			panelShow('form', 'customHTML', 'divslcPix', true);
			panelShow('form', 'customHTML', 'divslcInst', true);
			panelShow('form', 'customHTML', 'divslcAgencia', false);
			panelShow('form', 'customHTML', 'divslcConta', false);
		}else if(val=="Boleto"){
			panelShow('form', 'customHTML', 'divZoomCondPag', true);
			panelShow('form', 'customHTML', 'divslcPix', false);
			panelShow('form', 'customHTML', 'divslcInst', false);
			panelShow('form', 'customHTML', 'divslcAgencia', false);
			panelShow('form', 'customHTML', 'divslcConta', false);
		}else if(val=="Deposito"){
			panelShow('form', 'customHTML', 'divZoomCondPag', true);
			panelShow('form', 'customHTML', 'divslcPix', true);
			panelShow('form', 'customHTML', 'divslcInst', true);
			panelShow('form', 'customHTML', 'divslcAgencia', true);
			panelShow('form', 'customHTML', 'divslcConta', true);
		}else{
			panelShow('form', 'customHTML', 'divZoomCondPag', false);
			panelShow('form', 'customHTML', 'divslcPix', false);
			panelShow('form', 'customHTML', 'divslcInst', false);
			panelShow('form', 'customHTML', 'divslcAgencia', false);
			panelShow('form', 'customHTML', 'divslcConta', false);
		}
	});

	// Evento de mudança para Reco
	$('#slcReco').change(function () {
		const isSim = $(this).val() === "Sim";
		panelShow('form', 'customHTML', 'fieldVigencia', !isSim);
		panelShow('form', 'customHTML', 'fieldComparacao', isSim);
		panelShow('form', 'customHTML', 'fieldDadosIPCA', isSim);
	});

	// Evento de mudança para Forma Pagamento
	$('#slcFormaPag').change(function () {
		panelShow('form', 'customHTML', 'divParcelas', $(this).val() === "Parcelado");
	});

	// Evento de mudança para Capex
	$('#slcCapOpe').change(function () {
		panelShow('form', 'customHTML', 'divNumeroTAP', $(this).val() === "Capex");
	});

	// Evento de mudança para IPCA
	$('#slcIPCA').change(function () {
		const isSim = $(this).val() === "Sim";
		panelShow('form', 'customHTML', 'fieldsetTabIPCA', isSim);
		enableContainer('form', 'customHTML', 'fieldsetTabIPCA', isSim);
		panelShow('form', 'customHTML', 'fieldJustIPCA', isSim);
		enableContainer('form', 'customHTML', 'fieldJustIPCA', isSim);
	});

	// Evento de mudança para Pre/Pos fix
	$('#slcPrePosFix').change(function () {
		const isPos = $(this).val() === "Pos";
		panelShow('form', 'customHTML', 'fieldsetTabGatilhos', isPos);
		panelShow('form', 'customHTML', 'fieldJustCompro', isPos);
	});

	FLUIGC.calendar('.campo-data');
	function formataMoeda(valor) {
		valor = valor.replace(/\D/g, '');
		valor = (valor / 100).toFixed(2);
		valor = valor.replace('.', ',');
		valor = "R$ " + valor;
		valor = valor.replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
		return valor;
	}

	function aplicarFormatacao(event) {
		let valor = event.target.value;
		valor = valor.replace('R$', '').trim();
		valor = formataMoeda(valor);
		event.target.value = valor;
	}

	// Aplica nos campos
	$('#txtValorTTC, #txtValorTTA, #txtValorTotal').on('input', aplicarFormatacao);	
});

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

function panelShow(form, customHTML, divId, show) {
    if (show) {
        $("#" + divId).show();
    } else {
        $("#" + divId).hide();
    }
}

function atualizarClasse(ids, classeRemover, classeAdicionar) {
    ids.forEach(function(id) {
        var el = document.getElementById(id);
        if (el) {
            el.classList.remove(classeRemover);
            el.classList.add(classeAdicionar);
        }
    });
}

function mostrarColunaPorNome(table, columnName) {
    var columnIndex = table.column(columnName + ':name').index();
    table.column(columnIndex).visible(true);
}

function ocultarColunaPorNome(table, columnName) {
    var columnIndex = table.column(columnName + ':name').index();
    table.column(columnIndex).visible(false);
}

function ocultarTodasColunas(table) {
    table.columns().visible(false);
}

/*function mostrarColunaPorNome(table, name) {
    const columnIndex = table.settings()[0].aoColumns.findIndex(col => col.name === name);
    if (columnIndex !== -1) {
        table.column(columnIndex).visible(true);
    }
}*/

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

function criaDatatables() {
    columnsHistorico = [
        { data: "ID", title: "ID", name: "ID", visible: false },
        { data: "Data", title: "Data", name: "txtData", width: '5%' },
        { data: "RespQuest", title: "Responsável do Questionamento", name: "txtRespQuest", width: '15%' },
        { data: "Quest", title: "Questionamento", name: "txtQuest", width: '80%' },
        { data: "DataResposta", title: "Data da Resposta", name: "txtDataResposta", width: '5%' },
        { data: "RespResposta", title: "Responsável da Resposta", name: "txtRespResposta", width: '15%' },
        { data: "Resposta", title: "Resposta", name: "txtResposta", width: '80%' }
    ];

    tableHistorico = fnCriaDatatable("tblHistorico", columnsHistorico, true);

    if ($("#hddJsonTblHistorico1").val()) {
        incluirDados(tableHistorico, "tblHistorico", columnsHistorico);
    }
}

function criaDatatables2() {
    columnsTabGatilhos = [
        { data: "IndiceTipo", title: "Índice", name: "txtIndiceTipo" },
        { data: "Porcentagem", title: "Porcentagem Atual", name: "txtPorcentagem" },
        { data: "Justificativa", title: "Justificativa", name: "txtJustificativa" },
        { data: "tipoAciona", title: "Acionamento", name: "txttipoAciona" },
        { data: "PorceAciona", title: "Porcentagem", name: "txtPorceAciona" },
    ];

    tableTabGatilhos = fnCriaDatatable("tblTabGatilhos", columnsTabGatilhos, true);

    if ($("#hddJsonTblTabGatilhos1").val()) {
        incluirDados(tableTabGatilhos, "tblTabGatilhos", columnsTabGatilhos);
    }

    attCampos(tableTabGatilhos);
    $("#slcPrePosFix").change(() => attCampos(tableTabGatilhos));
}
//atualiza campos da criaDatatables2
function attCampos(table) {
    var formaObtencao = $("#slcPrePosFix").val();
    ocultarTodasColunas(table);

    if (formaObtencao === "Pos" ) {
        ["txtIndiceTipo","txtPorcentagem","txtJustificativa","txttipoAciona","txtPorceAciona"].forEach(col => {
            mostrarColunaPorNome(table, col);
        });
    } else if(formaObtencao === "Pre"){
        panelShow('form','customHTML', 'fieldJustCompro', false);
        panelShow('form','customHTML', 'fieldsetTabGatilhos', false);
    }
}

function criaDatatables3() {
    columnsTabIPCA = [
        { data: "Orcamenton", title: "Número do Orçamento", name: "txtOrcamenton" },
        { data: "DataOrcado", title: "Data do Orçamento", name: "txtDataOrcado" },
        { data: "Validade", title: "Data de Validade do Orçamento", name: "txtValidade" },
        { data: "DscServicoIPCA", title: "Descrição Serviço", name: "txtDscServicoIPCA" },
        { data: "txtValorUnIPCA", title: "Valor Unitário", name: "txtValorUnIPCA" },
        { data: "ValorTTIPCA", title: "Valor Total", name: "txtValorTTIPCA" }
    ];

    tableTabIPCA = fnCriaDatatable("tblTabIPCA", columnsTabIPCA, true);

    if ($("#hddJsonTblTabIPCA1").val()) {
        incluirDados(tableTabIPCA, "tblTabIPCA", columnsTabIPCA);
    }
}

function criaDatatables4() {
    columnsTabHISTC = [
        { data: "DataContrato", title: "Início Vigência", name: "txtDataContrato" },
        { data: "DataEntregaC", title: "Término Vigência", name: "txtDataEntregaC" },
        { data: "ValorTTC", title: "Valor Total", name: "txtValorTTC" }
    ];

    tableTabHISTC = fnCriaDatatable("tblTabHISTC", columnsTabHISTC, true);

    if ($("#hddJsonTblTabHISTC1").val()) {
        incluirDados(tableTabHISTC, "tblTabHISTC", columnsTabHISTC);
    }
}

function renderGraficoComparacao() {
    const canvas = document.getElementById("canvasGraficoComparativo");
    if (!canvas) {
        console.warn("Canvas 'canvasGraficoComparativo' não encontrado.");
        return;
    }

    if (window.graficoComparativo) {
        window.graficoComparativo.destroy();
    }

    const ctx = canvas.getContext("2d");

    const dados = tableTabHISTC ? tableTabHISTC.rows().data().toArray() : [];

    // Ordena por data (DataContrato)
    dados.sort((a, b) => {
        const dataA = a.DataContrato?.split('/').reverse().join('') || '';
        const dataB = b.DataContrato?.split('/').reverse().join('') || '';
        return dataA.localeCompare(dataB);
    });

    // Rótulos 1º, 2º, 3º etc
    const labels = dados.map((_, i) => `${i + 1}ºContrato`);

    // Tratamento correto de valores monetários
    const valores = dados.map(item => {
        if (!item.ValorTTC) return 0;

        let val = item.ValorTTC.replace(/[^\d,]/g, '').replace(/\./g, '').replace(',', '.');
        const parsed = parseFloat(val);
        return isNaN(parsed) ? 0 : parsed;
    });

	// Adiciona último ponto com data txtDataIniC e valor txtValorTTA
	const dataFinal = document.getElementById('txtDataIniC')?.value || '';
	const valorFinalBruto = document.getElementById('txtValorTTA')?.value || '';

	if (dataFinal && valorFinalBruto) {
		const valorFinal = parseFloat(
			valorFinalBruto.replace(/[^\d,]/g, '').replace(/\./g, '').replace(',', '.')
		);

		if (!isNaN(valorFinal)) {
			labels.push('Atual');
			valores.push(valorFinal);
		}
	}

    window.graficoComparativo = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
				label: 'Valor Total por Contrato',
				data: valores,
				borderColor: '#28a745', // Cor padrão: verde
				backgroundColor: 'rgba(40, 167, 69, 0.2)',
				fill: true,
				tension: 0.3,
				pointRadius: 5,
				pointHoverRadius: 7,
				segment: {
					borderColor: ctx => {
						const { p0, p1 } = ctx;
						return p1.parsed.y > p0.parsed.y ? 'red' : '#28a745'; // vermelho se sobe, verde se cai ou permanece
					}
					
				}
			}]
			
        },
        options: {
			plugins: {
				legend: {
					display: false 
				}
			},
			
            responsive: true,
			layout: {
				padding: {
					top: 20  
				}
			},
            scales: {
                y: {
                    display: false 
                },
                x: {
                    title: { display: true, text: 'Contrato (ordem por vigência)' }
                }
            }
        },
		plugins: [
			{
				id: 'customDataLabels',
				afterDatasetsDraw(chart, args, options) {
					const { ctx, data } = chart;
		
					chart.getDatasetMeta(0).data.forEach((point, index) => {
						const value = data.datasets[0].data[index];
		
						ctx.save();
						ctx.font = '12px Arial';
						ctx.fillStyle = '#000'; // Cor do texto
						ctx.textAlign = 'center';
						ctx.textBaseline = 'bottom';
		
						const valorFormatado = value.toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'BRL'
						});
		
						ctx.fillText(valorFormatado, point.x, point.y - 5);
						ctx.restore();
					});
				}
			}
		]
		
		
    });
}

function pesquisacep(valor) {
	console.log( "BuscaCep" );
	$('txtCep').mask('00000-000');
  //Nova variável "cep" somente com dígitos.
  var cep = valor.replace(/\D/g, '');
	var myLoading1 = FLUIGC.loading('#dadosendereco');
  
  if (cep.length === 8) {
  	myLoading1.show();
  	
      $.get("https://viacep.com.br/ws/" + cep + "/json", function (data) {
          if (!data.erro) {
          	console.log( data );
              $('#txtBairro').val(data.bairro);
              $('#txtZoomMunicipio').val(data.localidade);
              $('#txtLogradouro').val(data.logradouro);
              $('#txtZoomUF').val(data.uf);
              $('#txtZoomPais').val("Brasil");
              
          }
      	myLoading1.hide();    	
      }, 'json');
  }
}

function exibirQuestionamentos() {
	
	if ($('#tblHistorico').DataTable().rows('.selected') != null && 
	    $('#tblHistorico').DataTable().rows('.selected').data().length > 0) {	
		if ($('#tblHistorico').DataTable().rows('.selected').data().length == 1) {
			setValueView('#txtQuestionamento',$('#tblHistorico').DataTable().rows('.selected').data()[0].Quest);
		}
	}
}

function incluirDados(Tbl, TblId, TblColumns) {
	var jsonDados = "";

	// Verifica se é uma tabela paginada com vários campos JSON
	if ($("#hddJsonT" + TblId.substr(1) + "1")[0] != undefined) {
		for (var i = 1; i <= 10; i++) {
			var campo = $("#hddJsonT" + TblId.substr(1) + i);
			if (campo.length && campo.val().trim() !== "") {
				// Remove colchetes extras se necessário
				var jsonItem = campo.val().trim();
				if (jsonItem.startsWith("[") && jsonItem.endsWith("]")) {
					// Remove os colchetes para evitar múltiplos arrays
					jsonItem = jsonItem.slice(1, -1);
				}
				if (jsonDados !== "") jsonDados += ","; // separador entre objetos
				jsonDados += jsonItem;
			}
		}
		jsonDados = "[" + jsonDados + "]"; // fecha como um array JSON válido
	} else {
		jsonDados = $("#hddJsonT" + TblId.substr(1)).val();
	}

	console.log("Valor bruto do campo JSON:", jsonDados);

	try {
		jsonDados = JSON.parse(jsonDados);
		Tbl.rows.add(jsonDados).draw();
		Tbl.columns.adjust().draw(false);
		Tbl.page('last').draw('page');
	} catch (e) {
		console.error("Erro ao fazer JSON.parse:", e.message);
	}
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

    if (Array.isArray(jsonDados) === true && jsonDados.length > 0) {
        var jsonString = JSON.stringify(jsonDados);

        if ($("#hddJsonT" + TblId.substr(1) + "1")[0] != undefined) {
            if (jsonString.length > 3999) {
                for (var cont = 0; cont < jsonString.length / 3999; cont++) {
                    $("#hddJsonT" + TblId.substr(1) + (cont + 1)).val(jsonString.substring((0 + cont * 3999), (3999 + cont * 3999)));
                }
            } else {
                $("#hddJsonT" + TblId.substr(1) + "1").val(jsonString);
            }
        } else {
            $('#hddJsonT' + TblId.substr(1)).val(jsonString);
        }
    } else {
        // Se não houver dados após a remoção, salve como null ou undefined
        if ($("#hddJsonT" + TblId.substr(1) + "1")[0] != undefined) {
            $("#hddJsonT" + TblId.substr(1) + "1").val(null); // ou undefined
        } else {
            $('#hddJsonT' + TblId.substr(1)).val(null); // ou undefined
        }
   
    }
}

//usada no html
function removeRow(Tbl, TblId, TblColumns) {
	
	Tbl.rows( '.selected' ).remove().draw(false);
	
	salvarJson(Tbl, TblId, TblColumns);
	
}

function fnTelaModal( tbDatatable, inTabela, inConteudo, inOperacao, inColumns, titleModal) {
	
	var iCont, jSonString;
	var qtde = inColumns.length
	var jAdd = []; jMod = [];
	var jActions = [];
	var lSelecao = false;
	
	if ( inOperacao == "incluir" ) {
		jActions = new Array( {'label': 'OK', 'bind': 'msg-INC'}, {'label': 'Salvar', 'bind': 'msg-SVA'}, {'label': 'Cancelar', 'bind': 'msg-CAN'} );
	} else {
	    $.each($("#" + inTabela + " > tbody > tr"), function (index, value) {
	    	if ( $(this).hasClass('selected') ){  lSelecao = true	};        	
	    });		
	    if  ( lSelecao == false ) { return };
		
		jActions = new Array( {'label': 'OK', 'bind': 'msg-MOD'}, {'label': 'Cancela', 'bind': 'msg-CAN'} );
	}
		
	var modalCtblFecha = FLUIGC.modal({
		id: 'msg-btCtblFecha',
		title: titleModal,
		content: '' + inConteudo,
		size: 'large',
		formModal: false,
		actions: jActions,
		onOpen: function(modal) {
			console.log("onOpen disparado!");
			FLUIGC.calendar('.campo-data');
			$("#txtDataOrcado, #txtValidade").mask("00/00/0000");
		}		
	}, function(err, data) {
		if ( inOperacao != "incluir" ) {
			var dados = tbDatatable.rows( '.selected' ).data();

			for ( var iCont=0; iCont<qtde; iCont++ ) {
				$( "#" + inColumns[iCont].name ).val( dados[0][ inColumns[iCont].data ]  );
			}; 
		} 
	});
	
	$('[msg-INC]').on('click', function (evt) {
		if (validateModal(inColumns) == false) {
			return false;
		}
	
		let jSonString = '{';
		for (var iCont = 0; iCont < qtde; iCont++) {
			let inValCel = $("#" + inColumns[iCont].name).val();
			if (inValCel != null && inValCel != undefined) {
				jSonString += '"' + inColumns[iCont].data + '": "' + inValCel + '"';
			} else {
				jSonString += '"' + inColumns[iCont].data + '": ""';
			}
			if (iCont + 1 < qtde) jSonString += ',';
		}
		jSonString += '}';
	
		let objRow = JSON.parse(jSonString);
	
		// ✅ Captura o valor do radio 'gatilho' e inclui no objeto
		if (inTabela === "tblTabGatilhos") {
			const gatilhoRadio = document.querySelector('input[name="gatilho"]:checked');
			objRow.tipoAciona = gatilhoRadio ? (gatilhoRadio.value === "true" ? "Acima de" : "Abaixo de") : "";
		}
	
		let jAdd = [objRow];
	
		tbDatatable.rows.add(jAdd).draw();
		tbDatatable.columns.adjust().draw(false);
		tbDatatable.page('last').draw('page');
		salvarJson(tbDatatable, inTabela, inColumns);
	
		modalCtblFecha.remove();
	
		if (inTabela === "tblTabHISTC") {
			setTimeout(renderGraficoComparacao, 300);
		}
	});
				
	$('[msg-SVA]').on('click', function (evt) {
		if (validateModal(inColumns) == false) {
			return false;
		}
	
		var jSonString = '{';
		for (var iCont = 0; iCont < qtde; iCont++) {
			inValCel = $("#" + inColumns[iCont].name).val();
			if (inValCel != null && inValCel != undefined) {
				jSonString += '"' + inColumns[iCont].data + '": "' + $("#" + inColumns[iCont].name).val() + '"';
			} else {
				jSonString += '"' + inColumns[iCont].data + '": ""';
			}
			if (iCont + 1 < qtde) jSonString += ',';
		}
	
		// Adiciona gatilho se for a tabela correta
		if (inTabela === "tblTabGatilhos" && inColumns.some(col => col.data === "tipoAciona")) {
			const gatilhoRadio = document.querySelector('input[name="gatilho"]:checked');
			const tipoAciona = gatilhoRadio ? (gatilhoRadio.value === "true" ? "Acima de" : "Abaixo de") : "";
			jSonString += ',"tipoAciona": "' + tipoAciona + '"';
		}
	
		jSonString += '}';
		jAdd = new Array(JSON.parse(jSonString));
	
		tbDatatable.rows.add(jAdd).draw();
		tbDatatable.columns.adjust().draw(false);
		tbDatatable.page('last').draw('page');
		salvarJson(tbDatatable, inTabela, inColumns);
	
		for (var iCont = 0; iCont < qtde; iCont++) {
			$("#" + inColumns[iCont].name).val('');
		}
	
		if (inTabela === "tblTabHISTC") {
			setTimeout(renderGraficoComparacao, 300);
		}
	});
	
	$('[msg-MOD]').on('click', function (evt) {
		if (validateModal(inColumns) == false) {
			return false;
		}
	
		inRow = tbDatatable.row('.selected').index();
		jAdd = tbDatatable.rows('.selected').data().draw(false);
	
		for (var iCont = 0; iCont < qtde; iCont++) {
			inValCel = $("#" + inColumns[iCont].name).val();
			if (inValCel != null && inValCel != undefined) {
				jAdd[0][inColumns[iCont].data] = inValCel;
				inCell = tbDatatable.cell(inRow, iCont);
				inCell.data(inValCel);
			}
		}
	
		// Atualiza gatilho se for a tabela correta
		if (inTabela === "tblTabGatilhos" && inColumns.some(col => col.data === "tipoAciona")) {
			const gatilhoRadio = document.querySelector('input[name="gatilho"]:checked');
			const tipoAciona = gatilhoRadio ? (gatilhoRadio.value === "true" ? "Acima de" : "Abaixo de") : "";
			jAdd[0]["tipoAciona"] = tipoAciona;
		}
	
		tbDatatable.rows('.selected').data(jAdd).draw(false);
		tbDatatable.columns.adjust().draw(false);
		salvarJson(tbDatatable, inTabela, inColumns);
	
		$.each($("#" + inTabela + " > tbody > tr"), function (index, value) {
			$(this).removeClass('selected');
		});
	
		modalCtblFecha.remove();
	
		if (inTabela === "tblTabHISTC") {
			setTimeout(renderGraficoComparacao, 300);
		}
	});
				
	$('[msg-CAN]').on('click',function(evt) {
		modalCtblFecha.remove();
	});			
}

function validateModal(inColumns) {
	let mensagem = "";

	function limparMoeda(valor) {
		if (!valor) return 0;
		return parseFloat(valor.replace(/[R$\s\.]/g, "").replace(",", ".")) || 0;
	}

	inColumns.forEach(col => {
		let valorBruto = "";
		
		// ⚠️ CASO ESPECIAL: campo vem de radio com name="gatilho"
		if (col.name === "txttipoAciona") {
			const selecionado = document.querySelector('input[name="gatilho"]:checked');
			if (!selecionado) {
				mensagem += montarMensagem(`- O Campo (${col.title}) precisa ser selecionado.`);
			}
			return; // pula para o próximo
		}

		const $campo = $("#" + col.name);
		valorBruto = ($campo.val() || "").trim();

		const isMonetario = ["txtValorUnIPCA", "txtValorTTIPCA"].includes(col.name);

		if (isMonetario) {
			const valorNumerico = limparMoeda(valorBruto);
			if (valorNumerico <= 0) {
				mensagem += montarMensagem(`- O Campo (${col.title}) precisa ser preenchido com um valor maior que zero.`);
			}
		} else {
			if (valorBruto === "") {
				mensagem += montarMensagem(`- O Campo (${col.title}) precisa ser preenchido.`);
			}
		}
	});

	if (mensagem !== "") {
		alerta(mensagem);
		return false;
	}
	return true;
}

function IncModTabGatilhos(inOperacao) {
	let tipoDoc = $("#slcDocumento").val();

	if (!tipoDoc) {
		FLUIGC.toast({
			title: "Atenção:",
			message: "- O Campo (Tipo de Documento) precisa ser preenchido.",
			type: "warning"
		});
		return false;
	}

	let readOnly = (tipoDoc === "Contrato" || tipoDoc === "Chancelamento") ? "" : 'readonly=""';

	let dadosTelaReco = `
	<fieldset id="fieldFab">
		<div class="row">
			<div id="divTipIndice" class="form-group col-sm-4">
				<input  type="hidden" name="hddtxtIndiceTipo" id="hddtxtIndiceTipo"/>
				<label class="required" for="txtIndiceTipo">Índice/Taxa</label>
				<select name="txtIndiceTipo"id="txtIndiceTipo" class="form-control" >
					<option value="">Selecione</option>
					<option value="IPCA">IPCA</option>
					<option value="CDI">CDI</option>
					<option value="IGP">IGP-M</option>
					<option value="Selic">Selic</option>
					<option value="Diesel">Diesel</option>
					<option value="ConvensaoColetiva">Convensão Coletiva</option>
				</select>
			</div>
			<div class="form-group col-md-4">
				<label class="required" for="txtPorcentagem">Percentual Atual</label>
				<input type="text" name="txtPorcentagem" id="txtPorcentagem" class="form-control" >
			</div>
			<div class form-group col-md-3>
				<label for="gatilho">Gatilho</label>
				<div class="custom-radio custom-radio-success">
					<input type="radio" name="gatilho" value="true" id="gatilhos">
					<label for="gatilhos">Acima de</label>
					<input type="radio" name="gatilho" value="false" id="gatilhon">
					<label for="gatilhon">Abaixo de</label>
				</div>
			</div>
			<div class="form-group col-md-4">
				<input type="text" name="txtPorceAciona" id="txtPorceAciona" class="form-control" >
			</div>
		</div>	
		<div class="row">
			<div class="col-sm-12">
				<label class="required">Justificativa: </label>
				<textarea rows="3" name="txtJustificativa" id="txtJustificativa" class="form-control" ${readOnly}></textarea>
			</div>
		</div>
	</fieldset>`;


	fnTelaModal(tableTabGatilhos, "tblTabGatilhos", dadosTelaReco, inOperacao, columnsTabGatilhos, "Gatilhos");

	const camposG = ['#txtPorcentagem', '#txtPorceAciona'];

	camposG.forEach(selector => {
		const $el = $(selector);
	
		if ($el.length) {
			// Ao focar, remove o símbolo de porcentagem para edição
			$el.on('focus', function () {
				let valor = $(this).val().replace('%', '').trim();
				$(this).val(valor);
			});
	
			// Durante digitação, permite apenas números e vírgula
			$el.on('input', function () {
				let valor = $(this).val().replace(/[^\d,]/g, '');
				$(this).val(valor);
			});
	
			// Ao sair do campo, adiciona o símbolo de porcentagem e formata
			$el.on('blur', function () {
				let valor = $(this).val().replace(',', '.').replace('%', '').trim();
				let numero = parseFloat(valor);
	
				if (!isNaN(numero)) {
					// Formata com duas casas decimais e adiciona o símbolo %
					$(this).val(numero.toFixed(2).replace('.', ',') + ' %');
				} else {
					// Limpa se o valor for inválido
					$(this).val('');
				}
			});
		} else {
			console.warn('Campo não encontrado:', selector);
		}
	});
	


	// Mostra/oculta painel dependendo do tipo
	if (tipoDoc === "Contrato") {
		panelShow("form", "customHTML", "divPrePosFix", true);
	} else {
		panelShow("form", "customHTML", "divPrePosFix", false);
	}

}

function IncModTabHISTC(inOperacao) {
	let tipoDoc = $("#slcReco").val();
  
	if (!tipoDoc) {
	  FLUIGC.toast({
		title: "Atenção:",
		message: "- O Campo (Aditivo/Renovação) precisa ser preenchido.",
		type: "warning"
	  });
	  return false;
	}
  
	let readOnly = (tipoDoc === "Sim") ? "" : 'readonly=""';
  
	let dadosTela = `
	<style>
	  .required:after { content:" *"; color: red; }
	  .fluig-style-guide .modal-content .modal-header{ background-color: #fff !important; }
	  .fluig-style-guide .modal-content .modal-header .close>span:after{ background-color: #a3bc38 !important; }
	  .dark .fluig-style-guide .modal-content { background-color:#4a4b48; }
	  .dark .fluig-style-guide .modal-content .modal-header{ background-color:#4a4b48 !important; color: #fff !important; }
	  .dark .fluig-style-guide.modal.full { box-shadow:none }
	  .dark .fluig-style-guide .modal-title{ color:#fff !important; }
	  .dark .fluig-style-guide.modal{ box-shadow:none !important; }
	  .dark table.dataTable.row-border tbody td{ background-color: #b6b6b6 !important; }
	  .dark .dataTables_wrapper .dataTables_info{ color: #fff !important; }
	  .dark table.dataTable.no-footer{ background-color: #b6b6b6 !important; }
	</style>
	<fieldset id="divTabHISTC">
	  <div class="row">
		<div class="col-sm-3">
		  <label class="required">Início Vigência:</label>
		  <input type="text" name="txtDataContrato" id="txtDataContrato" class="form-control campo-data" ${readOnly} />
		</div>
		<div class="col-sm-3">
		  <label class="required">Término Vigência:</label>
		  <input type="text" name="txtDataEntregaC" id="txtDataEntregaC" class="form-control campo-data" ${readOnly} />
		</div>
		<div class="col-md-3 col-sm-3">
		  <label class="required">Valor Total: </label>
		  <input type="text" name="txtValorTTC" id="txtValorTTC" class="form-control valor" ${readOnly} />
		</div>
	  </div>
	</fieldset>`;

  
	fnTelaModal(tableTabHISTC, "tblTabHISTC", dadosTela, inOperacao, columnsTabHISTC, "Orçamentos");
	
	const campos = ['#txtDataContrato', '#txtDataEntregaC'];
  	campos.forEach(campo => {
    	const $el = $(campo);
    	if ($el.length) {
      FLUIGC.calendar($el);
    	} else {
      console.warn('Campo não encontrado:', campo);
    	}
  	});

	function formataMoeda(valor) {
		valor = valor.replace(/\D/g, '');
		valor = (valor / 100).toFixed(2);
		valor = valor.replace('.', ',');
		valor = "R$ " + valor;
		valor = valor.replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
		return valor;
	}
	
	function aplicarFormatacao(event) {
		let valor = event.target.value;
		valor = valor.replace('R$', '').trim();
		valor = formataMoeda(valor);
		event.target.value = valor;
	}
	
	$('#txtValorTTC').on('input', aplicarFormatacao);


	if (tipoDoc === "Sim") {
	  panelShow("form", "customHTML", "fieldsetTabHISTC", true);
	} else {
	  panelShow("form", "customHTML", "fieldsetTabHISTC", false);
	}

}

function IncModTabIPCA(inOperacao) {
	let tipoDoc = $("#slcIPCA").val();
  
	if (!tipoDoc) {
	  FLUIGC.toast({
		title: "Atenção:",
		message: "- O Campo (IPCA) precisa ser preenchido.",
		type: "warning"
	  });
	  return false;
	}
  
	let readOnly = (tipoDoc === "Sim") ? "" : 'readonly=""';
  
	let dadosTela = `
	<style>
	  .required:after { content:" *"; color: red; }
	  .fluig-style-guide .modal-content .modal-header{ background-color: #fff !important; }
	  .fluig-style-guide .modal-content .modal-header .close>span:after{ background-color: #a3bc38 !important; }
	  .dark .fluig-style-guide .modal-content { background-color:#4a4b48; }
	  .dark .fluig-style-guide .modal-content .modal-header{ background-color:#4a4b48 !important; color: #fff !important; }
	  .dark .fluig-style-guide.modal.full { box-shadow:none }
	  .dark .fluig-style-guide .modal-title{ color:#fff !important; }
	  .dark .fluig-style-guide.modal{ box-shadow:none !important; }
	  .dark table.dataTable.row-border tbody td{ background-color: #b6b6b6 !important; }
	  .dark .dataTables_wrapper .dataTables_info{ color: #fff !important; }
	  .dark table.dataTable.no-footer{ background-color: #b6b6b6 !important; }
	</style>
	<fieldset id="divTabIPCA">
	  <div class="row">
		<div class="col-md-2 col-sm-2">
		<label class="required">Orçamento:</label>
		<input type="text" name="txtOrcamenton" id="txtOrcamenton" class="form-control" ${readOnly} />
		</div>
		<div class="col-sm-10">
		  <label class="required">Descrição Serviço: </label>
		  <textarea rows="3" name="txtDscServicoIPCA" id="txtDscServicoIPCA" class="form-control" ${readOnly}></textarea>
		</div>
	  </div>
	</fieldset>
	<fieldset id="fieldOrc">
	  <div class="row">
		<div class="col-sm-6">
		  <label class="required">Data do Orçamento:</label>
		  <input type="text" name="txtDataOrcado" id="txtDataOrcado" class="form-control" ${readOnly} />
		</div>
		<div class="col-sm-6">
		  <label class="required">Data de Validade do Orçamento:</label>
		  <input type="text" name="txtValidade" id="txtValidade" class="form-control" ${readOnly} />
		</div>
	  </div><br>
	  <div class="row">
		<div class="col-md-6 col-sm-6">
		  <label class="required">Valor Unitário: </label>
		  <input type="text" name="txtValorUnIPCA" id="txtValorUnIPCA" class="form-control" ${readOnly} />
		</div>
		<div class="col-md-6 col-sm-6">
		  <label class="required">Valor Total: </label>
		  <input type="text" name="txtValorTTIPCA" id="txtValorTTIPCA" class="form-control" ${readOnly} />
		</div>
	  </div>
	</fieldset>`;
  
	fnTelaModal(tableTabIPCA, "tblTabIPCA", dadosTela, inOperacao, columnsTabIPCA, "Orçamentos");
	
	const campos = ['#txtDataOrcado', '#txtValidade'];
  	campos.forEach(campo => {
    	const $el = $(campo);
    	if ($el.length) {
      FLUIGC.calendar($el);
    	} else {
      console.warn('Campo não encontrado:', campo);
    	}
  	});

	function formataMoeda(valor) {
		valor = valor.replace(/\D/g, '');
		valor = (valor / 100).toFixed(2);
		valor = valor.replace('.', ',');
		valor = "R$ " + valor;
		valor = valor.replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
		return valor;
	}
	
	function aplicarFormatacao(event) {
		let valor = event.target.value;
		valor = valor.replace('R$', '').trim();
		valor = formataMoeda(valor);
		event.target.value = valor;
	}
	
	$('#txtValorUnIPCA, #txtValorTTIPCA').on('input', aplicarFormatacao);


	if (tipoDoc === "Sim") {
	  panelShow("form", "customHTML", "fieldsetTabIPCA", true);
	} else {
	  panelShow("form", "customHTML", "fieldsetTabIPCA", false);
	}
}

$("#form").submit(function () {	$("#slcDocumento").prop("disabled", false);
});
$("#form").submit(function () {	$("#slcIPCA").prop("disabled", false);
});