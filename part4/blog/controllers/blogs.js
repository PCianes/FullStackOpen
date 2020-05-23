const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const token = request.token
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    ...request.body,
    user: user._id,
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = {
    ...request.body,
  }
  const savedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    updatedBlog,
    { new: true }
  )
  const codeStatus = savedBlog ? 200 : 404
  response.status(codeStatus).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.deleteOne({ _id: request.params.id })
  response.sendStatus(204)
})

module.exports = blogsRouter
