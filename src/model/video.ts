interface Video {
    uuid: string
    name: string
    category_uuid: string
    url: string
    thumbnail_url: string
    views: number
    author_uuid: string
    timestamp: number
  }

interface VideoResponse {
    code: number
    video: Video
}

interface VideoListResponse {
    code: number
    video_list: Video[]
    total: number
}

interface UploadTokenResponse {
    code: number
    video_uuid: string
    upload_token: string
}

interface VideoStatus {
    likes: number
    views: number
    be_liked: boolean
    be_collected: boolean
}

export type {
    Video,
    VideoResponse,
    VideoListResponse,
    UploadTokenResponse,
    VideoStatus
}