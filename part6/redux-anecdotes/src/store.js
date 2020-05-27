import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import anecdotesReducer from './reducers/anecdoteReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  anecdotes: anecdotesReducer,
})
const store = createStore(reducer, composeWithDevTools())

export default store
