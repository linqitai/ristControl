<template>
  <div class="">
    <!--<div class="title">-->
      <!--<div class="titleLeft" @click="back()"><img src="../../assets/nav_btn_back@2x.png" alt=""></div>-->
      <!--<div class="titleMid"><span>信用中心</span></div>-->
      <!--&lt;!&ndash;<div class="titleRight"><img src="../../assets/logo_zs@2x.png" alt=""></div>&ndash;&gt;-->
    <!--</div>-->
    <m-header>信用中心</m-header>
    <div class="topciycle">
      <div class="yesmoney">可用信用额度/{{atborrowMoney}}元</div>
      <div class="ciycle">
        <div class="outCiycle">
          <!--<div style="position:absolute;z-index:9999;margin-left:50%; transform: translateX(-50%)">10000元 </div>-->
          <div class="bgimg"></div>
          <div class="circlebiginner">
          </div>
          <div class="transfer"
               v-bind:style="{transform:'rotate(' +transferdeg+'deg)',WebkitTransform:'rotate(' +transferdeg+'deg)'}"></div>
          <div class="transfer"
               v-bind:style="{transform:'rotate(' +transferdega+'deg)',WebkitTransform:'rotate(' +transferdega+'deg)'}"></div>
          <div class="transfer"
               v-bind:style="{transform:'rotate(' +transferdegb+'deg)',WebkitTransform:'rotate(' +transferdegb+'deg)'}"></div>
        </div>
        <!--<div class="circleinner" v-show="selfShow">自评</div>-->
        <div class="circleinner2"><span>信用额度</span>
          <div>{{money}}元</div>
        </div>
        <div class="transfer-block" v-show="circleshow"
             v-bind:style="{transform:'rotate(' +(transferdeg-2)+'deg)',WebkitTransform:'rotate(' +(transferdeg-2)+'deg)'}">
          <div class="transfer-circle"
               v-bind:style="{transform:'rotate(-' +transferdeg+'deg)',WebkitTransform:'rotate(-' +transferdeg+'deg)'}">
            <div class="transfer-score" v-show="scoreshow" :class="{'rightscore':rightscore}">{{money / 200}}</div>
          </div>
        </div>
        <div class="circlebiginner-left">0</div>
        <div class="circlebiginner-right">1000分</div>
        <div class="apply"><span @click="transfer1()">重自评</span>
        </div>
        <div class="promote" @click="goDrawMoney()" v-show="firstDrawMoneyShow">去提额</div>
        <div class="promote" @click="goDrawMoney()" v-show="secondDrawMoneyShow">再提额</div>
        <!--<div class="redPoint" v-show="redPointShow"></div>-->
      </div>
    </div>
    <div class="borrowMoney">
      <div class="box">
        <div class="line1"><b class="boxTitle left">臻e贷</b><span class="ml15 left">由臻e盾、网商银行联合推出</span>

          <div class="rightBtn right" @click="applyBtn()" v-if="isShowApplyM">申请</div>
          <div class="rightBtn right" @click="GiveMBtn()" v-if="isShowGiveM">还款</div>
          <div class="rightBtn right" @click="GiveMBtn()" v-if="isShowGetM">提款</div></div>
        <!--<div class="borrowMoney-top-right">申请</div>-->
        <div class="line2 clear" v-if="false">
          <div class="cell">
            <div class="text1">授信额度(元)</div>
            <div class="text2">暂无</div>
          </div>
          <div class="cell">
            <div class="text1">可提金额(元)</div>
            <div class="text2">暂无</div>
          </div>
        </div>
        <div class="line3">
          <div class="status left">尚未申请</div>
          <!--<div class="rightBtn right" @click="applyBtn()" v-if="isShowApplyM">申请</div>-->
          <!--<div class="rightBtn right" @click="GiveMBtn()" v-if="isShowGiveM">还款</div>-->
          <!--<div class="rightBtn right" @click="GiveMBtn()" v-if="isShowGetM">提款</div>-->
        </div>
      </div>
      <div class="prompt2"></div>
      <div class="box2">
        <div class="line1">
          <b class="boxTitle left">臻分期</b><span class="ml15 left">安全服务，全面分期</span>
          <div class="rightBtn" @click="goStages()">申请</div>
        </div>
        <div class="line3">
          <div class="status left">尚未申请</div>
        </div>
      </div>
    </div>
    <div class="prompt2"></div>
    <div class="message">
      <div class="message-top" @click="goOrganinzingData()"><span>融资信息</span><img src="../../assets/right.png" alt=""></div>
      <div class="message-mid"><span>暂无数据</span><span></span></div>
      <!--<div class="message-mid"><span>您的额度已过期,请重新申请!</span><span>10:00</span></div>-->
      <!--<div class="message-mid"><span>您的额度已过期,请重新申请!</span><span>10:00</span></div>-->
      <!--<div class="message-bottom2" v-show="messageshow" @click="notmore()"><span>收起</span></div>-->
      <!--<div class="message-bottom" v-show="moreshow" @click="more()">查看更多</div>-->
    </div>
    <div class="prompt2"></div>
    <div class="play">
      <div class="tab">
        <div class="tabItem" :class="[isActive1?'active':'']" @click="tableClass1()">最近还款计划</div>
        <div class="tabItem" :class="[isActive2?'active':'']" @click="tableClass2()">借款记录</div>
      </div>
      <!--还款计划-->
      <div class="moneyPlay" v-show="moneyPlayShow">
        <div class="play-table" v-for="item in playRecords" v-show="playRecords.length>0">
          <div class="play-table-name">{{item.repayDate | _dateAddHorizontal}}</div>
          <div class="play-table-date">臻分期-{{item.productName}},第{{item.alreadyRepayTimes}}期/共{{item.repayTotalTimes}}期</div>
          <div class="play-table-waitRepay">待还{{item.amount}}元</div>
          <div class="play-table-outDate2" v-show="item.overDueDays !== null && item.overDueDays !== 0">逾期{{item.overDueDays}}天</div>
          <div class="autoless">自动扣款<img src="../../assets/right.png" alt=""></div>
        </div>
        <div class="lookMore" @click="lookMore2()" v-show="lookMoreShow">查看更多</div>
        <div class="play-table-noRecords" v-show="noRecords">暂无数据</div>
      </div>
      <!--借款记录-->
      <div v-show="moneyRecords">
        <!--v-for="item in records"-->
        <div class="play-table" v-for="item in records" v-show="records.length>0">
          <div class="play-table-name">{{item.dateTime | _dateAddHorizontal}}</div>
          <div class="play-table-money">{{item.amount}}元</div>
          <div class="play-table-date">臻分期-{{item.productName}}</div>
          <div class="play-table-count">{{item.id | idstatus}}</div>
          <div class="play-table-outDate" v-show="item.overDueDays !== null && item.overDueDays !== 0">逾期{{item.overDueDays}}天</div>
        </div>
        <div class="lookMore" @click="lookMore()" v-show="lookMoreShow">查看更多</div>
        <div class="play-table-noRecords" v-show="noRecords">暂无数据</div>
      </div>
    </div>
    <borrowrecord :repeatIsShow="repeatIsShow" @changeIsShowType="changeIsShowType"></borrowrecord>
  </div>

