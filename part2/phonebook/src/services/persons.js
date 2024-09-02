// HTTP GET,POST DELETE uing Axios midleware
// baseURL backend root folder is in fullstack/part3
import axios from 'axios'

// baseUrl for full stack build (in case of running with backend no need to declare url)
// const baseUrl = '/api/persons'


// for local development and test use:
const baseUrl = 'http://localhost:3001/api/persons'

// return data to reuests

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const delperson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { getAll, create, update, delperson }