# Sistema de Gestão de Carros - Requisitos Funcionais e Casos de Teste

## 1. Visão Geral do Sistema

O sistema é uma aplicação web para gestão de cadastro de usuários e carros, com controle de acesso baseado em cargo (VENDAS ou ADMIN). Permite operações CRUD (Create, Read, Update, Delete) completas para ambas as entidades.

---

## 2. REQUISITOS FUNCIONAIS - BACKEND

### 2.1 Gestão de Usuários

#### RF-U1: Listar Todos os Usuários
- **Descrição**: O sistema deve permitir listar todos os usuários cadastrados
- **Endpoint**: `GET /usuarios`
- **Campos Retornados**: id, nome, senha, cargo
- **Critérios de Aceitação**:
  - Retornar status 200 quando há usuários cadastrados
  - Retornar status 404 quando não há usuários
  - Retornar lista vazia em formato JSON

#### RF-U2: Buscar Usuário por ID
- **Descrição**: O sistema deve permitir buscar um usuário específico pelo ID
- **Endpoint**: `GET /usuarios/:id`
- **Campos Retornados**: {data: {id, nome, senha, cargo}, message: "Usuário encontrado com sucesso!"}
- **Critérios de Aceitação**:
  - Retornar status 200 com dados do usuário quando ID existe
  - Retornar status 404 com mensagem de erro quando ID não existe
  - Validar que o ID é numérico

#### RF-U3: Criar Novo Usuário
- **Descrição**: O sistema deve permitir criar um novo usuário
- **Endpoint**: `POST /usuarios`
- **Campos Obrigatórios**: nome (string), senha (string), cargo (string)
- **Valores Válidos de Cargo**: 'VENDAS' ou 'ADMIN'
- **Critérios de Aceitação**:
  - Retornar status 201 com dados do usuário criado
  - Validar presença de todos os campos obrigatórios
  - Validar que cargo está em ['VENDAS', 'ADMIN']
  - Retornar mensagem de sucesso

#### RF-U4: Atualizar Usuário
- **Descrição**: O sistema deve permitir atualizar dados de um usuário existente
- **Endpoint**: `PUT /usuarios/:id`
- **Campos Atualizáveis**: nome, senha, cargo
- **Critérios de Aceitação**:
  - Retornar status 200 com dados do usuário atualizado
  - Validar que todos os campos foram preenchidos
  - Validar que o ID existe antes de atualizar
  - Validar cargo em ['VENDAS', 'ADMIN']

#### RF-U5: Deletar Usuário
- **Descrição**: O sistema deve permitir deletar um usuário
- **Endpoint**: `DELETE /usuarios/:id`
- **Critérios de Aceitação**:
  - Retornar status 200 com confirmação de exclusão quando usuário existe
  - Retornar status 404 quando usuário não existe
  - Remover completamente o usuário do banco de dados

---

### 2.2 Gestão de Carros

#### RF-C1: Listar Todos os Carros
- **Descrição**: O sistema deve permitir listar todos os carros cadastrados
- **Endpoint**: `GET /carros`
- **Campos Retornados**: id, modelo, cor, valor, ano
- **Critérios de Aceitação**:
  - Retornar status 200 quando há carros cadastrados
  - Retornar status 404 quando não há carros
  - Retornar lista vazia em formato JSON

#### RF-C2: Buscar Carro por ID
- **Descrição**: O sistema deve permitir buscar um carro específico pelo ID
- **Endpoint**: `GET /carros/:id`
- **Campos Retornados**: {data: {id, modelo, cor, valor, ano}, message: "Carro encontrado com sucesso!"}
- **Critérios de Aceitação**:
  - Retornar status 200 com dados do carro quando ID existe
  - Retornar status 404 com mensagem de erro quando ID não existe

#### RF-C3: Criar Novo Carro
- **Descrição**: O sistema deve permitir cadastrar um novo carro
- **Endpoint**: `POST /carros`
- **Campos Obrigatórios**: modelo (string), cor (string), valor (decimal), ano (integer)
- **Critérios de Aceitação**:
  - Retornar status 201 com dados do carro criado
  - Validar presença de todos os campos obrigatórios
  - Validar que valor é decimal positivo
  - Validar que ano é um número inteiro válido (1900-2100)

