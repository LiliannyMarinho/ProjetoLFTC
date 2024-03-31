class AFN {
    constructor(estados, alfabeto, transicoes, estado_inicial, estados_aceitacao) {
        this.estados = estados;
        this.alfabeto = alfabeto;
        this.transicoes = transicoes;
        this.estado_inicial = estado_inicial;
        this.estados_aceitacao = estados_aceitacao;
    }

    aceita(palavra) {
        let estados_atuais = new Set([this.estado_inicial]);
        for (let simbolo of palavra) {
            let novos_estados = new Set();
            for (let estado of estados_atuais) {
                let transicoes_estado = this.transicoes.get(`${estado},${simbolo}`) || new Set();
                transicoes_estado.forEach(next_state => novos_estados.add(next_state));
            }
            estados_atuais = novos_estados;
        }
        return Array.from(estados_atuais).some(estado => this.estados_aceitacao.has(estado));
    }    
}

// Definindo um AFN para reconhecer a linguagem {0, 1}* onde o último símbolo é sempre 1.
const estados = new Set(['q0', 'q1', 'q2']);
const alfabeto = new Set(['0', '1']);
const transicoes = new Map([
    ['q0,0', new Set(['q0'])],
    ['q0,1', new Set(['q0', 'q1'])],
    ['q1,1', new Set(['q2'])]
]);
const estado_inicial = 'q0';
const estados_aceitacao = new Set(['q2']);

const afn = new AFN(estados, alfabeto, transicoes, estado_inicial, estados_aceitacao);

// Testando algumas palavras
console.log(afn.aceita('011'));   // Saída: true
console.log(afn.aceita('010'));  // Saída: false
console.log(afn.aceita('111'));   // Saída: true