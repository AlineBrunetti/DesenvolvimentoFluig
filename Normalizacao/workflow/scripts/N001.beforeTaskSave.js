function beforeTaskSave(colleagueId, nextSequenceId, userList) {
    var atividade = getValue("WKNumState");

    // Verifica se está nas atividades 0 (início) ou 19
    if (atividade == 0 || atividade == 19) {
        var anexos = hAPI.listAttachments();
        var temAnexo = anexos && anexos.size() > 0;

        if (!temAnexo) {
            throw "É preciso anexar no mínimo 1 arquivo para continuar o processo!";
        }
    }
}
