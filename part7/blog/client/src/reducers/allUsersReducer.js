import blogService from '../services/blogs'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return action.data
    default:
      return state
  }
}

export default reducer

export const getUsers = () => {
  return async (dispatch) => {
    const users = await blogService.getAllUsers()
    dispatch({
      type: 'GET_USERS',
      data: users,
    })
  }
}
