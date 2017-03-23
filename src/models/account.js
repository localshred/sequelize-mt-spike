const ACCOUNT_TYPES = ['checking', 'savings']

module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        references: {
          model: 'User',
          foreignKey: 'id'
        },
      },
      label: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      accountType: {
        type: DataTypes.ENUM,
        values: ACCOUNT_TYPES,
        allowNull: false,
        validate: {
          isIn: [ACCOUNT_TYPES],
        },
      },
    },
    {
      tableName: 'accounts'
    }
  )

  Account.loadAssociations = (models) => {
    models.Account.belongsTo(models.User)
  }

  return Account
}
