# Template Padrão para o servidor:
1. Variáveis
  ```MD
    - SOLICITANTE
    - SOLFLUIG
    - DATASOLICITACAO
    - TITULO
    - INFOEMAIL
    - SUPORTE
  ```
    
2. Código HTML
  ```html
  <!DOCTYPE html>
  <html lang="pt-BR">
      <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <title>Email Fluig</title>
          <style type="text/css">
              @import url("https://fonts.googleapis.com/css?family=Montserrat");
                  table {
                  border-collapse: collapse;
              width: 100%;
                      border: none !important;
                  }
  
              /* Estilo para o cabeçalho da tabela */
                  th,
                  td {
                  padding: 10px;
              text-align: left;
                  }
  
              table tbody tr td {
                  border: 0;
              }
          </style>
      </head>
      <body style="font-family: Montserrat, sans-serif;">
          <table>
              <tbody>
                  <tr>
                      <td colspan="4" style="padding: 0; width: 11%; border-bottom: 2px solid #A3BD31;">
                          <h3 style="margin: 0;">
                              <strong style="font-size: 30px; color: #4B4D49;">${TITULO}</strong>
                          </h3>
                      </td>
                  </tr>
                  <tr>
                      <td width="50%"><strong>Solicitante: </strong> <span style="color: #A3BD31;">${SOLICITANTE}</span></td>
                      <td width="25%"><strong>Número: </strong> <span style="color: #A3BD31;">${SOLFLUIG}</span></td>
                      <td width="25%"><strong>Data: </strong> <span style="color: #A3BD31;">${DATASOLICITACAO}</span></td>
                  </tr>
                  <tr><td></td></tr>
                  ${INFOEMAIL}
                  <tr><td></td></tr>
              </tbody>
          </table>
          <table style="padding: 0; font-family: Montserrat, sans-serif; font-size: 14px;">
              <tr>
                  <td colspan="2" style="padding: 0;">
                     Este e-mail é automático, favor não responder
                  </td>
                  <td style="padding: 0;">
                     <table>
                      <tr>
                          <td style="border-bottom: 2px solid #A3BD31;"></td>
                      </tr>
                      <tr>
                          <td style="border-top: 2px solid #A3BD31;"></td>
                      </tr>
                     </table>
                  </td>
              </tr>
              <tr>
                  <td width="148" style="padding: 0;">
                      <div style="line-height: 1">
                          <span style="color: #4B4D49; font-size: 55px; font-weight: 900; font-family: Arial, sans-serif;">
                          EMPRESA
                          </span><br>
                          <span width="10" style="color: #A3BD31; font-size: 10px; font-weight: bold; font-family: Arial, sans-serif;">
                          moulding company
                          </span>
                      </div>
                  </td>
                  <td width="148" style=" padding-left: 20px; text-align: left; padding-right: 10px;">
                      <div style="color: #4B4D49; font-weight: bold; font-size: 16px;">Equipe Fluig</div>
                      <a href="mailto:${SUPORTE[SUPORTE?size - 1]}" style="color: #A3BD31;">Processos TI</a><br>
                      <a href="https://EMPRESA.movidesk.com/Account/Login?ReturnUrl=%2f" style="color: #A3BD31;">Movidesk</a>
                  </td>
              </tr>
          </table>
      </body>
  </html>
  ```
# Funções úteis

