interface Collect {
    uuid: string
    user_uuid: string
    video_uuid: string
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
}

export type {
    Collect,
    CollectResponse,
    CollectStatusResponse,
    CollectListResponse
}