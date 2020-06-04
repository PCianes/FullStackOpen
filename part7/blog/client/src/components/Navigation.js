import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userLogout } from '../reducers/userReducer'
import { useHistory } from 'react-router-dom'

const padding = { padding: 5 }

const Navigation = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.user)
  const history = useHistory()

  const handleLogout = () => {
    dispatch(userLogout())
    history.push('/')
  }

  return (
    <div>
      <div style={{ backgroundColor: '#f0f0f0' }}>
        <Link style={padding} to="/">
          Blogs
        </Link>
        <Link style={padding} to="/users">
          Users
        </Link>
        {currentUser !== null && (
          <>
            {currentUser.name} logged in{' '}
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
      <h2>blog app</h2>
    </div>
  )
}

export default Navigation
