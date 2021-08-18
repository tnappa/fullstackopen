import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({ data, searchTerm, buttonClick }) => {
  const matchingCountries = data.filter(country => {
    return(
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })
  if (matchingCountries.length > 10) {
    return(
      <p>Too many countries, specify another filter</p>
    )
  }
  else if (matchingCountries.length === 0) {
    return(
      <p>No matching countries</p>
    )
  }
  else if (matchingCountries.length !== 1) {
    return(
      <table>
        <tbody>
          {matchingCountries.map(country => {
            return(
              <tr key={country.name}>
                <td>{country.name} <Button country={country.name} buttonClick={buttonClick} /></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
  else {
    return(
      <Country country={matchingCountries[0]} />
    )
  }
}

const Button = ({ country, buttonClick }) => {
  return(
    <button onClick={() => buttonClick(country)} >
      show
    </button>
  )
}

const Country = ({ country }) => {
  return(
    <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        {country.languages.map(language => {
          return(
            <li key={language.name}>{language.name}</li>
          )
        })}
        <p />
        <img src={country.flag} alt={'the flag of ' + country.name} width='150' />
    </div>
  )
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ newSearch, setNewSearch ] = useState('')

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <div>
      find countries <input
        value={newSearch}
        onChange={handleSearch}
      />
      <Countries data={countries} searchTerm={newSearch} buttonClick={setNewSearch} />
    </div>
  )
}

export default App
