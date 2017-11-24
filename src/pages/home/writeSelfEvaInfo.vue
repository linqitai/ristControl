<template>
  <div class="home2">
    <!--<div class="title">-->
      <!--<div class="titleLeft" @click="back()"><img src="../../assets/nav_btn_back@2x.png" alt=""></div>-->
      <!--<div class="titleMid"><span>{{type | typeText}}</span></div>-->
      <!--&lt;!&ndash;<div class="titleRight"><img src="../../assets/logo_zs@2x.png" alt=""></div>&ndash;&gt;-->
    <!--</div>-->
    <m-header>{{type | typeText}}</m-header>
    <div class="prompt"><span>请输入真实有效的内容，否则将严重影响您的信用!</span></div>
    <div class="information">
      <mt-field label="手机号" disabled="disabled" v-model="accountTel" placeholder="" type=""
                class="informationBorder"></mt-field>

      <div class="prompt2"></div>
      <mt-field label="姓名" placeholder="请输入姓名" type="text" v-model="username" @input="inputname()"
                class="informationBorder"></mt-field>
      <mt-field label="身份证号" placeholder="请输入身份证号" type="text" v-model="idcard" @blur="inputIdcard()"
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
                :readonly="readonly" class="informationBorder"></mt-field>
      <mt-popup
        v-model="popupVisible2"
        position="bottom" class="box">
        <div @click.stop="selectState2('政府部门')">政府部门</div>
        <div @click.stop="selectState2('事业单位')">事业单位</div>
        <div @click.stop="selectState2('共同经营')" v-show="together">共同经营</div>
        <div @click.stop="selectState2('其他')">其他</div>
        <div @click.stop="selectState2('无配偶')" v-show="noobject">无配偶</div>
        <div id="boxBlank"></div>
        <div @click="popupVisible2 = false">取消</div>
      </mt-popup>
      <!--<mt-cell title="配偶职业" @click.native="popupVisible2 = true" is-link></mt-cell>-->
      <mt-field label="配偶职业" v-show='objectshow' @click.native="popupVisible2 = true" placeholder=">"
                v-model="objectState" :readonly="readonly" class="informationBorder"></mt-field>
      <mt-popup
        v-model="popupVisible3"
        position="bottom" class="box">
        <div @click.stop="selectState3('政府部门')">政府部门</div>
        <div @click.stop="selectState3('事业单位')">事业单位</div>
        <div @click.stop="selectState3('其他')">其他</div>
        <div @click.stop="selectState3('暂无子女')">暂无子女</div>
        <div id="boxBlank"></div>
        <div @click="popupVisible3 = false">取消</div>
      </mt-popup>
      <mt-field label="子女职业" v-if="childrenshow" @click.native="popupVisible3 = true" placeholder=">"
                v-model="childrenState" class="informationBorder" :readonly="readonly"></mt-field>
      <mt-field class="homeCharge informationBorder" label="家庭月收支(元) " placeholder="月收支=月收入-月支出" type="number"
                v-model="pay"
      ></mt-field>
    </div>
    <div class="yes" @click="transfer()">{{type | typeBtnText}}</div>
  </div>

</template>

