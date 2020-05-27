const reducer = (state = '', action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.message

    default:
      return state
  }
}

export const setNotification = (message) => {
  return {
    type: 'NEW_NOTIFICATION',
    message,
  }
}

export default reducer
