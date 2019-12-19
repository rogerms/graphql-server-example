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
});