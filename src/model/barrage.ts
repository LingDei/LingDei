interface Barrage {
  uuid: string
  video_uuid: string
  user_uuid: string
  content: string
  second: number
  timestamp: number
  // css property
  color: string
  display: string
  top: string
  class: string
}

interface BarrageResponse {
  code: number
  barrage: Barrage
}

interface BarrageListResponse {
  code: number
  barrage_list: Barrage[]
  total: number
}

interface BarrageCountResponse {
  code: number
  count: number
}

export type { Barrage, BarrageResponse, BarrageListResponse, BarrageCountResponse }
