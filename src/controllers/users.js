const R = require('ramda')

const index = (req, res, next) => {
  res.locals.db.models.User
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

module.exports = {
  create,
  index
}

