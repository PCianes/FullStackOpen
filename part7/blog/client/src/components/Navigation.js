import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userLogout } from '../reducers/userReducer'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Switch from '@material-ui/core/Switch'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))
const Navigation = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.user)
  const history = useHistory()

  const handleLogout = () => {
    dispatch(userLogout())
    history.push('/')
  }

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Blog App
          </Typography>
          {currentUser !== null && (
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked
                    onChange={handleLogout}
                    aria-label="login switch"
                  />
                }
                label={`${currentUser.name}`}
              />
            </FormGroup>
          )}
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button variant="contained">
              <Link to="/" style={{ color: '#fff' }}>
                Blogs
              </Link>
            </Button>
            <Button variant="contained">
              <Link to="/users" style={{ color: '#fff' }}>
                Users
              </Link>
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navigation
