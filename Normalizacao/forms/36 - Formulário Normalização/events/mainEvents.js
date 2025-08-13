//define funções para o front-end
function setGlobalFunctions(form,customHTML) {
	
	customHTML.append('<script type="text/javascript">');
	customHTML.append('function getWKNumProces(){ return ' + getValue("WKNumProces") + '; }');
	customHTML.append('function getWKNumState(){ return ' + getValue("WKNumState") + '; }');
	customHTML.append('function getOrganizationId(){ return ' + getValue("WKIdentityCompany") + '; }');
	customHTML.append('function getTenantCode(){ return ' + getValue("WKCompany") + '; }');
	customHTML.append('function getUserCode(){ return "' + fluigAPI.getUserService().getCurrent().getCode().trim() + '"; }'); 
	customHTML.append('function getUserLogin(){ return "' + fluigAPI.getUserService().getCurrent().getLogin().trim() + '"; }');	
	customHTML.append('function getUserEmail(){ return "' + fluigAPI.getUserService().getCurrent().getEmail().trim() + '"; }');
	customHTML.append('function getUserName(){ return "' + fluigAPI.getUserService().getCurrent().getFullName().trim() + '"; }'); 
	customHTML.append('function getWKMobile(){ return ' + ((form.getMobile() != null && form.getMobile()) ? true : false) + '; }');	
	customHTML.append('function getEditMode(){ return ' + ((form.getFormMode() == 'VIEW') ? false : true) + '; }');
	customHTML.append('function getFormMode(){ return "' + form.getFormMode() + '"; }');
	customHTML.append('function obterDataAtual(){ return obterData(); }');
	customHTML.append('function obterHoraAtual(){ return obterHora(); }');
	customHTML.append('</script>');
}

function obterDataAtual() {
	
    var data = new Date();
    var formatoData = new java.text.SimpleDateFormat('dd/MM/yyyy');
    return formatoData.format(data);
}

function obterHoraAtual() {	
	
    var data = new Date();
    var formatoData = new java.text.SimpleDateFormat('HH:mm:ss');
    return formatoData.format(data);
}

function formataValor(valor) {
	
	valor = valor.toString();
	valor = valor.replace(/\./g, '');
	valor = valor.replace(/\,/g, '.');	
	return parseFloat(valor);
}

function formataDinheiro(valor,fixed) {
	
	if (fixed == undefined) { fixed = 2; } 
	valor = valor.toFixed(fixed);
	valor = valor.replace(/\./g, ',');
	valor = valor.replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
	return valor;
}

function montarMensagem(texto) {
	
	return '<font color="FF0000">' + texto + '</font><br>';
	
}

function exibirMensagem(customHTML,titulo,texto) {
	
	customHTML.append('<script type="text/javascript">');
	customHTML.append('setTimeout(function() {');
	customHTML.append('FLUIGC.message.alert(');
	customHTML.append('	{title: \'' + titulo + '\', message: \'' + montarMensagem(texto) + '\', label: \'OK\'},');
	customHTML.append('	function(el, ev){}');
	customHTML.append(');');
	customHTML.append('}, 500);');
	customHTML.append('</script>');
}

function focusCampo(form,customHTML,field) {
	
	customHTML.append('<script type="text/javascript">');
	customHTML.append('setTimeout(function() {$("#' + field + '").focus();}, 500);');
	customHTML.append('</script>');	
}

function enableContainer(form,customHTML,object,enable) {
	
	if (object == 'form') {
		object = '$("' + object + '")[0]';
	} else {
		object = '$("#' + object + '")';
	}
	
	customHTML.append('<script type="text/javascript">');
	customHTML.append('setTimeout(function() { enableContainer(' + object + ', ' + enable + '); }, 1);');		
	customHTML.append('</script>');	
}

function enableField(form,customHTML,object,enable) {
	
	customHTML.append('<script type="text/javascript">');
	customHTML.append('setTimeout(function() { enableField($("#' + object + '"), ' + enable + '); }, 1);');		
	customHTML.append('</script>');	
}

function removeReadonly(customHTML, campos) {
  customHTML.append("<script>");
  customHTML.append("var campos = " + JSON.stringify(campos) + ";");
  customHTML.append("campos.forEach(function(id) {");
  customHTML.append("  $('#' + id).prop('readonly', false);");
  customHTML.append("});");
  customHTML.append("</script>");
}

function setFieldCalendar(form,customHTML,object,enable) {
	
	customHTML.append('<script type="text/javascript">');
	customHTML.append('setTimeout(function() { FLUIGC.calendar("#' + object + '", {useCurrent: ' + enable + '}); }, 1);');		
	customHTML.append('</script>');	
}

function setFieldRichEditor(form,customHTML,object,readOnly,settings) {
	
	customHTML.append('<script type="text/javascript">');
	customHTML.append('setTimeout(function() {');
	customHTML.append('var ' + object + ' = FLUIGC.richeditor("' + object + '", {');
	customHTML.append('	resize_enabled: true,'); 
	customHTML.append('	width: "auto",'); 
	customHTML.append('	height: "200",'); 
	customHTML.append('	allowedContent: true}');
	customHTML.append(');');	
	customHTML.append('if ($("#' + object + '").prop("tagName") == "span" ||');
	customHTML.append('	$("#' + object + '").prop("tagName") == "SPAN") {');
	customHTML.append('	value = $("#' + object + '").text();');
	customHTML.append('} else {');
	customHTML.append('	value = $("#' + object + '").val();');
	customHTML.append('}');	
	customHTML.append('' + object + '.setData(value);');		
	customHTML.append('' + object + '.editor.config.readOnly = ' + readOnly + ';');
	customHTML.append('' + object + '.on("change", function(e) {');
	customHTML.append('	var body = ' + object + '.editor.document.getBody().$.innerHTML;');
	customHTML.append('	$("#' + object + '").val("");');
	customHTML.append('	if (body != "" && body != "<p></p>" && body != "<p><br></p>") {');
	customHTML.append('		$("#' + object + '").val(' + object + '.getData());');
	customHTML.append('	}');	
	customHTML.append('});');
	customHTML.append('}, 1);');
	customHTML.append('</script>');	
}

