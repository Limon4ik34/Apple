import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexPage from '@/views/index.vue'
import CategoryPage from '@/views/catalog/index.vue'
import ProductPage from '@/views/product.vue'
import CartPage from '@/views/cart.vue'
import AdminCategoriesPage from '@/views/admin/categories.vue'
import AdminProductFormPage from '@/views/admin/product-form.vue'
import AdminProductsPage from '@/views/admin/products.vue'

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
    path: '/cart',
    name: 'cart',
    component: CartPage
  },
  {
    path: '/product/:productId',
    name: 'product',
    component: ProductPage
  },
  {
    path: '/admin/categories',
    name: 'admin-categories',
    component: AdminCategoriesPage
  },
  {
    path: '/admin/products/',
    name: 'admin-products',
    component: AdminProductsPage
  },
  {
    path: '/admin/products/:productId',
    name: 'admin-product-form',
    component: AdminProductFormPage
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
