'use strict';

const TABLE_NAME = 'accounts'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(TABLE_NAME, {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      userId: { type: Sequelize.INTEGER, allowNull: false },
      label: { type: Sequelize.STRING },
      accountType: { type: Sequelize.ENUM('checking', 'savings') },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false },
      updatedAt: { type: Sequelize.DATE },
    }).then(() => {
      queryInterface.addIndex(TABLE_NAME, ['userId'])
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable(TABLE_NAME)
  }
};
