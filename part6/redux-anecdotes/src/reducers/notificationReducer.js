const reducer = (state = '', action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.message

    case 'CLEAR_NOTIFICATION':
      return ''

    default:
      return state
  }
}

export const setNotification = (message, delay = 5000) => {
  return async (dispatch) => {
    dispatch({
      type: 'NEW_NOTIFICATION',
      message,
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    }, delay)
  }
}

export default reducer
