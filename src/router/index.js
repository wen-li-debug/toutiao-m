import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由路径
const Login = () => import('@/views/login/')
const Layout = () => import('@/views/layout')
const Home = () => import('@/views/home')
const Qw = () => import('@/views/qw')
const Video = () => import('@/views/video')
const My = () => import('@/views/my')

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: '/qw',
        name: 'qw',
        component: Qw
      },
      {
        path: '/video',
        name: 'video',
        component: Video
      },
      {
        path: '/my',
        name: 'my',
        component: My
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
