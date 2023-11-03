import type { OperationResponse } from '@/model/resp'
import type { UploadTokenResponse, VideoListResponse, VideoResponse } from '@/model/video'
import { Delete, Get, Post } from '@/utils/request/request'

// 获取视频列表
function getVideoList(category_uuid?: string): Promise<[any, VideoListResponse | undefined]> {
  return Get('/video/list', { category_uuid })
}

// 获取我的视频列表
function getMyVideoList(): Promise<[any, VideoListResponse | undefined]> {
  return Get('/video/my_list')
}

// 获取视频
function getVideo(uuid: string): Promise<[any, VideoResponse | undefined]> {
  return Get('/video/get', { uuid })
}

// 获取视频上传凭证
function getUploadToken(): Promise<[any, UploadTokenResponse | undefined]> {
  return Get('/video/upload_token')
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

// 增加视频播放量
function addVideoViews(uuid: string): Promise<[any, OperationResponse | undefined]> {
  const form = new FormData()
  form.append("uuid", uuid)
  return Post('/video/views/add', form)
}

export const videoApis = {
  getVideoList,
  getMyVideoList,
  getVideo,
  addVideo,
  updateVideo,
  deleteVideo,
  getUploadToken,
  addVideoViews,
}
