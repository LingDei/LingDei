import axios from 'axios'

import {
  handleNetworkError
} from './RequestTools'
import { baseURL } from '@/constants/server';

type Fn = (data: FcResponse<any>) => unknown;

interface IAnyObj {
  [index: string]: unknown;
}

export interface FcResponse<T> {
  errno: string;
  errmsg: string;
  data: T;
}

const request = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  responseType: 'json'
})

request.interceptors.request.use((config) => {
  // 此处可以添加请求头相关信息
  return config;
});

request.interceptors.response.use(
  (response) => {
    if (response.status !== 200) return Promise.reject(response.data);
    return response;
  },
  (err) => {
    handleNetworkError(err.response.status);
    Promise.reject(err.response);
  }
);

export const Get = <T,>(
  url: string,
  params: IAnyObj = {},
  clearFn?: Fn
): Promise<[any, FcResponse<T> | undefined]> =>
  new Promise((resolve) => {
    request
      .get(url, { params })
      .then((result) => {
        let res: FcResponse<T>;
        if (clearFn !== undefined) {
          res = clearFn(result.data) as unknown as FcResponse<T>;
        } else {
          res = result.data as FcResponse<T>;
        }
        resolve([null, res as FcResponse<T>]);
      })
      .catch((err) => {
        resolve([err, undefined]);
      });
  });

export const Post = <T,>(
  url: string,
  data: IAnyObj,
  params: IAnyObj = {}
): Promise<[any, FcResponse<T> | undefined]> => {
  return new Promise((resolve) => {
    request
      .post(url, data, { params })
      .then((result) => {
        resolve([null, result.data as FcResponse<T>]);
      })
      .catch((err) => {
        resolve([err, undefined]);
      });
  });
};
