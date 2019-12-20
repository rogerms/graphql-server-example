//@ts-check
const { createTestClient } = require('apollo-server-testing');
const { ApolloServer, gql } = require('apollo-server-express');
const expect = require('chai').expect
const typeDefs = require('./schema');
const resolvers = require('./resolvers');


const GET_BOOKS = gql`
  query  {
    books {
      author
    }
  }`;

const GET_BOOK = gql`
  query bookBy($id: Int!) {
    bookById(id: $id) {
      id
      name
      email
      phone
    }
  }`;

const GET_EMPLOYEE = gql`
query employees($id: Int!) {
  employees(id: $id) {
    name
    salary
    companyId
  }
}`;

const GET_COMPANIES = gql`
query company($id: Int) {
  companies(id: $id)  {
    name
    employees {
      name
    }
  }
}`;

describe('Test Books queries and mutations ', () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({ }),
    context: () => ({ user: { id: 1, email: 'a@a.a' } }),
  });

  const { query, mutation } = createTestClient(server);

  after(function() {
    //todo find a way to stop server after done
    return server.stop();
  
  });

  it('fetches one book', async () => {
    // use the test server to create a query function
    

    const res = await query({ query: GET_BOOK, variables: { id: 1 } });
    // console.log("id ", res.data.bookById.id);
    expect(res.data.bookById).is.a('object');
    expect(res.data.bookById.id).eq(1);
  });

  it('fetches all books', async () => {
    // use the test server to create a query function

    // run query against the server and snapshot the output
    const res = await query({ query: GET_BOOKS });
    // console.log(res);
    expect(res.data.books).is.a('array');
    expect(res.data.books).has.length.greaterThan(1);
  });

  it('fetches employee', async () => {
    // use the test server to create a query function

    // run query against the server and snapshot the output
    const res = await query({ query: GET_EMPLOYEE, variables: {id: 5} } );
    
    // console.log(res);
    expect(res.data.employees).is.a('array');
    expect(res.data.employees).has.length.greaterThan(0);
  });

  it('fetches companies', async () => {
    // use the test server to create a query function

    // run query against the server and snapshot the output
    const res = await query({ query: GET_COMPANIES, variables: {id: 11} } );
    //console.log(res.data.companies);

    expect(res.data.companies).is.a('array');
    expect(res.data.companies).has.length.greaterThan(0);
    expect(res.data.companies[0].employees).is.a('array');
  });
});


