import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexPage from '@/views/index.vue'
import CategoryPage from '@/views/catalog/index.vue'
import ProductPage from '@/views/product.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: IndexPage
  },
  {
    path: '/catalog/:categoryId',
    name: 'category',
    component: CategoryPage
  },
  {
    path: '/product/:productId',
    name: 'product',
    component: ProductPage
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
