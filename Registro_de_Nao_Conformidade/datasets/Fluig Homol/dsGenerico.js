function createDataset(fields, constraints, sortFields) {
    var newDataset = DatasetBuilder.newDataset();
    
    // Array para armazenar os valores de cada coluna
    var valoresColunas = [];
    
    // Processa cada constraint para obter os valores das colunas
    for (var i = 0; i < constraints.length; i++) {
        // Adiciona a coluna ao dataset com base no fieldName da constraint
        newDataset.addColumn(constraints[i].fieldName);
        
        // Divide os valores da constraint usando o pipe (|) como separador
        var valores = constraints[i].initialValue.split("\\|");
        valoresColunas.push(valores);
    }
    
    // Determina o número de linhas com base na primeira coluna de valores
    var numLinhas = valoresColunas[0].length;
    
    // Adiciona as linhas ao dataset
    for (var linha = 0; linha < numLinhas; linha++) {
        var linhaDataset = [];
        
        // Para cada coluna de valores, adiciona o valor correspondente à linha
        for (var col = 0; col < valoresColunas.length; col++) {
            // Verifica se o valor existe (para evitar undefined)
            var valor = valoresColunas[col][linha] || ""; // Se não existir, usa uma string vazia
            linhaDataset.push(valor);
        }
        
        // Adiciona a linha ao dataset
        newDataset.addRow(linhaDataset);
    }
    
    return newDataset;
}