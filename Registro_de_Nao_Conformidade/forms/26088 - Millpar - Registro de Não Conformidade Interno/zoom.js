
$(document).ready(function() {
	var paiFilho ="";
	setTimeout(function() {
		formADIComplementar.start();
	}, 100)
});


//** funcao de apoio para funcoes de calculo e index
var formADIComplementar = (function() {
	var today = new Date();
	var current = null;
	var loading = FLUIGC.loading(window);
	var index = 0;
	return {
		start : function() {//inicia processo

			events.setup();

		}
	}
})();


var events = (function() {
	return {
		setup : function() {
			$(document).on("click", ".zoom-click", function() {
				var ev = $(this).data("event");
				var idObj = $(this).attr("id");
				
				
			    zooms(ev, idObj);
			});
		}
	}
})();



//FUNCAO PARA SABER O SISTEMA OPERACIONAL MOBILE 
function retornaSO() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    } else if (/android/i.test(userAgent)) {
        return "Android";
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    } else {
        return "unknown";
    }                
}






//atribui o valor selecionado do zoom para o campo do formulário
function setSelectedZoomItem(selectedItem) {
	
    var tipo = selectedItem.type;
    
    if (tipo == "gestorImediatoName" ) {
	$("#gestorImediatoName").val(selectedItem.colleagueName);
	$("#gestorImediatoLogin").val(selectedItem.login);
	$("#gestorImediatoMail").val(selectedItem.mail); 
    }

    if (tipo == "contaContabil" ) {
	$("#contaContabil").val(selectedItem.codigo + " - " + selectedItem.descricao);
    }

    if (tipo == "centroCusto" ) {
	$("#centroCusto").val(selectedItem.codigo + " - " + selectedItem.descricao);
    }
    
    if (tipo == "pedido" ) {
		$("#pedido").val(selectedItem.nrPedido);
		$("#fornecedor").val(selectedItem.fornecedor);
		$("#codFornecedor").val(selectedItem.codFornecedor);
		$("#cgc").val(selectedItem.cgc);
		$("#vlrPedido").attr("readonly", false);
		$("#nrNotaFiscal").attr("readonly", false);
		$("#dataEmissao").attr("readonly", false);
		FLUIGC.calendar('#dataEmissao');
		$('#btn_dataEmissao').on('click', function() {
			$('#dataEmissao').click();
		});
    }

    if (tipo == "requisicao" ) {
		$("#requisicao").val(selectedItem.NR_REQUISICAO);
    }

    if (tipo == "estabelec" ) {
	$("#estabelec").val(selectedItem.codigo + " - " + selectedItem.descricao);
    }

    if (tipo == "formaPagamento" ) {
	$("#formaPagamento").val(selectedItem.Tipo);

	if (selectedItem.Tipo == "Deposito") {
		$("#instBancario").val("");
		$("#ContaCorrente_215").val("");
		$("#Agncia_216").val("");
		$("#ChavePix_217").val("");


		$("#ContaCorrente_215").attr("readonly", false);
		$("#Agncia_216").attr("readonly", false);
		$("#ChavePix_217").attr("readonly", true);
	}
	if (selectedItem.Tipo == "Pix") {
		$("#instBancario").val("");
		$("#ContaCorrente_215").val("");
		$("#Agncia_216").val("");
		$("#ChavePix_217").val("");

		
		$("#ContaCorrente_215").attr("readonly", true);
		$("#Agncia_216").attr("readonly", true);
		$("#ChavePix_217").attr("readonly", false);

	}

	if (selectedItem.Tipo == "Boleto") {
		$("#instBancario").val("");
		$("#ContaCorrente_215").val("");
		$("#Agncia_216").val("");
		$("#ChavePix_217").val("");

		
		$("#ContaCorrente_215").attr("readonly", true);
		$("#Agncia_216").attr("readonly", true);
		$("#ChavePix_217").attr("readonly", true);

	}

    }

    if (tipo == "instBancario" ) {
	$("#instBancario").val(selectedItem.codigo + " - " + selectedItem.descricao);
    }

}

