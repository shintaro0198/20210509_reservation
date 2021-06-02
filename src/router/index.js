import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Thanks from '../views/Thanks.vue'
import Mypage from '../views/Mypage.vue'
import Detail from '../views/Detail.vue'
import Reserved from '../views/Reserved.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth:true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/thanks',
    name: 'Thanks',
    component: Thanks
  },
  {
    path: '/mypage',
    name: 'Mypage',
    component: Mypage,
    meta: {
      requiresAuth:true
    }
  },
  {
    path: '/detail/:restaurant_id',
    name: 'Detail',
    props: true,
    component: Detail,
    meta: {
      requiresAuth:true
    }
  },
  {
    path: '/reserved',
    name: 'Reserved',
    component: Reserved,
    meta: {
      requiresAuth:true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth === true && store.state.auth !== true) {
    next('/login');
  } else {
    next();
  }
  const sitePege = ["Register","Login","Thanks","Home","Mypage","Reserved"]
  if (sitePege.indexOf(from.name) === -1) {
    console.log('alpha')
  }
})
router.afterEach(() => {
  const events = ['click', 'mousemove', 'mousedown', 'scroll', 'keypress', 'load']
  const capturedAction = function () {
    events.forEach(function (event) {
      window.addEventListener(event, resetTimer)
    })
  }
  const timeLimit = function () {
    setTimeout(() => {
      store.commit('auth',false)
      router.go({path: router.currentRoute.path, force: true})
    }, 3600*1000);
  }
  const resetTimer = function () {
    new Promise((resolve) => {
      clearTimeout(timeLimit)
      resolve()
    }).then(() => {
      timeLimit()
    })
  }
  capturedAction();
  timeLimit();
})

export default router
