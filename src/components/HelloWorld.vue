<template>
  <div class="">
    <div class="title">
      <div class="titleLeft" @click="back()"><img src="../assets/nav_btn_back@2x.png" alt=""></div>
      <div class="titleMid"><span>融资中心</span></div>
      <div class="titleRight"><img src="../assets/logo_zs@2x.png" alt=""></div>
    </div>
    <div class="header">完成自评后才会有授信额度哦</div>
    <div class="topciycle">
      <div class="ciycle">
        <div class="outCiycle">
          <div class="bgimg"></div>
          <div class="circlebiginner">
          </div>
          <div class="transfer"
               v-bind:style="{transform:'rotate(' +transferdeg+'deg)',WebkitTransform:'rotate(' +transferdeg+'deg)'}"></div>
        </div>
        <!--<div class="circleinner" v-show="selfShow">自评</div>-->
        <div class="circleinner2" v-show="selfShow2"><span>授信额度</span>
          <div class="">0元</div>
        </div>
        <div class="transfer-block" v-show="circleshow"
             v-bind:style="{transform:'rotate(' +(transferdeg-2)+'deg)',WebkitTransform:'rotate(' +(transferdeg-2)+'deg)'}">
          <!--<div class="transfer-circle"-->
          <!--v-bind:style="{transform:'rotate(-' +transferdeg+'deg)',WebkitTransform:'rotate(-' +transferdeg+'deg)'}">-->
          <!--<div class="transfer-score" v-show="scoreshow">{{score}}</div>-->
          <!--</div>-->
        </div>
        <div class="circlebiginner-left">0</div>
        <div class="circlebiginner-right">1000分</div>
      </div>
    </div>
    <div class="yes" @click="select()">自评</div>
  </div>
</template>

