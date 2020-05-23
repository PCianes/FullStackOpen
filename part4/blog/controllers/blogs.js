const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()

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
