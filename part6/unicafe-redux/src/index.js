import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const App = () => {
  const handleDispatch = (type) => store.dispatch({ type })

  const good = () => handleDispatch('GOOD')
  const neutral = () => handleDispatch('OK')
  const bad = () => handleDispatch('BAD')
  const reset = () => handleDispatch('ZERO')

  const getStore = (item) => store.getState()[item]

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={neutral}>neutral</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {getStore('good')}</div>
      <div>neutral {getStore('ok')}</div>
      <div>bad {getStore('bad')}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
