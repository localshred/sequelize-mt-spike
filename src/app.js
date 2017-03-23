const bodyParser = require('body-parser')
const dbMiddleware = require('./middleware/db')
const express = require('express')

const homeController = require('./controllers/home')
const usersController = require('./controllers/users')

const router = express.Router()
router.get('/users', usersController.index)
router.post('/users', usersController.create)
router.get('/', homeController.root)

const app = express()
app.use(dbMiddleware)
app.use(bodyParser.json())
app.use(router)
app.listen(3000)
