import Vue from 'vue'
import Router from 'vue-router'
import SmallHeart from '@/views/smallHeart'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SmallHeart',
      component: SmallHeart
    },
    {
      path: '/smallheart',
      name: 'SmallHeart',
      component: SmallHeart
    }
  ]
})

