
// Definição da classe State (Estado)
export default class State {
    constructor(name) {
        this.name = name; // Nome do estado
        this.transitions = {}; // Transições a partir deste estado
    }

    // Método para adicionar uma transição para outro estado com um símbolo específico
    addTransition(symbol, state) {
        if (symbol in this.transitions) {
            this.transitions[symbol].push(state);
        } else {
            this.transitions[symbol] = [state];
        }
    }

    // Método para adicionar uma transição vazia para outro estado
    addEpsilonTransition(state) {
        if ('ε' in this.transitions) {
            this.transitions['ε'].push(state);
        } else {
            this.transitions['ε'] = [state];
        }
    }
}
