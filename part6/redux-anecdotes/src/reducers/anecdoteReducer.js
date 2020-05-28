const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_VOTE':
      return state.map((item) =>
        item.id !== action.id ? item : { ...item, votes: item.votes + 1 }
      )

    case 'NEW_ANECDOTE':
      return [...state, action.data]

    case 'INIT_ANECDOTES':
      return action.data

    default:
      return state
  }
}

export const addVoteOf = (id) => {
  return {
    type: 'NEW_VOTE',
    id,
  }
}

const getId = () => (100000 * Math.random()).toFixed(0)

export const addAnecdote = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content: anecdote,
      id: getId(),
      votes: 0,
    },
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export default reducer
