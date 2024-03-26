import queryString, { ParsedQuery } from 'query-string'
import axios, { AxiosRequestConfig, AxiosHeaders } from 'axios'

const baseURL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api`

const privateClient = axios.create({
  baseURL,
  paramsSerializer: (params: ParsedQuery<string>) =>
    queryString.stringify(params),
})

privateClient.interceptors.request.use(async (config: AxiosRequestConfig) => {
  // const token: string | null = localStorage?.getItem('actkn')
  const token: string | null = 'token'

  return {
    ...config,
    headers: new AxiosHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    }),
  }
})

privateClient.interceptors.response.use(
  response => {
    if (response && response.data) return response.data
    return response.data
  },
  err => {
    throw err.response.data
  }
)

export default privateClient
