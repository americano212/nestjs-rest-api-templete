# NestJS REST API templete
<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>
<p align="center">
NestJS REST API templete with TypeORM, Jest, OAuth, Logging, Swagger docs.
</p>

## Description
NestJS REST API templete(boilerplate) for quick start new project.

Support kakao & naver OAuth, common in korea.

Include example of CI/CD, deploy to AWS after testing. (by Github Actions)

## 🔧 Features
- [x] Database(TypeORM)
  - Support DB
  - [x] MySQL
  - [ ] Postgres
- [x] Seeding
- [x] Local Authentication
- [x] OAuth(Social Login)
  - [x] [Kakao](https://developers.kakao.com/docs/latest/ko/kakaologin/common)
  - [x] [Naver](https://developers.naver.com/products/login/api/api.md)
  - [x] [Google](https://developers.google.com/identity/protocols/oauth2)
  - [x] [Github](https://docs.github.com/v3/oauth)
- [x] Customizing user's roles(Admin, User...)
- [x] JWT Authorization
- [x] Slack Alert when throw ERROR
- [x] Logging(winston)
- [x] Swagger
- [x] Unit Test(Jest)
- [x] E2E Test
- [x] File upload
  - Support Cloud
  - [x] AWS S3
- [x] CI
- [x] Example Domain(Board with content)

<br/>

# 🔨 Getting started
## Configuration
```bash
# Create `.env` file with reference to `.env.example`
cp .env.example .env
```
- Especially, `SUPER_ADMIN` will be a master account by seeding, so please decide carefully.

## Init project
```bash
# 1. Install Nest CLI 
npm i -g @nestjs/cli
# 2. Install node_modules
npm ci
# 3. Setup databases by docker
npm run dev:docker:up
# 4. Load entity
npm run entity:sync
# 5. Seeding(Load Role with Super Admin)
npm run seed:run
```

## Development
- Set `NODE_ENV='development'` in `.env`
```bash
npm run start:dev
```

## Production
- Set `NODE_ENV='production'` in `.env`
```bash
npm start
```

## Test
- Test run on `Jest`.
- Template already contains an example of `unit` and `e2e` tests.

### Unit Test
```bash
# 1. Run unit test
npm run test:cov
# 2. If you debug during testing.
npm run test:debug
```

### End-to-End Test
```bash
# 1. Run E2E test auto mode
npm run test:e2e:auto
```

### Reset test DB
- Erase all data in test DB
```bash
# 1. Stop test DB running
npm run test:docker:down
# 2. Run new test DB
npm run test:docker:up
```

## Links

- Swagger: <http://localhost:8081/docs>

## Database utils

```bash
# 1. When project init, synchronize Entities to Database
npm run entity:sync
# 2. [Warning] When you need to erase ALL Database, DROP ALL Exist table.
npm run entity:drop
# 3. When project init, seeding data.(Roles, Super Admin)
npm run seed:run
# 4. [Warning] When you need to erase ALL Users with roles, DELETE ALL raws in user, role, user_role table.
npm run seed:revert
```
