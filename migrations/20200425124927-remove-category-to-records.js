'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Records', 'category');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Records', 'category', {
      type: Sequelize.INTEGER,
    });
  }
};