#### RF-C4: Atualizar Carro
- **Descrição**: O sistema deve permitir atualizar dados de um carro existente
- **Endpoint**: `PUT /carros/:id`
- **Campos Atualizáveis**: modelo, cor, valor, ano
- **Critérios de Aceitação**:
  - Retornar status 200 com dados do carro atualizado
  - Validar que todos os campos foram preenchidos
  - Validar que o ID existe antes de atualizar
  - Validar tipos de dados

#### RF-C5: Deletar Carro
- **Descrição**: O sistema deve permitir deletar um carro
- **Endpoint**: `DELETE /carros/:id`
- **Critérios de Aceitação**:
  - Retornar status 200 com confirmação de exclusão quando carro existe
  - Retornar status 404 quando carro não existe

---

## 3. REQUISITOS FUNCIONAIS - FRONTEND

### 3.1 Tela de Listagem de Usuários

#### RF-FE-U1: Exibir Tabela de Usuários
- **Descrição**: Exibir lista de usuários em formato de tabela
- **Elementos**:
  - Coluna ID
  - Coluna Nome
  - Coluna Cargo (VENDAS/ADMIN)
  - Botão "Editar" por linha
  - Botão "Deletar" por linha
- **Critérios de Aceitação**:
  - Tabela carrega automaticamente ao abrir a página
  - Exibir mensagem "Nenhum usuário cadastrado" quando vazio
  - Dados aparecem formatados corretamente

#### RF-FE-U2: Adicionar Novo Usuário
- **Descrição**: Abrir formulário para criar novo usuário
- **Elementos**:
  - Modal ou página com formulário
  - Campos: Nome, Senha, Cargo (radio buttons ou select)
  - Botão "Salvar"
  - Botão "Cancelar"
- **Critérios de Aceitação**:
  - Validar campos obrigatórios antes de enviar
  - Mostrar mensagem de sucesso após criação
  - Atualizar tabela automaticamente
  - Limpar formulário após sucesso

#### RF-FE-U3: Editar Usuário
- **Descrição**: Permitir edição de dados de usuário existente
- **Elementos**:
  - Modal com formulário preenchido com dados atuais
  - Campos: Nome, Senha, Cargo
  - Botão "Atualizar"
  - Botão "Cancelar"
- **Critérios de Aceitação**:
  - Carregar dados atuais automaticamente
  - Validar campos antes de enviar
  - Mostrar mensagem de sucesso
  - Atualizar tabela em tempo real

#### RF-FE-U4: Deletar Usuário
- **Descrição**: Permitir exclusão de usuário com confirmação
- **Elementos**:
  - Modal de confirmação antes de deletar
  - Botão "Confirmar"
  - Botão "Cancelar"
- **Critérios de Aceitação**:
  - Exibir confirmação antes de deletar
  - Remover linha da tabela após sucesso
  - Mostrar mensagem de erro se houver problema

---

### 3.2 Tela de Listagem de Carros

#### RF-FE-C1: Exibir Tabela de Carros
- **Descrição**: Exibir lista de carros em formato de tabela
- **Elementos**:
  - Coluna ID
  - Coluna Modelo
  - Coluna Cor
  - Coluna Valor (formatado em moeda)
  - Coluna Ano
  - Botão "Editar" por linha
  - Botão "Deletar" por linha
- **Critérios de Aceitação**:
  - Tabela carrega automaticamente ao abrir a página
  - Valores exibidos em moeda (R$)
  - Exibir mensagem "Nenhum carro cadastrado" quando vazio

#### RF-FE-C2: Adicionar Novo Carro
- **Descrição**: Abrir formulário para criar novo carro
- **Elementos**:
  - Modal ou página com formulário
  - Campos: Modelo, Cor, Valor, Ano
  - Botão "Salvar"
  - Botão "Cancelar"
- **Critérios de Aceitação**:
  - Validar campos obrigatórios
  - Validar que valor é número positivo
  - Validar que ano está em intervalo válido
  - Mostrar mensagem de sucesso
  - Atualizar tabela automaticamente

