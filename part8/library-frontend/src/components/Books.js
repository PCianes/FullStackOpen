import { ALL_BOOKS } from '../queries'
import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

import Genres from './Genres'

const Books = (props) => {
  const [books, setBooks] = useState([])
  const [booksByGenre, setBooksByGenre] = useState([])
  const [genres, setGenres] = useState('')
  const [genre, setGenre] = useState(null)
  const result = useQuery(ALL_BOOKS, {
    onCompleted: (data) => {
      setBooks(data.allBooks)
      setBooksByGenre(booksByGenre)
    },
  })

  useEffect(() => {
    if (books) {
      const genres = []
      books.forEach((book) => {
        if (book.genres) {
          book.genres.forEach((genre) => {
            genres[genre] = genre
          })
        }
      })
      setGenres(Object.keys(genres))
    }
  }, [books])

  useEffect(() => {
    if (!genre) {
      setBooksByGenre(books)
    } else {
      const booksFilter = books.filter((book) => book.genres.includes(genre))
      setBooksByGenre(booksFilter)
    }
  }, [genre, books])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>
      <Genres genres={genres} setGenre={setGenre} />
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksByGenre.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
