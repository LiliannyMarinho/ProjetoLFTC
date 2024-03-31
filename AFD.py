class AFD:
    def __init__(self, estados, alfabeto, transicoes, estado_inicial, estados_aceitacao):
        self.estados = estados
        self.alfabeto = alfabeto
        self.transicoes = transicoes
        self.estado_inicial = estado_inicial
        self.estados_aceitacao = estados_aceitacao

    def aceita(self, palavra):
        estado_atual = self.estado_inicial
        for simbolo in palavra:
            if simbolo not in self.alfabeto:
                return False
            estado_atual = self.transicoes.get((estado_atual, simbolo))
            if estado_atual is None:
                return False
        return estado_atual in self.estados_aceitacao


# Exemplo de utilização:

# Definindo um AFD para reconhecer a linguagem {0, 1}* onde o último símbolo é sempre 1.
estados = {'q0', 'q1', 'q2'}
alfabeto = {'0', '1'}
transicoes = {
    ('q0', '0'): 'q0',
    ('q0', '1'): 'q1',
    ('q1', '0'): 'q0',
    ('q1', '1'): 'q2',
    ('q2', '0'): 'q0',
    ('q2', '1'): 'q2'
}
estado_inicial = 'q0'
estados_aceitacao = {'q2'}

afd = AFD(estados, alfabeto, transicoes, estado_inicial, estados_aceitacao)

# Testando algumas palavras
print(afd.aceita('011'))  # Saída: True
print(afd.aceita('101')) # Saída: False
print(afd.aceita('111'))  # Saída: True