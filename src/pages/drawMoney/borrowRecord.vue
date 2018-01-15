<template>
  <div class="borrowRecord" ref="borrowRecord" v-show="repeatIsShow">
    <!--<div class="title">-->
      <!--<div class="titleLeft" @click="back()"><img src="../../assets/nav_btn_back@2x.png" alt=""></div>-->
      <!--<div class="titleMid"><span>借款记录</span></div>-->
    <!--</div>-->
    <m-header @closePage="closePage" >借款记录</m-header>
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
    <!--<div class="totalRemoney">111</div>-->
    <!--<div class="prompt2" v-show="promptShow">111</div>-->
    <div class="recordWrapper">
      <div class="totalRemoney" v-show="totalborrowShow">共借款{{totalBorrowAmount / 100}}元,已还款{{totalPayAmount / 100}}元</div>
      <div class="play-table" v-for="item in records" v-show="tableShow">
        <div class="play-table-name">{{item.dateTime | _dateAddHorizontal}}</div>
        <div class="play-table-money">{{item.amount / 100}}元</div>
        <div class="play-table-date">臻分期-{{item.productName}}</div>
        <div class="play-table-count">{{item.id | idstatus}}</div>
        <div class="play-table-outDate" v-show="item.overDueDays !== null && item.overDueDays !== 0">逾期{{item.overDueDays}}天</div>
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
    timeTableList
  } from '../../api/index'
  import {getTime, getDate1, dateAddHorizontal} from '../../common/js/times'
  import {} from '../../common/js/jquery-3.2.1.slim.min.js'
  import mHeader from '@/components/HeaderClose.vue'
  export default {
    props: {
      repeatIsShow: {
        type: Boolean,
        default: false
      }
    },
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
        timeTableShow: false,
        popupVisible: false,
        popupVisible2: false,
        timeSelect: '',
        typeSelect: '',
        data: '',
        noRecords: false,
        tableShow: true,
        totalborrowShow: true,
        totalPayAmount: '',
        totalBorrowAmount: ''
      }
    },
    filters: {
      _dateAddHorizontal(t) {
        return dateAddHorizontal(t)
      },
      idstatus(t) {
        return t === 0 ? '借款' : t === 1 ? '还款' : ''
      }
    },
    created() {
      this.accountTel = this.$route.query.accountTel;
      this.borrowRecord();
      this.timeTableList()
    },
    methods: {
      closePage() {
//        this.$refs.borrowRecord.style.display = 'none'
        this.$emit('changeIsShowType', false)
      },
      //      借款记录
      borrowRecord() {
        let params = {
          mobile: this.accountTel

        }
        borrowRecord(params).then(res => {
          if (res.code === 0 && res.list.length !== 0) {
            this.records = res.list
            this.totalPayAmount = res.obj.totalPayAmount
            this.totalBorrowAmount = res.obj.totalBorrowAmount
            this.tableShow = true
            this.noRecords = false
            this.totalborrowShow = true
          } else {
            this.noRecords = true
            this.lookMoreShow = false
            this.totalborrowShow = false
          }
        })
      },
      timeTable() {
//       this.promptShow = false;
//       this.tableShow = false;
      },
      typeTable() {

      },
      // 时间转化
      dateYearMonth(t) {
        let data = ''
        if(t != undefined) {
          data = t.substr(0, 4) + t.substr(5, 2)
        }
        return data
      },
//      proup的点击事件
      selectState(state) {
        this.timeSelect = state;
        console.log(state)
        let time = this.dateYearMonth(state)
        // console.log('dateYearMonth:' + this.dateYearMonth(state))
        this.popupVisible = false;
        if (state == '全部') {
          this.borrowRecord()
        } else {
          let params = {
            mobile: this.accountTel,
            applyDate: time
          }
          borrowRecord(params).then(res => {
            if (res.code === 0 && res.list.length !== 0) {
              this.records = res.list
              this.tableShow = true
                this.noRecords = false
              this.totalborrowShow = true
            } else {
              this.tableShow = false
              this.noRecords = true
              this.totalborrowShow = false
            }
          })
        }
      },
      selectState2: function (state) {
        this.typeSelect = state;
        this.popupVisible2 = false;
        if (state == '全部') {
          this.borrowRecord()
        }
        if (state == '臻分期') {
          this.borrowRecord()
        }
        if (state == '臻e贷') {
          let params = {
            mobile: this.accountTel

          }
          borrowRecord(params).then(res => {
            if (res.code === 0 && res.list.length !== 0) {
              this.records = res.list.slice
              this.noRecords = true
              this.totalborrowShow = false
            } else {
              this.noRecords = false
              this.totalborrowShow = true
            }
          })
        }
      },
      //最近6个月时间列表查询
      timeTableList() {
        let params = {
          mobile: this.accountTel
        }
        timeTableList(params).then(res => {
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
  @import "./borrowRecord.scss";
</style>
