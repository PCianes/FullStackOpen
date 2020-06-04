import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userLogin } from '../reducers/userReducer'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(userLogin(username, password))
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <TextField
          id="standard-basic"
          label="username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          required
        />
      </div>
      <div>
        <TextField
          id="standard-basic"
          label="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          required
        />
      </div>
      <Button
        onClick={handleLogin}
        variant="contained"
        color="primary"
        id="login-button"
      >
        login
      </Button>
    </form>
  )
}

export default LoginForm
