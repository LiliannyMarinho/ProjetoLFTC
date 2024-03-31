class AFNe:
    def __init__(self, estados, alfabeto, transicoes, estado_inicial, estados_aceitacao):
        self.estados = estados
        self.alfabeto = alfabeto
        self.transicoes = transicoes
        self.estado_inicial = estado_inicial
        self.estados_aceitacao = estados_aceitacao

    def epsilon_fecho(self, estado):
        fecho = {estado}
        stack = [estado]
        while stack:
            current = stack.pop()
            for next_state in self.transicoes.get((current, ''), set()):
                if next_state not in fecho:
                    fecho.add(next_state)
                    stack.append(next_state)
        return fecho

    def aceita(self, palavra):
        estados_atuais = self.epsilon_fecho(self.estado_inicial)
        for simbolo in palavra:
            novos_estados = set()
            for estado in estados_atuais:
                transicoes_estado = self.transicoes.get((estado, simbolo), set())
                for next_state in transicoes_estado:
                    fecho_next = self.epsilon_fecho(next_state)
                    novos_estados.update(fecho_next)
            estados_atuais = novos_estados
        return any(estado in self.estados_aceitacao for estado in estados_atuais)


# Exemplo de utilização:

# Definindo um AFNe para reconhecer a linguagem {0, 1}* onde o último símbolo é sempre 1.
estados = {'q0', 'q1', 'q2'}
alfabeto = {'0', '1'}
transicoes = {
    ('q0', ''): {'q1'},
    ('q0', '0'): {'q0'},
    ('q0', '1'): {'q0'},
    ('q1', '1'): {'q2'}
}
estado_inicial = 'q0'
estados_aceitacao = {'q2'}

afne = AFNe(estados, alfabeto, transicoes, estado_inicial, estados_aceitacao)

# Testando algumas palavras
print(afne.aceita('101'))   # Saída: True
print(afne.aceita('0101'))  # Saída: False
print(afne.aceita('111'))   # Saída: True
