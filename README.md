# Ekki Service
Projeto backend que simula o serviço backend para um banco.

```npm install```
```npm start```

<br/>
<br/>

## Dependencies
O projeto roda na porta 3001 e está conectado a um banco MongoDB externo. Utiliza express para gerenciamento das rotas e o mongoose para conexão com o banco de dados.

## Endpoints
- POST `/api/user/create`
  Cria um novo usuário no banco.
  <pre>
    {
      name: STRING,
      cpf: STRING,
      phone: STRING,
    }
  </pre>
  
- GET `/api/user/list`
  Lista todas as entradas no banco
  <pre>
    [
      {
        name: name,
        cpf: cpf,
        phone: phone,
        favoredList: [],
        balance: 1000,
        credit: 0,
        creditLimit: 500,
        transactionHistory: []
      }
    ]
  </pre>

- GET `/api/user/:id`
  Busca os dados para usuário especificado nos parâmetros da request
  <pre>
    {
      name: name,
      cpf: cpf,
      phone: phone,
      favoredList: [],
      balance: 1000,
      credit: 0,
      creditLimit: 500,
      transactionHistory: []
    }
  </pre>
  
- POST `/api/user/favored`
  Cria um novo favorecido
  <pre>
    {
      originId: STRING,
      name: STRING,
      cpf: STRING,
      phone: STRING
    }
  </pre>
  
- DELETE `api/user/favored`
  Remove um usuário favorecido
  <pre>
    {
      originId: STRING,
      favoredId: STRING
    }
  </pre>

- POST `/api/transaction/new`
  Processa uma nova transação
  <pre>
    {
      origin: STRING,
      destiny: STRING
      value: NUMBER
    }
  </pre>
