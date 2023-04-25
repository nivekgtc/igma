## Description

A aplicação foi feita de maneira simples

- Prisma para o ORM
- Utilizado SWC para ter testes até 70x mais rápidos
- Escolhi não implementar o repositório por a aplicação ser simples, mas deixei isso validado
- Utilizado faker para geração de cpfs e nomes aleatórios
- Escolhi não realizar a criação de um banco de dados de teste para manter a aplicação simples (mas isso seria algo que poderia ser implementado)
- Swagger para documentação
- Para manter a simplicidade eu não criei endpoint nem de edição, deleção ou criação múltipla


## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Used libs

## Stay in touch

- Author - [Kevin Cavalcanti](https://linkedin.com/in/kevin-cavalcanti)

## License

Nest is [MIT licensed](LICENSE).


## Running app

Para rodar a aplicação é necessário ter o docker compose instalado


- Só basta rodar o seguinte comando para iniciar o banco de dados
```shell
  docker compose up -d
```

- Após iniciar o banco de dados você pode usar o seguinte comando
```shell
  yarn start:igma
```
Este comando acima irá rodar as migrations e iniciar a aplicação