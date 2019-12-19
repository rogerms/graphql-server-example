//@ts-check
const {getContact, books} = require('./database');
const Company = require('./models').Company;
const Employee = require('./models').Employee;



const getBookById = async (parent, args) => {
  const queryStr = `SELECT * FROM contacts WHERE id=${args.id}`;
  console.log(queryStr);
  return getContact(args);
}

const getCompanies = async (parent, args) => {
  const companies = await Company.findAll();
  console.log(companies);

  return companies
}

const getEmployees = async (parent, args) => {
  const filter = (args.id)? {where: {id: args.id}}: {};
  const employees = await Employee.findAll(filter);
  return employees
}



// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
    book: () =>  books[0],
    bookById: getBookById,
    companies: getCompanies,
    employees: getEmployees
  },
};

module.exports = resolvers;