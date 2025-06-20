import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '@/views/RegisterView.vue'
import LoyalityPage from '@/views/LoyalityPage.vue'
import SummaryView from '@/views/SummaryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Loyality Page',
      component: LoyalityPage,
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
    },
    {
      path: '/summary',
      name: 'Summary',
      component: SummaryView,
    }
  ],
})

export default router
