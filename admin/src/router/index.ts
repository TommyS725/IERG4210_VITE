import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import OperationsView from '@/views/OperationsView.vue'
import CategoryInsertView from '@/views/category/CategoryInsertView.vue'
import CategoryUpdateView from '@/views/category/CategoryUpdateView.vue'
import CategoryDeleteView from '@/views/category/CategoryDeleteView.vue'
import ProductInsertView from '@/views/product/ProductInsertView.vue'
import ProductUpdateView from '@/views/product/ProductUpdateView.vue'
import ProductDeleteView from '@/views/product/ProductDeleteView.vue'
import OrderOperationView from '../views/order/OrderOperationView.vue'
import ViewOrderView from '../views/order/ViewOrderView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/order',
      name: 'order-operations',
      component: OrderOperationView
    },
    {
      path: '/:table',
      name: 'operations',
      component: OperationsView
    },
    {
      path: '/category/insert',
      name: 'category-insert',
      component: CategoryInsertView
    },
    {
      path: '/category/update',
      name: 'category-update',
      component: CategoryUpdateView
    },
    {
      path: '/category/delete',
      name: 'category-delete',
      component: CategoryDeleteView
    },
    {
      path: '/product/insert',
      name: 'product-insert',
      component: ProductInsertView
    },
    {
      path: '/product/update',
      name: 'product-update',
      component: ProductUpdateView
    },
    {
      path: '/product/delete',
      name: 'product-delete',
      component: ProductDeleteView
    },
    {
      path: '/order/view',
      name: 'order-view',
      component: ViewOrderView
    },
    {
      path: '/:catchAll(.*)*',
      name: 'not-found',
      component: NotFoundView
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  // console.log('beforeEach', to, from)
  // window.location.href = '/login/'
  // await new Promise(resolve => setTimeout(resolve, 3000))
  next()
})

export default router
