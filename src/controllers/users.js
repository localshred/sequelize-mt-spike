const R = require('ramda')
const Bluebird = require('bluebird')

const index = (req, res, next) => {
  return res.locals.db.models.User
    .findAll()
    .then(res.json.bind(res))
    .catch(next)
}

const create = (req, res, next) => {
  const User = res.locals.db.models.User
  const params = R.pick(['firstName', 'lastName'], req.body)
  return User
    .create(params)
    .then(res.json.bind(res))
    .catch(next)
}

const destroy = (req, res, next) => {
  return res.locals.db.models.User
    .destroy({ where: { id: req.params.id } })
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
  return res.locals.db.models.User
    .findOne({ where: { id: req.params.id } })
    .then((user) => {
      if (user) {
        res.json(user)
      } else {
        res.sendStatus(404)
      }
    })
    .catch(next)
}

const update = (req, res, next) => {
  const User = res.locals.db.models.User
  const params = R.pick(['firstName', 'lastName'], req.body)

  return User
    .update(params, { where: { id: req.params.id }, limit: 1 })
    .then(([updatedCount]) => {
      console.log({ updatedCount })
      if (updatedCount === 1) {
        return User
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
  create,
  destroy,
  index,
  show,
  update,
}

