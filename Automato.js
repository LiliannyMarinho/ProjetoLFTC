// Definição da classe Automaton (Autômato)
export default class Automaton {
    constructor() {
        this.states = {}; // Estados do autômato
        this.startState = null; // Estado inicial
        this.finalStates = new Set(); // Estados finais
    }

    // Método para adicionar um estado ao autômato
    addState(name) {
        if (!(name in this.states)) {
            this.states[name] = new State(name);
        }
    }

    // Método para adicionar uma transição entre estados com um símbolo específico
    addTransition(fromState, symbol, toState) {
        if (fromState in this.states && toState in this.states) {
            this.states[fromState].addTransition(symbol, this.states[toState]);
        }
    }

    // Método para adicionar uma transição vazia entre estados
    addEpsilonTransition(fromState, toState) {
        if (fromState in this.states && toState in this.states) {
            this.states[fromState].addEpsilonTransition(this.states[toState]);
        }
    }

    // Método para definir o estado inicial do autômato
    setStartState(name) {
        if (name in this.states) {
            this.startState = this.states[name];
        }
    }

    // Método para definir um estado final do autômato
    setFinalState(name) {
        if (name in this.states) {
            this.finalStates.add(this.states[name]);
        }
    }

    // Método para simular a execução de uma entrada no autômato
    simulate(inputString) {
        let currentStates = [this.startState]; // Começa no estado inicial
        for (const symbol of inputString) {
            let nextStates = [];
            for (const state of currentStates) {
                if (state.transitions[symbol]) {
                    nextStates.push(...state.transitions[symbol]);
                }
                if (state.transitions['ε']) {
                    nextStates.push(...state.transitions['ε']);
                }
            }
            currentStates = nextStates;
        }
        return currentStates.some(state => this.finalStates.has(state)); // Verifica se algum estado final foi alcançado
    }
}
