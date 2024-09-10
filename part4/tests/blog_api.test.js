const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

describe('When there is some blogs saved', () => {

  beforeEach(async () => {
      await Blog.deleteMany({})
      // be carefull here with promise!
      // for loop guarantees an excecurion order
      for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
      }
    })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })


  test('all blogs are returned', async () => {

      const response = await api.get('/api/blogs')
      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })
    
  test('an specific blog is within the returned blogs', async () => {

      const response = await api.get('/api/blogs')
      const contents = response.body.map(e => e.title)
      assert(contents.includes("React patterns"))
    })


  describe('viewing a specific blog', () => {

    test('succeeds with a valid id', async () => {

        const response = await api.get('/api/blogs')
        const keys = Object.keys(response.body[0])
        // console.log("Keys: ", keys)
        assert(keys.includes('id'))
      })

    })


  describe('addition of a new blog', () => {

    test('succeeds with a valid data', async () => {
      const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'el edu',
        url: 'http://www.diegomaradona.com',
        likes: 1000,
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
      const response = await api.get('/api/blogs')
      const contents = response.body.map(r => r.title)
      assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
      assert(contents.includes('async/await simplifies making async calls'))
      
    })

    test('a blog without likes are defaulted to cero', async () => {
      const newBlog = {
        title: 'Defaulting values for request',
        author: 'edu edu',
        url: 'http://www.queen.com',
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
      const response = await api.get('/api/blogs')

      const likes = response.body[2].likes

      // console.log("MyBlog", likes)
      assert.strictEqual(likes, 0)
    })

    test('missing title or url tests fails with code 400', async () => {
      const newBlog = {
        author: 'eduardo daniel',
        likes:12
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })
  })

  describe('deletion of a blog', () => {

    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

      const contents = blogsAtEnd.map(r => r.title)
      assert(!contents.includes(blogToDelete.title))
    })
  })

  describe('updating a blog', () => {

    test('succeeds changing the likes number of a block', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      //console.log("Before: ", blogToUpdate)
      blogToUpdate.likes = 111
      //console.log("After: ", blogToUpdate)

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)

      const UpdatedBlog = await helper.blogsInDb()
      assert.strictEqual(UpdatedBlog[0].likes, 111)
    })
  })

})

after(async () => {
    await mongoose.connection.close()
})

