import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Input from './components/Input'
import Persons from './components/Persons'
import Notification from './components/Notification'
import contactService from './services/contacts'
import './App.css'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
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

  const sendErrorMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
      })
      .catch(error => {
        sendErrorMessage(error.response.data.error)
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

    if (persons.map(person => person.name).includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personObject = persons.find(person => person.name === newName)
        const updatedPerson = { ...personObject, number: newNumber }

        contactService
          .update(updatedPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')

            sendNotification(`Updated ${updatedPerson.name}`)
          })

          .catch(error =>{
            sendErrorMessage(error.response.data.error)
            setPersons(persons.filter(person => person.id !== updatedPerson.id))
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
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')

          sendNotification(`Added ${returnedPerson.name}`)
        })
        .catch(error => {
          sendErrorMessage(error.response.data.error)
        })
    }
  }

  const removeContact = id => {
    const name = persons.find(person => person.id === id).name
    contactService
      .remove(id)
      .then(result => {
        setPersons(persons.filter(person => person.id !== id))
        sendNotification(`Deleted ${name}`)
      })
      .catch(error => {
        sendErrorMessage(error.response.data.error)
      })
  }

  const personsToShow = newSearch === ''
    ? persons
    : persons.filter(person => person.name.includes(newSearch))


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
      <Persons personsToShow={personsToShow} deleteFunc={removeContact} />
    </div>
  )
}

export default App