function createDataset(fields, constraints, sortFields) { 
    
    var filtro = "";

    for (var i = 0; i < constraints.length; i++) {

		if (constraints[i].fieldName == "filtro") {
        	filtro = constraints[i].initialValue;
        }
	}

    var newDataset = DatasetBuilder.newDataset(); 

    try { 
        newDataset.addColumn("NR_REQUISICAO");
        newDataset.addColumn("DT_REQUISICAO");
        newDataset.addColumn("NOM_USUARIO"); 

        
        var endpoint = "getRequisicao/requisicao/" + filtro;
        var tipoMethod = 'GET';
        
        
        var clientService = fluigAPI.getAuthorizeClientService(); 
          
        var data = {                                                   
            companyId : getValue("WKCompany") + '',
            serviceCode : 'datasul_api',
            contentType: 'application/json',		
            endpoint : '' + endpoint,
            method : '' + tipoMethod,   
            timeoutService: '30',  
            options : {
                encoding : 'UTF-8',
                mediaType: 'application/json'
            }                                 
        }     
        
        var vo = clientService.invoke(JSON.stringify(data));  

        if(vo.getResult()== null || vo.getResult().isEmpty()){
		    log.info("Retorno está vazio");
		}else{
		    var data = vo.getResult();   
		    var recordsObj = JSON.parse(data);
		    
		    recordsObj["items"].forEach(function(item){
                newDataset.addRow(new Array(item["NR_REQUISICAO"],item["DT_REQUISICAO"],item["NOM_USUARIO"]));
		    });
        }
    } catch (e) { 
        log.error("Erro: " + e.message);  
        newDataset.addRow([e.message]); 
    }
    
    return newDataset;
}


