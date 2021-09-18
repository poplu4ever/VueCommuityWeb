import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import store from '@/store'
import jwt from 'jsonwebtoken'
import moment from 'moment'

const Login = () => import(/* webpackChunkName: 'login' */ '../views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'reg' */ '../views/Reg.vue')
const Forget = () => import(/* webpackChunkName: 'forget' */ '../views/Forget.vue')
const Index = () => import(/* webpackChunkName: 'index' */ '../views/channels/index.vue')
const Template1 = () => import(/* webpackChunkName: 'template1' */ '../views/channels/Template1.vue')
const Centre = () => import(/* webpackChunkName: 'centre' */ '../views/Centre.vue')

const UserCentre = () => import(/* webpackChunkName: 'user-centre' */ '../components/user/Centre.vue')
const Setting = () => import(/* webpackChunkName: 'user-setting' */ '../components/user/Setting.vue')
const Post = () => import(/* webpackChunkName: 'user-post' */ '../components/user/Post.vue')
const Message = () => import(/* webpackChunkName: 'user-message' */ '../components/user/Message.vue')
const Other = () => import(/* webpackChunkName: 'other' */ '../components/user/Other.vue')
const User = () => import(/* webpackChunkName: 'user' */ '../views/User.vue')

const Myinfo = () => import(/* webpackChunkName: 'myinfo' */ '../components/user/common/Myinfo.vue')
const Accounts = () => import(/* webpackChunkName: 'accounts' */ '../components/user/common/Accounts.vue')
const PicUpload = () => import(/* webpackChunkName: 'pic-upload' */ '../components/user/common/PicUpload.vue')
const Password = () => import(/* webpackChunkName: 'password' */ '../components/user/common/Password.vue')

const MyPost = () => import(/* webpackChunkName: 'myPost' */ '../components/user/common/MyPost.vue')
const MyCollection = () => import(/* webpackChunkName: 'myCollection' */ '../components/user/common/MyCollection.vue')
const NoFound = () => import(/* webpackChunkName: 'nofound' */ '../views/NoFound.vue')
const Add = () => import(/* webpackChunkName: 'add' */ '../components/contents/Add.vue')
const Detail = () => import(/* webpackChunkName: 'detail' */ '../components/contents/Detail.vue')
const Edit = () => import(/* webpackChunkName: 'edit' */ '../components/contents/Edit.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: 'index',
        component: Index

      },
      {
        path: '/index/:catalog',
        name: 'catalog',
        component: Template1
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/reg',
    name: 'reg',
    component: Reg,
    beforeEnter: (to, from, next) => {
      if (from.name === 'login') {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/forget',
    name: 'forget',
    component: Forget
  },
  {
    path: '/add',
    name: 'add',
    component: Add,
    meta: { requiresAuth: true }
  },
  {
    path: '/edit/:tid',
    props: true,
    name: 'edit',
    component: Edit,
    meta: { requiresAuth: true },
    beforeEnter (to, from, next) {
      if (['detail', 'mypost'].indexOf(from.name) !== -1 && to.params.page && to.params.page.isEnd === '0') {
        next()
      } else {
        const editData = localStorage.getItem('editData')
        if (editData && editData !== '') {
          const editObj = JSON.parse(editData)
          if (editObj.isEnd === '0') {
            next()
          } else {
            next('/')
          }
        } else {
          next('/')
        }
      }
    }
  },
  {
    path: '/detail/:tid',
    name: 'detail',
    props: true,
    component: Detail
  },
  {
    path: '/user/:uid',
    name: 'home',
    props: true,
    component: User
  },
  {
    path: '/centre',
    meta: { requiresAuth: true },
    component: Centre,
    linkActiveClass: 'layui-this',
    children: [
      {
        path: '',
        name: 'centre',
        component: UserCentre
      },
      {
        path: 'set',
        component: Setting,
        children: [
          {
            path: '',
            name: 'info',
            component: Myinfo
          },
          {
            path: 'accounts',
            name: 'accounts',
            component: Accounts
          },
          {
            path: 'picupload',
            name: 'picupload',
            component: PicUpload
          },
          {
            path: 'password',
            name: 'password',
            component: Password
          }
        ]
      },
      {
        path: 'post',
        component: Post,
        children: [
          {
            path: '',
            name: 'mypost',
            component: MyPost
          },
          {
            path: 'myCollection',
            name: 'myCollection',
            component: MyCollection
          }
        ]
      },
      {
        path: 'message',
        name: 'message',
        component: Message
      },
      {
        path: 'other',
        name: 'other',
        component: Other
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: NoFound
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'layui-this',
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (token !== '' && token !== null) {
    const payload = jwt.decode(token)
    if (moment().isBefore(moment(payload.exp * 1000))) {
      store.commit('setToken', token)
      store.commit('setUserInfo', userInfo)
      store.commit('setIsLogin', true)
      if (!store.state.ws) {
        store.commit('initWebSocket', {})
      }
    } else {
      localStorage.clear()
    }
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isLogin = store.state.isLogin
    if (isLogin) {
      // user has login
      next()
    } else {
      // not yet login, go to login page
      next('/login')
    }
  } else {
    // public page, no need to login
    next()
  }
})

export default router