<script scoped="scoped1">
  import axios from 'axios'
  import {Toast} from 'mint-ui'
  import {evaluate, query} from '../api/api'

  export default {
    name: 'HelloWorld',
    data() {
      return {
//      msg: 'Welcome to Your Vue.js App',
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
        score: null,
        marryStateValue: '',
        objectStateValue: '',
        childrenStateValue: '',
        scoreshow: false,
        circleshow: false,
        objectshow: true,
        childrenshow: true,
        Reappraisal: false,
        selfShow2: true,
        money: null,
        currentYear: ''
      }
    },
    watch: {
      idcard: function (val) {
        if (val.length >= 18) {
          if (this.childrenStateValue == 1 || this.childrenStateValue == 2) {
            var date = new Date;
            this.currentYear = date.getFullYear() - val.substr(6, 4);
            if (this.currentYear >= 24 && this.currentYear <= 40) {
//              this.popupVisible4 = true;
              Toast('请输入准确信息')
            }
          }
        }
      }
    },
    created() {
      this.accountTel = this.$route.query.accountTel
      //本地存储评分
      const self = this;
      if (window.localStorage) {
        const objprase = JSON.parse(window.localStorage.getItem("storescore"));
        if (objprase && objprase.time) {
          const deg = 360 - this.initialdeg * 2;
          const eachscore = this.allscore / deg;
          const nowdate = new Date().getTime();
          this.score = objprase.score;
          this.money = objprase.money;
          const needtransdeg = this.score / eachscore;
          this.transferdeg = 235 + needtransdeg;
          this.selfShow2 = true;//授信
          this.scoreshow = true;//分数
          this.circleshow = true;//旋转圆
          //有过自评6小时定时监测
          setInterval(function () {
            if ((new Date().getTime() - objprase.time) >= 6 * 60 * 60 * 1000) {
              self.Reappraisal = true;
            }
          }, 1000)
        }
      }
    },
    methods: {

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
        window.history.back();
        let ua = navigator.userAgent.toLowerCase()
        if (/iphone|ipad|ipod/.test(ua)) {
          popToViewController()
        } else if (/android/.test(ua)) {
          htmlToJava. popToViewController()
        }
        window.history.back();
      },
//     姓名正则
      inputname() {
        this.username = this.username.replace()
      },
      //身份证号正则
      inputIdcard() {
//        let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
//      if(reg.test(this.idcard)){
//         /*this.idcard = this.idcard.replace()*/
//      };
      },
//      select(){
//        this.$router.push(`/home?accountTel=${this.accountTel}`)
//      },
      select() {
//        this.$router.push(`/home?accountTel=${this.accountTel}`)
//        alert(this.accountTel)
        if (this.accountTel) {
          let params = {
            mobile: this.accountTel,
            pageInfo: {size: 1, page: 1}
          }
          let config = {
            headers: {
              'Content-Type': 'application/json'
            },
          }
          axios.post('/zsf/selfeval/query', params, config).then(res => {
            const response = res.data;
            if (res.status == 200 && response.data.size == '') {
              this.$router.push(`/home?accountTel=${this.accountTel}`)
            } else {
              this.$router.push(`/repeatscore?accountTel=${this.accountTel}`)
            }
//            if (res.status == 200 && response.code == 1002) {
//              this.$router.push(`/repeatscore?accountTel=${this.accountTel}`)
//            }
//            else{
//              this.$router.push(`/home?accountTel=${this.accountTel}`)
//            }
          })
        }
      },
      transfer() {
        if (this.accountTel) {
          let params = {
            mobile: this.accountTel,
            name: this.username,
            identityNo: this.idcard,
            marriage: parseInt(this.marryStateValue),
            spouseOCP: parseInt(this.objectStateValue),
            childOCP: parseInt(this.childrenStateValue),
            fmSaving: this.pay,
          }
          let config = {
            headers: {
              'Content-Type': 'application/json'
            }
          }
          const self = this;
          axios.post('/zsf/selfeval/evaluate', params, config).then(res => {
            const response = res.data;
//        if(res.status==200&&response.code==1101){
//          this.Reappraisal=false;
////          this.popupVisible5 = true;
//        }
//        if(response.code==1000){
//          Reappraisal=true
//        }
            console.log(res)
            if (res.status == 200 && response.code == 1000 && response.data.score) {
              const score = response.data.score.toFixed(1);//自评分
              const deg = 360 - this.initialdeg * 2;
              const eachscore = this.allscore / deg;
              const needtransdeg = score / eachscore;
              this.circleshow = true;
              this.score = response.data.score.toFixed(0);
              this.money = response.data.quota;//授信money
              //重评归0
              if (self.Reappraisal) {
                this.transferdeg = 235;
                self.scoreshow = false;
                self.Reappraisal = false;
              }
              setInterval(function () {
                if (self.transferdeg >= (235 + needtransdeg)) {
                  self.scoreshow = true;
                  self.selfShow2 = true;//授信金额出现
                  return;
                }
                self.transferdeg++;
              }, 20)
              //本地评分
              const nowdate = new Date();
              const obj = {"time": nowdate.getTime(), "score": this.score, "money": this.money};
              if (window.localStorage) {
                window.localStorage.setItem("storescore", JSON.stringify(obj));
              }
              //第一次自评6小时定时监测
              setInterval(function () {
                console.log(nowdate.getTime(), new Date().getTime())
                if ((nowdate.getTime() + 6 * 60 * 60 * 1000) < new Date().getTime()) {
                  self.Reappraisal = true;
                }
              }, 1000)
            } else if (res.status == 200 && response.code == 1101) {
//              this.popupVisible5 = true;
              Toast('6小时内您无法重新自评')
              return false;
            } else if (res.status == 200 && response.code == 1100) {
//              this.popupVisible6 = true;
              Toast('您输入的信息有误')
              return false;
            }
          }).catch(res => {
            Toast(res)
          })
        } else {
          Toast('没有接收到accountTel参数')
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    background-color: #F2F2F2;
  }

  .header {
    margin: 30px auto
  }

  .title {
    height: 47px;
    background-color: #2D6DEB;
    position: relative
  }

  img {
    height: 100%;
    widht: 100%
  }

  .titleLeft {
    height: 15px;
    width: 13px;
    position: absolute;
    left: 15px;
    bottom: 14px
  }

  .titleMid {
    height: 17px;
    width: 89px;
    margin: 0 auto;
    line-height: 50px;
    color: #ffffff;
    font-size: 17px
  }

  .titleRight {
    height: 28px;
    width: 20px;
    position: absolute;
    bottom: 20px;
    right: 15px
  }

  /*-----------------------圆-------------------*/
  .topciycle {
    width: 100%;
    margin: 35px auto;
  }

  .ciycle {
    height: 134px;
    width: 134px;
    margin: 35px auto;
    position: relative;
  }

  .outCiycle {
    height: 134px;
    width: 134px;
    border-radius: 50%;
    position: absolute;
    clip: rect(0, 134px, 104px, 0px);
  }

  .bgimg {
    width: 134px;
    height: 134px;
    background: url(../assets/123.png);
    background-size: 100% 100%;
    z-index: 1;
  }

  .circlebiginner {
    position: absolute;
    width: 128px;
    height: 128px;
    top: 3px;
    left: 3px;
    background: url(../assets/line.png);
    background-size: 100% 100%;
    background-color: #F2F2F2;
    border-radius: 50%;
    z-index: 3;
  }

  .circlebiginner-left {
    height: 10px;
    width: 7px;
    position: absolute;
    top: 120px;
    left: 10px;
    font-size: 13px;
    color: #00917E
  }

  .circlebiginner-mid {
    height: 11px;
    width: 25px;
    position: absolute;
    top: 152px;
    left: 53px;
    font-size: 10px;
    color: #00917E
  }

  .circlebiginner-right {
    height: 12px;
    width: 100px;
    position: absolute;
    top: 120px;
    left: 78px;
    font-size: 13px;
    color: #00917E
  }

  .circleinner2 {
    position: absolute;
    width: 104px;
    height: 104px;
    top: 15px;
    left: 15px;
    background: #E4F9F6;
    border-radius: 50%;
    z-index: 4;
    /*box-shadow: 1px 1px 15px #43D2C3;*/
    color: #00917F;
  }

  .circleinner2 span {
    font-size: 11px;
    line-height: 80px;
  }

  .circleinner2 div {
    font-size: 17px;
    position: absolute;
    top: 50px;
    left: 38px
  }

  .transfer {
    width: 134px;
    height: 134px;
    position: absolute;
    top: 0;
    left: 0;
    clip: rect(0, 67px, 67px, 0px);
    /*background-color: #0DBDAA;*/
    border-radius: 50%;
    z-index: 2;
    border-radius: 50%;
    transform: rotate(235deg);
  }

  .transfer-block {
    position: absolute;
    height: 134px;
    width: 134px;
    right: 0;
    z-index: 10;
    top: 0;
  }

  .transfer-score {
    position: absolute;
    width: auto;
    height: 20px;
    top: 1px;
    right: 23px;
    color: #00917F
  }

  .transfer-circle {
    margin-left: 10px;
    position: absolute;
    width: 20px;
    height: 20px;
    top: -9px;
    right: 67px;
    margin-right: -11px;
    line-height: 20px;
    background: url(../assets/transfercircle.png);
    background-size: 100% 100%;
    margin-right: -11px
  }

  .inCiycle {
    height: 69px;
    width: 69px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
  }

  .yes {
    height: 40px;
    width: 160px;
    background-color: #00917E;
    color: white;
    border-radius: 50px;
    line-height: 40px;
    margin: 58px auto
  }


</style>
