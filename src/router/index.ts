import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'

import ConsumerLayout from '@/layouts/ConsumerLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

import HomeView from '@/views/consumer/HomeView.vue'
import ProductDetailsView from '@/views/consumer/ProductDetailsView.vue'
import CheckoutView from '@/views/consumer/CheckoutView.vue'
import LoginView from '@/views/auth/LoginView.vue'

import AdminDashboard from '@/views/admin/AdminDashboard.vue'
import AdminProducts from '@/views/admin/AdminProducts.vue'
import AdminSales from '@/views/admin/AdminSales.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: ConsumerLayout,
      children: [
        { path: '', name: 'home', component: HomeView },
        { path: 'product/:id', name: 'product-details', component: ProductDetailsView },
        {
          path: 'checkout',
          name: 'checkout',
          component: CheckoutView,
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAdmin: true },
      children: [
        { path: '', name: 'admin-dashboard', component: AdminDashboard },
        { path: 'products', name: 'admin-products', component: AdminProducts },
        { path: 'sales', name: 'admin-sales', component: AdminSales },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else if (to.meta.requiresAdmin && !authStore.isAdmin) {
    if (authStore.isAuthenticated) next({ name: 'home' })
    else next({ name: 'login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
