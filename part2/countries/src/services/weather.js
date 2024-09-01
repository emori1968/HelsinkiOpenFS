import axios from 'axios'

// Command line 
// export VITE_WEATHER_API=<weather or api key>  && npm run dev

const API_KEY = import.meta.env.VITE_WEATHER_API

const baseUrl = 'https://api.openweathermap.org/'


const getWeather = (lat,lon) => {
  const request = axios.get(`${baseUrl}data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
  return request.then(response => response.data)
}


export default { getWeather }