const fs = require('fs')
const rfs = require('rotating-file-stream')
const express = require('express')
const exprhbs = require('express-handlebars')
const helpers = require('handlebars-helpers')
const load = require('express-load')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const morgan = require('morgan')
const config = require('./config')

const app = express()

module.exports = () => {
  app.set('config', config)

  app.engine('.hbs', exprhbs.create({
    extname: '.hbs',
    helpers: helpers(),
    defaultLayout: 'default',
    layoutsDir: 'app/views/layouts',
    partialsDir: 'app/views/partials'
  }).engine)
  app.set('views', 'app/views')
  app.set('view engine', '.hbs')
  app.use((req, res, next) => {
    res.locals.config = config
    next()
  })

  app.use(helmet.hidePoweredBy({setTo: 'Happy Kittens'}))
  app.use(helmet.xframe())
  app.use(helmet.xssFilter())
  app.use(helmet.nosniff())

  app.use(morgan(config.morgan.type, config.morgan.opts))

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(cookieParser())

  app.use('/static', express.static('tmp'))

  load('models', { cwd: 'app' })
    .then('controllers')
    .then('routes')
    .into(app)

  return app
}
