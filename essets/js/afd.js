class AFD {
    constructor(estados, alfabeto, transicoes, estado_inicial, estados_aceitacao) {
        this.estados = estados;
        this.alfabeto = alfabeto;
        this.transicoes = transicoes;
        this.estado_inicial = estado_inicial;
        this.estados_aceitacao = estados_aceitacao;
    }

    aceita(palavra) {
        let estado_atual = this.estado_inicial;
        for (let i = 0; i < palavra.length; i++) {
            const simbolo = palavra[i];
            if (!this.alfabeto.has(simbolo)) {
                return false;
            }
            estado_atual = this.transicoes.get(`${estado_atual},${simbolo}`);
            if (estado_atual === undefined) {
                return false;
            }
        }
        return this.estados_aceitacao.has(estado_atual);
    }
}

// Definindo um AFD para reconhecer a linguagem {0, 1}* onde o último símbolo é sempre 1.
const estados = new Set(['q0', 'q1', 'q2']);
const alfabeto = new Set(['0', '1']);
const transicoes = new Map([
    ['q0,0', 'q0'],
    ['q0,1', 'q1'],
    ['q1,0', 'q0'],
    ['q1,1', 'q2'],
    ['q2,0', 'q0'],
    ['q2,1', 'q2']
]);
const estado_inicial = 'q0';
const estados_aceitacao = new Set(['q2']);

const afd = new AFD(estados, alfabeto, transicoes, estado_inicial, estados_aceitacao);

var saida = document.getElementById('saida');

// Testando algumas palavras
saida.innerHTML = afd.aceita('011'); // Saída: true
saida.innerHTML += "<br>" + afd.aceita('101'); // Saída: false
saida.innerHTML += "<br>" + afd.aceita('111'); // Saída: true