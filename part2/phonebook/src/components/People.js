import React from 'react'

const People = ({ peopleToShow }) => {
  return(
    <table>
      <tbody>
        {peopleToShow.map(person =>
          <Person key={person.name} person={person} />
        )}
      </tbody>
    </table>
  )
}

const Person = ({ person }) => {
  return(
    <tr>
      <td>{person.name} {person.number}</td>
    </tr>
  )
}

export default People