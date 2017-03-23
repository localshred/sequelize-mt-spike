const ACCOUNT_TYPES = ['checking', 'savings']

module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
        references: {
          model: 'User',
          foreignKey: 'id'
        },
      },
      label: {
        type: DataTypes.STRING,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      accountType: {
        type: DataTypes.ENUM,
        values: ACCOUNT_TYPES,
        validate: {
          notNull: true,
          isIn: ACCOUNT_TYPES,
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
