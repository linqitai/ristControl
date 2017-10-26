<template>
  <div class="">
    <div class="title">
      <div class="titleLeft" @click="back()"><img src="../../assets/nav_btn_back@2x.png" alt=""></div>
      <div class="titleMid"><span>信用中心</span></div>
      <div class="titleRight"><img src="../../assets/logo_zs@2x.png" alt=""></div>
    </div>
    <div class="topciycle">
      <div class="yesmoney">可用额度:{{atborrowMoney}}元</div>
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
        <div class="circleinner2" v-show="selfShow2"><span>授信额度</span>
          <div>{{money}}元</div>
        </div>
        <div class="transfer-block" v-show="circleshow"
             v-bind:style="{transform:'rotate(' +(transferdeg-2)+'deg)',WebkitTransform:'rotate(' +(transferdeg-2)+'deg)'}">
          <div class="transfer-circle"
               v-bind:style="{transform:'rotate(-' +transferdeg+'deg)',WebkitTransform:'rotate(-' +transferdeg+'deg)'}">
            <div class="transfer-score" v-show="scoreshow" :class="{'rightscore':rightscore}">{{score}}</div>
          </div>
        </div>
        <div class="circlebiginner-left">0</div>
        <div class="circlebiginner-mid" v-show="Reappraisal">|</div>
        <div class="circlebiginner-right">1000分</div>
        <div class="apply"><img v-show="Reappraisal" src="../../assets/promote.png" alt=""><span @click="transfer1()">重新自评</span>
        </div>
        <div class="promote"><img src="../../assets/repeat.png" alt="">去提额</div>
      </div>
    </div>
    <div class="borrowMoney">
      <div class="borrowMoney-top">
        <div class="borrowMoney-top-left"><b>臻e贷</b><span>前往网商银行借款</span></div>
        <div class="borrowMoney-top-right">申请</div>
      </div>
      <div class="borrowMoney-bottom">
        <div class="borrowMoney-bottom-left"><b>臻分期</b><span>臻e盾产品支付分期啦</span></div>
        <div class="borrowMoney-bottom-right" @click="goStages()">申请</div>
      </div>
    </div>
    <div class="prompt2"></div>
    <div class="message">
      <div class="message-top"><span>|&#x3000;融资信息</span><img src="../../assets/right.png" alt=""></div>
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
      <div class="moneyPlay" v-show="moneyPlayShow">
        <div class="play-table" v-for="item in playRecords">
          <div class="play-table-name">臻分期</div>
          <div class="play-table-money">{{item.amount}}元</div>
          <div class="play-table-date">{{item.repayDate | _dateAddHorizontal}}</div>
          <div class="play-table-count">第{{item.repayPeriod}}期</div>
        </div>
        <div class="play-table-noRecords" v-show="noRecords">暂无数据</div>
        <!--<div>暂无数据</div>-->
      </div>
      <!--借款记录-->
      <div v-show="moneyRecords">
        <!--v-for="item in records"-->
        <div class="play-table" v-for="item in records">
          <div class="play-table-name">臻分期</div>
          <div class="play-table-money">{{item.amount}}元</div>
          <div class="play-table-date">{{item.applyTime | _getDate}}</div>
          <div class="play-table-count">共{{item.repayTotalTimes}}期</div>
        </div>
        <div class="play-table-noRecords" v-show="noRecords">暂无数据</div>
      </div>
    </div>
  </div>

</template>

