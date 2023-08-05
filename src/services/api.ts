import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const BASE_URL: string =
  process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001/'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})
export const fetcher = async <T>(
  url: string,
  call: (url: string) => Promise<AxiosResponse<T>>,
): Promise<T> => {
  try {
    const response = await call(url)
    return response.data
  } catch (error: any) {
    if (error.message === 'Network Error') {
      return Promise.reject(new Error('Network Error'))
    }

    return Promise.reject(error)
  }
}

export const post = <T, TBody>(url: string, body: TBody): Promise<T> =>
  fetcher(url, () => api.post(url, body))

export const get = <T>(url: string): Promise<T> =>
  fetcher(url, () => api.get(url))
