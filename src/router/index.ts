import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/recommend',
      name: 'recommend',
      component: () => import('@/views/RecommendView.vue')
    }
  ]
})

export default router
