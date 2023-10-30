interface Video {
    uuid: string
    name: string
    category_uuid: string
    url: string
    thumbnail_url: string
    views: number
    author_id: string
    publish_date: string
  }

interface VideoResponse {
    code: number
    video: Video
}

interface VideoListResponse {
    code: number
    videos: Video[]
}

export type {
    Video,
    VideoResponse,
    VideoListResponse
}