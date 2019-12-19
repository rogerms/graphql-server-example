module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    const employees = await queryInterface.sequelize.query(
      `SELECT id from Employees;`
    );

    const companyid = employees[0].id;

    return queryInterface.bulkInsert('Employees', [{
        name: 'John Doe',
        designation: 1,
        salary: '10500',
        companyId: companyid,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Mary Jane',
        designation: 1,
        salary: '19500',
        companyId: companyid,
        createdAt: new Date(),
        updatedAt: new Date(),
        
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Employees', null, {});
  }
};