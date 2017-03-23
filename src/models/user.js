module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User',
   {
     firstName: { type: DataTypes.STRING },
     lastName: { type: DataTypes.STRING },
   },
   {
     tableName: 'users'
   }
  )

  User.loadAssociations = (models) => {
    models.User.hasMany(models.Account)
  }

  return User
}
