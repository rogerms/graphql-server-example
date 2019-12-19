module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Companies', [
      {
        name: 'Target',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Walmart',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Amazon',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Companies', null, {});
  }
};