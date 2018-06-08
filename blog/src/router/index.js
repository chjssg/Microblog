import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//定义全局组件
import nav from '../components/z-nav.vue'
Vue.component('z-nav',nav);


//定义组件
const Home = (resolve) => {require(['../pages/home.vue'],resolve)}
const Reg = (resolve) => {require(['../pages/reg.vue'],resolve)}
const Login = (resolve) => {require(['../pages/login.vue'],resolve)}
const accountSet = (resolve) => {require(['../pages/accountSet.vue'],resolve)}
//测试路径
const HelloWorld = (resolve) => {require(['../components/HelloWorld.vue'],resolve)}
export default new Router({
	mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/reg',
      name: 'Reg',
      component: Reg
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/accountSet',
      name: 'accountSet',
      component: accountSet
    },
    {
      path:'/hello',
      name:'hello',
      component:HelloWorld
    }
  ]
})




// import Vue from 'vue'
// import Router from 'vue-router'
// import Index from '@/pages/index.vue'
// Vue.use(Router)

// //定义全局组件
// import nav from '../components/nav.vue'

// Vue.component('z-nav',nav)

// //定义组件
// const Home = (resolve) => {require(['../pages/home.vue'],resolve)}
// const Reg = (resolve) => {require(['../pages/reg.vue'],resolve)}
// const Login = (resolve) => {require(['../pages/login.vue'],resolve)}

// const routes=[
//     {
//       path: '/',
//       name: 'home',
//       components: {
//         default:Home,
//         a:Reg
//       }
//     },
//     {
//       path: '/reg',
//       name: 'Reg',
//       component: Reg
//     },
//     {
//       path: '/login',
//       name: 'Login',
//       component: Login
//     }
//   ]


// export default new Router({
//   mode: 'history',
//   routes: routes
// })