import { createRouter, createWebHistory } from 'vue-router'
import RecommendView from '../views/recommendView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/recommend',
      name: 'recommend',
      component: RecommendView
    },
  ]
})

export default router
