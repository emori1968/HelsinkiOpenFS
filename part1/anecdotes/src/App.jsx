import { useState } from 'react'

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]



  const [selected, setSelected] = useState(getRandomInt(8))
  const [voted, setVoted] = useState(Array(9).fill(0))
  
  const setRandom = () => setSelected(getRandomInt(8))
  
  const countVotes = () => {
    console.log(voted)
    console.log(selected)
    voted[selected] += 1
    setVoted(voted)
  }

  let maxind = voted.indexOf(Math.max(...voted))
  console.log(maxind)

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {voted[selected]} votes</p>
      <h2>Anectode with most votes</h2>
      <p>{anecdotes[maxind]}</p>
      <button onClick= {countVotes}>vote</button>
      <button onClick= {setRandom}>next anecdote</button>
    </div>
  )
}

export default App