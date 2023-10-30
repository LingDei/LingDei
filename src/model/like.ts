interface Like {
    uuid: string
    user_uuid: string
    video_uuid: string
}

interface LikeResponse {
    code: number
    like: Like
}

interface LikeListResponse {
    code: number
    like_list: Like[]
}

export type {
    Like,
    LikeResponse,
    LikeListResponse
}