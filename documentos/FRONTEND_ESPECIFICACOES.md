# Frontend - Especificações Técnicas e Arquitetura Atual

Este documento descreve as especificações técnicas, arquitetura e componentes do frontend conforme implementado no projeto atual.

---

## 1. Stack Tecnológico Utilizado

O frontend é desenvolvido como uma Single Page Application (SPA) moderna, utilizando a seguinte infraestrutura:

*   **React 19+**: Biblioteca principal para construção da interface baseada em componentes reativos.
*   **Vite**: Ferramenta de build, empacotamento e servidor de desenvolvimento ágil.
*   **React Router 7 (`react-router`)**: Gerenciamento de rotas e navegação interna da aplicação.
*   **Tailwind CSS (v4)**: Framework de estilização utilitária com integração nativa no Vite (`@tailwindcss/vite`).
*   **React Toastify**: Componente de notificações em tela (toasts) para feedback imediato das ações.
*   **Axios**: Cliente HTTP para comunicação e consumo da API backend.
*   **React Icons**: Biblioteca de ícones utilitários (ícones Lucide, FontAwesome, IonIcons, Material Design).
*   **JWT Decode**: Utilitário para decodificar o token de acesso obtido na autenticação.
*   **Playwright**: Framework de automação de testes ponta a ponta (E2E).

---

## 2. Estrutura de Pastas Atual

A estrutura do diretório `frontend/src/` é organizada da seguinte forma:

```
frontend/src/
├── assets/             # Arquivos de mídia e imagens estáticas
├── components/         # Componentes globais e reutilizáveis
│   ├── CarDetails/     # Detalhes do veículo selecionado
│   ├── CarModel/       # Catálogo/listagem de modelos (modal paginado)
│   ├── CarsList/       # Listagem interativa com barra de busca rápida
│   ├── CustomModal/    # Modal geral customizado
│   ├── DetailsModal/   # Modal específico para visualização sob uma página
│   ├── LoginForm/      # Formulário de login com validações
│   ├── Modal/          # Componente modal de confirmação básico
│   ├── PrivateRoute/   # Guarda de rotas (redireciona não autenticados)
│   ├── RegisterUser/   # Formulário modal para cadastro de novos usuários
│   ├── SideMenu/       # Barra lateral colapsável com links dinâmicos
│   └── counters/       # Indicadores estatísticos
│       ├── AggregatedValueCounter/ # Contador de valor total de estoque
│       └── CarCounter/             # Contador de carros cadastrados
├── contexts/           # Estado global compartilhado
│   └── AuthContext.jsx # Provedor de autenticação e sessão de usuário
├── layouts/            # Estrutura base de páginas
│   └── DashboardLayout.jsx # Layout principal com SideMenu integrado
├── pages/              # Telas da aplicação
│   ├── Admin/          # Painel do administrador (CRUD de veículos)
│   ├── Carros/         # Listagem tabular de carros para vendedores
│   ├── Dashboard/      # Visão geral, counters e lista de carros
│   └── Login/          # Tela de login e registro de usuários
├── services/           # Comunicação com a API do backend
│   └── api.js          # Configuração básica do Axios com interceptor de tokens
├── index.css           # Estilos globais e injeção do Tailwind CSS
└── main.jsx            # Ponto de entrada da aplicação e roteamento
```

---

## 3. Roteamento e Controle de Acesso

As rotas são declaradas centralizadamente no `main.jsx` usando o roteador dinâmico do `react-router`:

*   **Públicas**:
    *   `/` (Tela de Login e Cadastro)
*   **Privadas** (envoltas pelo layout base `DashboardLayout` e protegidas pelo `PrivateRoute`):
    *   `/dashboard`: Painel principal.
    *   `/carros`: Visualização tabular simples de carros.
    *   `/carros/:id`: Visualização de detalhes em um modal flutuante.
    *   `/admin`: Painel administrativo com controle total (disponível apenas para contas de cargo `ADMIN`).

---

## 4. Descrição das Telas e Componentes

### 4.1 Login e Registro (`pages/Login`)
Gerencia o formulário de login e permite acionar o modal para criação de novos usuários (`RegisterUser`). Ao entrar com sucesso, os tokens JWT (`tokenAcesso` e `tokenRefresh`) e dados do usuário são persistidos no `localStorage` por meio do `AuthContext`.

### 4.2 Dashboard (`pages/Dashboard`)
Apresenta o painel principal:
1.  **Counters (`components/counters/`)**:
    *   **Carros**: Quantidade de veículos em estoque.
    *   **Valor Agregado**: Soma do valor monetário de todos os veículos cadastrados.
    *   *Nota de Estilo*: Ambos utilizam ícones destacados envoltos por um fundo na cor `bg-cyan-700` e texto branco para consistência de design.
2.  **Ação Modelos**: Um terceiro card contendo um botão para abrir o catálogo paginado de modelos de carros em estoque (`CarModel`).
3.  **Lista de Veículos (`CarsList`)**: Renderiza a listagem de todos os carros ativos com filtro de pesquisa rápida e link para visualizar detalhes.

### 4.3 Listagem de Carros (`pages/Carros`)
Página de visualização simplificada apresentando os carros em formato de tabela (Modelo, Cor, Valor formatado em BRL e Ano).

### 4.4 Painel do Administrador (`pages/Admin`)
Painel restrito a administradores que permite realizar operações de CRUD (Criar, Ler, Atualizar, Deletar) nos veículos:
*   Exibe os counters e atalhos rápidos.
*   Tabela interativa com busca de veículos e botões para **Editar** e **Excluir**.
*   **Modais**: Formulário de veículo (com máscara em tempo real para o campo Valor) e modal de confirmação de exclusão.

---

## 5. Serviços e Conectividade API

A comunicação externa é centralizada em `src/services/api.js`. O Axios é configurado para adicionar automaticamente o token JWT de acesso nos cabeçalhos (`Authorization: Bearer <tokenAcesso>`) obtido do armazenamento local:

```javascript
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('tokenAcesso')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

export default api
```

---

## 6. Autenticação e Guarda de Rotas (`contexts/AuthContext.jsx`)

O contexto expõe estados de usuário, operações de sessão (`login`, `logout`, `checkLogin`) e a flag `isAdmin`.
*   **Verificação de Cargo (`getCargo`)**: O cargo do usuário é resolvido decodificando o campo `cargo` do JWT (`ACCESS` token) via `jwt-decode`.
*   **Guarda de Rota**: Se um usuário comum (cargo `VENDAS`) tentar acessar `/admin`, ele é impedido por uma verificação interna no componente `Admin` e redirecionado de volta para `/dashboard` com um feedback de toast de erro.

---

## 7. Testes Automatizados E2E

A aplicação conta com uma suíte de testes de ponta a ponta estruturada no Playwright (`frontend/tests/e2e/auth.spec.js`), que valida:
1.  **Validação de formulários de registro**: Erro quando as senhas no cadastro divergem.
2.  **Feedback de credenciais incorretas**: Tratamento e toast de erro quando a API de autenticação falha (status 401).
3.  **Fluxo de autenticação completo**: Redirecionamento correto para `/dashboard` e renderização do painel ao logar com sucesso.
