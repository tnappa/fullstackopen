import React from 'react'

const Course = ({ course }) => {
  return(
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  return(
    <h1>{props.name}</h1>
  )
}
  
const Content = (props) => {
  return(
    <div>
      {props.parts.map(part => 
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}  

const Part = (props) => {
  return(
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Total = (props) => {
  const total = props.parts.reduce(
    ( s, p ) => s + p.exercises, 0
  )
  return(
    <b>Total of {total} exercises</b>
  )
}

export default Course