#### RF-FE-C3: Editar Carro
- **Descrição**: Permitir edição de dados de carro existente
- **Elementos**:
  - Modal com formulário preenchido
  - Campos: Modelo, Cor, Valor, Ano
  - Botão "Atualizar"
  - Botão "Cancelar"
- **Critérios de Aceitação**:
  - Carregar dados atuais automaticamente
  - Validar campos antes de enviar
  - Mostrar mensagem de sucesso
  - Atualizar tabela em tempo real

#### RF-FE-C4: Deletar Carro
- **Descrição**: Permitir exclusão de carro com confirmação
- **Elementos**:
  - Modal de confirmação
  - Botão "Confirmar"
  - Botão "Cancelar"
- **Critérios de Aceitação**:
  - Exibir confirmação antes de deletar
  - Remover linha da tabela após sucesso

---

## 4. CASOS DE TESTE - BACKEND

### 4.1 Testes de Usuários

#### TC-U-001: Listar todos os usuários com sucesso
```
Pré-condição: Banco de dados possui pelo menos 2 usuários
Ação: GET /usuarios
Resultado Esperado: 
  - Status: 200
  - Response contém array com usuários
  - Cada usuário tem: id, nome, senha, cargo
```

#### TC-U-002: Listar usuários quando não há nenhum
```
Pré-condição: Tabela usuarios vazia
Ação: GET /usuarios
Resultado Esperado:
  - Status: 404
  - Mensagem: "Não há nenhum usuário"
```

#### TC-U-003: Buscar usuário por ID existente
```
Pré-condição: Usuário com id=1 existe no banco
Ação: GET /usuarios/1
Resultado Esperado:
  - Status: 200
  - Response: {data: {id, nome, senha, cargo}, message: "Usuário encontrado com sucesso!"}
```

#### TC-U-004: Buscar usuário por ID inexistente
```
Pré-condição: ID 9999 não existe
Ação: GET /usuarios/9999
Resultado Esperado:
  - Status: 404
  - Mensagem: "Não há nenhum usuário com o id correspondente"
```

#### TC-U-005: Criar usuário com dados válidos
```
Pré-condição: Nenhuma
Ação: POST /usuarios
Body: {
  "nome": "João Silva",
  "senha": "senha123",
  "cargo": "VENDAS"
}
Resultado Esperado:
  - Status: 201
  - Response contém o usuário criado com ID gerado
  - Message: "Usuário cadastrado com sucesso!"
  - Usuário aparece ao listar
```

#### TC-U-006: Criar usuário com cargo inválido
```
Pré-condição: Nenhuma
Ação: POST /usuarios
Body: {
  "nome": "Maria",
  "senha": "pass456",
  "cargo": "GERENTE"
}
Resultado Esperado:
  - Status: 500 ou 400 (erro do banco por constraint)
  - Usuário não é criado
```

#### TC-U-007: Criar usuário sem campo obrigatório
```
Pré-condição: Nenhuma
Ação: POST /usuarios
Body: {
  "nome": "Ana",
  "cargo": "ADMIN"
}
Resultado Esperado:
  - Status: 500 ou erro de banco de dados
  - Usuário não é criado
```

#### TC-U-008: Atualizar usuário existente
```
Pré-condição: Usuário com id=1 existe
Ação: PUT /usuarios/1
Body: {
  "nome": "João Silva Atualizado",
  "senha": "novaSenha123",
  "cargo": "ADMIN"
}
Resultado Esperado:
  - Status: 200
  - Dados do usuário estão atualizados
  - Message: "Atualização de usuário feita com sucesso!"
```

#### TC-U-009: Atualizar usuário sem preencher todos os campos
```
Pré-condição: Usuário com id=1 existe
Ação: PUT /usuarios/1
Body: {
  "nome": "João"
}
Resultado Esperado:
  - Status: 400
  - Mensagem: "Por favor preencha todos os campos"
  - Usuário não é atualizado
```

