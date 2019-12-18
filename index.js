
//@ts-check
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const {getContact} = require('./database');
const typeDefs = require('./schema');
const db = require('./dbConnection');



const getBookById = async (parent, args) => {
  const queryStr = `SELECT * FROM contacts WHERE id=${args.id}`;
  console.log(queryStr);
  return getContact(args);
}


// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.


const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
    book: () =>  books[0],
    bookById: getBookById
  },
};


// const server = new ApolloServer({ typeDefs, resolvers });
// server.listen().then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });

//shema, resolvers
const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
});


const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);