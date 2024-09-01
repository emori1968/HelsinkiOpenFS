import axios from 'axios'

import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import countryService from './services/countries'
import weatherService from './services/weather'


const Country = (props) => {
  let countryname = props.country.name.common
  return(
  <>
    <li> 
      {countryname} 
      <button onClick= {() => props.onclickhandler(countryname)}> show </button>
    </li>
  </>
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
  const [initialtemp, setInitialTemp] = useState(0)
  const [initailwind, setInitialWind] = useState(0)
  const [initialicon, setInitailIcon] = useState('')



  // very important set up all initial values
  const [countrychoice, setCountryChoice] = useState({name:"", capital: "", area: 0, languages: [], flags: ""})

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

      weatherService
        .getWeather(selected.latlng[0],selected.latlng[1])
        .then( w => { 
          let temp = w.main.temp - 273.15;
          let wind = w.wind.speed;
          let icon = w.weather[0].icon
          let icon_url = `https://openweathermap.org/img/wn/${icon}@2x.png`
          setInitialTemp(temp.toFixed(2));
          setInitialWind(wind.toFixed(2))
          setInitailIcon(icon_url)
        })

      const countryObject = {
        name: selected.name.official,
        capital: selected.capital[0],
        area: selected.area,
        languages: Object.values(selected.languages),
        flags: selected.flags.png,
        }
      setCountryChoice(countryObject)
    }
  }
  
  const handleCountryChange = (event) => {
    setNewCountry(event.target.value)
    setCountryChoice({name:"", capital: "", area: 0, languages: [], flags: "" })
    setInitialTemp(0)
    setInitialWind(0)
    setInitailIcon('')
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
       {countriesToShow.map( (row) => <Country country={row} onclickhandler= {setNewCountry}/> )}  
      </ul>
      <h1>Country: {countrychoice.name}</h1>
      <p>Capital: {countrychoice.capital}</p>
      <p>Area: {countrychoice.area}</p>
      <h2>Languages: </h2>
      <ul>
        {countrychoice.languages.map( row => <Language lang={row}/> )}
      </ul>
      <img src= {countrychoice.flags} alt="flags" />
      <h2>Weather in {countrychoice.capital}</h2>
      <h3>Temperature {initialtemp} Celsius</h3>
      <img  src= {initialicon} alf="weather icon" />
      <h3>Wind {initailwind} m/s</h3>

    </div>
  )
}

export default App
