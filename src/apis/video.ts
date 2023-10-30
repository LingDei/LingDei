import type { OperationResponse } from '@/model/resp'
import type { VideoListResponse, VideoResponse } from '@/model/video'
import { Delete, Get, Post } from '@/utils/request/request'

// 获取视频列表
function getVideoList(): Promise<[any, VideoListResponse | undefined]> {
  return Get('/video/list')
}

// 获取视频
function getVideo(uuid: string): Promise<[any, VideoResponse | undefined]> {
  return Get('/video/get', { uuid })
}

// 添加视频
function addVideo(uuid: string, name: string, category_uuid: string): Promise<[any, OperationResponse | undefined]> {
  const form = new FormData() 
  form.append("uuid", uuid)
  form.append("name", name)
  form.append("category_uuid", category_uuid)
  return Post('/video/add', form)
}

// 修改视频
function updateVideo(uuid: string, name: string, category_uuid: string): Promise<[any, OperationResponse | undefined]> {
  const form = new FormData() 
  form.append("uuid", uuid)
  form.append("name", name)
  form.append("category_uuid", category_uuid)
  return Post('/video/update', form)
}

// 删除视频
function deleteVideo(uuid: string): Promise<[any, OperationResponse | undefined]> {
  return Delete('/video/delete', { uuid })
}

export const videoApis = {
  getVideoList,
  getVideo,
  addVideo,
  updateVideo,
  deleteVideo
}
