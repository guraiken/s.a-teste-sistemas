# Parte 1: Instalação e Configuração do Jest em Projeto Vite

## Objetivo

Nesta etapa, separei esse passo a passo pra que sempre que precisarem voces utilizem para se localizarem ou caso esquecam algum comando, vamos seguir utilizando:

- **Jest** como executor de testes;
- **React Testing Library** para testar componentes React;
- **Jest DOM** para facilitar asserções visuais no DOM;
- **Babel** para permitir que o Jest compreenda JSX, TypeScript e módulos modernos.

## Contexto importante

O **Vite** trabalha nativamente com **ES Modules (ESM)**, enquanto o **Jest**, em muitos projetos, ainda utiliza uma configuração baseada em **CommonJS**.

Por isso, precisamos criar uma ponte de transpilação usando o **Babel**. Essa configuração permite que o Jest consiga interpretar arquivos modernos como:

- `.js`
- `.jsx`
- `.ts`
- `.tsx`

---

# 1. Instalação das dependências

No terminal, dentro da pasta raiz do projeto Vite (aqui foi outro motivo de eu ter feito esse arquivo pra voces, essas partes de instalacao, eu não encontrei bonitinha em um lugar, então agrupei tudo aqui pra ficar mais facil), execute:

```bash
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/jest babel-jest @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript identity-obj-proxy
```

## O que cada pacote faz

| Pacote                        | Função                                                                         |
| ----------------------------- | ------------------------------------------------------------------------------ |
| `jest`                        | Executor de testes                                                             |
| `jest-environment-jsdom`      | Simula um ambiente de navegador para os testes                                 |
| `@testing-library/react`      | Permite testar componentes React pelo comportamento do usuário                 |
| `@testing-library/jest-dom`   | Adiciona matchers como `toBeInTheDocument()`                                   |
| `@testing-library/user-event` | Simula interações reais do usuário, como clique e digitação                    |
| `@types/jest`                 | Tipagens do Jest para projetos com TypeScript ou suporte de editor             |
| `babel-jest`                  | Integra o Babel ao Jest                                                        |
| `@babel/core`                 | Núcleo do Babel                                                                |
| `@babel/preset-env`           | Permite transpilar JavaScript moderno para o ambiente do Node usado nos testes |
| `@babel/preset-react`         | Permite transpilar JSX                                                         |
| `@babel/preset-typescript`    | Permite transpilar TypeScript, caso o projeto utilize `.ts` ou `.tsx`          |
| `identity-obj-proxy`          | Mocka arquivos CSS/SASS durante os testes                                      |

> Observação: o `identity-obj-proxy` evita erros quando componentes importam arquivos `.css`, `.scss`, `.sass` ou `.less`.

---

# 2. Criação dos arquivos de configuração

Crie os arquivos abaixo na estrutura indicada (esses arquivos sao arquivos de configuracao, semelhante ao que voces ja fizeram com jest.config.js).

## 2.1. Arquivo `babel.config.cjs`

Crie este arquivo na **raiz do projeto**:

```txt
babel.config.cjs
```

Conteúdo:

```js
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ],
};
```

## Para que serve?

Esse arquivo informa ao Jest como transformar o código antes de executar os testes.

Ele permite que o Jest entenda:

- JavaScript moderno;
- JSX;
- TypeScript, se existir no projeto.

---

## 2.2. Arquivo `jest.config.cjs`

Crie este arquivo na **raiz do projeto** (aqui é importante salientar que, dentro de setupFilesAfterEnv e moduleNameMapper, colocar as pastas corretas, pois aqui voce diz onde está seus arquivos pro jest.config, mas, vou deixar detalhada logo abaixo o que cada arquivo faz):

```txt
jest.config.cjs
```

Conteúdo:

```js
module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/src/__mocks__/fileMock.js",
  },
};
```

## Para que serve?

Esse arquivo configura o comportamento do Jest no projeto.

### `testEnvironment`

```js
testEnvironment: "jest-environment-jsdom";
```

Define que os testes irão rodar em um ambiente que simula o navegador.

Isso é necessário para testar componentes React que usam elementos como:

- `document`
- `window`
- `button`
- `input`
- `form`

### `setupFilesAfterEnv`

```js
setupFilesAfterEnv: ["<rootDir>/setupTests.js"];
```

Informa qual arquivo será carregado antes dos testes.

Esse arquivo será usado para importar configurações globais, como os matchers do `@testing-library/jest-dom`.

### `moduleNameMapper`

```js
moduleNameMapper: {
  "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/src/__mocks__/fileMock.js",
}
```

Evita que o Jest quebre quando encontrar importações de estilos ou arquivos estáticos.

Exemplo comum em componentes React:

```js
import "./App.css";
import logo from "./assets/logo.png";
```

O navegador e o Vite entendem esses arquivos, mas o Jest precisa de mocks para lidar com eles.

---

## 2.3. Arquivo `setupTests.js`

Crie este arquivo dentro da pasta `src`:

```txt
setupTests.js
```

