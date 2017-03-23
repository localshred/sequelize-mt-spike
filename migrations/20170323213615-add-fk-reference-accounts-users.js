'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn('accounts', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE',
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn('accounts', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    })
  }
};