function zooms(ev,idObj){
	if ( ev ==  'gestorImediatoName' ) {
		if(getWKNumState() == 0 || getWKNumState() == 6){
			//modalzoom.open("colleague", "login,User,colleagueName,Nome,mail,E-mail", "login,colleagueName,mail", "Pesquisa Gestor", "" , 'gestorImediatoName' , "" , "", "" );

			var constraintColleagueGroup1 = DatasetFactory.createConstraint('colleagueGroupPK.groupId', 'ZZZ_Gerencia', 'ZZZ_Gerencia', ConstraintType.MUST);
			var datasetColleagueGroup = DatasetFactory.getDataset('colleagueGroup', null, new Array(constraintColleagueGroup1), null);
			var login = "";
			var colleagueName = "";
			var mail = "";
			
			for (var i = 0; i < datasetColleagueGroup.values.length; i++) {
				var mat = datasetColleagueGroup.values[i]['colleagueGroupPK.colleagueId'];
				var constraintColleague = DatasetFactory.createConstraint('colleaguePK.colleagueId', mat, mat, ConstraintType.MUST);
				datasetCollegue = DatasetFactory.getDataset("colleague", null , new Array(constraintColleague), null);
				login = login + datasetCollegue.values[0]['colleaguePK.colleagueId'] + "|";
				colleagueName = colleagueName + datasetCollegue.values[0]['colleagueName'] + "|";
				mail = mail + datasetCollegue.values[0]['mail'] + "|";
			}

			login = "login," + login;
			colleagueName = "colleagueName," + colleagueName;
			mail = "mail," + mail;

			var filtro = login + "," + colleagueName + "," + mail;

			modalzoom.open("dsGenerico", "login,Matricula,colleagueName,Nome,mail,E-mail", "login,colleagueName,mail", "Pesquisa Gestor", filtro , 'gestorImediatoName' , "" , "", "" );
		}
	
	}

	if ( ev ==  'contaContabil' ) {
		if(getWKNumState() == 0 || getWKNumState() == 6){
			modalzoom.open("getContaContabilEMS", "codigo,Código,descricao,Descrição", "codigo,descricao", "Pesquisa Conta Contábil", "" , 'contaContabil' , "" , "", "" );
		}
	}

	if ( ev ==  'centroCusto' ) {
		if(getWKNumState() == 0 || getWKNumState() == 6){
			modalzoom.open("getCentroCustoEMS", "codigo,Código,descricao,Descrição", "codigo,descricao", "Pesquisa Centro Custo", "" , 'centroCusto' , "" , "", "" );
		}
	}

	if ( ev ==  'pedido' ) {
		if(getWKNumState() == 0 || getWKNumState() == 6){
			var filtro = "filtro,";
			modalzoom.open("getPedidoCompraEMS", "nrPedido,Pedido,fornecedor,Fornecedor,codFornecedor,Cod.Fornecedor,cgc,CNPJ", "nrPedido,fornecedor,codFornecedor,cgc", "Pesquisa Pedido Compra", filtro , 'pedido' , "" , "", "filtro" );
		}
	}

	if ( ev ==  'requisicao' ) {
		if(getWKNumState() == 0 || getWKNumState() == 6){
			var filtro = "filtro,";
			modalzoom.open("getRequisicaoEMS", "NR_REQUISICAO,Nr. Requisição,DT_REQUISICAO,Data Requisição,NOM_USUARIO,Usuário", "NR_REQUISICAO,DT_REQUISICAO,NOM_USUARIO", "Pesquisa Requisição", filtro , 'requisicao' , "" , "", "filtro"  );
		}
	}
	
	if ( ev ==  'estabelec' ) {
		if(getWKNumState() == 0 || getWKNumState() == 6){
			modalzoom.open("getEstabelecEMS", "codigo,Codigo,descricao,Nome", "codigo,descricao", "Pesquisa Estabelecimento", "" , 'estabelec' , "" , "", "" );
		}
	}
	
	if ( ev ==  'formaPagamento' ) {
		if(getWKNumState() == 0 || getWKNumState() == 6){
			var filtro = "Tipo,Deposito|Pix|Boleto";
			modalzoom.open("dsGenerico", "Tipo,Tipo", "Tipo", "Pesquisa Forma Pagamento", filtro , 'formaPagamento' , "" , "", "" );
		}
	}

	if ( ev ==  'instBancario' && $("#formaPagamento").val() == "Deposito") {	
		if(getWKNumState() == 0 || getWKNumState() == 6){
			modalzoom.open("getBancoEMS", "codigo,Codigo,descricao,Nome Banco", "codigo,nome", "Pesquisa Banco", "" , 'instBancario' , "" , "", "" );
		}
	}


}

