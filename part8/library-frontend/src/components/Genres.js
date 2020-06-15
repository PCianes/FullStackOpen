import React from 'react'

const Genres = ({ genres, setGenre }) => {
  return (
    <div>
      <button key="all" onClick={() => setGenre(null)}>
        All genres
      </button>
      {genres.map((genre) => (
        <button key={genre} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      ))}
    </div>
  )
}

export default Genres
