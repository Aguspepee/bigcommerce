import axios from 'axios'

const { NEXT_PUBLIC_API_PATH, ACCESS_TOKEN } = process.env

const instance = axios.create({
  baseURL: NEXT_PUBLIC_API_PATH,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default instance