</template>

<script>
  import axios from 'axios'
  import {Toast} from 'mint-ui'
  import {currentBorrowAmount, borrowRecord, recentRepaymentPlan, addRecord} from '../../api/index'
  import {getDate, dateAddHorizontal} from '../../common/js/times'
  import mHeader from '@/components/HeaderBackToApp'
  import borrowrecord from '@/pages/drawMoney/borrowRecord'
//  const root = '/rz' // 线上
  const root = '/zsf' // 本地测试，打包后线上
  export default {
    components: {
      mHeader,
      borrowrecord
    },
    data() {
      return {
        repeatIsShow: false,
        moneyRecords: false,
        moneyPlayShow: true,
        redPointShow: false,
        isActive1: true,
        isActive2: false,
        mobile: '',
        accountTel: '',
        username: '',
        idcard: '',
        number: '',
        marryState: '',
        objectState: '',
        childrenState: '',
        pay: '',
        popupVisible: false,
        popupVisible2: false,
        popupVisible3: false,
        initialdeg: 55,//初始化半角度
        allscore: 1000,//总分值
        transferdeg: 235,
        transferdega:235,
        transferdegb:235,
        rightscore:true,
        score: null,
        marryStateValue: '',
        objectStateValue: '',
        childrenStateValue: '',
        scoreshow: false,
        circleshow: false,
        objectshow: true,
        childrenshow: true,
        money: null,
        noRecords: false,
        currentYear: '',
        borrowMoney: '',
        atborrowMoney: '',
        records: [],
        playRecords: [],
        amount: '',
        isShowApplyM: true,
        isShowGiveM: false,
        isShowGetM: false,
        lookMoreShow: false,
        firstDrawMoneyShow: true,
        secondDrawMoneyShow: false,
        outDateShow: true
      }
    },
    filters: {
      _getDate(t) {
        return getDate(t)
      },
      _dateAddHorizontal(t) {
        if(t == null || t == '' || t == undefined) {
          return
        }
        return dateAddHorizontal(t)
      },
      status1(t) {
        return t === 2 ? '还款' : ''
      },
      status2(t) {
        return t === 1 ? '借款' : ''
      },
      idstatus(t) {
        return t === 0 ? '借款' : t === 1 ? '还款' : ''
      }
    },
    created() {

      this.accountTel = this.$route.query.accountTel;
      this.redPoint();
      this.idcard = this.$route.query.idcard;
      this.marryStateValue = this.$route.query.marryStateValue;
      this.objectStateValue = this.$route.query.objectStateValue;
      this.childrenStateValue = this.$route.query.childrenStateValue;
      this.pay = this.$route.query.pay;
      this.username = this.$route.query.username;
//      this.showScore = parseInt(this.$route.query.score);
//      this.showMoney = this.$route.query.money;
      this.loans = this.$route.query.loans;
//      this.score = this.showScore;
//      this.money = this.showMoney;  // 自评钱
//      this.promoteScore = this.$route.query.promoteScore; // 提额后总分
//      this.promoteTotal = this.$route.query.promoteTotal; // 提额后总钱数x
//      if(this.$route.query.from === 'self'){
//        this.score = this.showScore;
//        this.money = this.showMoney;  // 自评钱
//        const deg = 360 - this.initialdeg * 2;
//        const eachscore = this.allscore / deg;
//        const needtransdeg = Math.floor(this.score / eachscore);
//        this.score>this.allscore/2?this.rightscore=true:this.rightscore=false;
//        if(needtransdeg>180){
//          this.transferdega = this.transferdega + 90;
//          this.transferdegb = this.transferdegb + 180;
//          this.transferdeg = this.transferdeg+needtransdeg;
//        }else if(needtransdeg>90){
//          this.transferdega = this.transferdega + 90;
//          this.transferdegb = this.transferdegb + needtransdeg;
//          this.transferdeg = this.transferdegb;
//        }else{
//          this.transferdeg = this.transferdeg+needtransdeg;
//        };
//        this.scoreshow = true;//分数
//        this.circleshow = true;//旋转圆
//      }
//      else if(this.$route.query.from === 'promote'){
//        this.score = this.promoteScore
//        this.money = parseInt(this.promoteTotal)
//        const deg = 360 - this.initialdeg * 2;
//        const eachscore = this.allscore / deg;
//        const needtransdeg = Math.floor(this.score / eachscore);
//        this.score>this.allscore/2?this.rightscore=true:this.rightscore=false;
//        if(needtransdeg>180){
//          this.transferdega = this.transferdega + 90;
//          this.transferdegb = this.transferdegb + 180;
//          this.transferdeg = this.transferdeg+needtransdeg;
//        }else if(needtransdeg>90){
//          this.transferdega = this.transferdega + 90;
//          this.transferdegb = this.transferdegb + needtransdeg;
//          this.transferdeg = this.transferdegb;
//        }else{
//          this.transferdeg = this.transferdeg+needtransdeg;
//        };
//        this.scoreshow = true;//分数
//        this.circleshow = true;//旋转圆
//      }
        this.recentRepaymentPlan()
     // }
      let params = {
        mobile: this.accountTel
      }
      currentBorrowAmount(params).then(res => {
        let borrowMoney = res.obj.currentBorrowAmount
        this.atborrowMoney = this.money - this.borrowMoney
      })
    },
    methods: {
      changeIsShowType(flag) {
        this.repeatIsShow = flag
      },
      GetMBtn() {
        Toast('即将上线，敬请期待')
      },
      GiveMBtn() {
        Toast('即将上线，敬请期待')
      },
      applyBtn() {
        Toast('即将上线，敬请期待')
        if (this.accountTel) {
          let params = {
            mobile: this.accountTel,
            name: this.username,
            identityNo: this.idcard,
            marriage: parseInt(this.marryStateValue),
            spouseOCP: parseInt(this.objectStateValue),
            childOCP: parseInt(this.childrenStateValue),
            fmSaving: this.pay,
            action: 5,
            score: this.score,
            quota: this.money
          }
          axios.post(root + '/selfeval/addRecord', params).then(res => {
//            this.$router.push(`/writeSelfEvaInfo?accountTel=${this.accountTel}&type=repeat`)
          })
        }
      },
//      借款记录
      borrowRecord() {
        let params = {
          mobile: this.accountTel
        }
        borrowRecord(params).then(res => {
          if (res.code === 0 && res.list.length !== 0) {
//            let all = []
//            for(let i = 0; i < res.list.length; i ++){
//              let list = res.list[i]
//              list.forEach(function (item) {
//                if(item.status === 2){
//                  item.type = '还款'
//                  item.time = item.repayDate
//                }
//                if(item.loadStatus === 2){
//                  item.type = '借款'
//                  item.time = item.dealTime
//                }
//                all.push(item)
//              })
//              this.noRecords = false
//              this.lookMoreShow = true
//            }
//            this.records = all.slice(0, 3)
            console.log(res.list[0].dateTime)
            this.records = res.list.slice(0,3)
            this.noRecords = false
            this.lookMoreShow = true
          } else {
            this.noRecords = true
            this.lookMoreShow = false
          }
        })
      },
      // 最近还款计划
      recentRepaymentPlan() {
        let params = {
          mobile: this.accountTel
        }
        recentRepaymentPlan(params).then(res => {
          if (res.code === 0 && res.list.length !== 0) {
            this.playRecords = res.list.slice(0,3);
            this.noRecords = false
            this.lookMoreShow = true
          } else {
            this.noRecords = true
            this.lookMoreShow = false
          }
        })
      },
      //        app点击返回
//      back() {
//        let ua = navigator.userAgent.toLowerCase()
//        if (/iphone|ipad|ipod/.test(ua)) {
//          popToViewController()
//        } else if (/android/.test(ua)) {
//          htmlToJava.popToViewController()
//        }
//      },
      lookMore(){
        this.repeatIsShow = true
        // this.$router.push(`/borrowRecord?accountTel=${this.accountTel}`)
      },
      lookMore2(){
        this.$router.push(`/recentPaymoney?accountTel=${this.accountTel}`)
      },
      transfer1() {
        this.accountTel = this.$route.query.accountTel;
        this.username = this.$route.query.username;
        this.idcard = this.$route.query.idcard;
        this.marryStateValue = this.$route.query.marryStateValue;
        this.objectStateValue = this.$route.query.objectStateValue;
        this.childrenStateValue = this.$route.query.childrenStateValue;
        this.pay = this.$route.query.pay;
        this.type = this.$route.query.type;
        if (this.accountTel) {
          let params = {
            mobile: this.accountTel,
            name: this.username,
            identityNo: this.idcard,
            marriage: parseInt(this.marryStateValue),
            spouseOCP: parseInt(this.objectStateValue),
            childOCP: parseInt(this.childrenStateValue),
            fmSaving: this.pay,
            action: 2,
            score: this.score,
            quota: this.money
          }
          axios.post(root + '/selfeval/addRecord', params).then(res => {
//            this.$router.push(`/writeSelfEvaInfo?accountTel=${this.accountTel}&type=repeat`)
          })
        }
        if (this.accountTel) {
          let params = {
            mobile: this.accountTel,
          }
          let config = {
            headers: {
              'Content-Type': 'application/json'
            }
          }
          axios.post(root + '/selfeval/reEvaluate', params, config).then(res => {
            if (res.data === true) {
              this.$router.push(`/writeSelfEvaInfo?accountTel=${this.accountTel}&type=repeat`)
            }
            else {
              Toast('6小时内您无法重新自评')
            }
          })
        }

      },
      goStages() {
        console.log(this.atborrowMoney)
        var asd = JSON.stringify({"atborrowMoney": this.atborrowMoney});
        let ua = navigator.userAgent.toLowerCase()
        if (/iphone|ipad|ipod/.test(ua)) {
          gotoInstallment(asd)
        } else if (/android/.test(ua)) {
          htmlToJava.gotoInstallment(asd)
        }
        if (this.accountTel) {
          let params = {
            mobile: this.accountTel,
            name: this.username,
            identityNo: this.idcard,
            marriage: parseInt(this.marryStateValue),
            spouseOCP: parseInt(this.objectStateValue),
            childOCP: parseInt(this.childrenStateValue),
            fmSaving: this.pay,
            action: 6,
            score: this.score,
            quota: this.money
          }
          axios.post(root + '/selfeval/addRecord', params).then(res => {
//            this.$router.push(`/writeSelfEvaInfo?accountTel=${this.accountTel}&type=repeat`)
          })
        }
      },
      tableClass1() {
        this.isActive1 = true;
        this.isActive2 = false;
        this.moneyPlayShow = true;
        this.moneyRecords = false;
        this.recentRepaymentPlan()
      },
      tableClass2() {
        this.isActive1 = false;
        this.isActive2 = true;
        this.moneyPlayShow = false;
        this.moneyRecords = true;
        this.borrowRecord()
      },
      goDrawMoney(){
        this.changeRedPoint()
        this.username = this.username
        this.$router.push(`/promoteMoney?accountTel=${this.accountTel}&atborrowMoney=${this.atborrowMoney}`)
        if (this.accountTel) {
          let params = {
            mobile: this.accountTel,
            name: this.username,
            identityNo: this.idcard,
            marriage: parseInt(this.marryStateValue),
            spouseOCP: parseInt(this.objectStateValue),
            childOCP: parseInt(this.childrenStateValue),
            fmSaving: this.pay,
            action: 4,
            score: this.score,
            quota: this.money
          }
          axios.post(root + '/selfeval/addRecord', params).then(res => {
          })
        }
      },
      goOrganinzingData(){
//        this.$router.push(`/finincing?accountTel=${this.accountTel}`)
      },
      redPoint(){
        let params = {
          mobile: this.accountTel,
        }
        axios.post(root + '/selfeval/queryIsRed', params).then(res => {
          this.status = res.data.data.status
          this.promoteTotal = (res.data.data.promoteTotal === undefined) ? 0 : res.data.data.promoteTotal;
          this.quota = res.data.data.quota;
          if(this.promoteTotal == 0){
            this.firstDrawMoneyShow = true;
            this.secondDrawMoneyShow = false
          }
          else{
            this.firstDrawMoneyShow = false;
            this.secondDrawMoneyShow = true
          }
          console.log(this.promoteTotal)
          console.log(this.quota)
          this.money = this.promoteTotal + this.quota
          this.score = this.money / 200
          const deg = 360 - this.initialdeg * 2;
          const eachscore = this.allscore / deg;
          const needtransdeg = Math.floor(this.score / eachscore);
          this.score > this.allscore / 2 ? this.rightscore = true : this.rightscore = false;
          if (needtransdeg > 180) {
            this.transferdega = this.transferdega + 90;
            this.transferdegb = this.transferdegb + 180;
            this.transferdeg = this.transferdeg + needtransdeg;
          } else if (needtransdeg > 90) {
            this.transferdega = this.transferdega + 90;
            this.transferdegb = this.transferdegb + needtransdeg;
            this.transferdeg = this.transferdegb;
          } else {
            this.transferdeg = this.transferdeg + needtransdeg;
          }
          this.transferdega = this.transferdega;
          this.transferdegb = this.transferdegb;
          this.transferdeg = this.transferdeg;
          this.scoreshow = true
          this.circleshow = true
        })
      },
      changeRedPoint(){
        let params = {
          mobile: this.accountTel,
        }
        axios.post(root + '/selfeval/changeRedPoint', params).then(res => {
          this.promoteTotal = res.data.data.promoteTotal === undefined ? 0 : res.data.data.promoteTotal
            console.log(this.promoteTotal)
        })
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "./repeatScore.scss";
</style>