function createDataset(fields, constraints, sortFields) {
    var newDataset = DatasetBuilder.newDataset();
    var valoresColunas = [];

    for (var i = 0; i < constraints.length; i++) {
        newDataset.addColumn(constraints[i].fieldName);
        var valores = constraints[i].initialValue.split("\\|");
        valoresColunas.push(valores);
    }

    var numLinhas = valoresColunas[0].length;

    for (var linha = 0; linha < numLinhas; linha++) {
        var linhaDataset = [];
        for (var col = 0; col < valoresColunas.length; col++) {
            var valor = valoresColunas[col][linha] || "";
            linhaDataset.push(valor);
        }
        newDataset.addRow(linhaDataset);
    }

    return newDataset;
}





//MODAL NORMAL AJAX VIA API REST - ASSINCRONO 
var modalzoom = (function(){
	var zoommodal = null;
	var loading = FLUIGC.loading(window);
	return {
		open: function(dataset, fields, resultfields, title, filters, type, likefield, likevalue, searchby) {
			
			loading.show();
			
			var showfields = [];
			var globaldataset = [];
			var current = 0;
			var tipo = type ;
			
			if (zoommodal != null) {
				zoommodal.remove();
				zoommodal = null;
				
				$(".table-zoom > thead").html("");
				$(".table-zoom > tbody").html("");
			}
			
			var html = "<body class='fluig-style-guide'>" +
					"<div class='input-group'>" +
					"<span class='input-group-addon'><span class='fluigicon fluigicon-search'></span></span>" +
					"<input type='text' class='form-control' id='search' placeholder='Digite o texto e utilize o <Enter> para buscar'>" +
					"</div>" +
					"<div class='table-responsive' style='overflow: auto; height: 220px;'>" +
					"<table class='table table-hover table-zoom'>" +
					"<thead>" +
					"</thead>" +
					"<tbody>" +
					"</tbody>" +
					"</table>" +
					"</div>" +
					"</body>";
			
			var zoommodal = FLUIGC.modal({
				title: title,
				content: html,
				formModal: false,
				size: "large",
				id: 'modal-zoom-' + type,
				actions: [{
					'label': 'Selecionar',
					'classType': 'btn-primary zoom-selected',
					'autoClose': true,
				},{
					'label': 'Fechar',
					'autoClose': true
				}]
			}, function(err, data) {
				if(err) {
					FLUIGC.toast({ title: 'Erro:', message: err, type: 'danger' });
				} else {
					var trimarray = function (fields) {
						for(var i=0; i < fields.length; i++){
							fields[i] = fields[i].trim();
						}
						return fields;
					}
					
					var urlrequest = function(){
						var request = "/ecm/api/rest/ecm/dataset/",
							json = {};
						
						if (dataset != null) {
							request += "getDatasetZoom";
							json.datasetId = dataset;
						} else if(cardDatasetId != null){
							request += "getCardDatasetValues";
							json.cardDatasetId = cardDatasetId;
						}
						
						if (resultfields != null && resultfields.length > 0 ){
							json.resultFields = trimarray(resultfields.split(","));
						}
						
						var searchValue = $("#search").val();
						
						if (filters != null && filters.length > 0 ){
						    var filtro = filters;
						    if(searchby != ""){
							filtro = filtro + ',' + searchby + ',' + searchValue;
						    }
						    json.filterFields = trimarray(filters.split(","));
						}
						
						if (likefield != null && likefield.length > 0 && likevalue != null && likevalue.length > 0 ){
							json.likeField = likefield;
							json.likeValue = likevalue;
						}
						
						var searchValue = $("#search").val();
						if(searchValue && searchValue.length > 0) {
							json.searchValue = searchValue;
							
							if (searchby && searchby != "") {
							    json.searchField = searchby;
							} else {

							    json.searchField = fields.split(",")[0];
							}
							
						}
						
						return request +="?json=" + encodeURI(JSON.stringify(json));
					};
					
					var searchtable = function (text) {
						var table = $('.table-zoom > tbody');
						table.find('tr').each(function(index, row) {
							var allCells = $(row).find('td');
							if(allCells.length > 0) {
								var found = false;
								allCells.each(function(index, td) {
									var regExp = new RegExp(text, 'i');
									if(regExp.test($(td).text())) {
										found = true;
										return false;
									}
								});
								if(found == true)$(row).show();else $(row).hide();
							}
						});
					}
					
					var setup = function(lista) {
						var l = lista.split(",");
						var html = "<tr>";
						for (var i=0; i<l.length; i++) {
							showfields.push(l[i]);
							html += "<th>" + l[i+1] + "</th>"
							i++;
						}
						html += "</tr>";
						$(".table-zoom > thead").append(html);
					}
					
					var readydataset = function(dataset) {
						globaldataset = dataset;
						for (var i=0; i<dataset.length; i++) {
							var row = dataset[i];
							var html = "<tr data-dataset=" + i + ">";
							for (var x=0; x<showfields.length; x++) {
								html += "<td>" + row[showfields[x]] + "</td>";
								
							}
							html += "</tr>";
							$(".table-zoom > tbody").append(html);
						}
						$(".table-zoom > tbody > tr").click(function() {
							$(".table-zoom > tbody > tr").removeClass("active");
							$(this).addClass("active");
							current = $(this).data("dataset");
						});
						$(".table-zoom > tbody > tr").dblclick(function() {
							var row = globaldataset[$(this).data("dataset")];
							row["type"] = type;
							setSelectedZoomItem(row);
							zoommodal.remove();
						});
						
						loading.hide();
					}
					
					var dosearch = function() {
						var url = urlrequest();
						$(".table-zoom > tbody").html("");
						
						loading.show();
						
						$.ajax({
							type: "GET",
							dataType: "json",
							url: url,
							data: "",
							error: function(XMLHttpRequest, textStatus, errorThrown) {
								console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
							},
							success: function (data, status, xhr) {
								var dataset = data["invdata"];
								readydataset(dataset);
							}
						});
					}
					
					var timeout;
					$('#search').keyup(function() {
						clearTimeout(timeout);
						var keycode;
						if (window.event) {
							keycode = window.event.keyCode;
						} else if (event) {
							keycode = event.which;
						} else { 
							return true;
						}
						if (keycode == 13) {
							dosearch();
						} else {
							timeout = setTimeout(searchtable($(this).val()), 500);
						}
					});
					
					$('.zoom-selected').click(function() {
						var row = globaldataset[current];
						row["type"] = type;
						setSelectedZoomItem(row);
					});
					
					setup(fields);
					dosearch();
					
				}
			});
		}
	}
})();






