import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import LoginForm from './components/LoginForm'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [books, setBooks] = useState([])
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const updateCacheWith = (bookAdded) => {
    const includedIn = (set, object) => set.map((b) => b.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, bookAdded)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(bookAdded) },
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const bookAdded = subscriptionData.data.bookAdded
      window.alert(`New book added: ${bookAdded.title}`)
      updateCacheWith(bookAdded)
    },
  })

  useEffect(() => {
    if (!token) setToken(localStorage.getItem('fullstack-user-token'))
  }, [token])

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
