const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  //get to test first user id
  const users = await User.find({})
  const userId = users[0]._id

  const user = await User.findById(userId)

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
