import axios from 'axios'
const baseUrl = '/api/login'

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  console.log('login response: ',response)
  // Alert doesn´t work, see post back-end
  if (response.status === 401) {alert('wrong password or user name')}
  return response.data
}

export default { login }