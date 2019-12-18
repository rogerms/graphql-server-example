//@ts-check
const {getContact, books} = require('./database');



const getBookById = async (parent, args) => {
  const queryStr = `SELECT * FROM contacts WHERE id=${args.id}`;
  console.log(queryStr);
  return getContact(args);
}

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