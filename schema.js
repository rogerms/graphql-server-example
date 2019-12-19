const { gql } = require('apollo-server-express');

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

  input ContactInput {
    name: String!
    company: String
    notes: String
    email: String
    phone: String
    street: String
    city: String
    state: String
    zip: String,
    region: String
    website: String
    location: String
  }

  type Company {
    name: String
  }
  
  type Employee {
    name: String
    designation: String
    salary: String
    companyId: String
    createdAt: String
    updatedAt: String
  }
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book],
    book: Book
    bookById(id:Int!):Contact
    companies: [Company]
    employees(id:Int): [Employee]
  }

  type Mutation {
    createContact(input: ContactInput!):Contact
  }
`;

module.exports = typeDefs; 