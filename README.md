# Teste de TMS

Projeto feito para um teste técnico de competências no contexto de desenvolvimento web.

Feito utilizando Angular para o front-end e Laravel no back-end.

## Funcionalidades

- CRUD de motoristas.
- CRUD de ordens de transporte.
- Dashboard com indicadores sobre o estado da aplicação.
- Validações de formulários em front-end e de payloads em back-end.

## Execução do projeto

Requisitos do projeto:

- v24.11.0
- Angular v21
- PHP v8.5.3
- Composer v2.9.5

Este documento assume que o usuário clonou o repositório do jeito como está:
```sh
git clone https://github.com/arturfabriciohahaedgy/teste-tms-artur-f.git
cd teste-tms-artur-f/
```

### Back-end

1. Instalar dependências do NPM:
```sh
cd backend/
npm install && npm run build
```

2. Configurar .env (o arquivo de exemplo também pode ser encontrado em .env-backend-example)
```sh
APP_NAME=TMS
APP_ENV=local
APP_DEBUG=true
APP_URL=

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

DB_CONNECTION=mysql
DB_HOST=
DB_PORT=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=

VITE_APP_NAME="${APP_NAME}"
```

3. Executar as migrations e seeders:
```sh
php artisan migrate
php artisan db:seed
```

4. Executar o back-end:
```sh
composer run dev
```

### Front-end

1. Instalar dependências do NPM:
```sh
cd backend/
npm install
```

2. Verificar se o arquivo `src/environments/environment.ts` está com a rota condizente ao back:
```ts
export const environment = {
  apiUrl: 'https://' // SUA ROTA AQUI
};
```

3. Executar o front-end
```sh
npm run start
```

## Assets utilizados

- Ícone SVG do caminhão: https://freepngimg.com/icon/9571-truck-delivered
