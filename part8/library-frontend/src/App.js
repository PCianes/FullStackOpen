import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import LoginForm from './components/LoginForm'
import { useApolloClient, useQuery } from '@apollo/client'
import { ALL_BOOKS } from './queries'

const App = () => {
  const [books, setBooks] = useState([])
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const result = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (result.data) setBooks(result.data.allBooks)
  }, [result])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={() => logout()}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} books={books} />

      <NewBook show={page === 'add'} />

      <Recommend show={page === 'recommend'} />

      {page === 'login' && <LoginForm setToken={setToken} setPage={setPage} />}
    </div>
  )
}

export default App
