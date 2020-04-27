'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Records', 'CategoryId', {
      type: Sequelize.INTEGER,
      reference: {
        model: 'Categories',
        key: 'id',
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Records', 'CategoryId');
  }
};
