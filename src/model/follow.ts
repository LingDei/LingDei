import type { User } from "./user"

interface Follow {
    uuid: string
    follow_uuid: string
    user_uuid: string
    user?: User
}

interface FollowResponse {
    code: number
    follow: Follow
}

interface FollowStatusResponse {
    code: number
    status: boolean
}

interface FollowListResponse {
    code: number
    follow_list: Follow[]
}

interface FollowCountResponse {
    code: number
    count: number
}

interface FanListResponse  {
    code: number
    fan_list: Follow[]
    total: number
}

export type {
    Follow,
    FollowResponse,
    FollowStatusResponse,
    FollowListResponse,
    FollowCountResponse,
    FanListResponse
}