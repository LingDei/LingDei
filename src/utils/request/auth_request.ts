import axios from 'axios'

import { handleNetworkError } from './RequestTools'
import { authURL } from '@/constants/server'
import type { IAnyObj } from '@/model/type'

const request = axios.create({
  baseURL: authURL,
  timeout: 10000,
  responseType: 'json'
})

request.interceptors.request.use((config) => {
  // 此处可以添加请求头相关信息
  return config
})

request.interceptors.response.use(
  (response) => {
    if (response.status !== 200) return Promise.reject(response.data)
    return response
  },
  (err) => {
    handleNetworkError(err.response.status)
    Promise.reject(err.response)
  }
)

export const Get = <T>(url: string, params: IAnyObj = {}): Promise<[any, T | undefined]> =>
  new Promise((resolve) => {
    request
      .get(url, { params })
      .then((result) => {
        const res: T = result.data
        resolve([null, res])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })

export const Post = <T>(
  url: string,
  data: IAnyObj,
  params: IAnyObj = {}
): Promise<[any, T | undefined]> => {
  return new Promise((resolve) => {
    request
      .post(url, data, { params })
      .then((result) => {
        resolve([null, result.data])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })
}
