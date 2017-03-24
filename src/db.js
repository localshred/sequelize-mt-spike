const config = require('config')
const R = require('ramda')
const Sequelize = require('sequelize')

const ENV = R.pathOr('development', ['env', 'NODE_ENV'], process)
const dbName = (tenant) => `enrollment_tenant_${tenant}_${ENV}`

module.exports = R.memoize(
  R.pipe(
    dbName,
    R.construct(Sequelize)(
      R.__,
      config.db.username,
      config.db.password,
      {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
      }
    )
  )
)
