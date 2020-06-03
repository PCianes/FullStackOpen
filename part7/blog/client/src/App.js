import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, addBlog } from './reducers/blogsReducer'
import { setSuccessMessage, setErrorMessage } from './reducers/messageReducer'
import { setUser, userLogout } from './reducers/userReducer'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'

import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const message = useSelector((state) => state.message)
  const currentUser = useSelector((state) => state.user)
  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(setUser())
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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
    dispatch(userLogout())
  }

  const padding = { padding: 5 }

  const match = useRouteMatch('/users/:id')
  const userBlogs = match
    ? blogs.filter((blog) => blog.user.id === match.params.id)
    : null

  return (
    <div>
      <Link style={padding} to="/">
        Blogs
      </Link>
      <Link style={padding} to="/users">
        Users
      </Link>
      <Notification message={message} />
      <Switch>
        <Route path="/users/:id">
          <User blogs={userBlogs} />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <h2>blogs</h2>
          {currentUser === null ? (
            <LoginForm />
          ) : (
            <>
              <p>
                {currentUser.name} logged in{' '}
                <button onClick={handleLogout}>Logout</button>
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
        </Route>
      </Switch>
    </div>
  )
}

export default App
