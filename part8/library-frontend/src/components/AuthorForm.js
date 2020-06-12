import { UPDATE_AUTHOR, ALL_AUTHORS } from '../queries'
import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import Notify from './Notify'

const AuthorForm = () => {
  const [updateAuthor, result] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const message =
        error.graphQLErrors.length > 0
          ? error.graphQLErrors[0].message
          : 'Set all data to update the Author'
      notify(message)
    },
  })

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      notify('author not found')
    }
  }, [result.data])

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const submit = async (event) => {
    event.preventDefault()
    updateAuthor({
      variables: { name, setBornTo: parseInt(born) },
    })

    setName('')
    setBorn('')
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <Notify errorMessage={errorMessage} />
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default AuthorForm
