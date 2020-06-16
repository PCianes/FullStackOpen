import React, { useState, useEffect } from 'react'
import Genres from './Genres'
import BooksTable from './BooksTable'

const Books = (props) => {
  const books = props.books
  const [booksByGenre, setBooksByGenre] = useState(books)
  const [genres, setGenres] = useState('')
  const [genre, setGenre] = useState(null)

  useEffect(() => {
    const genres = []
    books.forEach((book) => {
      if (book.genres) {
        book.genres.forEach((genre) => {
          genres[genre] = genre
        })
      }
    })
    setGenres(Object.keys(genres))
  }, [books])

  useEffect(() => {
    const booksByGenre = !genre
      ? books
      : books.filter((book) => book.genres.includes(genre))
    setBooksByGenre(booksByGenre)
  }, [genre, books])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <Genres genres={genres} setGenre={setGenre} />
      <BooksTable books={booksByGenre} />
    </div>
  )
}

export default Books
