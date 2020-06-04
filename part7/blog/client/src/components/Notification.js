import React from 'react'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return <Alert severity={message.type}>{message.text}</Alert>
}

export default Notification
