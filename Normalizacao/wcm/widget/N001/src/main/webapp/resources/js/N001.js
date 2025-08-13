var wd_N001 = SuperWidget.extend({
    init: function () {
        const urlParams = new URLSearchParams(window.location.search);
        const showRedirect = urlParams.get("showRedirect");
        const solFluig = urlParams.get("sol");

        if (showRedirect && solFluig) {
            FLUIGC.modal({
                title: 'Atenção!',
                content: '<p style="font-size:16px;">Você será redirecionado ao clicar em OK.</p>',
                id: 'modal_aguarde',
                actions: [{
                    label: 'OK',
                    autoClose: true
                }]
            });

            // Aguarda o modal ser renderizado e associa o evento de clique
            setTimeout(function () {
                const buttons = document.querySelectorAll('#modal_aguarde .modal-footer button');

                buttons.forEach(function (btn) {
                    if (btn.innerText.trim() === 'OK') {
                        console.log("Botão OK encontrado, adicionando evento de clique.");
                        btn.addEventListener('click', function () {
                            console.log("Botão OK clicado, buscando login...");
                            var userCode = WCMAPI.userCode;
                            if (userCode) {
                                console.log("Código do usuário encontrado:", userCode);
                                var redirectUrl = "https://intranet.millpar.com/portal/p/Millpar/pageworkflowview" +
                                    "?app_ecm_workflowview_detailsProcessInstanceID=" + solFluig +
                                    "&app_ecm_workflowview_taskUserId=" + userCode;
                                console.log("Redirecionando para:", redirectUrl);
                                window.location.href = redirectUrl;
                            } else {
                                console.error("Código do usuário não encontrado.");
                            }
                        });
                    }
                });
            }, 500);
        }
    }
});
