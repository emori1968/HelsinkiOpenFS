const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())

const mongoose = require('mongoose')

// const app = require('./app') // la aplicación Express real
const config = require('./utils/config')
const logger = require('./utils/logger')

const Blog = require('./models/blog')

// const Blog = mongoose.model('Blog', blogSchema)

mongoose.connect(config.MONGODB_URI)

// now routers are in controllers/blog modules
const blogsRouter = require('./controllers/blogs')
const { requestLogger } = require('./utils/middleware')

// here blogsRouter receive the path, router only connects from root  "/"   or "/id:"
app.use('/api/blogs', blogsRouter)

//Adding middleware
const middleware = require('./utils/middleware')
app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

/*  No more necesary, the magic "use" method make it available from app. I think this is "una cagada"
app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

*/


app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
