//Importando nossas classes State e Automaton
import 'State.js';
import Automaton from 'Automaton.js';

// Função principal do programa
function main() {
    // Exemplo de um AFD (Autômato Finito Determinístico)
    const afd = new Automaton();
    afd.addState("q0");
    afd.addState("q1");
    afd.addTransition("q0", "a", "q1");
    afd.setStartState("q0");
    afd.setFinalState("q1");

    // Testando a simulação com uma entrada válida para o AFD
    let inputString = "a";
    console.log("AFD - Entrada:", inputString);
    console.log("Aceita pelo autômato:", afd.simulate(inputString));

    // Testando a simulação com uma entrada inválida para o AFD
    inputString = "b";
    console.log("AFD - Entrada:", inputString);
    console.log("Aceita pelo autômato:", afd.simulate(inputString));

    // Exemplo de um AFN (Autômato Finito Não-Determinístico)
    const afn = new Automaton();
    afn.addState("q0");
    afn.addState("q1");
    afn.addState("q2");
    afn.addTransition("q0", "a", "q1");
    afn.addTransition("q1", "b", "q2");
    afn.setStartState("q0");
    afn.setFinalState("q2");

    // Testando a simulação com uma entrada válida para o AFN
    inputString = "ab";
    console.log("AFN - Entrada:", inputString);
    console.log("Aceita pelo autômato:", afn.simulate(inputString));

    // Testando a simulação com uma entrada inválida para o AFN
    inputString = "aa";
    console.log("AFN - Entrada:", inputString);
    console.log("Aceita pelo autômato:", afn.simulate(inputString));

    // Exemplo de um AFNe (Autômato Finito Não-Determinístico com Transições Vazias)
    const afne = new Automaton();
    afne.addState("q0");
    afne.addState("q1");
    afne.addState("q2");
    afne.addTransition("q0", "a", "q1");
    afne.addTransition("q1", "b", "q2");
    afne.addEpsilonTransition("q1", "q2"); // Transição vazia de q1 para q2
    afne.setStartState("q0");
    afne.setFinalState("q2");

    // Testando a simulação com uma entrada válida para o AFNe
    inputString = "ab";
    console.log("AFNe - Entrada:", inputString);
    console.log("Aceita pelo autômato:", afne.simulate(inputString));

    // Testando a simulação com uma entrada inválida para o AFNe
    inputString = "a";
    console.log("AFNe - Entrada:", inputString);
    console.log("Aceita pelo autômato:", afne.simulate(inputString));
}

// Chamada da função principal para iniciar o programa
main();