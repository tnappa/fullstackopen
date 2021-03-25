import React, { useState } from 'react'

const Button = (props) => {
  return(
  <button onClick={props.handleClick}>
    {props.text}
  </button>
  )
}

const Votes = ({ amount }) => {
  if (amount === 1) {
    return (
      <p>has 1 vote</p>
    )
  }
  return(
    <p>has {amount} votes</p>
  )
}

const Header = (props) => {
  return(
  <h1>{props.content}</h1>
  )
}

const Anecdote = (props) => {
  return(
    <>
    <p>{props.anecdote}</p>
    <Votes amount={props.votes} />
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  const selectAnecdote = () => () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const updateVotes = () => () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    updateMostVoted()
  }

  const updateMostVoted = () => {
    if (votes[selected] === votes[mostVoted]) {
      setMostVoted(selected)
    }
  }

  return (
    <div>
      <Header content="Anecdote of the day" />
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={updateVotes()} text="vote" />
      <Button handleClick={selectAnecdote()} text="next anecdote" />
      <Header content="Anecdote with most votes" />
      <Anecdote anecdote={anecdotes[mostVoted]} votes={votes[mostVoted]} />
    </div>
  )
}

export default App