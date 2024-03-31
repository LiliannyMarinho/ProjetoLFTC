import AFD from './afd.js'; // Importa a classe AFD do arquivo AFD.js

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

export default function verificarPalavra(palavra) {
    return afd.aceita(palavra);
}


