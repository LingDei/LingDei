import type { Video } from '@/model/video'
import { Get } from '@/utils/request/request'



export interface videoListResponse {
  code: number
  video_list: Video[]
}

export type ApiResponse = Promise<[any, videoListResponse | undefined]>

function getVideoList(): ApiResponse {
  return Get('/video/list')
}

export const videoApis = {
  getVideoList
}
