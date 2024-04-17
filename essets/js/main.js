const bg = document.getElementById("bg-ativo"),
    out = document.getElementById("saida"),
    c = document.getElementById("close"),
    env = document.getElementById("botao-testar");

env.onclick = () => {
    // Coletando os valores dos campos
    const estados = document.getElementById("states").value.split(","),
        alfabeto = new Set(document.getElementById("alphabet").value.split(",")),
        estado_inicial = document.getElementById("initial_state").value,
        estados_aceitacao = new Set(document.getElementById("accept_states").value.split(",")),
        transicoes = new Map(),
        transicoesInput = document.getElementById("transitions").value.split(";"),
        metodoSelecionado = document.querySelector('input[name="method"]:checked').value;
    
    if(estados != "" 
        && alfabeto != "" 
        && estado_inicial != "" 
        && estados_aceitacao != "" 
        && transicoesInput != "" 
        && metodoSelecionado != ""){
        // Formatando as transições
        if(metodoSelecionado != "afd"){
            transicoesInput.forEach(transition => {
                const [estado, simbolo, proximoEstado] = transition.split(",");
                const key = `${estado},${simbolo}`;
                if (!transicoes.has(key)) {
                    transicoes.set(key, new Set());
                }
                transicoes.get(key).add(proximoEstado);
            });
        }
        else {
            transicoesInput.forEach(transition => {
                const [estado, simbolo, proximoEstado] = transition.split(",");
                const key = `${estado},${simbolo}`;
                transicoes.set(key, proximoEstado);
            });
        }
        
        // Criando um objeto automato com os dados fornecidos
        const automatoInstancia = new automato(estados, alfabeto, transicoes, estado_inicial, estados_aceitacao);
        
        // Determinando qual método usar com base na opção selecionada
        
        let resultado = false;
        switch (metodoSelecionado) {
            case "afd":
                resultado = automatoInstancia.aceitaAFD(document.getElementById("input_string").value);
                break;
            case "afn":
                resultado = automatoInstancia.aceitaAFN(document.getElementById("input_string").value);
                break;
            case "afne":
                resultado = automatoInstancia.aceitaAFNe(document.getElementById("input_string").value);
                break;
        }
        
        // Exibindo o resultado
        out.innerText = resultado ? "Palavra aceita" : "Palavra rejeitada";
        bg.style.display = "grid";
    }
}

//Fecha a janela fullscreen
c.onclick = () => {
    bg.style.display = "none";
}