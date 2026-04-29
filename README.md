# FinCtrl - Controle suas Finanças

Projeto fullstack de controle financeiro pessoal. Backend em Node.js e Frontend em Angular.

## Pré-requisitos

- Node.js (v20+)
- npm
- Angular CLI: `npm i -g @angular/cli`
- Editor com suporte a ESLint (VS Code recomendado)

## Instalação

1. Clone o repositório:
   ```
   git clone https://github.com/meadow1773/financas-angular.git
   ```
2. Entre no diretório raiz:
   ```
   cd fin-ctrl
   ```
3. Instale dependências do monorepo:
   ```
   npm install
   ```

## Configuração Inicial

Crie o arquivo `.env` na raiz com variáveis do backend:
```
NODE_ENV='development'
NODE_VERSION='20.20.0'
SERVER_PORT=3000
DB_USER
DB_HOST
DB_NAME
DB_PASSWORD
DB_PORT
```

## Desenvolvimento

Inicie backend e frontend simultaneamente:

```
npm start
```

Ou use `node start.js` para orquestração customizada (inicia ambos com recarregamento). Acesse frontend em http://localhost:4200 e backend em http://localhost:3000.

## Scripts Úteis

- `npm run dev:backend`: Inicia backend.
- `npm run dev:frontend`: `ng serve` no frontend.
- `npm run lint`: ESLint em todo projeto: `eslint . --fix`.
- `npm run build`: Build unificado para produção

## Build para Produção

```
npm run build
```

Gera dist/ para frontend e backend compilado.
## ESLint

Configurado na raiz para backend e frontend. Rode `npm run lint` regularmente. Integre no VS Code para auto-fix.

## Estrutura

- `/backend`: API Node.js.
- `/frontend`: App Angular.
- `package.json` / `start.js`: Orquestração monorepo.
