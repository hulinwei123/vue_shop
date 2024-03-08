import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import home from '../components/home.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: login },
  { path: '/home', component: home }
]

const router = new VueRouter({
  routes
})

// 使用 beforeEach 进行全局导航守卫
// to：将要访问的路径
// from：代表从哪个路径跳转过来
// next：是一个函数，表示放行
//    next()  放行  next('/url')  强制跳转
router.beforeEach((to, from, next) => {
  const tokenStr = sessionStorage.getItem('token')
  if (tokenStr == null && to.path !== '/login') {
    // 如果未登录，并且访问的不是登录页面，则重定向到登录页面
    return next('/login')
  } else {
    // 如果已登录，或者访问的是登录页面，允许导航继续
    return next()
  }
})

export default router
