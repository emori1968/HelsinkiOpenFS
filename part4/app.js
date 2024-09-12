const express = require('express')
require('express-async-errors')
const app = express()



// for front end running in at different address
const cors = require('cors')


const middleware = require('./utils/middleware')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const logger = require('./utils/logger')
const config = require('./utils/config')

const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

  // front end compilation
app.use(cors())
app.use(express.static('dist'))

app.use(express.json())  // not working to show body at cli
app.use(middleware.requestLogger)

// get,post added to app
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app