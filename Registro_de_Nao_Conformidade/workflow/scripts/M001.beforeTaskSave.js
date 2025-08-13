function beforeTaskSave(colleagueId, nextSequenceId, userList) {
    var atividade = getValue("WKNumState");

    // Verifica se está nas atividades 0 (início) ou 6
    if (atividade == 0 || atividade == 6) {
        var anexos = hAPI.listAttachments();
        var temAnexo = anexos && anexos.size() > 0;

        if (!temAnexo) {
            throw "É preciso anexar a NF para continuar o processo!";
        }
    }
}
