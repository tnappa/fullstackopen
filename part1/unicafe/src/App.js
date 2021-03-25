import React, { useState } from 'react'

const Header = (props) => {
  return(
  <h1>{props.content}</h1>
  )
}

const Button = (props) => {
  return(
  <button onClick={props.handleClick}>
    {props.text}
  </button>
  )
}

const Stats = (props) => {
  return(
    <tr>{props.text} {props.value}</tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const average = () => {
    return(
      (good - bad) / all()
    )
  }
  const all = () => {
    return(
      good + neutral + bad
    )
  }

  if (all() === 0) {
    return(
      <p>No feedback given</p>
    )
  }
  return(
    <div>
      <Stats text="good" value={good} />
      <Stats text="neutral" value={neutral} />
      <Stats text="bad" value={bad} />
      <Stats text="all" value={all()} />
      <Stats text="average" value={average()} />
      <Stats text="positive" value={good / all() * 100 + " %"} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  

  const incrementGood = (newValue) => () => {
    setGood(newValue)
  }
  const incrementNeutral = (newValue) => () => {
    setNeutral(newValue)
  }
  const incrementBad = (newValue) => () => {
    setBad(newValue)
  }

  return (
    <div>
      <Header content="give feedback" />
      <Button handleClick={incrementGood(good + 1)} text="good" />
      <Button handleClick={incrementNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={incrementBad(bad + 1)} text="bad" />
      <Header content="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App