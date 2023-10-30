interface Collect {
    uuid: string
    user_uuid: string
    video_uuid: string
}

interface CollectResponse {
    code: number
    collect: Collect
}

interface CollectListResponse {
    code: number
    collects: Collect[]
}

export type {
    Collect,
    CollectResponse,
    CollectListResponse
}