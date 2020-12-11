import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '@/store'
import { Dialog } from 'vant'

Vue.use(VueRouter)

// 路由路径
const Login = () => import('@/views/login/')
const Layout = () => import('@/views/layout')
const Home = () => import('@/views/home')
const Qw = () => import('@/views/qw')
const Video = () => import('@/views/video')
const My = () => import('@/views/my')
const Search = () => import('@/views/search')
const Articel = () => import('@/views/articel')
const UserProfile = () => import('@/views/user-profile')
const UserChat = () => import('@/views/user-chat')

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { requiresAuth: false } // 用于判断用户是否需要登陆才能访问，true 需要 false 不需要
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
        meta: { requiresAuth: false }
      },
      {
        path: '/qw',
        name: 'qw',
        component: Qw,
        meta: { requiresAuth: false }
      },
      {
        path: '/video',
        name: 'video',
        component: Video,
        meta: { requiresAuth: false }
      },
      {
        path: '/my',
        name: 'my',
        component: My,
        meta: { requiresAuth: false }
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    meta: { requiresAuth: false }
  },
  {
    path: '/articel/:articelId',
    name: 'articel',
    component: Articel,
    // 将params以props
    props: true,
    meta: { requiresAuth: false }
  },
  {
    path: '/profile',
    name: 'profile',
    component: UserProfile,
    meta: { requiresAuth: false }
  },
  {
    path: '/chat',
    name: 'chat',
    component: UserChat,
    meta: { requiresAuth: true } // 设置这个页面需要用户登陆了才能访问
  }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
  console.log(to)
  // 判断是否登陆
  if (Store.state.users) {
    // 用户登陆状态直接通过
    return next()
  }
  // 判断是否是需要客户登陆的路由页面
  if (to.meta.requiresAuth) {
    // 需要登陆才能访问
    // 提示信息
    Dialog.confirm({
      title: '温馨提示',
      message: '此功能需要登陆才能访问,是否跳转到登陆界面'
    }).then(() => {
      // 点击确认 跳转到登陆界面
      router.replace({
        name: 'login',
        query: {
          toUrl: router.currentRoute.fullPath
        }
      })
    }).catch(() => {
      // 点击取消，中断跳转
      next(false)
    })
  } else {
    next()
  }
})

export default router
