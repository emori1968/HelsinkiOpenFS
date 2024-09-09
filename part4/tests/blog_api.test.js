const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const Blog = require('../models/blog')

const supertest = require('supertest')
const app = require('../app')
var assert = require('assert')

const api = supertest(app)

const initialBlogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5
    },]

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
  })



test('there are two blogs', async () => {

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length)
  })
  
test('the first blog is about React patterns', async () => {

    const response = await api.get('/api/blogs')
    const contents = response.body.map(e => e.title)
    assert(contents.includes("React patterns"))
  })

test('the blog identifier is "id" ', async () => {

    const response = await api.get('/api/blogs')
    const keys = Object.keys(response.body[0])
    assert(keys.includes('id'))
  })

test('a valid blog can be added ', async () => {
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
    assert.strictEqual(response.body.length, initialBlogs.length + 1)
    assert(contents.includes('async/await simplifies making async calls'))
    
  })

after(async () => {
    await mongoose.connection.close()
  })


