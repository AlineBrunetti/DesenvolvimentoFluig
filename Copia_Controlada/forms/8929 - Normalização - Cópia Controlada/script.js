$(document).ready(function() {
  $('#qtdCopia').on('input', function () {
		let valor = $(this).val().replace(/\D/g, '');
		$(this).val(valor);
	});

  const changeThemeBtn = document.querySelector("#change-theme");
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

  loadTheme();

  changeThemeBtn.addEventListener("change", function () {
    toggleDarkMode();

    // Save or remove dark mode from localStorage
    localStorage.removeItem("dark");

    if (document.body.classList.contains("dark")) {
      localStorage.setItem("dark", "1");
    }
  });
});

var beforeSendValidate = function (numState, nextState) {
	var resposta = "";
    
	if(numState == 0 || numState == 4){
		if ($("#nomeDoc").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (Nome do Documento)</b> precisa ser preenchido!</b>"
			+ "<br>";
		}
		if ($("#qtdCopia").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (Quantidade de Cópia)</b> precisa ser preenchido!</b>"
			+ "<br>";
		}
		
		if ($("#slcTipoDocumento").val() == ""){	
			resposta += "<b>O Campo <b style='color:red'> (Tipo de Documento)</b> precisa ser preenchido!</b>"
			+ "<br>";
		}
		if ($("#gestor").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (Gestor)</b> precisa ser preenchido!</b>"
			+ "<br>";	
		}
    if ($("#setor").val() == ""){
			resposta += "<b>O Campo <b style='color:red'> (Setor | Máquina)</b> precisa ser preenchido!</b>"
			+ "<br>";	
		}
  }
	if (resposta != "") {
		throw resposta;
	}
}
