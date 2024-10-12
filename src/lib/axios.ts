import axios from 'axios'

export const externalApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export const apiClient = axios.create({})
