function carregaZoom(){

	$('#btnZoomCondPag').click(function (e) {
		
		CustomZoom({
			type: 'ZoomCondPag',
			title: 'Condição de Pagamento',			
			dataset: 'dsCondicaoPagamento',
			constraints: null,
			serverSide: false,
			processing: true,
			filter: null,
			orderDefault: [0,'asc'],			
			columns: [
				{ 'data': 'cond_pagto__cod_cond_pag', 'title': 'Cod' },
				{ 'data': 'cond_pagto__descricao', 'title': 'Descrição' }
            ]
		}).open();
		
	});

	$('#txtCondPag').change(function (e) {
	    var valortxtCondPag = $('#txtCondPag').val();

	    if (valortxtCondPag != '' && valortxtCondPag != null) {
	        var constraints = [];
	        constraints.push(DatasetFactory.createConstraint('campo_chave', valortxtCondPag, valortxtCondPag, ConstraintType.MUST));

	        CustomZoom({
	            type: 'ZoomCondPag',
	            dataset: 'dsCondicaoPagamento',
	            constraints: constraints
	        }).search();
	    }
	});

	$('#btnZoomContaCont').click(function (e) {
		
		CustomZoom({
			type: 'ZoomContaCont',
			title: 'Conta Contábil',			
			dataset: 'dsContaContabil',
			constraints: null,
			serverSide: false,
			processing: true,
			filter: null,
			orderDefault: [0,'asc'],			
			columns: [
				{ 'data': 'cta_ctbl__cod_cta_ctbl', 'title': 'Cod' },
				{ 'data': 'cta_ctbl__des_tit_ctbl', 'title': 'Descrição' }
            ]
		}).open();
		
	});

	$('#txtContaCont').change(function (e) {
	    var valortxtContaCont = $('#txtContaCont').val();

	    if (valortxtContaCont != '' && valortxtContaCont != null) {
	        var constraints = [];
	        constraints.push(DatasetFactory.createConstraint('cta_ctbl__cod_cta_ctbl', valortxtContaCont, valortxtContaCont, ConstraintType.MUST));

	        CustomZoom({
	            type: 'ZoomContaCont',
	            dataset: 'dsContaContabil',
	            constraints: constraints
	        }).search();
	    }
	});

	$('#btnZoomCentroCusto').click(function (e) {
		
		CustomZoom({
			type: 'ZoomCentroCusto',
			title: 'Centro de Custos',			
			dataset: 'dsCentroCustos',
			constraints: null,
			serverSide: false,
			processing: true,
			filter: null,
			orderDefault: [0,'asc'],			
			columns: [
				{ 'data': 'ccusto__cod_ccusto', 'title': 'Cod' },
				{ 'data': 'ccusto__des_tit_ctbl', 'title': 'Descrição' }
            ]
		}).open();
		
	});

	$('#txtCentroCusto').change(function (e) {
	    var valortxtCentroCusto = $('#txtCentroCusto').val();

	    if (valortxtCentroCusto != '' && valortxtCentroCusto != null) {
	        var constraints = [];
	        constraints.push(DatasetFactory.createConstraint('ccusto__cod_ccusto', valortxtCentroCusto, valortxtCentroCusto, ConstraintType.MUST));

	        CustomZoom({
	            type: 'ZoomCentroCusto',
	            dataset: 'dsCentroCustos',
	            constraints: constraints
	        }).search();
	    }
	});

	$('#btnZoomGestorAprovacao').click(function(){
		
		var constraintColleagueGroup1 = DatasetFactory.createConstraint('colleagueGroupPK.groupId', 'J001 - Gestor Requisitante', 'J001 - Gestor Requisitante', ConstraintType.MUST);
		var datasetColleagueGroup = DatasetFactory.getDataset('colleagueGroup', null, new Array(constraintColleagueGroup1), null);
		console.log(datasetColleagueGroup.values[0]['colleagueGroupPK.colleagueId']);
		var constraints = [];
		for (var i = 0; i < datasetColleagueGroup.values.length; i++) {
	        var mat = datasetColleagueGroup.values[i]['colleagueGroupPK.colleagueId']; 
	        constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", mat, mat, ConstraintType.SHOULD));
	    }
		CustomZoom({
		    type: 'ZoomGestorAprovacao',
		    title: 'Aprovador',
		    dataset: 'colleague',
		    constraints: constraints,
		    serverSide: false,
	        processing: true,
	        filter: null,
	        paging: false,
		    orderDefault: [0, 'asc'],
		    columns: [
		        { 'data': 'login', 'title': 'Cod' },
		        { 'data': 'colleagueName', 'title': 'Nome' },
		        { 'data': 'mail', 'title': 'E-mail' },
		    ]
		}).open();
	});
	
	$('#btnZoomFornecedorCon').click(function(){
		
		CustomZoom({
		    type: 'ZoomFornecedorCon',
		    title: 'Fornecedor',
		    dataset: 'dsFornecedor',
		    constraints: null,
		    serverSide: true,
		    processing: true,
		    filter: null,
		    orderDefault: [0, 'asc'],
		    columns: [
		        { 'data': 'emitente__nome_emit', 'title': 'Nome' },
		        { 'data': 'emitente__e_mail', 'title': 'E-mail' },
		        { 'data': 'emitente__cgc', 'title': 'CNPJ/CPF' },
		    ]
		}).open();
	});
	
	$('#btnZoomPais').click(function (e) {
	    CustomZoom({
	        type: 'ZoomPais',
	        title: 'País',            
	        dataset: 'dsPais',
	        constraints: null,
	        serverSide: true,
	        processing: true,
	        filter: null,
	        orderDefault: [0,'asc'],            
	        columns: [
	            { 'data':'unid_feder__pais','title':'País' },
	            { 'data':'unid_feder__no_estado','title':'Estado' }
	        ]
	    }).open();
	});
	
	$('#btnZoomMunicipio').click(function (e) {
        CustomZoom({
            type: 'ZoomMunicipio',
            title: 'Município',            
            dataset: 'dsCidade',
            constraints: null,
            serverSide: true,
            processing: true,
            filter: null, 
            orderDefault: [1,'asc'],            
            columns: [
                { 'data':'cidade__cdn_munpio_ibge','title':'Cod' },
                { 'data':'cidade__cidade','title':'Município' }
            ]
        }).open();
	});
}

