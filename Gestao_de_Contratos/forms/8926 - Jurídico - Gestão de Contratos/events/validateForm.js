
function validateForm(form){
	
}


function  validateCampo(form, id, titulo) {
	
	var mensagem = '';
	
	if (form.getValue(id) == '' || form.getValue(id) == null)
    	mensagem += montarMensagem('- O Campo ('+titulo+') precisa ser preenchido.');
	
	return mensagem;
	
}