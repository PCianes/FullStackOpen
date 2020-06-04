import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, addBlog } from './reducers/blogsReducer'
import { setSuccessMessage, setErrorMessage } from './reducers/messageReducer'
import { setUser } from './reducers/userReducer'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'

import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import Navigation from './components/Navigation'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import Container from '@material-ui/core/Container'
import './App.css'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    marginTop: '2rem',
  },
}))

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const message = useSelector((state) => state.message)
  const currentUser = useSelector((state) => state.user)
  const blogFormRef = React.createRef()
  const classes = useStyles()

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

  const matchUserId = useRouteMatch('/users/:id')
  const userBlogs = matchUserId
    ? blogs.filter((blog) => blog.user.id === matchUserId.params.id)
    : null

  const matchBlogId = useRouteMatch('/blogs/:id')
  const currentBlog = matchBlogId
    ? blogs.find((blog) => {
        return blog.id === matchBlogId.params.id
      })
    : null

  return (
    <>
      <Navigation />
      <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
        <Notification message={message} />
        <Switch>
          <Route path="/users/:id">
            <User blogs={userBlogs} />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/blogs/:id">
            <Blog blog={currentBlog} />
          </Route>
          <Route path="/">
            {currentUser === null ? (
              <LoginForm />
            ) : (
              <>
                <Togglable buttonLabel="new blog" ref={blogFormRef}>
                  <h2>create new</h2>
                  <BlogForm handleBlogForm={handleBlogForm} />
                </Togglable>
                <List
                  component="nav"
                  className={classes.root}
                  aria-label="mailbox folders"
                >
                  {blogs
                    .sort((a, b) => b.likes - a.likes)
                    .map((blog) => (
                      <>
                        <ListItem button>
                          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                        </ListItem>
                        <Divider />
                      </>
                    ))}
                </List>
              </>
            )}
          </Route>
        </Switch>
      </Container>
    </>
  )
}

export default App
