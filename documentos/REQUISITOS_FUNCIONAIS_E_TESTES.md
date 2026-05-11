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
- **Endpoint**: `GET /usuarios/carros` *(Note: rota está em /usuarios conforme server.js)*
- **Campos Retornados**: id, modelo, cor, valor, ano
- **Critérios de Aceitação**:
  - Retornar status 200 quando há carros cadastrados
  - Retornar status 404 quando não há carros
  - Retornar lista vazia em formato JSON

#### RF-C2: Buscar Carro por ID
- **Descrição**: O sistema deve permitir buscar um carro específico pelo ID
- **Endpoint**: `GET /usuarios/carros/:id`
- **Campos Retornados**: {data: {id, modelo, cor, valor, ano}, message: "Carro encontrado com sucesso!"}
- **Critérios de Aceitação**:
  - Retornar status 200 com dados do carro quando ID existe
  - Retornar status 404 com mensagem de erro quando ID não existe

#### RF-C3: Criar Novo Carro
- **Descrição**: O sistema deve permitir cadastrar um novo carro
- **Endpoint**: `POST /usuarios/carros`
- **Campos Obrigatórios**: modelo (string), cor (string), valor (decimal), ano (integer)
- **Critérios de Aceitação**:
  - Retornar status 201 com dados do carro criado
  - Validar presença de todos os campos obrigatórios
  - Validar que valor é decimal positivo
  - Validar que ano é um número inteiro válido (1900-2100)

#### RF-C4: Atualizar Carro
- **Descrição**: O sistema deve permitir atualizar dados de um carro existente
- **Endpoint**: `PUT /usuarios/carros/:id`
- **Campos Atualizáveis**: modelo, cor, valor, ano
- **Critérios de Aceitação**:
  - Retornar status 200 com dados do carro atualizado
  - Validar que todos os campos foram preenchidos
  - Validar que o ID existe antes de atualizar
  - Validar tipos de dados

#### RF-C5: Deletar Carro
- **Descrição**: O sistema deve permitir deletar um carro
- **Endpoint**: `DELETE /usuarios/carros/:id`
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
Ação: GET /usuarios/carros
Resultado Esperado:
  - Status: 200
  - Response contém array com carros
  - Cada carro tem: id, modelo, cor, valor, ano
```

#### TC-C-002: Listar carros quando não há nenhum
```
Pré-condição: Tabela carros vazia
Ação: GET /usuarios/carros
Resultado Esperado:
  - Status: 404
  - Mensagem: "Não há nenhum usuário" (nota: mensagem incorreta no código)
```

#### TC-C-003: Buscar carro por ID existente
```
Pré-condição: Carro com id=1 existe
Ação: GET /usuarios/carros/1
Resultado Esperado:
  - Status: 200
  - Response: {data: {id, modelo, cor, valor, ano}, message: "Carro encontrado com sucesso!"}
```

#### TC-C-004: Buscar carro por ID inexistente
```
Pré-condição: ID 9999 não existe
Ação: GET /usuarios/carros/9999
Resultado Esperado:
  - Status: 404
  - Mensagem: "Não há nenhum carro com o id correspondente"
```

#### TC-C-005: Criar carro com dados válidos
```
Pré-condição: Nenhuma
Ação: POST /usuarios/carros
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
Ação: POST /usuarios/carros
Body: {
  "modelo": "Toyota",
  "cor": "Azul",
  "valor": -50000,
  "ano": 2022
}
Resultado Esperado:
  - Status: 201 (atualmente sem validação)
  - OU Status: 400 (se validação for implementada)
```

#### TC-C-007: Criar carro sem campo obrigatório
```
Pré-condição: Nenhuma
Ação: POST /usuarios/carros
Body: {
  "modelo": "BMW",
  "cor": "Vermelho"
}
Resultado Esperado:
  - Status: 500 ou erro de banco
  - Carro não é criado
```

#### TC-C-008: Atualizar carro existente
```
Pré-condição: Carro com id=1 existe
Ação: PUT /usuarios/carros/1
Body: {
  "modelo": "Honda Civic 2024",
  "cor": "Branco",
  "valor": 95000.00,
  "ano": 2024
}
Resultado Esperado:
  - Status: 200
  - Dados do carro estão atualizados
  - Message: "Atualização dos dados do carro feita com sucesso!"