#### TC-U-010: Deletar usuário existente
```
Pré-condição: Usuário com id=1 existe
Ação: DELETE /usuarios/1
Resultado Esperado:
  - Status: 200
  - Message: "Usuário deletado com sucesso!"
  - Usuário não aparece mais ao listar
```

#### TC-U-011: Deletar usuário inexistente
```
Pré-condição: ID 9999 não existe
Ação: DELETE /usuarios/9999
Resultado Esperado:
  - Status: 404
  - Mensagem: "Não há usuário para deletar"
```

---

### 4.2 Testes de Carros

#### TC-C-001: Listar todos os carros com sucesso
```
Pré-condição: Banco de dados possui pelo menos 2 carros
Ação: GET /carros
Resultado Esperado:
  - Status: 200
  - Response contém array com carros
  - Cada carro tem: id, modelo, cor, valor, ano
```

#### TC-C-002: Listar carros quando não há nenhum
```
Pré-condição: Tabela carros vazia
Ação: GET /carros
Resultado Esperado:
  - Status: 404
  - Mensagem: "Nenhum carro foi encontrado"
```

#### TC-C-003: Buscar carro por ID existente
```
Pré-condição: Carro com id=1 existe
Ação: GET /carros/1
Resultado Esperado:
  - Status: 200
  - Response: {data: {id, modelo, cor, valor, ano}, message: "Carro encontrado com sucesso!"}
```

#### TC-C-004: Buscar carro por ID inexistente
```
Pré-condição: ID 9999 não existe
Ação: GET /carros/9999
Resultado Esperado:
  - Status: 404
  - Mensagem: "Não foi possível encontrar o carro"
```

#### TC-C-005: Criar carro com dados válidos
```
Pré-condição: Nenhuma
Ação: POST /carros
Body: {
  "modelo": "Honda Civic",
  "cor": "Preto",
  "valor": 85000.00,
  "ano": 2023
}
Resultado Esperado:
  - Status: 201
  - Response contém o carro criado com ID gerado
  - Message: "Carro cadastrado com sucesso!"
  - Carro aparece ao listar
```

#### TC-C-006: Criar carro com valor negativo
```
Pré-condição: Nenhuma
Ação: POST /carros
Body: {
  "modelo": "Toyota",
  "cor": "Azul",
  "valor": -50000,
  "ano": 2022
}
Resultado Esperado:
  - Status: 201 (aceito se não houver regra de validação de valores negativos no backend)
```

#### TC-C-007: Criar carro sem campo obrigatório
```
Pré-condição: Nenhuma
Ação: POST /carros
Body: {
  "modelo": "BMW",
  "cor": "Vermelho"
}
Resultado Esperado:
  - Status: 404 ou 400
  - Mensagem: "Por favor preencha todos os campos"
  - Carro não é criado
```

#### TC-C-008: Atualizar carro existente
```
Pré-condição: Carro com id=1 existe
Ação: PUT /carros/1
Body: {
  "modelo": "Honda Civic 2024",
  "cor": "Branco",
  "valor": 95000.00,
  "ano": 2024
}
Resultado Esperado:
  - Status: 200
  - Dados do carro estão atualizados
  - Message: "O carro foi editado com sucesso!"
```

#### TC-C-009: Atualizar carro sem preencher todos os campos
```
Pré-condição: Carro com id=1 existe
Ação: PUT /carros/1
Body: {
  "modelo": "Honda"
}
Resultado Esperado:
  - Status: 400 ou 404
  - Mensagem: "O carro não foi encontrado" ou erro de campos vazios
```

#### TC-C-010: Deletar carro existente
```
Pré-condição: Carro com id=1 existe
Ação: DELETE /carros/1
Resultado Esperado:
  - Status: 200
  - Message: "O carro foi excluído com sucesso"
  - Carro não aparece mais ao listar
```

#### TC-C-011: Deletar carro inexistente
```
Pré-condição: ID 9999 não existe
Ação: DELETE /carros/9999
Resultado Esperado:
  - Status: 404
  - Mensagem: "O carro não foi encontrado"
```

---

## 5. CASOS DE TESTE - FRONTEND

### 5.1 Autenticação e Registro de Usuários - Frontend

