const db = require('./dbConnection');


dbQuery = (sql) => {
  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) reject(err);
      console.log(results[0]);
      resolve(results[0]);
    });
  });
};

exports.getContact = ({ id }) => {
    let sql = `SELECT * FROM contacts WHERE id = ?`;
    sql = db.format(sql, [id]);
    return dbQuery(sql);
};

exports.books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

//note
//good example on how to create models

// module.exports = {
//   createUser ({ username, password }) {
//     console.log(`Add user ${username} with password ${password}`)
//     return Promise.resolve()
//   }
// }