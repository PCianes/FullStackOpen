import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'
import BooksTable from './BooksTable'

const Recommend = (props) => {
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)
  const [me, setMe] = useState(null)
  const [meBooks, setMeBooks] = useState([])

  useQuery(ME, {
    onCompleted: ({ me }) => {
      setMe(me)
      getBooks({ variables: { genre: me.favoriteGenre } })
    },
  })

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
