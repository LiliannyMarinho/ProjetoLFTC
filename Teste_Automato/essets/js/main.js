// Definindo para reconhecer a linguagem {0, 1}* onde o último símbolo é sempre 1.
const estados = new Set(['q0', 'q1', 'q2']);
const alfabeto = new Set(['0', '1']);
const transicoes = new Map([
    ['q0,0', new Set(['q0'])],
    ['q0,1', new Set(['q0', 'q1'])],
    ['q1,1', new Set(['q2'])]
]);
const estado_inicial = 'q0';
const estados_aceitacao = new Set(['q2']);

const aut = new automato(estados, alfabeto, transicoes, estado_inicial, estados_aceitacao);

var afd = document.getElementById('saidaAFD'),
    afn = document.getElementById('saidaAFN'),
    afne = document.getElementById('saidaAFNe');

// Testando algumas palavras AFD
afd.innerHTML += "<h3>" + aut.aceitaAFD('110') + "</h3>"; // Saída: true
afd.innerHTML += "<h3>" + aut.aceitaAFD('010') + "</h3>"; // Saída: false
afd.innerHTML += "<h3>" + aut.aceitaAFD('101') + "</h3>"; // Saída: true

// Testando algumas palavras AFN
afn.innerHTML += "<h3>" + aut.aceitaAFN('011') + "</h3>"; // Saída: true
afn.innerHTML += "<h3>" + aut.aceitaAFN('010') + "</h3>"; // Saída: false
afn.innerHTML += "<h3>" + aut.aceitaAFN('111') + "</h3>"; // Saída: true

// Testando algumas palavras AFNe
afne.innerHTML += "<h3>" + aut.aceitaAFNe('011') + "</h3>"; // Saída: true
afne.innerHTML += "<h3>" + aut.aceitaAFNe('010') + "</h3>"; // Saída: false
afne.innerHTML += "<h3>" + aut.aceitaAFNe('111') + "</h3>"; // Saída: true