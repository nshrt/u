import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ShortUrl from '@/components/ShortUrl'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ShortUrl',
      component: ShortUrl
    }
  ]
})
