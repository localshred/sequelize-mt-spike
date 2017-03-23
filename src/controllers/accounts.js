const R = require('ramda')
const Bluebird = require('bluebird')
const ValidationError = require('sequelize').ValidationError

const wrapGetUser = (fn) => [(req, res, next) => {
  res.locals.user = null
  res.locals.db.models.User
    .findOne({ where: { id: req.params.userId } })
    .then((user) => {
      if (user) {
        res.locals.user = user
        next()
      } else {
        res.sendStatus(404)
      }
    })
    .catch(next)
}, fn]

const index = (req, res, next) => {
  return res.locals.user.getAccounts()
    .then(res.json.bind(res))
    .catch(next)
}

const create = (req, res, next) => {
  const Account = res.locals.db.models.Account

  const params = R.pipe(
    R.pick(['label', 'accountType']),
    R.assoc('userId', req.params.userId)
  )(req.body)

  return Account.create(params)
    .then(res.json.bind(res))
    .catch((error) => {
      res.status(400)
      if (R.is(ValidationError, error)) {
        res.json(R.pick(['message', 'errors'], error))
      } else {
        res.json(R.pick(['message'], error))
      }
      next()
    })
}

const destroy = (req, res, next) => {
  return res.locals.db.models.Account
    .destroy({ where: { userId: req.params.userId, id: req.params.id } })
    .then((destroyCount) => {
      if (destroyCount === 1) {
        res.sendStatus(204)
      } else {
        res.sendStatus(404)
      }
    })
    .catch((error) => {
      console.log(error.message)
      res.status(400)
      res.json({
        id: req.params.id,
        deleted: false,
        message: error.message
      })
    })
}

const show = (req, res, next) => {
  return user
    .getAccount({ where: { id: req.params.id } })
    .then((account) => {
      if (account) {
        res.json(account)
      } else {
        res.sendStatus(404)
      }
    })
    .catch(next)
}

const update = (req, res, next) => {
  const Account = res.locals.db.models.Account
  const params = R.pick(['label', 'accountType'], req.body)

  return Account
    .update(params, { where: { userId: req.params.userId, id: req.params.id }, limit: 1 })
    .then(([updatedCount]) => {
      if (updatedCount === 1) {
        return Account
          .findOne({ where: { id: req.params.id } })
          .then(res.json.bind(res))
          .catch(next)
      } else {
        return Bluebird.resolve(res.sendStatus(404))
      }
    })
    .catch(next)
}

module.exports = {
  create: wrapGetUser(create),
  destroy: wrapGetUser(destroy),
  index: wrapGetUser(index),
  show: wrapGetUser(show),
  update: wrapGetUser(update),
}


