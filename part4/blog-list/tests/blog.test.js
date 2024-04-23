const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')
const Blog = require('../models/blog')

const api = supertest(app)

const initialData = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  }  
]

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let i = 0; i < initialData.length; i++) {
    let blogObject = new Blog(initialData[i])
    await blogObject.save()
  }
})

test('blogs are returned as a JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are five blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialData.length)
})

test('blog id is formatted correctly', async () => {
  const response = await api.get('/api/blogs')

  const ids = response.body.map(e => e.id)
  for (let id of ids) {
    assert.notEqual(id, null)
  }
})

test('HTTP POST creates a new blog', async () => {
  const newBlog = {
    title: "test blog",
    author: "test123",
    url: "example.com",
    likes: 321,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialData.length + 1)
})

test('blog is deleted correctly', async () => {
  const response = await api.get('/api/blogs')

  let blogId = response.body[0].id

  await api
    .delete(`/api/blogs/${blogId}`)
    .expect(204)

    const response2 = await api.get('/api/blogs')

    assert.strictEqual(response2.body.length, initialData.length - 1)
})

test('HTTP PUT updates the given blog', async () => {
  const response = await api.get('/api/blogs')
  let blogId = response.body[0].id

  const newBlog = {
    title: "test blog",
    author: "test123",
    url: "example.com",
    likes: 321,
  }

  await api
    .put(`/api/blogs/${blogId}`)
    .send(newBlog)

  const response2 = await api.get(`/api/blogs/${blogId}`)

  assert.strictEqual(response2.body.title, newBlog.title)
  assert.strictEqual(response2.body.likes, newBlog.likes)
})

after(async () => {
  await mongoose.connection.close()
})