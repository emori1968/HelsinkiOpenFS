const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

/* same promise code as below
blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})
*/
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
  }
)


blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

blogsRouter.post('/', (request, response, next) => {
  const body = request.body
  let likes = 0

  if(body.likes != undefined) {
    likes = body.likes
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: likes
  })

  if (body.title != undefined && body.url != undefined) {
    blog.save()
    .then(savedBlog => {
      response.status(201).json(savedBlog)
    })
    .catch(error => next(error))
  } else {
    response.status(400).end()
  }

  })

  

blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body
  let likes = 0

  if(body.likes != undefined) {
    likes = body.likes
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: likes
  })

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter