import axios from 'axios'

const { API_PATH, ACCESS_TOKEN } = process.env
console.log(API_PATH)
console.log(process.env.API_PATH)

const instance = axios.create({
  baseURL: 'https://api.bigcommerce.com/stores/s9ye4xe3x0/v3/',
  headers: {
    'X-Auth-Token': `wo9e40w72wf7f21kpz3xfgfiwmeffz`,
    'Content-Type': 'application/json'
  },
})

export default instance