1. Criar um array com o email dos usuários de um grupo
   - Dataset usado
   ```js
   function createDataset(fields, constraints, sortFields) {
	
    	var query = "";
    
        var tipoSql = "";
    
    	for (var i in constraints){
     		
     		if (constraints[i].getFieldName().toString() == 'QUERY'){
                query = constraints[i].initialValue;
     		}
        
     	} 
    
        if (query.indexOf("FOREACH") > -1) {
            tipoSql = "1";    
        } else if (query.indexOf("ALTERAR") > -1) {
            tipoSql = "2";
        } else if (query.indexOf("CRIARTABLE") > -1) {
            tipoSql = "2"; 
        } else if (query.indexOf("MAXID") > -1) {
            tipoSql = "1";  
        } else if (query.indexOf("EXCLUIR") > -1) {
            tipoSql = "2";
        }
    
        query = query.replace("FOREACH", "SELECT*FROM");
        query = query.replace("FOREACHS", "SELECT");
        query = query.replace("ALTERAR", "UPDATE");
        query = query.replace("CRIARTABLE", "INSERT INTO");
        query = query.replace("MAXID", "SELECT MAX(ID) + 1");
        query = query.replace("EXCLUIR", "DELETE FROM");
    	
        log.info("DS_TABLE_FLUIG HRN---->" + query);
        
        var datasetUser = DatasetBuilder.newDataset();
    	
        var dataSource = 'jdbc/AppDS';
    	
        var ic = new javax.naming.InitialContext();
    	
        var ds = ic.lookup(dataSource);
    	
        var created = false;
        try {
            var conn = ds.getConnection();
        	
            var stmt = conn.createStatement();
        	
            var rs = "";
            
            if(tipoSql == "1"){
                rs = stmt.executeQuery(query);
                var columnCount = rs.getMetaData().getColumnCount();
                
                while (rs.next()) {
                    if (!created) {
                        for (var i = 1; i <= columnCount; i++) {
                            datasetUser.addColumn(rs.getMetaData().getColumnName(i));
                        }
                        created = true;
                    }
                    var Arr = new Array();
                    for (var i = 1; i <= columnCount; i++) {
                        var obj = rs.getObject(rs.getMetaData().getColumnName(i));
                        if (null != obj) {
                            Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString().trim();
                        } else {
                            Arr[i - 1] = "";
                        }
                    }
                    datasetUser.addRow(Arr);
                }
            } else if(tipoSql == "2"){
                rs = stmt.executeUpdate(query);
                datasetUser.addColumn("INFO");
                datasetUser.addRow([rs]);
            }
        	
        } catch (e) {
        	datasetUser.addColumn("erro");
        	datasetUser.addRow([e.message]);
        	log.info("EMBRAED - Dataset - DS_TABLE_FLUIG - e.message: " + e.message);
        } finally {
            if (stmt != null) {
                stmt.close();
            }
            if (conn != null) {
                conn.close();
            }
        }
    	
        return datasetUser;
    }

   ```
   - Código
   ```js
    function getMails(grupoPai) {
       var destinatarios = new java.util.ArrayList();
   
       // 1) Consulta tabela fdn_groupuserrole via DS_TABLE_FLUIG
       var instr = "FOREACH fdn_groupuserrole WHERE group_code = '" + grupoPai + "'";
       var c1 = DatasetFactory.createConstraint("QUERY", instr, instr, ConstraintType.MUST);
       // pegue só a coluna LOGIN para otimizar
       var ds = DatasetFactory.getDataset("DS_TABLE_FLUIG", ["LOGIN"], [c1], null);
   
       for (var i = 0; i < ds.rowsCount; i++) {
           // pega o LOGIN corretamente
           var login = ds.getValue(i, "LOGIN");
           if (login && login.trim() !== "") {
               login = login.trim();
   
               // consulta colega pelo login
               var cLogin = DatasetFactory.createConstraint("login", login, login, ConstraintType.MUST);
               var dsColleague = DatasetFactory.getDataset("colleague", ["mail"], [cLogin], null);
   
               for (var j = 0; j < dsColleague.rowsCount; j++) {
                   // pega o e-mail corretamente
                   var email = dsColleague.getValue(j, "mail");
                   if (email && !destinatarios.contains(email)) {
                       destinatarios.add(email);
                   }
               }
           }
       }
   
       return destinatarios;
   }
   ```

3. Global para envio de email
   ```js
     function enviarEmail(nameSolicitante, solFluig, dataSolicitacao, titulo, mail, loginSolicitante, destinatarios) {
   	var parametros = new java.util.HashMap();
         var mailSuporte = getMails("ZZZ_Fluig");
         parametros.put("SOLICITANTE"		, nameSolicitante);
   	parametros.put("SOLFLUIG"		, String(solFluig));
   	parametros.put("DATASOLICITACAO"	, dataSolicitacao);
         parametros.put("TITULO"	            , titulo);
   	parametros.put("INFOEMAIL"	      , mail);
         parametros.put("SUPORTE"			, mailSuporte);
   
         log.info("------> R001.Dados - " + loginSolicitante + ", " + parametros + ", " + destinatarios);
   
   	try{
   		parametros.put("subject", "Processo Admissional - ( " + solFluig + " )");
   		
   		notifier.notify(loginSolicitante, "EmailPadronizado", parametros, destinatarios, "text/html");
   
   	} catch(e){
   		log.info("------> R001.AFTERTASKCOMPLETE ERROR - " + e); 
   	}
   }
   ```

# Exemplo de Uso

  ```js
  else if(nextSequenceId == 47 && atividade == 98) {
            titulo = "Cadastrar Novo Funcionário";
            mail = 
                  '<tr>'+
                  '  <td colspan="3">Prezado(a), <br>'+
                  '      Informamos que a Solicitação de Admissão <strong><span style="color: #A3BD31;">'+ String(solFluig) +'</span></strong> chegou em sua central de tarefas!<br>'+
                  '  </td>'+
                  '</tr>'+
                  '<tr>'+
                  '  <td colspan="3">'+
                  '      Localização: <strong><span style="color: #A3BD31;">ADM Pessoal - Cadastrar Novo Funcionário </span></strong><br>'+
                  '  </td>'+
                  '</tr>';
            destinatarios = getMails("C002 - Solicitantes");
            enviarEmail(nameSolicitante, solFluig, dataSolicitacao, titulo, mail, loginSolicitante, destinatarios);
      }
  ```

# Resultado
  <img width="1374" height="582" alt="Captura de tela 2025-08-13 104003" src="https://github.com/user-attachments/assets/19189b45-bcce-46d3-9c08-6d21e3c225cb" />

