import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <>
      {' '}
      <Container style={hideWhenVisible}>
        <Button onClick={toggleVisibility} variant="outlined" color="primary">
          {props.buttonLabel}
        </Button>
      </Container>
      <Container style={showWhenVisible} className="togglableContent">
        <Button onClick={toggleVisibility} variant="outlined" color="secondary">
          cancel
        </Button>
        {props.children}
      </Container>
    </>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
