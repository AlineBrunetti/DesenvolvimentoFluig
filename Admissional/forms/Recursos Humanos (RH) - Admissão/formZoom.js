function carregaZoom(){
	$('#btnZoomCentCus').click(function (e) {
		
		CustomZoom({
			type: 'ZoomCentCus',
			title: 'Centro de Custos',			
			dataset: 'dsRhCcusto',
			constraints: null,
			serverSide: true,
			processing: true,
			filter: null,
			orderDefault: [0,'asc'],			
			columns: [
				{ 'data': 'rh_ccusto__cod_rh_ccusto', 'title': 'Cod' },
				{ 'data': 'rh_ccusto__des_rh_ccusto', 'title': 'Descrição' }
            ]
		}).open();
		
	});
	

	$('#txtCentCus').change(function (e) {
	    var valortxtCentCus = $('#txtCentCus').val();

	    if (valortxtCentCus != '' && valortxtCentCus != null) {
	        var constraints = [];
	        constraints.push(DatasetFactory.createConstraint('rh_ccusto__cod_rh_ccusto', valortxtCentCus, valortxtCentCus, ConstraintType.MUST));

	        CustomZoom({
	            type: 'ZoomCentCus',
	            dataset: 'dsRhCcusto',
	            constraints: constraints
	        }).search();
	    }
	});
	
	$('#btnZoomDirAreImed').click(function (e) {
	    CustomZoom({
	        type: 'ZoomDirAreImed',
	        title: 'Diretor de Área Imediato',
	        dataset: 'dsGestorImediato',
	        constraints: null,
	        serverSide: true,
	        processing: true,
	        filter: null,
	        orderDefault: [0, 'asc'],
	        columns: [
	            { 'data': 'colleagueName', 'title': 'Nome' },
	            { 'data': 'login', 'title': 'Cod' }
	        ]
	    }).open();
	});
	
	$('#btnZoomCargo').click(function (e) {
		
		CustomZoom({
			type: 'ZoomCargo',
			title: 'Cargo',			
			dataset: 'dsRhCargo',
			constraints: null,
			serverSide: true,
			processing: true,
			filter: null,
			orderDefault: [0,'asc'],			
			columns: [
				{ 'data': 'cargo__cdn_cargo_basic', 'title': 'Cod' },
				{ 'data': 'cargo__des_cargo', 'title': 'Nome' }
            ]
		}).open();
		
	});
	
$('#btnZoomFunc').click(function (e) {
		
		CustomZoom({
			type: 'ZoomFunc',
			title: 'Funcionário',			
			dataset: 'dsRhFuncionarioDesligados',
			constraints: null,
			serverSide: true,
			processing: true,
			filter: null,
			orderDefault: [0,'asc'],			
			columns: [
				{ 'data': 'funcionario__cdn_funcionario', 'title': 'Cod' },
				{ 'data': 'funcionario__nom_pessoa_fisic', 'title': 'Nome' }
            ]
		}).open();
		
	});
	

	$('#txtFunc').change(function (e) {
	    var valortxtFunc = $('#txtFunc').val();

	    if (valortxtFunc != '' && valortxtFunc != null) {
	        var constraints = [];
	        constraints.push(DatasetFactory.createConstraint('funcionario__cdn_funcionario', valortxtFunc, valortxtFunc, ConstraintType.MUST));

	        CustomZoom({
	            type: 'ZoomFunc',
	            dataset: 'dsRhFuncionario',
	            constraints: constraints
	        }).search();
	    }
	});
	
}

function retornaZoomSelecionado(type,data) {
	//trata retorno do zoom
	if (type == 'ZoomFunc'){
		if(data != null){
			$('#txtFunc').val(data.funcionario__nom_pessoa_fisic);	
			$('#hddFuncCod').val(data.funcionario__cdn_funcionario);	
		}else{
			$('#txtFunc').val('');	
			$('#hddFuncCod').val('');	
		}
	}else if (type == 'ZoomCentCus'){
		if(data != null){
			$('#txtSetor').val(data.rh_ccusto__des_rh_ccusto);	
			$('#txtCentCus').val(data.rh_ccusto__cod_rh_ccusto);	
		}else{
			$('#txtSetor').val('');	
			$('#txtCentCus').val('');	
		}
	}else if (type == 'ZoomDirAreImed'){
		$('#hddDirAreImedCod').val(data.login);	
		$('#txtDirAreImed').val(data.colleagueName);	
		
		var constraints = [DatasetFactory.createConstraint("colleagueName",data.colleagueName, data.colleagueName, ConstraintType.MUST)];
        var filteredDataset = DatasetFactory.getDataset("colleague", null, constraints, null);
        var colleagueID = filteredDataset.values[0]['colleaguePK.colleagueId'];

	    $('#hddDiretorArea').val(colleagueID);
	    
	}else if(type == 'ZoomCargo'){
		$('#hddCargoCod').val(data.cargo__cdn_cargo_basic);	
		$('#txtCargo').val(data.cargo__des_cargo);	
	}
}