#### TC-FE-U-001: Carregar formulário de Login
- **Pré-condição**: Aplicação iniciada na rota raiz (`/`)
- **Ação**: Visualizar a tela inicial
- **Resultado Esperado**:
  - Formulário com os campos de E-mail, Senha e botão de "Entrar" é exibido corretamente.
  - Link de "Cadastre-se" para abrir o modal de cadastro.

#### TC-FE-U-002: Tentar Login com informações inválidas
- **Pré-condição**: Tela de login aberta
- **Ação**: 
  1. Digitar e-mail ou senha incorretos.
  2. Clicar em "Entrar".
- **Resultado Esperado**:
  - Alerta de erro (Toast) indicando "Credenciais inválidas".
  - O usuário permanece na página de login.

#### TC-FE-U-003: Login realizado com sucesso
- **Pré-condição**: Tela de login aberta e conta existente
- **Ação**:
  1. Inserir credenciais válidas.
  2. Clicar em "Entrar".
- **Resultado Esperado**:
  - Redirecionamento bem-sucedido para a rota `/dashboard`.
  - Exibição da página principal com cabeçalho, SideMenu e barra superior.

#### TC-FE-U-004: Abrir Modal de Cadastro de Usuário
- **Pré-condição**: Tela de login aberta
- **Ação**: Clicar no link "Cadastre-se"
- **Resultado Esperado**:
  - Abre o modal contendo o formulário de criação de usuário.
  - Campos vazios: Nome, E-mail, Senha, Confirmar Senha e Cargo (Select: VENDAS ou ADMIN).

#### TC-FE-U-005: Validar Senhas divergentes no Cadastro
- **Pré-condição**: Modal de cadastro aberto
- **Ação**:
  1. Preencher Nome, E-mail e Cargo.
  2. Preencher Senha e Confirmar Senha com valores diferentes.
  3. Clicar em "Criar Usuário".
- **Resultado Esperado**:
  - Mensagem de erro em tela "As senhas não correspondem".
  - O modal permanece aberto e o cadastro não é efetuado.

#### TC-FE-U-006: Cadastrar novo usuário com sucesso
- **Pré-condição**: Modal de cadastro aberto
- **Ação**:
  1. Preencher todos os campos com dados válidos e senhas idênticas.
  2. Clicar em "Criar Usuário".
- **Resultado Esperado**:
  - Novo usuário criado no banco de dados.
  - O modal é fechado e exibe-se uma notificação de sucesso.

#### TC-FE-U-007: Efetuar Logout da sessão
- **Pré-condição**: Usuário autenticado e no painel interno
- **Ação**: Clicar no botão "Sair" na barra lateral/superior
- **Resultado Esperado**:
  - Limpeza dos dados de sessão e tokens no localStorage.
  - Redirecionamento imediato para a página de login raiz (`/`).

---

### 5.2 Gestão de Carros e Navegação - Frontend

#### TC-FE-C-001: Carregar página de carros
- **Pré-condição**: Usuário autenticado
- **Ação**: Navegar para `/carros`
- **Resultado Esperado**:
  - Página carrega sem erros de requisição.
  - Tabela com colunas Modelo, Cor, Valor (Moeda BRL formatada) e Ano é exibida com todos os dados.

#### TC-FE-C-002: Exibir mensagem quando o estoque está vazio
- **Pré-condição**: Sem carros cadastrados no banco
- **Ação**: Acessar o Dashboard ou a página `/carros`
- **Resultado Esperado**:
  - Exibição de mensagem informativa "Nenhum carro encontrado" ou tabela vazia.

#### TC-FE-C-003: Abrir detalhes de um veículo
- **Pré-condição**: Pelo menos um carro existente na lista
- **Ação**: Clicar em "Ver detalhes" em algum veículo da lista
- **Resultado Esperado**:
  - Abertura de modal de detalhes flutuante (`DetailsModal` / `CarDetails`).
  - Apresentação completa das especificações (Modelo, Ano, Cor, Valor formatado).
  - Exibição do botão apropriado ("Contatar" para VENDAS ou "Excluir" para ADMIN).