<script scoped="scoped1">
  import axios from 'axios'
  import {Toast} from 'mint-ui'
  import {evaluate} from '../../api/api'
  import mHeader from '@/components/Header'
  //  const root = '/rz' // 线上
  const root = '/zsf' // 本地测试，打包后线上
  export default {
    name: 'HelloWorld',
    components: {
      mHeader
    },
    data() {
      return {
        readonly: true,
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
        objectshow: true,
        childrenshow: true,
        noobject: true,
        Reappraisal: false,
        selfShow2: false,
        together: true,
        money: null,
        currentYear: '',
        type: this.$route.query.type,
        is: true
      }
    },
    watch: {
      idcard: function (val) {
        if (val.length >= 18) {
          if (this.childrenStateValue == 1 || this.childrenStateValue == 2) {
            var date = new Date();
            this.currentYear = date.getFullYear() - val.substr(6, 4);
//            if (this.currentYear >= 24 && this.currentYear <= 40) {
            if (this.currentYear <= 40 && this.marryState !== '未婚') {
//              Toast('您的子女职业不准确')
              this.is = false
              return
            }
          }
        }
      }
    },
    filters: {
      typeText(type) {
        return type === 'repeat' ? '重自评' : '自评'
      },
      typeBtnText(type) {
        return type === 'repeat' ? '提交' : '提交'
      }
    },
    created() {
      this.accountTel = this.$route.query.accountTel
      // 本地存储评分
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
          this.selfShow2 = true;// 授信
          this.scoreshow = true;// 分数
          // this.circleshow = true;//旋转
        }
      }
    },
    methods: {
      // 点击婚姻状态
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
      // 点击配偶职业
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
          this.objectStateValue = 4
        }
        else {
          this.objectStateValue = 3
        }
      },
      // 点击子女职业
      selectState3: function (state) {
        this.is = true
        this.childrenState = state;
        this.popupVisible3 = false;
        if (state == '无配偶') {
          this.childrenStateValue = 0
        } else if (state == '政府部门') {
          this.childrenStateValue = 1
          if (this.idcard) {
            var date = new Date;
            this.currentYear = date.getFullYear() - this.idcard.substr(6, 4);
//            if (this.currentYear >= 24 && this.currentYear <= 40) {
              if (this.currentYear <= 40 && this.marryState !== '未婚') {
//              Toast('您的子女职业不准确')
                this.is = false
                return
            }
          }
        } else if (state === '事业单位') {
          this.childrenStateValue = 2
          if (this.idcard) {
            console.log(this.idcard.substr(6, 4));
            if (this.idcard) {
              var date = new Date();
              this.currentYear = date.getFullYear() - this.idcard.substr(6, 4);
              if (this.currentYear <= 40 && this.marryState !== '未婚') {
//                if (this.currentYear >= 24 && this.currentYear <= 40) {
//                Toast('您的子女职业不准确')
                this.is = false
                return
              }
            }
          }
        } else {
          this.childrenStateValue = 3
        }
      },
      // pp点击返回
      back() {
        // Toast('返回')
        this.$router.goBack()
      },
      // 姓名正则
      inputname() {
        this.username = this.username.replace()
      },
      // 身份证号正则
      inputIdcard() {
        console.log(1111)
        let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        console.log(this.idcard)
        console.log(reg.test(this.idcard))
        if (reg.test(this.idcard)) {
          console.log('reg.test')
        } else {
        }
      },
      addAction() {
        let params = {
          mobile: this.accountTel,
          name: this.username,
          identityNo: this.idcard,
          marriage: parseInt(this.marryStateValue),
          spouseOCP: parseInt(this.objectStateValue),
          childOCP: parseInt(this.childrenStateValue),
          fmSaving: this.pay,
          action: this.type === 'repeat' ? 3 : 1,
          score: this.score,
          quota: this.money
        }
        let config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        axios.post(root + '/selfeval/addRecord', params, config).then(res => {
        })
      },
      selfApply() {
        let params = {
          mobile: this.accountTel,
          name: this.username,
          identityNo: this.idcard,
          marriage: parseInt(this.marryStateValue),
          spouseOCP: parseInt(this.objectStateValue),
          childOCP: parseInt(this.childrenStateValue),
          fmSaving: this.pay,
          action: this.type === 'repeat' ? 3 : 1
        }
        let config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        const self = this;
        axios.post(root + '/selfeval/evaluate', params, config).then(res => {
          const response = res.data;
          if (res.status == 200 && response.code == 1000 && response.data.score) {
            this.score = response.data.score.toFixed(0);
            this.money = response.data.quota;//授信money
            this.addAction();
            this.$router.push(`/repeatEvaluation?accountTel=${this.accountTel}&score=${this.score}&money=${this.money}
                &username=${this.username}
                &idcard=${this.idcard}
                &marryStateValue=${this.marryStateValue}
                &objectStateValue=${this.objectStateValue}
                &childrenStateValue=${this.childrenStateValue}
                &pay=${this.pay}
                &from=self`)
          }
          else if (res.status == 200 && response.code == 1100) {
            Toast('请输入正确信息')
            return false;
          }
        })
      },
      transfer() {
        if (this.accountTel) {
//          this.selfApply();
          if (this.username === '' || this.username === null) {
            Toast('请填写姓名')
            return
          }
          let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
          let namereg =  /^([a-zA-Z0-9\u4e00-\u9fa5\·]{1,10})$/;
          let numberreg = /^[0-9]*$/;
          console.log('name:  ' + namereg.test(this.username))
          if(namereg.test(this.username)){
          }else{
            Toast('您输入的格式有误')
            return
           }
          if (this.idcard === '' || this.idcard === null) {
            Toast('请填写身份证号')
            return
          }
          if(reg.test(this.idcard)){
          }else{
            Toast('您输入的身份证号格式有误')
            return
          }
          if (this.marryStateValue === '' || this.marryStateValue === null) {
            Toast('请填写婚姻状态')
            return
          }
          if (this.objectStateValue === '' || this.objectStateValue === null) {
            Toast('请填写配偶职业')
            return
          }
          if(this.is === false && this.marryState !== '未婚'){
            Toast('您输入的子女职业不准确')
            return
          }
          if (this.childrenStateValue === '' || this.childrenStateValue === null) {
            Toast('请填写子女职业')
            return
          }
          console.log('this.pay' + this.pay)
          if (this.pay === '' || this.pay === null) {
            Toast('您未输入月收支或格式错误')
            return
          }
          this.selfApply()
        } else {
          Toast('没有接收到accountTel参数')
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
    width: 100%
  }

  .home2 {
    .title {
      height: 44px;
      background-color: #2D6DEB;
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      z-index: 100;
    }

    img {
      height: 100%;
      width: 100%
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
      height: 28px;
      width: 20px;
      position: absolute;
      bottom: 20px;
      right: 15px
    }

    .prompt {
      height: 40px;
      width: 100%;
      background-color: #F2F2F2;
      font-size: 13px;
      color: darkgray;
      line-height: 51px;
      border-bottom: 1px solid lightgray;
      margin-top: 44px;
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
      height: 35px;
      width: 80px;
      background-color: cornflowerblue;
      border-radius: 10px;
      margin: 50px auto;
      color: white;
      font-size: 17px;
      line-height: 35px
    }
  }
</style>
