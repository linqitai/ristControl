<template>
  <div class="">
    <div class="title">

      <div class="titleLeft" @click="back()"><img src="../assets/nav_btn_back@2x.png" alt=""></div>
      <div class="titleMid"><span>臻商信用分</span></div>
      <div class="titleRight"><img src="../assets/logo_zs@2x.png" alt=""></div>
    </div>
    <div class="header">
      <div><img src="../assets/nav_cont@2x.png" alt=""></div>
    </div>
    <div class="prompt"><span>请输入本人真实有效的信息，否则将严重影响您的信用</span></div>
    <div class="information">
      <mt-field label="姓名" placeholder="请输入姓名" type="text" v-model="username" @input="inputname()"
                class="informationBorder"></mt-field>
      <mt-field label="身份证号" placeholder="请输入身份证号" type="text" v-model="idcard" @input="inputIdcard()"
                class="informationBorder"></mt-field>
      <mt-popup
        v-model="popupVisible"
        position="bottom" class="box">
        <div @click.stop="selectState('未婚')">未婚</div>
        <div @click.stop="selectState('已婚')">已婚</div>
        <div @click.stop="selectState('再婚')">再婚</div>
        <div @click.stop="selectState('离异')">离异</div>
        <div id="boxBlank"></div>
        <div @click="popupVisible = false">取消</div>
      </mt-popup>
      <mt-field label="婚姻状态" @click.native="popupVisible = true" placeholder=">" v-model="marryState"
                readonly="true" class="informationBorder"></mt-field>
      <mt-popup
        v-model="popupVisible2"
        position="bottom" class="box">
        <div @click.stop="selectState2('政府部门')">政府部门</div>
        <div @click.stop="selectState2('事业单位')">事业单位</div>
        <div @click.stop="selectState2('无配偶')">无配偶</div>
        <div @click.stop="selectState2('其他')">其他</div>
        <div id="boxBlank"></div>
        <div @click="popupVisible2 = false">取消</div>
      </mt-popup>
      <!--<mt-cell title="配偶职业" @click.native="popupVisible2 = true" is-link></mt-cell>-->
      <mt-field label="配偶职业" v-show='objectshow' @click.native="popupVisible2 = true" placeholder=">"
                v-model="objectState"  readonly="true" class="informationBorder"></mt-field>
      <mt-popup
        v-model="popupVisible3"
        position="bottom" class="box">
        <div @click.stop="selectState3('政府部门')">政府部门</div>
        <div @click.stop="selectState3('事业单位')">事业单位</div>
        <div @click.stop="selectState3('暂无子女')">暂无子女</div>
        <div @click.stop="selectState3('其他')">其他</div>
        <div id="boxBlank"></div>
        <div @click="popupVisible3 = false">取消</div>
      </mt-popup>
      <mt-popup
        v-model="popupVisible4"
        class="boxtext1">
        <div class="boxtext">
          <div class="boxtextTop">请输入准确信息</div>
          <div class="boxtextBottom" @click.stop="selectYes()">确定</div>
        </div>
      </mt-popup>
      <mt-popup
        v-model="popupVisible5"
        class="boxtext2">
        <div class="boxtext2">
          <div class="boxtext2Top">6小时内不允许重评</div>
          <div class="boxtext2Bottom" @click.stop="selectYes2()">确定</div>
        </div>
      </mt-popup>
      <mt-popup
        v-model="popupVisible6"
        class="boxtext3">
        <div class="boxtext3">
          <div class="boxtext3Top">您输入的信息有误</div>
          <div class="boxtext3Bottom" @click.stop="selectYes3()">确定</div>
        </div>
      </mt-popup>
      <mt-field label="子女职业" v-show="childrenshow" @click.native="popupVisible3 = true" placeholder=">"
                v-model="childrenState" class="informationBorder" readonly="true"></mt-field>
      <mt-field class="homeCharge" label="家庭月收支(月收入-月支出)" placeholder="元" type="number" v-model="pay"></mt-field>
    </div>
    <div class="prompt2"></div>


    <div class="ciycle" @click="transfer()">
      <div class="outCiycle">
        <div class="bgimg"></div>
        <div class="circlebiginner">
        </div>
        <div class="transfer"
             v-bind:style="{transform:'rotate(' +transferdeg+'deg)',WebkitTransform:'rotate(' +transferdeg+'deg)'}"></div>
      </div>
      <div class="circleinner" v-show="selfShow">自评</div>
      <div class="circleinner2" v-show="selfShow2"><span>授信额度</span>
        <div>{{money}}元</div>
      </div>
      <div class="transfer-block" v-show="circleshow"
           v-bind:style="{transform:'rotate(' +(transferdeg-2)+'deg)',WebkitTransform:'rotate(' +(transferdeg-2)+'deg)'}">
        <div class="transfer-circle"
             v-bind:style="{transform:'rotate(-' +transferdeg+'deg)',WebkitTransform:'rotate(-' +transferdeg+'deg)'}">
          <div class="transfer-score" v-show="scoreshow">{{score}}</div>
        </div>
      </div>
      <div class="circlebiginner-left">0</div>
      <div class="circlebiginner-mid" v-show="Reappraisal" @click="transfer1()">重评</div>
      <div class="circlebiginner-right">1000分</div>
      <div class="apply">申请借款</div>
      <div class="promote">提升额度</div>
    </div>



  </div>

