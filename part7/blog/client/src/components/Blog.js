import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = () => {
    updateBlog({
      ...blog,
      likes: blog.likes + 1,
    })
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
      deleteBlog(blog)
  }

  const allowRemove = (blogUserId) => {
    const user = blogService.getUserInfo()
    return blogUserId === user.id
  }

  return (
    <div style={blogStyle}>
      <div>
        <p className="title">
          {blog.title}{' '}
          <button className="show-more" onClick={toggleVisibility}>
            view
          </button>
        </p>
        <p className="author">{blog.author}</p>
      </div>
      {visible && (
        <div className="extra-info">
          <p>{blog.url}</p>
          <p>
            likes <span className="likes">{blog.likes}</span>{' '}
            <button className="like" onClick={addLike}>
              like
            </button>
          </p>
          {allowRemove(blog.user.id) && (
            <button
              className="remove"
              style={{
                backgroundColor: 'blue',
                color: 'white',
                cursor: 'pointer',
              }}
              onClick={handleRemove}
            >
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