function retornaZoomSelecionado(type,data) {
	
	if(type == 'ZoomGestorAprovacao'){
		$('#hddGestorAprovacao').val(colleagueIDF());	
		$('#txtGestorAprovacao').val(data.colleagueName);
		$('#hddEmailGestorAprovacao').val(data.mail);
		$('#txtEmailGestorAprovacao').val(data.mail);
	} else if(type == 'ZoomFornecedorCon'){
		$('#txtRazaoSocial').val(data.emitente__nome_emit.toLowerCase());	
		$('#txtEmailContato').val(data.emitente__e_mail.toLowerCase());
		$('#txtTel').val(data.emitente__telefone_1).trigger('input');
		$('#txtCpfCnpj').val(data.emitente__cgc);
//		
//		$('#txtCpfCnpj').mask('00.000.000/0000-00');
		console.log(data.emitente__cgc.length);
		if(data.emitente__cgc.length > 11 || data.emitente__cgc.length  == 0){
			$('#txtCpfCnpj').mask('00.000.000/0000-00');
		}else{
			$('#txtCpfCnpj').mask('000.000.000-00');
		}
		
		$('#txtCep').val(data.emitente__cep.toLowerCase()).trigger('blur');
		$('#txtPais').val(data.emitente__pais.toLowerCase());
		$('#txtCidade').val(data.emitente__cidade.toLowerCase());
		$('#txtBairro').val(data.emitente__bairro.toLowerCase());
		$('#txtLogradouro').val(data.emitente__endereco.toLowerCase()).trigger('input');
	} else if (type == 'ZoomPais'){
		$('#txtZoomUF').val(data.unid_feder__estado);
		$('#UF_nome').val(data.unid_feder__no_estado.toLowerCase());
		$('#txtZoomPais').val(data.unid_feder__pais.toLowerCase());
	}else if (type == 'ZoomMunicipio'){
		$('#txtZoomMunicipio').val(data.cidade__cidade.toLowerCase());
		$('#cidade_cod').val(data.cidade__cdn_munpio_ibge);		
	}else if (type == 'ZoomCentroCusto'){
		$('#txtCentroCusto').val(data.ccusto__cod_ccusto);
	}else if (type == 'ZoomContaCont'){
		$('#txtContaCont').val(data.cta_ctbl__cod_cta_ctbl);
	}else if (type == 'ZoomCondPag'){
		$('#txtCondPag').val(data.campo_chave);
	}

	
	function colleagueIDF(){
		var constraints = [DatasetFactory.createConstraint("login",data.login, data.login, ConstraintType.MUST)];
        var filteredDataset = DatasetFactory.getDataset("colleague", null, constraints, null);
        var colleagueID = filteredDataset.values[0]['colleaguePK.colleagueId'];
        return colleagueID;
	}
	
}

