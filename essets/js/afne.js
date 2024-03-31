class AFNe {
    constructor(estados, alfabeto, transicoes, estado_inicial, estados_aceitacao) {
        this.estados = estados;
        this.alfabeto = alfabeto;
        this.transicoes = transicoes;
        this.estado_inicial = estado_inicial;
        this.estados_aceitacao = estados_aceitacao;
    }

    epsilon_fecho(estado) {
        let fecho = new Set([estado]);
        let stack = [estado];
        while (stack.length > 0) {
            let current = stack.pop();
            for (let next_state of this.transicoes.get(`${current},`) || new Set()) {
                if (!fecho.has(next_state)) {
                    fecho.add(next_state);
                    stack.push(next_state);
                }
            }
        }
        return fecho;
    }

    aceita(palavra) {
        let estados_atuais = this.epsilon_fecho(this.estado_inicial);
        for (let simbolo of palavra) {
            let novos_estados = new Set();
            for (let estado of estados_atuais) {
                let transicoes_estado = this.transicoes.get(`${estado},${simbolo}`) || new Set();
                for (let next_state of transicoes_estado) {
                    let fecho_next = this.epsilon_fecho(next_state);
                    fecho_next.forEach(s => novos_estados.add(s));
                }
            }
            estados_atuais = novos_estados;
        }
        return Array.from(estados_atuais).some(estado => this.estados_aceitacao.has(estado));
    }
}

// Definindo um AFNe para reconhecer a linguagem {0, 1}* onde o último símbolo é sempre 1.
const estados = new Set(['q0', 'q1', 'q2']);
const alfabeto = new Set(['0', '1']);
const transicoes = new Map([
    ['q0,', new Set(['q1'])],
    ['q0,0', new Set(['q0'])],
    ['q0,1', new Set(['q0'])],
    ['q1,1', new Set(['q2'])]
]);
const estado_inicial = 'q0';
const estados_aceitacao = new Set(['q2']);

const afne = new AFNe(estados, alfabeto, transicoes, estado_inicial, estados_aceitacao);

// Testando algumas palavras
console.log(afne.aceita('101'));   // Saída: true
console.log(afne.aceita('010'));   // Saída: false
console.log(afne.aceita('111'));   // Saída: true
