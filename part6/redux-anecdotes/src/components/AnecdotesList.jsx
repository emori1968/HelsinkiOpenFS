import { useSelector, useDispatch } from 'react-redux'
import { voteOf } from '../reducers/anecdoteReducer'

const AnecdotesList = () => {

    const anecdotes = useSelector(state => state)
    const anecdotesSorted = anecdotes.sort((a,b) => {return b.votes - a.votes})
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteOf(id))
        console.log('vote', id)

  }

    return (
      <>
        {anecdotesSorted.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
            </div>
        )}
      </>
    )
}

export default AnecdotesList