import axios from 'axios'

// for local run test
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

const getAll = () => {
  const request = axios.get(`${baseUrl}api/all/`)
  return request.then(response => response.data)
}

const getCountry = (id) => {
  const request = axios.get(`${baseUrl}api/name/${id}`)
  return request.then(response => response.data)
}

export default { getAll, getCountry }