import { whiteList } from '@/constants/whiteList';
import { useUserStore } from '@/stores/user';
import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'
import RecommandLayoutVue from '@/layout/RecommandLayout.vue';
import HomeView from '@/views/HomeView.vue'
import RecommendView from '@/views/RecommendView.vue'
import FollowView from '@/views/FollowView.vue'
import CategoryView from '@/views/CategoryView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/recommend',
      component: RecommandLayoutVue,
      children: [
        {
          path: '/recommend',
          name: 'recommend',
          component: RecommendView
        },
      ]
    },
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView
        },
        // {
        //   path: '/recommend',
        //   name: 'recommend',
        //   component: RecommendView
        // },
        {
          path: '/follow',
          name: 'follow',
          component: FollowView
        },
        {
          path: '/category',
          name: 'category',
          component: CategoryView
        },
        {
          path: "/:pathMatch(.*)",
          name: "NotFound",
          component: NotFoundView
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
