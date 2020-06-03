import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import blogsReducer from './reducers/blogsReducer'
import messageReducer from './reducers/messageReducer'
import userReducer from './reducers/userReducer'
import allUsersReducer from './reducers/allUsersReducer'

const reducer = combineReducers({
  blogs: blogsReducer,
  message: messageReducer,
  user: userReducer,
  users: allUsersReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
