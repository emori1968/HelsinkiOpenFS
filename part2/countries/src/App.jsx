import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import countryService from './services/countries'


const Country = ({country}) => {
  return(
    <li> {country.name.common} </li>
  )
}

const Language = ({lang}) => {
  return(
    <li> {lang} </li>
  )
}

  const App = () => {

  const [countries, setCountries] = useState([])
  const [newCountry, setNewCountry] = useState('')
  // very important set up all initial values
  const [countrychoice, setCountryChoice] = useState({name:"", capital: "", area: 0, languages: [], flags: "" })

  useEffect(() => {
    countryService 
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const addCountry = (event) => {
    event.preventDefault()
    const selected = countries.find((c) => c.name.common.toLowerCase() === newCountry.toLocaleLowerCase())
    if (selected) {
      const countryObject = {
        name: selected.name.official,
        capital: selected.capital[0],
        area: selected.area,
        languages: Object.values(selected.languages),
        flags: selected.flags.png
      }
      setCountryChoice(countryObject)
    }
  }

  const handleCountryChange = (event) => {
    setNewCountry(event.target.value)
  }

  // very important!! check if newCountry has info before filtering
  const countriesToShow = (newCountry==='')
    ? countries
    : countries.filter((c) => c.name.common.toLowerCase().indexOf(newCountry.toLocaleLowerCase()) > -1)

  return (
    <div>
      <h2>Excersice 2.18 Countries data</h2>
      <form onSubmit={addCountry}>
        <input
          value={newCountry}
          onChange={handleCountryChange}
        />
      </form>
      <ul>
       {countriesToShow.map( (row) => <Country country={row}/> )}  
      </ul>
      <h1>Country: {countrychoice.name}</h1>
      <p>Capital: {countrychoice.capital}</p>
      <p>Area: {countrychoice.area}</p>
      <h2>Languages: </h2>
      <ul>
        {countrychoice.languages.map( row => <Language lang={row}/> )}
      </ul>
      <img src= {countrychoice.flags} alt="flags" />
    </div>
  )
}

export default App
