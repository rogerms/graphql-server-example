//@ts-check
const {getContact} = require('./database');



const getBookById = async (parent, args) => {
  const queryStr = `SELECT * FROM contacts WHERE id=${args.id}`;
  console.log(queryStr);
  return getContact(args);
}

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

module.exports = resolvers;