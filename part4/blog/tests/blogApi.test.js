const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const api = supertest(app)
let token

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('123456', 10)
  const user = new User({
    username: 'admin',
    name: 'admin',
    passwordHash,
  })
  const savedUser = await user.save()
  const userForToken = {
    username: savedUser.username,
    id: savedUser._id,
  }
  token = jwt.sign(userForToken, config.SECRET)

  for (let blog of helper.initialBlogs) {
    blog.user = savedUser._id
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map((blog) => blog.title)

    expect(titles).toContain('Go To Statement Considered Harmful')
  })

  test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
    expect(response.body[0]._id).toBe(undefined)
  })
})

describe('add blogs to database', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsInDb.map((blog) => blog.title)
    expect(titles).toContain('Type wars')
  })

  test('blog without likes is added with 0 likes', async () => {
    const newBlogZeroLikes = {
      author: 'Robert C. Martin',
      title: 'Type wars',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlogZeroLikes)
      .expect(201)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length + 1)

    const likes = blogsInDb.map((blog) => blog.likes)
    expect(likes).toContain(0)
  })

  test('blog without title is not added', async () => {
    const newBlogEmptyTitle = {
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlogEmptyTitle)
      .expect(400)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length)
  })

  test('blog without url is not added', async () => {
    const newBlogEmptyUrl = {
      author: 'Robert C. Martin',
      title: 'Type wars',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlogEmptyUrl)
      .expect(400)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length)
  })

  test('if token is not provided blog is not added', async () => {
    const newBlog = {
      author: 'Robert C. Martin',
      title: 'Type wars',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    }

    await api.post('/api/blogs').send(newBlog).expect(401)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length)
  })
})

describe('change blogs on database', () => {
  test('deleting a single blog post resource', async () => {
    const blogsInDb = await helper.blogsInDb()
    const someBlog = blogsInDb[0]

    await api
      .delete(`/api/blogs/${someBlog.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const updateBlogsInDb = await helper.blogsInDb()
    expect(updateBlogsInDb).toHaveLength(helper.initialBlogs.length - 1)
  })

  test('add one like to a blog', async () => {
    const blogsInDb = await helper.blogsInDb()
    const someBlog = blogsInDb[0]
    const beforeLikes = someBlog.likes
    someBlog.likes = beforeLikes + 1

    await api.put(`/api/blogs/${someBlog.id}`).send(someBlog).expect(200)

    const updateBlogsInDb = await helper.blogsInDb()
    const someBlogUpdated = updateBlogsInDb[0]

    expect(someBlogUpdated.likes).toBe(beforeLikes + 1)
  })

  test('change title of some blog', async () => {
    const blogsInDb = await helper.blogsInDb()
    const someBlog = blogsInDb[0]
    someBlog.title = 'New Awesome Title'

    await api.put(`/api/blogs/${someBlog.id}`).send(someBlog).expect(200)

    const updateBlogsInDb = await helper.blogsInDb()
    const someBlogUpdated = updateBlogsInDb[0]

    expect(someBlogUpdated.title).toBe('New Awesome Title')
  })

  test('not update wrong blog id', async () => {
    const blogsInDb = await helper.blogsInDb()
    const someBlog = blogsInDb[0]
    const randomWrongId = '2384rhjfnw23'

    await api.put(`/api/blogs/${randomWrongId}`).send(someBlog).expect(404)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
