import Vue from 'vue'
import Router from 'vue-router'
import pageTransition from '@/components/pageTransition'
import selfEvaluation from '@/pages/home/selfEvaluation'
import writeSelfEvaInfo from '@/pages/home/writeSelfEvaInfo'
import repeatEvaluation from '@/pages/home/repeatEvaluation'
import organizingData from '@/pages/drawMoney/organizingData'
import repayment from '@/pages/drawMoney/repayment'
import borrowRecord from '@/pages/drawMoney/borrowRecord'
import finincing from '@/pages/drawMoney/finincing'
import promoteMoney from '@/pages/drawMoney/promoteMoney'
// 臻e盾
import frontPage from '@/pages/zed/frontPage'

Router.prototype.goBack = function() {
    this.isBack = true
    window.history.go(-1)
}
Vue.use(Router)

const router = new Router({
    routes: [{
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
        }, {
            path: '/repeatScore',
            component: repeatEvaluation
        }, {
            path: '/organizingData',
            component: organizingData
        }, {
            path: '/frontPage',
            component: frontPage
        }, {
            path: '/repayment',
            component: repayment
        }, {
            path: '/borrowRecord',
            component: borrowRecord
        }, {
            path: '/finincing',
            component: finincing
        }, {
            path: '/promoteMoney',
            component: promoteMoney
        }]
    }]
})
export default router
