const reducer = (state = '', action) => {
  switch (action.type) {
    case 'NEW_FILTER':
      return action.filter

    default:
      return state
  }
}

export const setFilter = (filter) => {
  return {
    type: 'NEW_FILTER',
    filter,
  }
}

export default reducer
