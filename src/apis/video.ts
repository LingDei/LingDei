import { Get } from '@/utils/request/request'

export interface VideoList {
  id: string
  name: string
  category_uuid: string
  url: string
  thumbnail_url: string
  views: number
  author_id: string
}

export interface videoListResponse {
  code: number
  video_list: VideoList[]
}

export type ApiResponse = Promise<[any, videoListResponse | undefined]>

function getVideoList(): ApiResponse {
  return Get('/video/list')
}

export const videoApis = {
  getVideoList
}
