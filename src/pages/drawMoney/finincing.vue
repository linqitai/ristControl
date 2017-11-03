<template>
   <div class="finincing">
     <div class="title">
       <div class="titleLeft" @click="back()"><img src="../../assets/nav_btn_back@2x.png" alt=""></div>
       <div class="titleMid"><span>融资消息</span></div>
     </div>
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
  export default {
    data() {
      return {
      }
    },
    created(){
    },
    methods:{
      back() {
        this.$router.goBack()
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import "./finincing.scss";
</style>