function panelShowAll(form, customHTML, enable) {	
	customHTML.append('<script type="text/javascript">');
	
	customHTML.append('setTimeout(function() {');
	customHTML.append('  $("[id]").each(function() {');
	
	if (enable === true) {
		customHTML.append('    $("#" + this.id).show();');
	} else {
		customHTML.append('    $("#" + this.id).hide();');
	}

	customHTML.append('  });');
	customHTML.append('}, 1);');
	
	customHTML.append('</script>');	
}

function panelShow(form,customHTML,object,enable) {	
	
	customHTML.append('<script type="text/javascript">');
	
	if (enable == true) {
		customHTML.append('setTimeout(function() { $("#' + object + '").show(); }, 1);');
	} else {
		customHTML.append('setTimeout(function() { $("#' + object + '").hide(); }, 1);');
	}
	
	customHTML.append('</script>');	
}

function fieldVisible(form,customHTML,object,enable) {	
	
	customHTML.append('<script type="text/javascript">');
	
	if (enable == true) {
		customHTML.append('setTimeout(function() { $("#' + object + '").show(); }, 1);');
	} else {
		customHTML.append('setTimeout(function() { $("#' + object + '").hide(); }, 1);');
	}
	
	customHTML.append('</script>');	
}

function activeTab(form,customHTML,navTabs,tabContent) {
	
	customHTML.append('<script type="text/javascript">');	
	customHTML.append('setTimeout(function() { $(\'#' + navTabs + ' a[href="#' + tabContent + '"]\').tab("show"); }, 1);');		
	customHTML.append('</script>');
}

function collapseToggle(form,customHTML,object,toggle) {	
	
	customHTML.append('<script type="text/javascript">');
	customHTML.append('setTimeout(function() { $("#' + object + '").collapse({"toggle": ' + toggle + '}); }, 1);');	
	customHTML.append('</script>');	
}

function collapseShow(form,customHTML,object,enable) {	
	
	customHTML.append('<script type="text/javascript">');
	
	if (enable == true) {
		customHTML.append('setTimeout(function() { $("#' + object + '").collapse("show"); }, 1);');
	} else {
		customHTML.append('setTimeout(function() { $("#' + object + '").collapse("hide"); }, 1);');
	}
	
	customHTML.append('</script>');	
}

function calcDigitosPosCnpjCpf(digitos, posicoes, soma_digitos) {
	
	if (posicoes == '' || posicoes == null) { posicoes = 10; }
	if (soma_digitos == '' || soma_digitos == null) { soma_digitos = 0; }	
	digitos = digitos.toString();
	
	for (var i = 0; i < digitos.length; i++) {
		soma_digitos = soma_digitos + ( digitos[i] * posicoes );
		
		posicoes--;
      	
		if (posicoes < 2) {
			posicoes = 9;
		}
	}
	
	soma_digitos = soma_digitos % 11;
	
	if (soma_digitos < 2) {
		soma_digitos = 0;
	} else {
		soma_digitos = 11 - soma_digitos;
	}
	
	var cpf = digitos + soma_digitos;
	
	return cpf;   
}

function validaCnpj(valor) {
	
	valor = valor.toString();
	valor = valor.replace('.', '').replace('/', '').replace('-', '');
	
	var cnpj_original = valor;
	var primeiros_numeros_cnpj = valor.substr(0, 12);
	var primeiro_calculo = calcDigitosPosCnpjCpf(primeiros_numeros_cnpj, 5);
	var segundo_calculo = calcDigitosPosCnpjCpf(primeiro_calculo, 6);
	var cnpj = segundo_calculo;
	
	if (cnpj == cnpj_original) {
		return true;
	}
    
	return false;   
}

function validaCpf(valor) {
	
	valor = valor.toString();
	valor = valor.replace('.', '').replace('/', '').replace('-', '');	
	
	var digitos = valor.substr(0, 9);
	var novo_cpf = calcDigitosPosCnpjCpf(digitos);
	var novo_cpf = calcDigitosPosCnpjCpf(novo_cpf, 11);
	
	if (novo_cpf == valor) {
		return true;
	} else {
		return false;
	}   
}

function validarEmail(email) {
	
	if (email.search('@') == -1) {
		return false;
	} else {
		usuario = email.substring(0, email.indexOf('@'));
		dominio = email.substring(email.indexOf('@') + 1, email.length());			
		
		if ((usuario.length() >= 1) &&
			(dominio.length() >= 3) &&
			(usuario.search('@') == -1) &&
		    (dominio.search('@') == -1) &&
		    (usuario.search(' ') == -1) &&
		    (dominio.search(' ') == -1) &&
		    (dominio.search('.') != -1) &&
		    (dominio.indexOf('.') >= 1) &&
		    (dominio.lastIndexOf('.') < dominio.length() - 1)) {
			return true;
		} else{
			return false;
		}
	}
}
