<template>
  <div class="">
    <div class="title">
      <div class="titleLeft" @click="back()"><img src="../../assets/nav_btn_back@2x.png" alt=""></div>
      <div class="titleMid"><span>自评</span></div>
    </div>
    <div class="prompt"><span>请输入真实有效的内容，否则将影响您的臻商信用</span></div>
    <div class="information">
      <mt-field label="手机号" disabled="disabled" v-model="accountTel" placeholder="" type=""
                class="informationBorder"></mt-field>

      <div class="prompt2"></div>
      <mt-field label="姓名" placeholder="请输入姓名" type="text" v-model="username" @input="inputname()"
                class="informationBorder"></mt-field>
      <mt-field label="身份证号" placeholder="请输入身份证号" type="text" v-model="idcard" @input="inputIdcard()"
                class="informationBorder"></mt-field>
      <mt-popup
        v-model="popupVisible"
        position="bottom" class="box">
        <div @click.stop="selectState('已婚')">已婚</div>
        <div @click.stop="selectState('再婚')">再婚</div>
        <div @click.stop="selectState('未婚')">未婚</div>
        <div @click.stop="selectState('离异')">离异</div>
        <div @click.stop="selectState('丧偶')">丧偶</div>
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
        <div @click.stop="selectState2('共同经营')" v-show="together">共同经营</div>
        <div @click.stop="selectState2('无配偶')" v-show="noobject">无配偶</div>
        <div @click.stop="selectState2('其他')">其他</div>
        <div id="boxBlank"></div>
        <div @click="popupVisible2 = false">取消</div>
      </mt-popup>
      <!--<mt-cell title="配偶职业" @click.native="popupVisible2 = true" is-link></mt-cell>-->
      <mt-field label="配偶职业" v-show='objectshow' @click.native="popupVisible2 = true" placeholder=">"
                v-model="objectState" readonly="true" class="informationBorder"></mt-field>
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
      <mt-field label="子女职业" v-show="childrenshow" @click.native="popupVisible3 = true" placeholder=">"
                v-model="childrenState" class="informationBorder" readonly="true"></mt-field>
      <mt-field class="homeCharge informationBorder" label="家庭月收支 " placeholder="月收入-月支出(元)" type="number" v-model="pay"
      ></mt-field>
    </div>
    <div class="yes" @click="transfer()">自评</div>
  </div>

</template>

