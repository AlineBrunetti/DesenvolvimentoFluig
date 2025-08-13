function beforeTaskComplete(colleagueId, nextSequenceId, userList) {
    if (nextSequenceId == 19) {
        var solicitante = hAPI.getCardValue("txtMatSolic");
        userList.clear();
        userList.add(solicitante);
    }
    if (hAPI.getCardValue("txtMatricNorm") != '' && hAPI.getCardValue("txtMatricNorm") != null && nextSequenceId == 15){
        var solicitante = hAPI.getCardValue("txtMatricNorm");
        userList.clear();
        userList.add(solicitante);
    }
}