#### TC-FE-C-004: Adicionar novo carro (Apenas Admin)
- **Pré-condição**: Usuário autenticado com cargo `ADMIN` no painel `/admin`
- **Ação**:
  1. Clicar em "Cadastrar Carro".
  2. Preencher formulário de dados válidos.
  3. Clicar em "Salvar".
- **Resultado Esperado**:
  - Modal é fechado.
  - Toast de sucesso "Carro cadastrado com sucesso!" é exibido.
  - Listagem e contadores (Carros e Valor Agregado) atualizam instantaneamente.

#### TC-FE-C-005: Validar formulário de carro no cadastro (Apenas Admin)
- **Pré-condição**: Modal de cadastro de veículo aberto no `/admin`
- **Ação**: Tentar salvar deixando campos obrigatórios em branco
- **Resultado Esperado**:
  - Exibição de toast de aviso "Por favor, preencha todos os campos."
  - O veículo não é registrado.

#### TC-FE-C-006: Editar carro existente (Apenas Admin)
- **Pré-condição**: Usuário autenticado com cargo `ADMIN` no painel `/admin`
- **Ação**:
  1. Clicar no botão "Editar" na linha do veículo.
  2. Alterar qualquer valor no formulário (ex: cor ou modelo).
  3. Confirmar alteração.
- **Resultado Esperado**:
  - Modal fecha.
  - Informações editadas aparecem refletidas na tabela e nos detalhes.
  - Mensagem de sucesso "Carro editado com sucesso!".

#### TC-FE-C-007: Excluir carro com confirmação (Apenas Admin)
- **Pré-condição**: Usuário autenticado com cargo `ADMIN` no painel `/admin`
- **Ação**:
  1. Clicar no botão "Excluir" na linha do veículo.
  2. Confirmar exclusão no modal de segurança.
- **Resultado Esperado**:
  - Registro de veículo é excluído do banco.
  - Removido da listagem imediatamente.
  - Toast de sucesso "Carro excluído com sucesso!" é exibido.

---

### 5.3 Segurança e Proteção de Acesso - Frontend

#### TC-FE-SEC-001: Bloquear acesso de visitantes (Não Logados)
- **Pré-condição**: Usuário deslogado
- **Ação**: Tentar acessar rotas privadas como `/dashboard`, `/carros` ou `/admin` diretamente via URL
- **Resultado Esperado**:
  - O componente `PrivateRoute` intercepta o acesso.
  - O navegador é redirecionado para a tela de login raiz (`/`).

#### TC-FE-SEC-002: Impedir Vendedores de acessar Painel Admin
- **Pré-condição**: Usuário logado com cargo `VENDAS`
- **Ação**: Tentar digitar a URL `/admin` diretamente
- **Resultado Esperado**:
  - O componente redireciona o vendedor de volta para `/dashboard`.
  - Exibe um alerta de erro em Toast informando: "Acesso negado. Apenas administradores podem acessar esta página."

---

## 6. Testes de Integração

#### TC-INT-001: Fluxo completo de usuário - Create, Read, Update, Delete
```
Pré-condição: Nenhuma
Ação:
  1. Criar novo usuário via POST /usuarios
  2. Buscar usuário via GET /usuarios/:id
  3. Atualizar usuário via PUT /usuarios/:id
  4. Deletar usuário via DELETE /usuarios/:id
  5. Tentar buscar usuário deletado
Resultado Esperado:
  - Todas as operações retornam status correto
  - Cada operação reflete na próxima
  - GET final retorna 404
```

#### TC-INT-002: Fluxo completo de carro - Create, Read, Update, Delete
```
Pré-condição: Nenhuma
Ação:
  1. Criar novo carro via POST /carros
  2. Buscar carro via GET /carros/:id
  3. Atualizar carro via PUT /carros/:id
  4. Deletar carro via DELETE /carros/:id
  5. Tentar buscar carro deletado
Resultado Esperado:
  - Todas as operações retornam status correto
  - Cada operação reflete na próxima
  - GET final retorna 404
```

