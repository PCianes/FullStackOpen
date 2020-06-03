import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, addBlog } from './reducers/blogsReducer'
import { setSuccessMessage, setErrorMessage } from './reducers/messageReducer'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const message = useSelector((state) => state.message)
  const [user, setUser] = useState(null)
  const blogFormRef = React.createRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      dispatch(setSuccessMessage(`Welcome ${user.name}`))
    } catch (error) {
      dispatch(setErrorMessage('wrong username or password'))
    }
  }

  const handleBlogForm = async (title, author, url) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(setSuccessMessage(`a new blog ${title} by ${author} added`))
      dispatch(addBlog(title, author, url))
    } catch (error) {
      dispatch(setErrorMessage(`a new blog ${title} by ${author} NOT added`))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <>
          <p>
            {user.name} logged in <button onClick={handleLogout}>Logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <h2>create new</h2>
            <BlogForm handleBlogForm={handleBlogForm} />
          </Togglable>
          <hr></hr>
          <div>
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Blog key={blog.id} blog={blog} />
              ))}
          </div>
        </>
      )}
    </div>
  )
}

export default App
