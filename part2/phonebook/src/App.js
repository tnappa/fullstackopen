import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Form from './components/Form'
import Input from './components/Input'
import People from './components/People'


const App = () => {
  const [ people, setPeople ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/people')
      .then(response => {
        setPeople(response.data)
      })
  }
  useEffect(hook, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
  
    if (people.map(person => person.name).includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    }
  
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
    
      setPeople(people.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const peopleToShow = newSearch === ''
    ? people
    : people.filter(person => person.name.includes(newSearch))


  return (
    <div>
      <h2>Phonebook</h2>
      <Input 
        text={'filter shown with'}
        value={newSearch}
        onChange={handleSearch}
      />
      <h2>add a new</h2>
      <Form 
        onSubmit={addPerson}
        props={[
          { text: 'name:',
            value: newName,
            onChange: handleNameChange }, 
          { text: 'number:',
            value: newNumber,
            onChange: handleNumberChange }
        ]}
      />
      <h2>Numbers</h2>
      <People peopleToShow={peopleToShow} />
    </div>
  )
}

export default App