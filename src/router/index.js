import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexPage from '@/views/index.vue'
import CategoryPage from '@/views/catalog/index.vue'
import ProductPage from '@/views/product.vue'
import CartPage from '@/views/cart.vue'
import PaymentPage from '@/views/payment.vue'
import AdminCategoriesPage from '@/views/admin/categories.vue'
import AdminProductFormPage from '@/views/admin/product-form.vue'
import AdminProductsPage from '@/views/admin/products.vue'
import AdminUsersPage from '@/views/admin/users.vue'
import AdminOrdersPage from '@/views/admin/orders.vue'


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
    path: '/payment',
    name: 'payment',
    component: PaymentPage
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
  },
  {
    path: '/admin/users/',
    name: 'admin-users',
    component: AdminUsersPage
  },
  {
    path: '/admin/orders/',
    name: 'admin-orders',
    component: AdminOrdersPage
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