```

#### TC-C-009: Atualizar carro sem preencher todos os campos
```
Pré-condição: Carro com id=1 existe
Ação: PUT /usuarios/carros/1
Body: {
  "modelo": "Honda"
}
Resultado Esperado:
  - Status: 400
  - Mensagem: "Por favor preencha todos os campos"
  - Carro não é atualizado
```

#### TC-C-010: Deletar carro existente
```
Pré-condição: Carro com id=1 existe
Ação: DELETE /usuarios/carros/1
Resultado Esperado:
  - Status: 200
  - Message: "Carro deletado com sucesso!"
  - Carro não aparece mais ao listar
```

#### TC-C-011: Deletar carro inexistente
```
Pré-condição: ID 9999 não existe
Ação: DELETE /usuarios/carros/9999
Resultado Esperado:
  - Status: 404
  - Mensagem: "Não há carro para deletar"
```

---

## 5. CASOS DE TESTE - FRONTEND

### 5.1 Testes de Usuários - Frontend

#### TC-FE-U-001: Carregar página de usuários
```
Pré-condição: Aplicação iniciada
Ação: Navegar para /usuarios
Resultado Esperado:
  - Página carrega sem erros
  - Tabela de usuários é exibida
  - Dados são carregados do backend
```

#### TC-FE-U-002: Exibir mensagem quando não há usuários
```
Pré-condição: Banco vazio
Ação: Navegar para /usuarios
Resultado Esperado:
  - Mensagem "Nenhum usuário cadastrado" é exibida
  - Tabela vazia
```

#### TC-FE-U-003: Abrir modal de novo usuário
```
Pré-condição: Página de usuários aberta
Ação: Clicar no botão "Adicionar Usuário"
Resultado Esperado:
  - Modal abre com formulário
  - Campos vazios: Nome, Senha, Cargo
  - Botões: Salvar, Cancelar
```

#### TC-FE-U-004: Criar novo usuário com validação
```
Pré-condição: Modal de novo usuário aberto
Ação:
  1. Deixar campo Nome vazio e clicar Salvar
  2. Preencher Nome, deixar Senha vazia e clicar Salvar
  3. Preencher todos os campos corretamente
  4. Clicar Salvar
Resultado Esperado:
  - Etapas 1-2: Mensagens de validação aparecem
  - Etapa 4: Usuário criado, modal fecha, tabela atualiza
```

#### TC-FE-U-005: Cancelar criação de usuário
```
Pré-condição: Modal de novo usuário aberto com dados preenchidos
Ação: Clicar botão "Cancelar"
Resultado Esperado:
  - Modal fecha
  - Dados não são salvos
  - Tabela permanece inalterada
```

#### TC-FE-U-006: Editar usuário existente
```
Pré-condição: Usuário com id=1 existe na tabela
Ação:
  1. Clicar botão "Editar" na linha do usuário
  2. Modal abre com dados preenchidos
  3. Alterar nome
  4. Clicar "Atualizar"
Resultado Esperado:
  - Modal abre com dados corretos
  - Modal fecha após atualizar
  - Tabela mostra novo nome
```

#### TC-FE-U-007: Deletar usuário com confirmação
```
Pré-condição: Usuário com id=1 existe na tabela
Ação:
  1. Clicar botão "Deletar" na linha
  2. Modal de confirmação aparece
  3. Clicar "Confirmar"
Resultado Esperado:
  - Modal de confirmação é exibido
  - Usuário é removido da tabela após confirmação
  - Mensagem de sucesso aparece
```

#### TC-FE-U-008: Cancelar exclusão de usuário
```
Pré-condição: Modal de confirmação de exclusão aberto
Ação: Clicar botão "Cancelar"
Resultado Esperado:
  - Modal fecha
  - Usuário permanece na tabela
```

---

### 5.2 Testes de Carros - Frontend

#### TC-FE-C-001: Carregar página de carros
```
Pré-condição: Aplicação iniciada
Ação: Navegar para /carros
Resultado Esperado:
  - Página carrega sem erros
  - Tabela de carros é exibida
  - Valores são exibidos em moeda (R$)
```

#### TC-FE-C-002: Exibir mensagem quando não há carros
```
Pré-condição: Banco vazio
Ação: Navegar para /carros
Resultado Esperado:
  - Mensagem "Nenhum carro cadastrado" é exibida
  - Tabela vazia
```

#### TC-FE-C-003: Adicionar novo carro
```
Pré-condição: Modal de novo carro aberto
Ação:
  1. Preencher todos os campos com dados válidos
  2. Clicar "Salvar"
