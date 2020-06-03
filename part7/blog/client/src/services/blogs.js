import axios from 'axios'
import jwt from 'jwt-decode'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getUserInfo = () => {
  return token ? jwt(token) : false
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const user = getUserInfo()
  const request = axios.put(`${baseUrl}/${id}`, { ...newObject, user: user.id })
  return request.then((response) => response.data)
}

const deleteBlog = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then((response) => response.data)
}

export default { setToken, getUserInfo, getAll, create, update, deleteBlog }
