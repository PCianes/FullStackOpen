import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'
import BooksTable from './BooksTable'

const Recommend = (props) => {
  const meResult = useQuery(ME)
  const [getBooks, result] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: 'no-cache',
  })
  const [me, setMe] = useState(null)
  const [meBooks, setMeBooks] = useState([])

  useEffect(() => {
    if (meResult.data) {
      setMe(meResult.data.me)
      getBooks({ variables: { genre: meResult.data.me.favoriteGenre } })
    }
  }, [meResult, me, getBooks])

  useEffect(() => {
    if (result.data) setMeBooks(result.data.allBooks)
  }, [result])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre patterns:{' '}
        <strong>{me.favoriteGenre}</strong>
      </p>
      <BooksTable books={meBooks} />
    </div>
  )
}

export default Recommend
