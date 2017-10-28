import Vue from 'vue'
import Router from 'vue-router'
import pageTransition from '@/components/pageTransition'
import selfEvaluation from '@/pages/home/selfEvaluation'
import writeSelfEvaInfo from '@/pages/home/writeSelfEvaInfo'
import repeatEvaluation from '@/pages/home/repeatEvaluation'
Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'pageTransition',
      component: pageTransition,
      children: [{
        path: '',
        component: selfEvaluation
      }, {
        path: '/selfEvaluation',
        component: selfEvaluation
      }, {
        path: '/writeSelfEvaInfo',
        component: writeSelfEvaInfo
      }, {
        path: '/repeatEvaluation',
        component: repeatEvaluation
      }]
    }
  ]
})

export default router
