import Vue from 'vue'
import Router from 'vue-router'
import selfEvaluation from '@/pages/home/selfEvaluation'
import writeSelfEvaInfo from '@/pages/home/writeSelfEvaInfo'
import repeatEvaluation from '@/pages/home/repeatEvaluation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'selfEvaluation',
      component: selfEvaluation
    },
    {
      path: '/selfEvaluation',
      name: 'selfEvaluation',
      component: selfEvaluation
    },
    {
      path: '/writeSelfEvaInfo',
      name: 'writeSelfEvaInfo',
      component: writeSelfEvaInfo
    },
    {
      path: '/repeatEvaluation',
      name: 'repeatEvaluation',
      component: repeatEvaluation
    }
  ]
})
