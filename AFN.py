class AFN:
    def __init__(self, estados, alfabeto, transicoes, estado_inicial, estados_aceitacao):
        self.estados = estados
        self.alfabeto = alfabeto
        self.transicoes = transicoes
        self.estado_inicial = estado_inicial
        self.estados_aceitacao = estados_aceitacao

    def aceita(self, palavra):
        estados_atuais = {self.estado_inicial}
        for simbolo in palavra:
            novos_estados = set()
            for estado in estados_atuais:
                transicoes_estado = self.transicoes.get((estado, simbolo), set())
                novos_estados.update(transicoes_estado)
            estados_atuais = novos_estados
        return any(estado in self.estados_aceitacao for estado in estados_atuais)


# Exemplo de utilização:

# Definindo um AFN para reconhecer a linguagem {0, 1}* onde o último símbolo é sempre 1.
estados = {'q0', 'q1', 'q2'}
alfabeto = {'0', '1'}
transicoes = {
    ('q0', '0'): {'q0'},
    ('q0', '1'): {'q0', 'q1'},
    ('q1', '1'): {'q2'}
}
estado_inicial = 'q0'
estados_aceitacao = {'q2'}

afn = AFN(estados, alfabeto, transicoes, estado_inicial, estados_aceitacao)

# Testando algumas palavras
print(afn.aceita('101'))   # Saída: True
print(afn.aceita('0101'))  # Saída: False
print(afn.aceita('111'))   # Saída: True