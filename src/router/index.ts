import { whiteList } from '@/constants/whiteList';
import { useUserStore } from '@/stores/user';
import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('../views/HomeView.vue')
        },
        {
          path: '/recommend',
          name: 'recommend',
          component: () => import('../views/RecommendView.vue')
        },
        {
          path: '/follow',
          name: 'follow',
          component: () => import('../views/FollowView.vue')
        }
      ]
    },
    {
      path: '/user/login',
      name: 'login',
      component: () => import('../views/user/LoginView.vue')
    },
    {
      path: '/user/register',
      name: 'register',
      component: () => import('../views/user/RegisterView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (whiteList.includes(String(to.name))) {
    next();
  } else {
    if (!userStore.isLogin && to.name !== 'login') {
      next({ name: 'login' })
    }
    next()
  }
});

export default router