<script>
  import axios from 'axios'
  import {Toast} from 'mint-ui'
  import {currentBorrowAmount, borrowRecord, recentRepaymentPlan} from '../../api/index'
  import {getDate, dateAddHorizontal} from '../../common/js/times'

  export default {
    name: 'HelloWorld',
    data() {
      return {
        moneyRecords: false,
        moneyPlayShow: true,
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
        Reappraisal: true,
        selfShow2: true,
        money: null,
        noRecords: false,
        currentYear: '',
        borrowMoney: '',
        atborrowMoney: '',
        records: [],
        playRecords: [],
        amount: ''
      }
    },
    filters: {
      _getDate(t) {
        return getDate(t)
      },
      _dateAddHorizontal(t) {
        return dateAddHorizontal(t)
      }
    },
    created() {
      this.accountTel = this.$route.query.accountTel;
      this.idcard = this.$route.query.idcard;
      this.marryStateValue = this.$route.query.marryStateValue;
      this.objectStateValue = this.$route.query.objectStateValue;
      this.childrenStateValue = this.$route.query.childrenStateValue;
      this.pay = this.$route.query.pay;
      this.username = this.$route.query.username;
      this.showScore = parseInt(this.$route.query.score);
      this.showMoney = this.$route.query.money;
      this.loans = this.$route.query.loans;
      this.score = this.showScore;
      this.money = this.showMoney;
      const deg = 360 - this.initialdeg * 2;
      const eachscore = this.allscore / deg;
      const needtransdeg = Math.floor(this.score / eachscore);
      this.score>this.allscore/2?this.rightscore=true:this.rightscore=false;
      if(needtransdeg>180){
         this.transferdega = this.transferdega + 90;
         this.transferdegb = this.transferdegb + 180;
         this.transferdeg = this.transferdeg+needtransdeg;
      }else if(needtransdeg>90){
         this.transferdega = this.transferdega + 90;
         this.transferdegb = this.transferdegb + needtransdeg;
         this.transferdeg = this.transferdegb;
      }else{
         this.transferdeg = this.transferdeg+needtransdeg;
      };

      this.selfShow2 = true;//授信
      this.scoreshow = true;//分数
      this.circleshow = true;//旋转圆
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
//      借款记录
      borrowRecord() {
        let params = {
          mobile: this.accountTel
        }
        borrowRecord(params).then(res => {
          if (res.code === 0 && res.list.length !== 0) {
            console.log(res.list.length)
            this.records = res.list;
          } else {
            this.noRecords = true
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
            this.playRecords = res.list;
          } else {
            this.noRecords = true
          }
        })
      },
      //点击婚姻状态
      selectState: function (state) {
        this.marryState = state;
        this.popupVisible = false;
        if (state == '未婚') {
          this.objectshow = false;// 配偶
          this.childrenshow = false;// 子女

        } else if (state == '离异') {
          this.objectshow = false;// 配偶
          this.childrenshow = true;// 子女
        } else {
          this.objectshow = true;
          this.childrenshow = true;
        }
        if (state == '未婚') {
          this.marryStateValue = 0
          this.objectStateValue = 0
          this.childrenStateValue = 0
        } else if (state == '已婚') {
          this.marryStateValue = 1
        } else if (state == '离异') {
          this.marryStateValue = 2
          this.objectStateValue = 0
        } else {
          this.marryStateValue = 3
        }
      },
      //点击配偶职业
      selectState2: function (state) {
        this.objectState = state;
        this.popupVisible2 = false;
        if (state == '无配偶') {
          this.objectStateValue = 0
        } else if (state == '政府部门') {
          this.objectStateValue = 1
        } else if (state == '事业单位') {
          this.objectStateValue = 2
        } else {
          this.objectStateValue = 3
        }
      },
      //点击子女职业
      selectState3: function (state) {
        this.childrenState = state;
        this.popupVisible3 = false;
        if (state == '无配偶') {
          this.childrenStateValue = 0
        } else if (state == '政府部门') {
          this.childrenStateValue = 1
          if (this.idcard) {
            var date = new Date;
            this.currentYear = date.getFullYear() - this.idcard.substr(6, 4);
            if (this.currentYear >= 24 && this.currentYear <= 40) {
//              this.popupVisible4 = true;
              Toast('请输入准确信息')
            }
          }
        } else if (state == '事业单位') {
          this.childrenStateValue = 2
          if (this.idcard) {
            console.log(this.idcard.substr(6, 4));
            if (this.idcard) {
              var date = new Date;
              this.currentYear = date.getFullYear() - this.idcard.substr(6, 4);
              if (this.currentYear >= 24 && this.currentYear <= 40) {
//                this.popupVisible4 = true;
                Toast('请输入准确信息')
              }
            }
          }
        } else {
          this.childrenStateValue = 3
        }
      },
      //        app点击返回
      back() {
        // Toast('返回')
        let ua = navigator.userAgent.toLowerCase()
        if (/iphone|ipad|ipod/.test(ua)) {
          popToViewController()
        } else if (/android/.test(ua)) {
          htmlToJava.popToViewController()
        }
        window.history.back();
//        let ua = navigator.userAgent.toLowerCase()
//        if (/iphone|ipad|ipod/.test(ua)) {
//          popToViewController()
//        } else if (/android/.test(ua)) {
//          htmlToJava.popToViewController()
//        }
      },
//     姓名正则
      inputname() {
        this.username = this.username.replace()
      },
      //身份证号正则
      inputIdcard() {
        let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        if (reg.test(this.idcard)) {
          Toast('111')
          /*this.idcard = this.idcard.replace()*/
        }
      },
//      transfer() {
//        if (this.accountTel) {
//          let params = {
//            mobile: this.accountTel,
//            name: this.username,
//            identityNo: this.idcard,
//            marriage: parseInt(this.marryStateValue),
//            spouseOCP: parseInt(this.objectStateValue),
//            childOCP: parseInt(this.childrenStateValue),
//            fmSaving: this.pay,
//          }
//          let config = {
//            headers: {
//              'Content-Type': 'application/json'
//            }
//          }
//          const self = this;
//          axios.post('/zsf/selfeval/reEvaluate', params, config).then(res => {
//            const response = res.data;
//            console.log(res)
//            if (res.status == 200 && response.code == 1000 && response.data.score) {
//              const score = response.data.score.toFixed(1);//自评分
//              const deg = 360 - this.initialdeg * 2;
//              const eachscore = this.allscore / deg;
//              const needtransdeg = score / eachscore;
//              this.circleshow = true;
//              this.score = response.data.score.toFixed(0);
//              this.money = response.data.quota;//授信money
//              //重评归0
//              if (self.Reappraisal) {
//                this.transferdeg = 235;
//                self.scoreshow = false;
//                self.Reappraisal = false;
//              }
//              setInterval(function () {
//                if (self.transferdeg >= (235 + needtransdeg)) {
//                  self.scoreshow = true;
//                  self.selfShow2 = true;//授信金额出现
//                  return;
//                }
//                self.transferdeg++;
//              }, 20)
//              //本地评分
//              const nowdate = new Date();
//              const obj = {"time": nowdate.getTime(), "score": this.score, "money": this.money};
//              if (window.localStorage) {
//                window.localStorage.setItem("storescore", JSON.stringify(obj));
//              }
//              //第一次自评6小时定时监测
//              setInterval(function () {
//                console.log(nowdate.getTime(), new Date().getTime())
//                if ((nowdate.getTime() + 6 * 60 * 60 * 1000) < new Date().getTime()) {
//                  self.Reappraisal = true;
////                  this.$router.push(`/home?accountTel=${this.accountTel}`)
//                }
//              }, 1000)
//            } else if (res.status == 200 && response.code == 1101) {
////              this.popupVisible5 = true;
//              Toast('6小时内您无法重新自评')
//              return false;
//            } else if (res.status == 200 && response.code == 1100) {
////              this.popupVisible6 = true;
//              Toast('您输入的信息有误')
//              return false;
//            }
//          }).catch(res => {
//            Toast(res)
//          })
//        } else {
//          Toast('没有接收到accountTel参数')
//        }
//      },
      transfer1() {
        if (this.accountTel) {
          let params = {
            mobile: this.accountTel,
          }
          let config = {
            headers: {
              'Content-Type': 'application/json'
            }
          }
          axios.post('/zsf/selfeval/reEvaluate', params, config).then(res => {
            if (res.data === true) {
              this.$router.push(`/home?accountTel=${this.accountTel}`)
            }
            else {
              Toast('6小时内您无法重新自评')
            }
          })
        }
      },
      transfer2() {
        if (this.accountTel) {
          let params = {
            mobile: this.accountTel,
          }
          let config = {
            headers: {
              'Content-Type': 'application/json'
            },
          }
          axios.post('/zsf/selfeval/financing', params, config).then(res => {
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
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "./repeatScore.scss";
</style>
