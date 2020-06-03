import React, { useState } from 'react'
import blogService from '../services/blogs'
import { addLikeToBlog, deleteBlog } from '../reducers/blogsReducer'
import { setSuccessMessage, setErrorMessage } from '../reducers/messageReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = () => {
    try {
      dispatch(addLikeToBlog(blog))
      dispatch(
        setSuccessMessage(
          `new like to blog ${blog.title} by ${blog.author} added`
        )
      )
    } catch (error) {
      dispatch(
        setErrorMessage(
          `a new like to blog ${blog.title} by ${blog.author} NOT added`
        )
      )
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        dispatch(
          setSuccessMessage(`blog ${blog.title} by ${blog.author} delete`)
        )
        dispatch(deleteBlog(blog.id))
      } catch (error) {
        dispatch(
          setErrorMessage(`blog ${blog.title} by ${blog.author} NOT deleted`)
        )
      }
    }
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
