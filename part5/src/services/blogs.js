import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  console.log('getall request', request)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  //console.log("Headers", config)
  const response = await axios.post(baseUrl,newObject,config)
  // console.log("Response", response.data)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteBlog = (id) => {
  axios.delete(`${ baseUrl }/${id}`)
}


export default { getAll, create,setToken, update, deleteBlog }