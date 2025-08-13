function inputFields(form){
	
	var texto = 'Responsável: ' + form.getValue("txtLidImed") + ' - Cargo: ' + form.getValue("txtCargo");
	form.setValue("chaveFormulario", texto);
	
}