<template>
  <div class="recentPaymoney">
    <!--<div class="title">-->
    <!--<div class="titleLeft" @click="back()"><img src="../../assets/nav_btn_back@2x.png" alt=""></div>-->
    <!--<div class="titleMid"><span>借款记录</span></div>-->
    <!--</div>-->
    <m-header>还款计划</m-header>
    <div class="tab">
      <mt-popup
        v-model="popupVisible"
        position="bottom" class="box">
        <div @click.stop="selectState('全部')">全部</div>
        <template v-for="item in lists">
          <div @click.stop="selectState(item)">{{item}}</div>
        </template>
        <div id="boxBlank"></div>
        <div @click="popupVisible = false">取消</div>
      </mt-popup>
      <mt-popup
        v-model="popupVisible2"
        position="bottom" class="box">
        <div @click.stop="selectState2('全部')">全部</div>
        <div @click.stop="selectState2('臻e贷')">臻e贷</div>
        <div @click.stop="selectState2('臻分期')">臻分期</div>
        <div id="boxBlank"></div>
        <div @click="popupVisible2 = false">取消</div>
      </mt-popup>
      <div class="tabItem" @click="popupVisible = true">
        <div class="table-left">时间</div>
        <input class="selectInput" type="text" placeholder="" v-model="timeSelect" readonly>
        <div class="rightIcon"><img src="../../assets/bottom.png" width="26" height="14"></div>
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
    <div class="recordWrapper">
      <div class="play-table" v-for="item in records"  v-show="tableShow">
        <div class="play-table-name">{{item.repayDate | _dateAddHorizontal}}</div>
        <div class="play-table-waitRepay">待还{{item.amount}}元</div>
        <div class="play-table-money"></div>
        <div class="play-table-date">臻分期-{{item.productName}},第{{item.alreadyRepayTimes}}期/共{{item.repayTotalTimes}}期</div>
        <div class="play-table-count">{{item.id | idstatus}}</div>
        <div class="play-table-outDate" v-show="item.overDueDays !== null && item.overDueDays !== 0">逾期{{item.overDueDays}}天</div>
        <div class="autoless">自动扣款<img src="../../assets/right.png" alt=""></div>
      </div>
    </div>
    <div class="play-table-noRecords" v-show="noRecords">暂无数据</div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {Toast} from 'mint-ui'
  import {
    currentBorrowAmount,
    borrowRecord,
    recentRepaymentPlan,
    addRecord,
    repaymentPlan,
    timeTableList,
    timeTableListAfter
  } from '../../api/index'
  import {getTime, getDate, dateAddHorizontal} from '../../common/js/times'
  import {} from '../../common/js/jquery-3.2.1.slim.min.js'
  import mHeader from '@/components/Header'
  export default {
    components: {
      mHeader
    },
    data() {
      return {
        isActive1: true,
        records: [],
        lists: [],
        id: '',
        promptShow: true,
        tableShow: true,
        popupVisible: false,
        popupVisible2: false,
        timeSelect: '',
        typeSelect: '',
        data: '',
        noRecords: false,
        tableShow: true
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
      },
      idstatus(t) {
        return t === 0 ? '借款' : t === 1 ? '还款' : ''
      }
    },
    created() {
      this.accountTel = this.$route.query.accountTel;
      this.recentRepaymentPlan();
      this.timeTableListAfter()
//      this.selectState()
    },
    methods: {
      back() {
        this.$router.goBack()
      },
      //      还款计划
      recentRepaymentPlan() {
        let params = {
          mobile: this.accountTel

        }
        recentRepaymentPlan(params).then(res => {
          if (res.code === 0 && res.list.length !== 0) {
            this.records = res.list
            this.noRecords = false
            this.tableShow = true

          } else {
            this.noRecords = true
            this.lookMoreShow = false
          }
        })
      },
      // 时间转化
      dateYearMonth(t) {
        let data
        data = t.substr(0, 4) + t.substr(5, 2)
        return data
      },
//      proup的点击事件
      selectState(state) {
        this.timeSelect = state;
        let time = this.dateYearMonth(state)
        // console.log('dateYearMonth:' + this.dateYearMonth(state))
        this.popupVisible = false;
        if (state == '全部') {
          this.recentRepaymentPlan()
        } else {
          let params = {
            mobile: this.accountTel,
            applyDate: time
          }

          recentRepaymentPlan(params).then(res => {
            if (res.code === 0 && res.list.length !== 0) {
              this.records = res.list
              console.log(this.records)
              this.noRecords = false
              this.tableShow = true
            } else {
              this.noRecords = true
              this.tableShow = false
            }
          })
        }
      },
      selectState2: function (state) {
        this.typeSelect = state;
        this.popupVisible2 = false;
        if (state == '全部') {
          this.recentRepaymentPlan()
        }
        if (state == '臻分期') {
          this.recentRepaymentPlan()
        }
        if (state == '臻e贷') {
          let params = {
            mobile: this.accountTel

          }
          recentRepaymentPlan(params).then(res => {
            if (res.code === 0 && res.list.length !== 0) {
              this.records = res.list.slice
              this.noRecords = true
            } else {
              this.noRecords = true
            }
          })
        }
      },
      //最近6个月时间列表查询
      timeTableListAfter() {
        let params = {
          mobile: this.accountTel
        }
        timeTableListAfter(params).then(res => {
          if (res.code === 0 && res.list.length !== 0) {
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
  @import "./recentPaymoney.scss";
</style>
