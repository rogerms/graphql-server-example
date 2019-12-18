
//@ts-check
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const {getContact} = require('./database');
const db = require('./dbConnection');



const getBookById = async (parent, args) => {
  const queryStr = `SELECT * FROM contacts WHERE id=${args.id}`;
  console.log(queryStr);
  return getContact(args);
}


// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    "the name by the library"
    title: String
    "Last name, First name"
    author: String
  }

  type Contact {
    id: Int
    name: String
    company: String
    notes: String,
    email: String,
    phone: String
    street: String
    city: String
    state: String
    zip: String,
    region: String
    website: String
    formatted_address: String
    location: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book],
    book: Book
    bookById(id:Int!):Contact
  }
`;

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