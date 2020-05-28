import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_VOTE':
      return state.map((item) =>
        item.id !== action.data.id ? item : action.data
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
  return async (dispatch) => {
    const updateAnecdote = await anecdoteService.addVoteof(id)
    dispatch({
      type: 'NEW_VOTE',
      data: updateAnecdote,
    })
  }
}

export const addAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default reducer
