<template>
  <div class="repayment">
    <!--<div class="title">-->
      <!--<div class="titleLeft" @click="back()"><img src="../../assets/nav_btn_back@2x.png" alt=""></div>-->
      <!--<div class="titleMid"><span>还款计划</span></div>-->
    <!--</div>-->
    <!-- <m-header>还款计划</m-header> -->
    <div class="table">
      <div class="play-table" v-for="item in records">
        <div class="play-table-name">{{item.status | getStatus}}</div>
        <div class="play-table-money">{{item.amount / 100}}元</div>
        <div class="play-table-date">{{item.repayDate }}</div>
        <div class="play-table-count">第{{item.repayPeriod}}期</div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {Toast} from 'mint-ui'
  import {currentBorrowAmount, borrowRecord, recentRepaymentPlan, addRecord, repaymentPlan} from '../../api/index'
  import {getTime, getDate, dateAddHorizontal} from '../../common/js/times'
  import mHeader from '@/components/Header'
  import {headAPP} from 'common/js/utils'

  export default {
    components: {
      mHeader
    },
    data() {
      return {
        records: []
      }
    },
    filters: {
      getStatus(t) {
        return t === 1 ? '代还款' : t === 2 ? '已还款' : t === 3 ? '已逾期' : t === 5 ? '已代还' : ''
      }
    },
    created() {
      headAPP()
      this.accountTel = this.$route.query.accountTel;
      this.id = this.$route.query.id;
      this.detailRecords()
    },
    methods: {
      back() {
        this.$router.goBack()
      },
      detailRecords(id) {
        let params = {
          applyId: this.id
        }
        repaymentPlan(params).then(res => {
          if (res.code === 0 && res.list.length !== 0) {
            console.log(res.list.length)
            this.records = res.list;
            this.noRecords = false
            this.lookMoreShow = true
          } else {
            this.noRecords = true
            this.lookMoreShow = false
          }
        })
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import "./repayment.scss";
</style>
