'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [{
      name: 'Housing',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Transportation',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Entertainment',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Food',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Others',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
