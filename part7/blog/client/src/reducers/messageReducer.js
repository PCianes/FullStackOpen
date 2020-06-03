const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.data

    case 'REMOVE_MESSAGE':
      return null

    default:
      return state
  }
}

export default reducer

/*
export const setMessage = (message) => {
  return {
    type: 'SET_MESSAGE',
    data: message,
  }
}
*/

export const setSuccessMessage = (message) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_MESSAGE',
      data: {
        text: message,
        type: 'success',
      },
    })
    removeMessage(dispatch)
  }
}

export const setErrorMessage = (message) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_MESSAGE',
      data: {
        text: message,
        type: 'error',
      },
    })
    removeMessage(dispatch)
  }
}

const removeMessage = (dispatch) => {
  setTimeout(() => {
    dispatch({
      type: 'REMOVE_MESSAGE',
    })
  }, 8000)
}