</template>

<script scoped="scoped1">
  import axios from 'axios'
  import {Toast} from 'mint-ui'
  import {evaluate} from '../api/api'

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
        popupVisible4: false,
        popupVisible5: false,
        popupVisible6: false,
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
        selfShow: true,
        selfShow2: false,
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
            ;
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
          this.selfShow = false;//自评
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
            ;
          }
          ;

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
              ;
            }
            ;
          }
          ;

        } else {
          this.childrenStateValue = 3
        }
      },
//    点击确定
      selectYes: function () {
        this.popupVisible4 = false;
        this.childrenState = '';
      },
      selectYes2: function () {
        this.popupVisible5 = false;
      },
      selectYes3: function () {
        this.popupVisible6 = false;
      },
      //        app点击返回
      back(){
        // Toast('返回')
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
//        let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
//      if(reg.test(this.idcard)){
//         /*this.idcard = this.idcard.replace()*/
//      };
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
            },
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
                  self.selfShow = false;//自评文字消失
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
      },
      /*transfer:function(){
         const score=this.score;
         const deg=360-this.initialdeg*2;
         const eachscore=this.allscore/deg;
         const needtransdeg=score/eachscore;
         var self=this;
         this.circleshow=true;
         this.Reappraisal=true;
         this.selfShow=false;
         this.selfShow2=true,
         setInterval(function(){
            if(self.transferdeg>=(235+needtransdeg)){
              self.scoreshow=true;
              return;
            }
            self.transferdeg++;
         },10)
      },*/

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%
  }

  /*.content{height:100%;width:100%}*/
  .title {
    height: 47px;
    background-color: #00917E;
    position: relative
  }

  img {
    height: 100%;
    widht: 100%
  }

  .titleLeft {
    height: 17px;
    width: 9px;
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
    height: 34px;
    width: 23px;
    position: absolute;
    bottom: 10px;
    right: 15px
  }

  /*.mint-header-title{height:34px;widht:178px;}*/
  .header {
    height: 65px;
    position: relative
  }

  .header div {
    height: 45px;
    position: absolute;
    top: 10px;
    bottom: 10px;
    left: 15px;
    right: 15px
  }

  .header div img {
    height: 100%;
    width: 100%
  }

  .prompt {
    height: 40px;
    width: 100%;
    background-color: #F2F2F2;
    font-size: 13px;
    color: darkgray;
    line-height: 40px;
    position: relative
  }

  .prompt span {
    position: absolute;
    left: 3%
  }

  .mint-cell-wrapper {
    height: 44px;
    font-size: 15px;
  }

  .informationBorder {
    border-bottom: 1px solid lightgray;
    box-sizing: border-box;
  }

  .mint-cell-text {
    float: left;
  }

  .mint-field-core {
    text-align: right;
    font-size: 15px;
  }

  .prompt2 {
    height: 15px;
    background-color: #F5F5F5
  }

  #lastField input {
    width: 50px
  }

  .box {
    width: 100%;
    background-color: #BDBDBD
  }

  .box div {
    height: 35px;
    border-bottom: 1px solid lightgray;
    line-height: 35px;
    font-size: 15px;
    background-color: #fff
  }

  #boxBlank {
    height: 20px;
    background-color: #BDBDBD
  }
  .boxtext {
    height: 150px;
    width: 250px;
    border-radius: 5px;
    position: relative
  }

  .boxtextTop {
    height: 60px;
    width: 100%;
    border-bottom: 1px solid gainsboro;
    position: absolute;
    top: 50px;
  }

  .boxtextBottom {
    position: absolute;
    bottom: 3px;
    left: 110px
  }

  .boxtext1 {
    border-radius: 10px
  }

  .boxtext2 {
    height: 150px;
    width: 250px;
    border-radius: 10px;
  }

  .boxtext2Top {
    height: 60px;
    border-bottom: 1px solid gainsboro;
    width: 100%;
    position: absolute;
    top: 50px;
  }

  .boxtext2Bottom {
    position: absolute;
    bottom: 15px;
    left: 110px;
  }

  .boxtext3 {
    height: 150px;
    width: 250px;
    border-radius: 10px;
  }

  .boxtext3Top {
    height: 60px;
    border-bottom: 1px solid gainsboro;
    width: 100%;
    position: absolute;
    top: 50px;
  }

  .boxtext3Bottom {
    position: absolute;
    bottom: 15px;
    left: 110px;
  }
  .homeCharge .mint-cell-title {
    width: 202px;
  }
  /*-----------------------圆-------------------*/
  .ciycle {
    height: 134px;
    width: 134px;
    margin: 20px auto;
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
    background-color: white;
    border-radius: 50%;
    z-index: 3;
  }

  .circlebiginner-left {
    height: 10px;
    width: 7px;
    position: absolute;
    top: 110px;
    left: 10px;
    font-size: 13px
  }

  .circlebiginner-mid {
    height: 11px;
    width: 25px;
    position: absolute;
    top: 128px;
    left: 53px;
    font-size: 10px;
  }

  .circlebiginner-right {
    height: 12px;
    width: 100px;
    position: absolute;
    top: 108px;
    left: 78px;
    font-size: 13px
  }

  .circleinner {
    position: absolute;
    width: 104px;
    height: 104px;
    top: 15px;
    left: 15px;
    background: #FEFFFF;
    border-radius: 50%;
    z-index: 4;
    box-shadow: 1px 1px 15px #43D2C3;
    font-size: 20px;
    color: #00917F;
    line-height: 104px
  }

  .circleinner2 {
    position: absolute;
    width: 104px;
    height: 104px;
    top: 15px;
    left: 15px;
    background: #E4F9F7;
    border-radius: 50%;
    z-index: 4;
    box-shadow: 1px 1px 15px #43D2C3;
    color: #00917F;
  }

  .circleinner2 span {
    font-size: 11px;
    line-height: 80px
  }

  .circleinner2 div {
    font-size: 17px;
    position: absolute;
    top: 50px;
    left: 23px
  }

  .transfer {
    width: 134px;
    height: 134px;
    position: absolute;
    top: 0;
    left: 0;
    clip: rect(0, 67px, 67px, 0px);
    background-color: #0DBDAA;
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

  .apply {
    height: 38px;
    width: 130px;
    background-color: #00917F;
    position: absolute;
    top: 140px;
    left: -85px;
    font-size: 15px;
    text-align: center;
    line-height: 38px;
    color: white;
    border-radius: 50px
  }

  .promote {
    height: 38px;
    width: 130px;
    background-color: #00917F;
    position: absolute;
    top: 140px;
    right: -88px;
    font-size: 15px;
    text-align: center;
    line-height: 38px;
    color: white;
    border-radius: 50px
  }




</style>