#### TC-INT-003: Frontend - Criar e listar carro
```
Pré-condição: Aplicação iniciada, página de dashboard aberta
Ação:
  1. Login com conta ADMIN
  2. Acessar Painel do Administrador (/admin)
  3. Clicar em "Cadastrar Carro", preencher formulário e salvar
  4. Verificar lista de carros no dashboard e na página /carros
Resultado Esperado:
  - Carro é cadastrado com sucesso e aparece imediatamente nas tabelas e listas
```

---

## 7. Testes de Performance

#### TC-PERF-001: Listar 1000 usuários
```
Pré-condição: Banco contém 1000 usuários
Ação: GET /usuarios
Resultado Esperado:
  - Resposta em menos de 2 segundos
  - Todos os dados retornam corretamente
```

#### TC-PERF-002: Listar 1000 carros
```
Pré-condição: Banco contém 1000 carros
Ação: GET /carros
Resultado Esperado:
  - Resposta em menos de 2 segundos
  - Todos os dados retornam corretamente
```

---

## 8. Testes de Segurança (Recomendações)

#### TC-SEC-001: SQL Injection na busca por ID
```
Pré-condição: Nenhuma
Ação: GET /usuarios/1' OR '1'='1
Resultado Esperado:
  - Retorna erro ou dados apenas do ID 1
  - NÃO retorna todos os usuários (atual: usa prepared statements, então está seguro)
```

#### TC-SEC-002: Validação de Cargo
```
Pré-condição: Nenhuma
Ação: POST /usuarios com cargo="INVALID"
Resultado Esperado:
  - Erro de constraint ou validação
  - Usuário não é criado
```

---

## 9. Histórico de Melhorias e Ajustes Realizados

### Backend
1. **Rota de Carros Corrigida (Resolvido)**: Os endpoints de carros foram movidos da rota base `/usuarios/carros` para a rota base correta `/carros` (conforme `server.js` e `routes/cars.js`).
2. **Método PUT de Usuários Corrigido (Resolvido)**: O método PUT em `/usuarios/:id` agora recebe e atualiza corretamente as informações de usuário (`nome`, `senha`, `cargo`) em vez dos parâmetros de veículo.
3. **Padronização das Mensagens de Erro (Resolvido)**: As respostas de erro do backend foram padronizadas para retornar objetos JSON uniformes com `{ message, error }`.
4. **Validação de Dados no Backend (Resolvido)**: Implementada validação básica de campos obrigatórios no nível do serviço antes de persistir dados no repositório.
5. **Autenticação e Segurança (Resolvido)**: Implementado e integrado o `authMiddleware` que valida os tokens JWT (`ACCESS` e `REFRESH`) nos cabeçalhos das requisições.

### Frontend
1. **Tratamento de Erros e Toasts**: Utiliza `react-toastify` para exibir feedbacks de sucesso e erro instantâneos.
2. **Loading States**: Adicionados states de carregamento na listagem e ações do formulário.
3. **Responsividade**: Layout responsivo com Tailwind CSS (v4), adaptando-se a telas mobile e desktop.
4. **Controle de Acesso por Cargo**: Proteção de rotas com `PrivateRoute` e controle no painel de administração (`Admin`), limitando ações com base no cargo do usuário (`ADMIN` ou `VENDAS`).
5. **Counters Visualmente Atraentes**: Counters integrados com o tema (cor `bg-cyan-700` e ícones adequados).

---

## 10. Checklist de Implementação

### Backend
- [x] Corrigir rota de carros
- [x] Corrigir método PUT de usuários
- [x] Implementar validação de dados
- [x] Padronizar respostas de erro
- [x] Adicionar autenticação e autorização
- [ ] Adicionar logs estruturados
- [ ] Documentar API com Swagger/OpenAPI

### Frontend
- [x] Criar estrutura de componentes
- [x] Implementar páginas de listagem
- [x] Implementar formulários de CRUD
- [x] Adicionar validações de formulário
- [x] Adicionar tratamento de erros
- [x] Implementar loading states
- [x] Adicionar paginação (no visualizador de modelos)
- [x] Testes automatizados (Jest/React Testing Library no Backend)
- [x] Testes E2E (Playwright no Frontend)

