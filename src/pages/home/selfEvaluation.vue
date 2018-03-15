<template>
  <div class="home1">
    <!--<div class="title">-->
      <!--&lt;!&ndash;<div class="titleLeft" @click="back()"><img src="../../assets/nav_btn_back@2x.png" alt=""></div>&ndash;&gt;-->
      <!--&lt;!&ndash;<div class="titleMid"><span>信用中心</span></div>&ndash;&gt;-->
      <!--&lt;!&ndash;<div class="titleRight"><img src="../../assets/logo_zs@2x.png" alt=""></div>&ndash;&gt;-->
    <!--</div>-->
    <!-- <m-header>信用中心</m-header> -->
    <div class="header">完成自评后才会有信用额度哦</div>
    <div class="topciycle">
      <div class="ciycle">
        <div class="outCiycle">
          <div class="bgimg"></div>
          <div class="circlebiginner">
          </div>
          <div class="transfer"
               v-bind:style="{transform:'rotate(' +transferdeg+'deg)',WebkitTransform:'rotate(' +transferdeg+'deg)'}"></div>
        </div>
        <div class="circleinner2" v-show="selfShow2"><span>信用额度</span>
          <div class="">0元</div>
        </div>
        <!--<div class="transfer-block" v-show="circleshow"-->
             <!--v-bind:style="{transform:'rotate(' +(transferdeg-2)+'deg)',WebkitTransform:'rotate(' +(transferdeg-2)+'deg)'}">-->
        <!--</div>-->
        <div class="circlebiginner-left">0</div>
        <div class="circlebiginner-right">1000分</div>
      </div>
    </div>
    <div class="yes" @click="select()">去自评</div>
  </div>
</template>

<script scoped="scoped1">
  import axios from 'axios'
  import {Toast} from 'mint-ui'
  import {evaluate, query, actionRecord} from '../../api/api'
  import mHeader from '@/components/HeaderBackToApp'
  import {headAPP} from 'common/js/utils'
//  import {action} from '../../api/index'
//  const root = '/rz' // 线上
  const root = '/zsf' // 本地测试，打包后线上
  export default {
    name: 'HelloWorld',
    components: {
      mHeader
    },
    created(){
      headAPP()
    },
    data() {
      return {
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
      selectState2: function (state){
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
            if (this.currentYear <= 40) {
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
                if (this.currentYear <= 40) {
                Toast('请输入准确信息')
              }
            }
          }
        } else {
          this.childrenStateValue = 3
        }
      },
      // app点击返回
      back() {
        let ua = navigator.userAgent.toLowerCase()
        if (/iphone|ipad|ipod/.test(ua)) {
          popToViewController()
        } else if (/android/.test(ua)) {
          htmlToJava.popToViewController()
        }
      },
      select() {
        this.accountTel = this.$route.query.accountTel;
        if (this.accountTel) {
          let params = {
            mobile: this.accountTel,
            action: 0
          }
          let config = {
            headers: {
              'Content-Type': 'application/json'
            }
          }
          axios.post(root + '/selfeval/addRecord', params, config).then(res => {
            console.log('axios:' + res.data.code)
            if(res.data.code === 1000){
              this.$router.push(`/writeSelfEvaInfo?accountTel=${this.accountTel}`)
            } else {
            }
          })
        }else{
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../../common/scss/common.scss";
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    background-color: #F2F2F2;
  }

  .home1 {
    .header {
      margin: 30px auto;
      margin-top: 72px;
    }

    .title {
      height: 44px;
      background-color: #2D6DEB;
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      z-index: 0;
    }

    img {
      height: 100%;
      width: 100%
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
      background: url(../../assets/123.png);
      background-size: 100% 100%;
      z-index: 1;
    }

    .circlebiginner {
      position: absolute;
      width: 128px;
      height: 128px;
      top: 3px;
      left: 3px;
      background: url(../../assets/line.png);
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
      color: #646464
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
      color: #646464
    }

    .circleinner2 {
      position: absolute;
      width: 104px;
      height: 104px;
      top: 15px;
      left: 15px;
      background: #2D6DEB;
      border-radius: 50%;
      z-index: 4;
      /*box-shadow: 1px 1px 15px #43D2C3;*/
      color: white;
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
      background: url(../../assets/transfercircle.png);
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
      height: 35px;
      width: 80px;
      background-color: cornflowerblue;
      color: white;
      border-radius: 10px;
      line-height: 35px;
      margin: 58px auto
    }
  }
</style>
