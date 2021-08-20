import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Input from './components/Input'
import People from './components/People'
import Notification from './components/Notification'
import contactService from './services/contacts'


const App = () => {
  const [ people, setPeople ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ notification, setNotification ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  const notificationStyle = {
    background: 'lightgrey',
    fontSize: 20,
    color: 'green',
    padding: 5,
    marginBottom: 10
  }
  const errorStyle = {
    background: 'lightgrey',
    fontSize: 20,
    color: 'red',
    padding: 5,
    marginBottom: 10
  }

  const sendNotification = (message) => {
    setNotification(message)
      setTimeout(() => {
        setNotification(null)
      }, 4000)
  }

  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => {
        setPeople(initialContacts)
      })
  }, [])

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
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personObject = people.find(person => person.name === newName)
        const updatedPerson = { ...personObject, number: newNumber }

        contactService
          .update(updatedPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPeople(people.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')

            sendNotification(`Updated ${updatedPerson.name}`)
          })

          .catch(error =>{
            setErrorMessage(
              `${newName} was already removed from the server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPeople(people.filter(person => person.id !== updatedPerson.id))
          })
      }
    }
  
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      contactService
        .create(personObject)
        .then(returnedPerson => {
          setPeople(people.concat(returnedPerson))
          setNewName('')
          setNewNumber('')

          sendNotification(`Added ${returnedPerson.name}`)
        })
    }
  }

  const removeContact = id => {
    const name = people.find(person => person.id === id).name
    contactService
      .remove(id)
      .then(setPeople(people.filter(person => person.id !== id)))

      sendNotification(`Deleted ${name}`)
  }

  const peopleToShow = newSearch === ''
    ? people
    : people.filter(person => person.name.includes(newSearch))


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} style={errorStyle} />
      <Notification message={notification} style={notificationStyle} />
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
      <People peopleToShow={peopleToShow} deleteFunc={removeContact} />
    </div>
  )
}

export default App