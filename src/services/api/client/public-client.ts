import queryString, { ParsedQuery } from 'query-string'
import axios, { AxiosRequestConfig, AxiosHeaders } from 'axios'

const baseURL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api`

const publicClient = axios.create({
  baseURL,
  paramsSerializer: (params: ParsedQuery<string>) =>
    queryString.stringify(params),
})

publicClient.interceptors.request.use(async (config: AxiosRequestConfig) => {
  return {
    ...config,
    headers: new AxiosHeaders({
      'Content-Type': 'application/json',
    }),
  }
})

publicClient.interceptors.response.use(
  response => {
    if (response && response.data) return response.data

    return response
  },
  err => {
    throw err.response.data
  }
)

export default publicClient