Resultado Esperado:
  - Carro criado no backend
  - Modal fecha
  - Carro aparece na tabela
  - Mensagem de sucesso exibida
```

#### TC-FE-C-004: Validar campos ao criar carro
```
Pré-condição: Modal de novo carro aberto
Ação:
  1. Deixar Modelo vazio e clicar Salvar
  2. Digitar valor negativo
  3. Digitar ano fora do intervalo válido
Resultado Esperado:
  - Mensagens de validação aparecem
  - Carro não é criado
```

#### TC-FE-C-005: Editar carro existente
```
Pré-condição: Carro com id=1 existe na tabela
Ação:
  1. Clicar botão "Editar"
  2. Alterar valor do carro
  3. Clicar "Atualizar"
Resultado Esperado:
  - Modal abre com dados do carro
  - Novo valor aparece na tabela
```

#### TC-FE-C-006: Deletar carro com confirmação
```
Pré-condição: Carro com id=1 existe na tabela
Ação:
  1. Clicar botão "Deletar"
  2. Modal de confirmação aparece
  3. Clicar "Confirmar"
Resultado Esperado:
  - Carro removido da tabela
  - Mensagem de sucesso exibida
```

#### TC-FE-C-007: Formatar valores em moeda
```
Pré-condição: Carros com valores na tabela
Ação: Verificar formatação dos valores
Resultado Esperado:
  - Valores exibidos como "R$ 85.000,00"
  - Formatação mantida ao adicionar novo carro
```

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
  1. Criar novo carro via POST /usuarios/carros
  2. Buscar carro via GET /usuarios/carros/:id
  3. Atualizar carro via PUT /usuarios/carros/:id
  4. Deletar carro via DELETE /usuarios/carros/:id
  5. Tentar buscar carro deletado
Resultado Esperado:
  - Todas as operações retornam status correto
  - Cada operação reflete na próxima
  - GET final retorna 404
```

#### TC-INT-003: Frontend - Criar e listar usuário
```
Pré-condição: Aplicação iniciada, página de usuários aberta
Ação:
  1. Abrir modal de novo usuário
  2. Preencher e salvar
  3. Verificar tabela
Resultado Esperado:
  - Usuário aparece imediatamente na tabela
  - Dados correspondem ao enviado
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
Ação: GET /usuarios/carros
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

## 9. Observações e Problemas Encontrados

### Backend
1. **Rota de Carros em Path Errado**: Carros estão em `/usuarios` em vez de `/carros`
   - Linha em `server.js`: `app.use("/usuarios", carrosRoute)`
   - Recomendação: Mudar para `app.use("/carros", carrosRoute)`

2. **Método PUT em Usuários Atualiza Carros**: O método PUT em usuários recebe parametros de carros (modelo, cor, valor, ano)
   - Recomendação: Corrigir para receber nome, senha, cargo

3. **Mensagens de Erro Inconsistentes**: Algumas rotas retornam strings, outras objetos
   - Recomendação: Padronizar respostas de erro

4. **Falta de Validação**: Não há validação de dados no backend
   - Recomendação: Implementar validação antes de salvar

5. **Endpoints sem Autenticação**: Não há controle de acesso baseado em cargo
   - Recomendação: Implementar middleware de autenticação e autorização

### Frontend (A Ser Implementado)
1. **Tratamento de Erros**: Implementar feedback visual para erros
2. **Loading States**: Adicionar spinners enquanto carrega dados
3. **Paginação**: Considerar implementar para grandes volumes
4. **Responsividade**: Garantir funcionamento em mobile

---

## 10. Checklist de Implementação

### Backend
- [ ] Corrigir rota de carros
- [ ] Corrigir método PUT de usuários
- [ ] Implementar validação de dados
- [ ] Padronizar respostas de erro
- [ ] Adicionar autenticação e autorização
- [ ] Adicionar logs estruturados
- [ ] Documentar API com Swagger/OpenAPI

### Frontend
- [ ] Criar estrutura de componentes
- [ ] Implementar páginas de listagem
- [ ] Implementar formulários de CRUD
- [ ] Adicionar validações de formulário
- [ ] Adicionar tratamento de erros
- [ ] Implementar loading states
- [ ] Adicionar paginação
- [ ] Testes automatizados (Jest/React Testing Library)
- [ ] Testes E2E (Cypress/Playwright)

