import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVoteOf } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(addVoteOf(id))
    dispatch(setNotification(`Add new vote to: ${content}`))
    setTimeout(() => {
      dispatch(setNotification(''))
    }, 5000)
  }

  return (
    <>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>
                vote
              </button>
            </div>
          </div>
        ))}
    </>
  )
}

export default AnecdoteList
