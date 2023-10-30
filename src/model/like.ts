interface Like {
    uuid: string
    user_uuid: string
    video_uuid: string
}

interface LikeResponse {
    code: number
    like: Like
}

interface LikeCountResponse {
    code: number
    count: number
}

interface LikeListResponse {
    code: number
    like_list: Like[]
}

export type {
    Like,
    LikeResponse,
    LikeCountResponse,
    LikeListResponse
}