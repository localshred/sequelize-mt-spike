const dbConnect = require('../db')
const path = require('path')
const R = require('ramda')

const models = {
  user: '../models/user'
}

const synchronizedTenantDbs = {}

const db = (req, res, next) => {
  console.log('[DB MIDDLEWARE START]')
  const tenant = R.pathOr('default', ['query', 'tenant'], req)
  console.log({ tenant })
  const sequelize = dbConnect(tenant)

  res.locals.tenant = tenant
  res.locals.db = sequelize
  R.pipe(
    R.values,
    R.map((relativePath) => path.join(__dirname, relativePath)),
    R.forEach(R.bind(sequelize.import, sequelize))
  )(models)

  console.log({ models: res.locals.db.models })

  if (!R.has(tenant, synchronizedTenantDbs)) {
    console.log('synchronizing connection')
    res.locals.db.sync()
    synchronizedTenantDbs[tenant] = true
  } else {
    console.log('skipping connection synchronize')
  }

  console.log('[DB MIDDLEWARE END]')
  next()
}

module.exports = db
