import { UPDATE_AUTHOR, ALL_AUTHORS } from '../queries'
import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import Notify from './Notify'

const AuthorForm = ({ authorsNames }) => {
  const [updateAuthor, result] = useMutation(UPDATE_AUTHOR, {
    //refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const message =
        error.graphQLErrors.length > 0
          ? error.graphQLErrors[0].message
          : 'Set birthyear to update the Author'
      notify(message)
    },
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_AUTHORS })
      const editAuthor = response.data.editAuthor
      store.writeQuery({
        query: ALL_AUTHORS,
        data: {
          allAuthors: dataInStore.allAuthors.map((author) =>
            author.name === editAuthor.name ? editAuthor : author
          ),
        },
      })
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
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authorsNames &&
              authorsNames.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
          </select>
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
