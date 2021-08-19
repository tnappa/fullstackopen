import React from 'react'

const People = ({ peopleToShow, deleteFunc }) => {
  return(
    <table>
      <tbody>
        {peopleToShow.map(person =>
          <Person key={person.id} person={person} deleteFunc={deleteFunc} />
        )}
      </tbody>
    </table>
  )
}

const Person = ({ person, deleteFunc }) => {
  const dialogBox = () => {
      if (window.confirm(`Delete ${person.name}?`)) {
        return deleteFunc(person.id)
      }
  }
  return(
    <tr>
      <td>{person.name} {person.number} <button onClick={dialogBox}>delete</button></td>
    </tr>
  )
}

export default People