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

blogsRouter.post('/:id/comments', async (request, response) => {
  const requestBlog = await Blog.findById(request.params.id)
  requestBlog.comments = requestBlog.comments.concat(request.body.comment)
  requestBlog.save()
  response.status(requestBlog ? 200 : 404).json(requestBlog)
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
  const token = request.token
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blogId = request.params.id
  const blog = await Blog.findById(blogId)

  if (blog.user.toString() === decodedToken.id.toString()) {
    await Blog.deleteOne({ _id: blogId })
    response.sendStatus(204)
  } else {
    response.status(403).json({ error: 'forbidden: invalid user' })
  }
})

module.exports = blogsRouter
