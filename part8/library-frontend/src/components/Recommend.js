import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ME } from '../queries'
import BooksTable from './BooksTable'

const Recommend = (props) => {
  const books = props.books
  const [me, setMe] = useState(null)
  const [meBooks, setMeBooks] = useState([])

  useQuery(ME, {
    onCompleted: ({ me }) => {
      setMe(me)
    },
  })

  useEffect(() => {
    setMeBooks(books.filter((book) => book.genres.includes(me.favoriteGenre)))
  }, [me, books])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre patterns</p>
      <BooksTable books={meBooks} />
    </div>
  )
}

export default Recommend
