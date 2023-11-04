import { userApis } from './user'
import { profileApis } from './profile'
import { categoryApis } from './category'
import { videoApis } from './video'
import { likeApis } from './like'
import { collectApis } from './collect'
import { followApis } from './follow'
import { commentApis } from './comment'
import { barrageApis } from './barrage'

export const apis = {
  ...userApis,
  ...profileApis,
  ...categoryApis,
  ...videoApis,
  ...likeApis,
  ...collectApis,
  ...followApis,
  ...commentApis,
  ...barrageApis
}