function modal( title , html) {
    var myModal = parent.FLUIGC.modal({
        title: title ,
        content: html,
        id: 'fluig-modal',
        actions: [{
            'label': 'Fechar',
            'autoClose': true
        }]
    }, function(err, data) {
        if (err) {
            // do error handling
        } else {
            // do something with data
        }
    });
}

function fnBtnLiberado(nomeObj){
    var teste = $('#'+nomeObj).hasClass("input-group-addon group-zoom no-view zoom-click btn-info");
    if (teste) 
	return true;
    else 
	return false;
}


function fnBuscaColleagueByMail(mail){
    var c1 = DatasetFactory.createConstraint("mail", mail, mail, ConstraintType.MUST);
    var constraints = new Array(c1);
    var colaborador = DatasetFactory.getDataset("colleague", null, constraints, null);
    
    if(colaborador.values.length > 0){
	var result = colaborador.values[0];
	return result["colleaguePK.colleagueId"];
    } else return "";
    
}


function fnDsTableRelacLOGIX(select){
    var c1 = DatasetFactory.createConstraint("QUERY", select, select, ConstraintType.MUST);
    var constraints = new Array(c1);
    var tableGenerica = DatasetFactory.getDataset("DS_TABLE_RELAC_LOGIX", null, constraints, null);
    
    if(tableGenerica == undefined) return "";
	if(tableGenerica.values.length > 0) return tableGenerica;
	else return "";
}

function formatDate(data) {
    // Dividindo a string original na data e hora
    var datePart = data.split(' ')[0];
    
    // Dividindo a parte da data nos componentes ano, mês e dia
    var [year, month, day] = datePart.split('-');
    
    // Formatando para o formato desejado
    var formattedDate = `${day}/${month}/${year}`;
    
    return formattedDate;
}