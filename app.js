const express = require("express")
const {graphqlHTTP} = require("express-graphql")
const {buildSchema} = require("graphql")
const PORT = 3000;

const schema = buildSchema(`
  type Query {
    test: String
    result: String
    parametro(valor: String): Param
    user(id: ID!): User
    users: [User]
  }

  type User{
    id : ID
    nome : String
    idade: Int
  }

  type Param{
    valor: String
  }
`);

const mockUsers = [
  {id: 1, nome: "Thiago Souza", idade:200 },
  {id: 2, nome: "Amora", idade:250 },
  {id: 3, nome: "Pipoca", idade:250 },
  {id: 4, nome: "Logan", idade:250 },

]

// Define o resolver para o schema
const root = {
  test: () => {
    return 'Testando GraphQL!';
  },
  user: ({id}) => mockUsers.find(user => user.id == id),
  users: () => mockUsers,
  result: ()=>{
    return "Retornando o resultado."
  },
  parametro: ({valor}) => {
    return {valor: "Seu parametro é : " + valor}
  }
};

// Crie uma instância do Express
const app = express();

// Defina a rota /graphql e use o middleware express-graphql
app.use('/', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // Habilita a interface GraphiQL para testes
}));

//1º Exemplo de consulta
// {
//   users{
//       nome
//   }
// }

//2º Exemplo de consulta
// {
//   user(id:1){
//       idade
//   }
// }

app.listen(PORT, ()=>{
    console.log(`Servidor - GraphQL inicializado com sucesso! - http://localhost:${PORT}`)
})
