import React, { useEffect, useState } from 'react'
import blogService from '../services/blogs'
import { addLikeToBlog, deleteBlog, addComment } from '../reducers/blogsReducer'
import { setSuccessMessage, setErrorMessage } from '../reducers/messageReducer'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [allowRemove, setAllowRemove] = useState(false)

  useEffect(() => {
    const user = blogService.getUserInfo()
    const blogUser = blog.user.id || blog.user
    setAllowRemove(blogUser === user.id)
  }, [])

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

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        dispatch(
          setSuccessMessage(`blog ${blog.title} by ${blog.author} delete`)
        )
        dispatch(deleteBlog(blog.id))
        history.push('/')
      } catch (error) {
        dispatch(
          setErrorMessage(`blog ${blog.title} by ${blog.author} NOT deleted`)
        )
      }
    }
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    dispatch(addComment(blog.id, e.target.comment.value))
    e.target.comment.value = ''
  }

  return (
    <div>
      <h1 className="title">{blog.title} </h1>
      <div className="extra-info">
        <a href={blog.url}>{blog.url}</a>
        <p>
          <span className="likes">{blog.likes} likes</span>{' '}
          <button className="like" onClick={addLike}>
            like
          </button>
        </p>
        <p className="author">added by {blog.author}</p>
        {allowRemove && (
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
      <div className="comments">
        <h3>comments</h3>
        <form onSubmit={handleAddComment}>
          <input type="text" name="comment" />
          <button type="submit">add comment</button>
        </form>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Blog