<script scoped="scoped1">
  import axios from 'axios'
  import {Toast} from 'mint-ui'
  import {evaluate} from '../../api/api'
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
        noobject: true,
        Reappraisal: false,
        selfShow2: false,
        together: false,
        money: null,
        currentYear: ''
      }
    },
    watch: {
      idcard: function (val) {
        if (val.length >= 18) {
          if (this.childrenStateValue == 1 || this.childrenStateValue == 2) {
            var date = new Date();
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
          this.together = true;// 共同经营

        } else if (state == '离异') {
          this.objectshow = false;// 配偶
          this.childrenshow = true;// 子女

        }
        else if (state == '已婚' | state == '再婚') {
          this.noobject = false;// 配偶
          this.objectshow = true;
          this.childrenshow = true;
          this.together = true;// 共同经营
        }
        else {
          this.objectshow = true;
          this.childrenshow = true;
          this.noobject = true
          this.together = false;// 共同经营
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
        } else if (state == '丧偶') {
          this.marryStateValue = 4
          this.objectshow = false
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
        }
        else if (state == '共同经营') {
          this.objectStateValue = 4}
          else {
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
        } else if (state === '事业单位') {
          this.childrenStateValue = 2
          if (this.idcard) {
            console.log(this.idcard.substr(6, 4));
            if (this.idcard) {
              var date = new Date();
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
            fmSaving: this.pay
          }
          let config = {
            headers: {
              'Content-Type': 'application/json'
            }
          }
          const self = this;
          axios.post('/zsf/selfeval/evaluate', params, config).then(res => {
            const response = res.data;
            console.log(res)
            if (res.status == 200 && response.code == 1000 && response.data.score) {
              const score = response.data.score.toFixed(1);//自评分
              const deg = 360 - this.initialdeg * 2;
              const eachscore = this.allscore / deg;
              const needtransdeg = score / eachscore;
              this.$router.push(`/repeatscore?accountTel=${this.accountTel}&idcard=${this.idcard}&username=${this.username}&marryStateValue=${this.marryStateValue}
              &objectStateValue=${this.objectStateValue}&childrenStateValue=${this.childrenStateValue}&pay=${this.pay}`)
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
              // 本地评分
              const nowdate = new Date();
              const obj = {"time": nowdate.getTime(), "score": this.score, "money": this.money};
              if (window.localStorage) {
                window.localStorage.setItem("storescore", JSON.stringify(obj));
              }
              // 第一次自评6小时定时监测
              setInterval(function () {
                console.log(nowdate.getTime(), new Date().getTime())
                if ((nowdate.getTime() + 6 * 60 * 60 * 1000) < new Date().getTime()) {
                  self.Reappraisal = true;
                }
              }, 1000)
            }
//            else if (res.status == 200 && response.code == 1101) {
//              this.$router.push(`/repeatscore?accountTel=${this.accountTel}&idcard=${this.idcard}&username=${this.username}&marryStateValue=${this.marryStateValue}
//              &objectStateValue=${this.objectStateValue}&childrenStateValue=${this.childrenStateValue}&pay=${this.pay}`)
//
//              Toast('6小时内您无法重新自评')
//              return false;
//            }
            else if (res.status == 200 && response.code == 1100) {
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
    width: 100%
  }

  /*.content{height:100%;width:100%}*/
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

  .prompt {
    height: 40px;
    width: 100%;
    background-color: #F2F2F2;
    font-size: 13px;
    color: darkgray;
    line-height: 45px;
    position: relative;
    border-bottom: 1px solid lightgray;
  }

  .prompt2 {
    height: 8px;
    background-color: #F2F2F2;
    border-bottom: 1px solid lightgray;
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

  /*.boxtext {*/
  /*height: 150px;*/
  /*width: 250px;*/
  /*border-radius: 5px;*/
  /*position: relative*/
  /*}*/

  /*.boxtextTop {*/
  /*height: 60px;*/
  /*width: 100%;*/
  /*border-bottom: 1px solid gainsboro;*/
  /*position: absolute;*/
  /*top: 50px;*/
  /*}*/

  /*.boxtextBottom {*/
  /*position: absolute;*/
  /*bottom: 3px;*/
  /*left: 110px*/
  /*}*/

  /*.boxtext1 {*/
  /*border-radius: 10px*/
  /*}*/

  /*.boxtext2 {*/
  /*height: 150px;*/
  /*width: 250px;*/
  /*border-radius: 10px;*/
  /*}*/

  /*.boxtext2Top {*/
  /*height: 60px;*/
  /*border-bottom: 1px solid gainsboro;*/
  /*width: 100%;*/
  /*position: absolute;*/
  /*top: 50px;*/
  /*}*/

  /*.boxtext2Bottom {*/
  /*position: absolute;*/
  /*bottom: 15px;*/
  /*left: 110px;*/
  /*}*/

  /*.boxtext3 {*/
  /*height: 150px;*/
  /*width: 250px;*/
  /*border-radius: 10px;*/
  /*}*/

  /*.boxtext3Top {*/
  /*height: 60px;*/
  /*border-bottom: 1px solid gainsboro;*/
  /*width: 100%;*/
  /*position: absolute;*/
  /*top: 50px;*/
  /*}*/

  /*.boxtext3Bottom {*/
  /*position: absolute;*/
  /*bottom: 15px;*/
  /*left: 110px;*/
  /*}*/
  .homeCharge .mint-cell-text {
    width: 150px;
    float: left;
    text-align: left;
  }

  .homeCharge .mint-cell-title {
    width: 150px;
    float: left;
    text-align: left;
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

  .yes {
    height: 40px;
    width: 160px;
    background-color: #00917E;
    border-radius: 50px;
    margin: 50px auto;
    color: white;
    font-size: 17px;
    line-height: 40px
  }


</style>
