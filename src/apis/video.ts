import { Get, type FcResponse } from '@/utils/request/request'

export type ApiResponse<T> = Promise<[any, FcResponse<T> | undefined]>

export interface VideoList {
  id: string
  name: string
  category_uuid: string
  url: string
  thumbnail_url: string
  views: number
  author_id: string
}

function getVideoList(): ApiResponse<VideoList> {
  return Get('/video/list')
}

export const videoApis = {
  getVideoList
}
