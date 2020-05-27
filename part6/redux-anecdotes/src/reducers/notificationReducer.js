const reducer = (state = 'Default notification', action) => {
  switch (action.type) {
    case 'ERROR':
      return 'Error message'

    default:
      return state
  }
}

export default reducer
