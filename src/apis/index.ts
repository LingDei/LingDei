import { userApis } from './user'
import { profileApis } from './profile'
import { categoryApis } from './category'
import { videoApis } from './video'
import { likeApis } from './like'
import { collectApis } from './collect'


export const apis = {
  ...userApis,
  ...profileApis,
  ...categoryApis,
  ...videoApis,
  ...likeApis,
  ...collectApis
}
