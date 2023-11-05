interface Barrage {
  uuid: string
  video_uuid: string
  user_uuid: string
  content: string
  second: number
  timestamp: number
  top: number
  right: number
  color: string
}

interface BarrageResponse {
  code: number
  barrage: Barrage
}

interface BarrageListResponse {
  code: number
  barrage_list: Barrage[]
}

interface BarrageCountResponse {
  code: number
  count: number
}

export type { Barrage, BarrageResponse, BarrageListResponse, BarrageCountResponse }
