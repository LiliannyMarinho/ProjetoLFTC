export default class AFD {
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