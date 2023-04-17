import axios from 'axios'

export const apiMemed = axios.create({
  //baseURL: process.env.URL_API, // ta bugado
  baseURL: 'http://localhost:8081/',
})
