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