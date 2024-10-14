## Product Microservice

## DEV - Initial configuration 

- Clone repository:
  ```
  $ git clone https://github.com/NestJS-Microservices-Personal/products.git
  ```
- Install dependencies:
  ```bash
  $ pnpm install
  ```
- Create file ".env" copy file ".env.template".

- Execute Prisma migration:
  ```bash
  $ npx prisma migrate dev
  ```
- watch mode:
  ```bash
  $ pnpm run start:dev
  ```

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```