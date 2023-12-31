import type { Video } from "./video"

interface Collect {
    uuid: string
    user_uuid: string
    video_uuid: string
    video: Video
}

interface CollectResponse {
    code: number
    collect: Collect
}

interface CollectStatusResponse {
    code: number
    status: boolean
}

interface CollectListResponse {
    code: number
    collect_list: Collect[]
    total: number
}

export type {
    Collect,
    CollectResponse,
    CollectStatusResponse,
    CollectListResponse
}