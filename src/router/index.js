import Vue from 'vue'
import Router from 'vue-router'
import ShortUrl from '@/components/ShortUrl'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      name: 'ShortUrl',
      component: ShortUrl,

    },
  ],
})
