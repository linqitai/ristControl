<template>
<div class="borrowRecord">
  <div class="title">
    <div class="titleLeft" @click="back()"><img src="../../assets/nav_btn_back@2x.png" alt=""></div>
    <div class="titleMid"><span>借款记录</span></div>
  </div>
  <div class="tab">
    <mt-popup
      v-model="popupVisible"
      position="bottom" class="box" >
      <div @click.stop="selectState('全部')">全部</div>
      <template v-for="item in lists">
      <div @click.stop="selectState(item)">{{item}}</div>
      </template>
      <div id="boxBlank"></div>
      <div @click="popupVisible = false">取消</div>
    </mt-popup>
    <mt-popup
      v-model="popupVisible2"
      position="bottom" class="box" >
      <div @click.stop="selectState2('臻e贷')">臻e贷</div>
      <div @click.stop="selectState2('臻分期')">臻分期</div>
      <div id="boxBlank"></div>
      <div @click="popupVisible2 = false">取消</div>
    </mt-popup>
    <div class="tabItem" @click="popupVisible = true">
      <div class="table-left">时间</div>
      <input class="selectInput" type="text" placeholder="" v-model="timeSelect" readonly>
      <div class="rightIcon"><img src="../../assets/bottom.png" alt=""></div>
    </div>
    <div class="tabItem" @click="popupVisible2 = true">
      <div class="table-left">产品类型</div>
      <input class="selectInput" type="text" placeholder="" v-model="typeSelect" readonly>
      <div class="rightIcon"><img src="../../assets/bottom.png" alt=""></div>
    </div>
    <!--<div class="tabItem" @click="typeTable()">-->
      <!--<span>产品类型</span><img src="../../assets/bottom.png" alt="">-->
    <!--</div>-->
  </div>
  <div class="prompt2" v-show="promptShow"></div>
  <div class="play-table" v-for="item in records" @click="toDetailRecords(item.id)" v-show="tableShow">
    <div class="play-table-name">臻分期</div>
    <div class="play-table-money">{{item.amount}}元</div>
    <div class="play-table-date">{{item.applyTime | _getDate}}</div>
    <div class="play-table-count">共{{item.repayTotalTimes}}期</div>
  </div>

</div>
</template>

<script>
  import axios from 'axios'
  import {Toast} from 'mint-ui'
  import {currentBorrowAmount, borrowRecord, recentRepaymentPlan, addRecord, repaymentPlan, timeTableList} from '../../api/index'
  import {getTime, getDate, dateAddHorizontal} from '../../common/js/times'
  import {} from '../../common/js/jquery-3.2.1.slim.min.js'
//  $(document).ready(function(){
//    $(".btn1").click(function(){
//
//    });
//  });
  export default {
    data() {
      return {
        isActive1: true,
        records: [],
        lists: [],
        id: '',
        promptShow: true,
        tableShow: true,
        timeTableShow: false,
        popupVisible: false,
        popupVisible2: false,
        timeSelect: '',
        typeSelect: '',
        data: ''
      }
    },
    filters: {
      _getDate(t) {
        return getDate(t)
      },
      _dateAddHorizontal(t) {
        return dateAddHorizontal(t)
      },
      _dataYaerMonth(t) {
        return dataYaerMonth(t)
      }
    },
    created(){
      this.accountTel = this.$route.query.accountTel;
      this.borrowRecord();
      this.timeTableList()
      this.selectState()
    },
    methods:{
      back() {
        this.$router.goBack()
      },
      //      借款记录
      borrowRecord() {
        let params = {
          mobile: this.accountTel

        }
        borrowRecord(params).then(res => {
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
      },

      // 点击进入详细还款计划
      toDetailRecords(id){
        this.$router.push(`/repayment?accountTel=${this.accountTel}&id=${id}`)
//        {
//          let params = {
//            applyId: this.id
//          }
//          repaymentPlan(params).then(res => {
////          if (res.code === 0 && res.list.length !== 0) {
////            console.log(res.list.length)
////            this.records = res.list;
////            this.noRecords = false
////            this.lookMoreShow = true
////          } else {
////            this.noRecords = true
////            this.lookMoreShow = false
////          }
//          })
//        }
      },
     timeTable() {
//       this.promptShow = false;
//       this.tableShow = false;
     },
      typeTable(){

      },
      // 时间转化
      dateYearMonth(t){
        let data
        data = t.substr(0,4) + t.substr(5,2)
        return data
      },
//      proup的点击事件
      selectState(state){
        this.timeSelect = state;
        let time = this.dateYearMonth(state)
        // console.log('dateYearMonth:' + this.dateYearMonth(state))
        this.popupVisible = false;
        if (state == '全部'){
          this.borrowRecord()
        } else {
          let params = {
            mobile: this.accountTel,
            applyDate: time
          }

          borrowRecord(params).then(res => {
//          if (res.code === 0 && res.list.length !== 0) {
//            console.log(res.list)
//            console.log(res.list)
            this.records = res.list;
//            this.noRecords = false
//            this.lookMoreShow = true
//          } else {
//            this.noRecords = true
//            this.lookMoreShow = false
//          }
//          window.location.reload();
          })
        }
      },
      selectState2:function(state){
         this.typeSelect = state;
        this.popupVisible2 = false;
      },
      //最近6个月时间列表查询
      timeTableList() {
        let params = {
          mobile: this.accountTel
        }
        timeTableList(params).then(res => {
          if (res.code === 0 && res.list.length !== 0) {
            console.log(res.list)
            this.lists = res.list;
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

<style scoped lang="scss">
  @import "./borrowRecord.scss";
</style>