Conteúdo:

```js
import "@testing-library/jest-dom";
```

## Para que serve?

Esse arquivo importa os matchers extras do Jest DOM.

Com isso, você pode usar comandos como:

```js
expect(element).toBeInTheDocument();
expect(button).toBeDisabled();
expect(input).toHaveValue("texto");
```

Esses comandos tornam os testes mais legíveis e mais próximos da forma como o usuário interage com a tela.

---

## 2.4. Arquivo `src/__mocks__/fileMock.js`

Crie a pasta e o arquivo abaixo:

```txt
src/__mocks__/fileMock.js
```

Conteúdo:

```js
module.exports = "test-file-stub";
```

## Para que serve?

Esse arquivo é usado quando o Jest encontra importações de imagens, fontes ou arquivos estáticos.

Exemplo:

```js
import logo from "./assets/logo.png";
```

Durante o teste, o Jest substituirá esse arquivo por uma string simples:

```txt
test-file-stub
```

Assim, o teste continua funcionando sem precisar carregar a imagem real.

---

# 3. Configuração do script de teste

Abra o arquivo `package.json` e localize a seção `scripts`.

Antes, pode estar assim (assim estava pra mim):

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

Adicione o script de teste:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "jest"
  }
}
```

Agora será possível rodar os testes com:

```bash
npm test
```

---

# 4. Configuração adicionais do ESLint para testes

Em alguns projetos, o teste funciona normalmente, mas o editor mostra erros como (o meu deu erro):

```txt
'describe' is not defined
'it' is not defined
'expect' is not defined
```

Isso acontece porque o **ESLint não sabe que esses nomes são globais do Jest**.

Se o projeto usa `eslint.config.js`, instale o pacote `globals`:

```bash
npm install -D globals
```

Depois, no `eslint.config.js`, adicione uma configuração específica para arquivos de teste:

```js
import globals from "globals";

export default [
  {
    files: ["tests/**/*.{js,jsx,ts,tsx}", "**/*.test.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
];
```

## Observação importante

Essa configuração pode precisar ser combinada com a configuração já existente do projeto.

A ideia principal é: arquivos de teste precisam conhecer os globais do Jest, como (o eslint nao "vê" as variaveis globais doo jest, precisamos dizer a ele isso):

- `describe`
- `it`
- `test`
- `expect`
- `beforeEach`
- `afterEach`

---

# 5. Teste rápido para validar a configuração

Crie um arquivo de teste simples:

```txt
src/functions/atv01.test.js
```

Conteúdo:

```js
function sum(a, b) {
  return a + b;
}

describe("sum", () => {
  it("should add two numbers", () => {
    expect(sum(2, 3)).toBe(5);
  });
});
```

Execute:

```bash
npm test
```

Se estiver tudo correto, o terminal deverá exibir um teste aprovado.

---

# 6. Estrutura final esperada

Após a configuração, o projeto deve ter uma estrutura parecida com esta:

```txt
projeto-vite/
├── babel.config.cjs
├── jest.config.cjs
├── package.json
├── setupTests.js
├── src/
│   ├── __mocks__/
│   │   └── fileMock.js
│   ├── App.jsx
│   └── main.jsx
└── tests/
    └── exemplo.test.js
```

---

# 7. Checklist final

Antes de seguir para os testes práticos, confirme:

- [ ] As dependências foram instaladas.
- [ ] O arquivo `babel.config.cjs` foi criado na raiz.
- [ ] O arquivo `jest.config.cjs` foi criado na raiz.
- [ ] O arquivo `setupTests.js` foi criado.
- [ ] O arquivo `src/__mocks__/fileMock.js` foi criado.
- [ ] O script `"test": "jest"` foi adicionado ao `package.json`.
- [ ] O comando `npm test` executa sem erro.
- [ ] O ESLint reconhece `describe`, `it` e `expect`, caso a configuração opcional tenha sido aplicada.

---

# 8. Problemas comuns

## Erro: `Cannot find module '<rootDir>/setupTests.js'`

Verifique se o arquivo realmente existe na raiz:

```txt
setupTests.js
```

Se o arquivo estiver em outro local do projeto, altere o `jest.config.cjs` para o local correto:

```js
setupFilesAfterEnv: ["<rootDir>/local_correto/outros_caminhos/setupTests.js"];
```

---

## Erro: `'describe' is not defined`

Esse erro normalmente vem do ESLint.

Solução recomendada:

- configurar `globals.jest` no `eslint.config.js`; ou
- importar manualmente no teste:

```js
import { describe, it, expect } from "@jest/globals";
```

---

## Erro ao importar CSS

Verifique se o `identity-obj-proxy` foi instalado e se o `moduleNameMapper` contém:

```js
"\\.(css|less|sass|scss)$": "identity-obj-proxy"
```

---

## Erro ao importar imagem

Verifique se o arquivo abaixo existe:

```txt
src/__mocks__/fileMock.js
```

E se ele contém:

```js
module.exports = "test-file-stub";
```

---
