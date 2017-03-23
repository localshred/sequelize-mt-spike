const dbConnect = require('../db')
const path = require('path')
const R = require('ramda')

const models = {
  user: '../models/user'
}

const loadTenantModels = R.memoize((tenant) => {
  const sequelize = dbConnect(tenant)

  // Import all models
  R.pipe(
    R.values,
    R.map((relativePath) => path.join(__dirname, relativePath)),
    R.forEach(R.bind(sequelize.import, sequelize))
  )(models)

  // Load model associations
  R.forEach(
    (model) => model.loadAssociations(),
    sequelize.models
  )

  return sequelize
})

const db = (req, res, next) => {
  console.log('===================')
  const tenant = R.pathOr('default', ['query', 'tenant'], req)
  const sequelize = loadTenantModels(tenant)

  res.locals.tenant = tenant
  res.locals.db = sequelize
  console.log({ models: res.locals.db.models })

  next()
  console.log('^^^^^^^^^^^^^^^^^^^^^^^^^')
}

module.exports = db
