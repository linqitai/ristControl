<template>
  <div class="finincing">
    <!--<div class="title">-->
      <!--<div class="titleLeft" @click="back()"><img src="../../assets/nav_btn_back@2x.png" alt=""></div>-->
      <!--<div class="titleMid"><span>融资消息</span></div>-->
    <!--</div>-->
    <m-header>融资消息</m-header>
    <div class="table">
      <img src="../../assets/closed.png" alt="">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {Toast} from 'mint-ui'
  import {currentBorrowAmount, borrowRecord, recentRepaymentPlan, addRecord, repaymentPlan} from '../../api/index'
  import {getTime, getDate, dateAddHorizontal} from '../../common/js/times'
  import mHeader from '@/components/Header'

  export default {
    components: {
      mHeader
    },
    data() {
      return {}
    },
    created() {
    },
    methods: {
      back() {
        this.$router.goBack()
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import "./finincing.scss";
</style>
