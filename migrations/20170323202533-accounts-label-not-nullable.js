'use strict';

const TABLE_NAME = 'accounts'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(TABLE_NAME, 'label', {
      type: Sequelize.STRING,
      allowNull: false
    }).then(() => {
      return queryInterface.changeColumn(TABLE_NAME, 'accountType', {
        type: Sequelize.ENUM('checking', 'savings'),
        allowNull: false
      })
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(TABLE_NAME, 'label', {
      type: Sequelize.STRING,
      allowNull: true
    }).then(() => {
      return queryInterface.changeColumn(TABLE_NAME, 'accountType', {
        type: Sequelize.ENUM('checking', 'savings'),
        allowNull: true
      })
    })
  }
};
