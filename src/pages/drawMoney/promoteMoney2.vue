<template>
  <div class="promoteMoney">
    <div class="title">
      <div class="titleLeft" @click="back()"><img src="../../assets/nav_btn_back@2x.png" alt=""></div>
      <div class="titleMid"><span>提额</span></div>
    </div>
    <div class="main">
      <div class="prompt2"><span>提交材料越多，获取额度越高，最高可达15万元</span></div>
      <div class="table">
        <div class="table-leftT">资产与经营</div>
        <div class="table-leftB">提额高达6万元</div>
        <!--<div class="table-line"><mt-range :value="40000" :bar-height="7" :max="60000" :min="0" class="assetLine"></mt-range></div>-->
        <div class="table-line">
          <progress :value="assetCount" :max="60000" :min="0" style="width:100%;height:8px;"></progress>
        </div>
        <div class="table-number">{{assetCount / 10000}}万</div>
        <div class="table-noDrawMoney" v-show="noAssetShow" @click="intoOrganizingData()">未提额</div>
        <div class="table-noDrawMoney" v-show="haveAssetShow" @click="haveAssetClick()"
             v-bind:style="{backgroundColor:'cornflowerblue'}">已提额
        </div>
        <div class="table-noDrawMoney" v-show="canAssetShow" @click="intoOrganizingData()">可更新</div>
        <div class="table-img"><img src="../../assets/right.png" alt=""></div>
      </div>
      <div class="table">
        <div class="table-leftT">银行卡流水</div>
        <div class="table-leftB">提额高达2万元</div>
        <div class="table-line">
          <progress :value="0" :max="20000" :min="0" style="width:100%;height:8px;"></progress>
        </div>
        <div class="table-number">0万</div>
        <div class="table-noDrawMoney" @click="noStart()">未提额</div>
        <div class="table-img"><img src="../../assets/right.png" alt=""></div>
      </div>
      <div class="table">
        <div class="table-leftT">个人征信报告</div>
        <div class="table-leftB">提额高达2万元</div>
        <div class="table-line">
          <progress :value="0" :max="20000" :min="0" style="width:100%;height:8px;"></progress>
        </div>
        <div class="table-number">0万</div>
        <div class="table-noDrawMoney" @click="noStart()">未提额</div>
        <div class="table-img"><img src="../../assets/right.png" alt=""></div>
      </div>
      <div class="prompt"></div>
      <div class="table">
        <div class="table-leftT">臻收银</div>
        <div class="table-leftB">多收多贷，提额高达2万元</div>
        <div class="table-line">
          <progress :value="0" :max="20000" :min="0" style="width:100%;height:8px;"></progress>
        </div>
        <div class="table-number">0万</div>
        <div class="table-noDrawMoney" @click="cash()">申请</div>
        <div class="table-img"><img src="../../assets/right.png" alt=""></div>
      </div>
      <div class="table">
        <div class="table-leftT">客流统计</div>
        <div class="table-leftB">提额高达2万元</div>
        <div class="table-line">
          <progress :value="peopleMoney" :max="20000" :min="0" style="width:100%;height:8px;"></progress>
        </div>
        <div class="table-number">{{peopleMoney / 10000}}万</div>
        <div class="table-noDrawMoney" @click="peopleStatist()" v-show="applyShow">申请</div>
        <div class="table-noDrawMoney" v-show="haveAssetShow3" @click="haveAssetOneMonthClick()"
             v-bind:style="{backgroundColor:'cornflowerblue'}">已提额
        </div>
        <div class="table-noDrawMoney" v-show="canAssetShow2" @click="peopleStatist()">可更新</div>
        <div class="table-img"><img src="../../assets/right.png" alt=""></div>
      </div>
      <div class="table">
        <div class="table-leftT">安保服务</div>
        <div class="table-leftB">提额高达1万元</div>
        <div class="table-line">
          <progress :value="securityMoney" :max="10000" :min="0" style="width:100%;height:8px;"></progress>
        </div>
        <div class="table-number">{{securityMoney / 10000}}万</div>
        <div class="table-noDrawMoney" @click="services()" v-show="applyShow2">申请</div>
        <div class="table-noDrawMoney" v-show="haveAssetShow2" @click="haveAssetOneMonthClick()"
             v-bind:style="{backgroundColor:'cornflowerblue'}">已提额
        </div>
        <div class="table-noDrawMoney" v-show="canAssetShow3" @click="peopleStatist()">可更新</div>
        <div class="table-img"><img src="../../assets/right.png" alt=""></div>
      </div>
      <div class="prompt"></div>
      <!--<div class="prompt3">您当前已提额:0元</div>-->
      <!--<div class="initZero">0</div>-->
      <!--<div class="schart">-->
        <!--<div class="content-title">您当前已提额：{{totalGetMoney}}元</div>-->
        <!--<schart style="margin-top: -26px;" width="300" height="180" canvasId="pie" :data="data2" type="pie"-->
                <!--:options="options2"></schart>-->
      <!--</div>-->
      <div class="piewrap">
        <div class="prompt3">您当前已提额:{{totalGetMoney}}元</div>
        <div class="inner">
          <div class="ileft" :style="{transform:'rotate(' +(LeftDushu)+'deg)',WebkitTransform:'rotate(' +(LeftDushu)+'deg)'}"></div>
          <div class="iright" :style="{transform:'rotate(' +(rightDushu)+'deg)',WebkitTransform:'rotate(' +(rightDushu)+'deg)'}"></div>
          <div class="masker" v-show="isShowMasker"></div>
        </div>
        <div class="text">0</div>
        <div class="yes" @click="returnRepeat()">返回信用中心</div>
      </div>

    </div>
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
    query
  } from '../../api/index'
  import {getTime, getDate, dateAddHorizontal} from '../../common/js/times'
  import Schart from 'vue-schart';
  //  import {} from '../../common/js/jquery-3.2.1.slim.min.js'
  //  import {} from '../../common/js/circle_progress.js'
  const root = '/zsf'
  export default {
    components: {
      Schart
    },
    data() {
      return {
        noAssetShow: true,
        haveAssetShow: false,
        haveAssetShow2: false,
        haveAssetShow3: false,
        canAssetShow: false,
        canAssetShow2: false,
        canAssetShow3: false,
        applyShow: true,
        applyShow2: true,
        assetCount: '',
        assetScore: '',
        peopleMoney: '',
        peopleScore: '',
        servicesMoney: '',
        servicesScore: '',
        securityMoney: '',
        totalGetMoney: '',
        haveMoney: '',
        data2: '',
        options2: {
          colorList: ['cornflowerblue', '#F2F2F2'],
          legendColor: '#000000',         // 图例文本颜色
          legend: '#000000',         // 图例文本颜色
          titleColor: '#646464',
          fillColor: '#72f6ff',
          radius: 55,                     // 环形图外圆半径
          innerRadius: 30,            // 环形图内圆半径
        },
        isShowMasker: false,
        use: 90000,
        unuse: 30000,
        LeftDushu: 0,
        rightDushu: 0
      }
    },
    created() {
      this.accountTel = this.$route.query.accountTel;
      this.username = this.$route.query.username;
      this.promoteMoneyTotal();
    },
    methods: {
      creatPie(totalGetMoney) {
        this.totalGetMoney = parseInt(totalGetMoney)
        let all = 150000; // 赋值2
        let ratio = totalGetMoney / all;
        this.LeftDushu = 360 * ratio;
        if (ratio > 0.5) {
          this.isShowMasker = true;
          this.rightDushu = this.LeftDushu - 180
        }
      },
      back() {
      this.returnRepeat()
      },
      intoOrganizingData() {
        this.$router.push(`/OrganizingData?accountTel=${this.accountTel}`)
      },
      promoteMoneyTotal() {
        let params = {
          mobile: this.accountTel,
        }
        let config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        axios.post(root + '/promoteQuota/query', params, config).then(res => {
          this.code = res.data.code
         if(this.code  == 1005) {
           this.totalGetMoney = 0
           this.assetScore = 0
           this.creatPie(this.totalGetMoney)
         }else {
           this.assetScore = res.data.data.assetScore
           this.assetDate = res.data.data.assetDate
           var date = new Date()
           var newDate = date.getTime()
           this.newDate = newDate
           this.assetCount = res.data.data.asset
           this.totalGetMoney = res.data.data.promTotal
           this.creatPie(this.totalGetMoney)
           // 资产状态判断
           if (this.assetCount == 0) {
             this.noAssetShow = true;
             this.haveAssetShow = false;
             this.canAssetShow = false;
           }
           else if (this.code == 1005) {
             this.noAssetShow = true;
             this.haveAssetShow = false;
             this.canAssetShow = false;
           }
           else if (this.newDate - this.assetDate > 15552000000) {
             this.noAssetShow = false;
             this.haveAssetShow = false;
             this.canAssetShow = true;
           }
           else {
             console.log("已提额")
//            this.assetScore = res.data.data.assetScore
             this.noAssetShow = false;
             this.haveAssetShow = true;
             this.canAssetShow = false;
           }

           // 客流状态判断
           this.peopleMoney = (res.data.data.passenger === undefined) ? 0 : res.data.data.passenger;
           console.log('===:' + this.peopleMoney)
           //          this.peopleMoney = (res.data.data.hasOwnProperty(passenger))
           this.fallFootDate = res.data.data.fallFootDate
           if (this.peopleMoney == 0) {
             this.applyShow = true;
             this.haveAssetShow3 = false;
             this.canAssetShow2 = false;
           }
           else if (this.newDate - this.fallFootDate > 2592000000) {
             this.applyShow = false;
             this.haveAssetShow3 = false;
             this.canAssetShow2 = true;
           }
           else {
             this.applyShow = false;
             this.haveAssetShow3 = true;
             this.canAssetShow2 = false;
           }
           //安保服务
           this.securityMoney = (res.data.data.security === undefined) ? 0 : res.data.data.security;
           this.openDoorDate = res.data.data.openDoorDate
           console.log('securityMoney:' + this.securityMoney)
           if (this.securityMoney == 0) {
//            alert(111)
             console.log('显示申请:' + this.applyShow2)
             this.applyShow2 = true;
             this.haveAssetShow2 = false;
             this.canAssetShow3 = false;
           }
           else if (this.newDate - this.openDoorDate > 2592000000) {
//            alert(222)
             this.applyShow2 = false;
             this.haveAssetShow2 = false;
             this.canAssetShow3 = true;
           }
           else {
             console.log("else?")
//            alert(333)
             this.applyShow2 = false;
             this.haveAssetShow2 = true;
             this.canAssetShow3 = false;
           }
         }
        })
      },
      // 客流统计申请
      peopleStatist() {
        let params = {
          mobile: this.accountTel,
        }
        let config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        axios.post(root + '/promoteQuota/fallFootPro', params, config).then(res => {
          // 客流状态判断
          this.peopleMoney = (res.data.data.passenger === undefined) ? 0 : res.data.data.passenger;
          console.log('===:' + this.peopleMoney)
          if (this.peopleMoney > 0) {
            this.creatPie(this.totalGetMoney + this.peopleMoney + this.securityMoney)
          }
          this.fallFootDate = res.data.data.fallFootDate
//          this.created();
          if (this.peopleMoney == 0) {
            this.applyShow = true;
            this.haveAssetShow3 = false;
            this.canAssetShow2 = false;
          }
          else if (this.newDate - this.fallFootDate > 2592000000) {
            this.applyShow = false;
            this.haveAssetShow3 = false;
            this.canAssetShow2 = true;
          }
          else {
            this.applyShow = false;
            this.haveAssetShow3 = true;
            this.canAssetShow2 = false;
          }

        })
      },
      // 安保服务申请
      services() {
        let params = {
          mobile: this.accountTel,
        }
        let config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        axios.post(root + '/promoteQuota/securityPro', params, config).then(res => {
          console.log(res.data.code)
          if(res.data.code == 1006){
            Toast('未找到相关信息')
            return
          }
          if(res.data.code == 1004){
            Toast('系统繁忙')
            return
          }
          //安保服务
          this.securityMoney = (res.data.data.security === undefined) ? 0 : res.data.data.security;
          this.openDoorDate = res.data.data.openDoorDate
          if (this.securityMoney > 0) {
            this.creatPie(this.totalGetMoney + this.peopleMoney + this.securityMoney)
          }
          console.log('securityMoney:' + this.securityMoney)
          if (this.securityMoney == 0) {
//            alert(111)
            console.log('显示申请:' + this.applyShow2)
            this.applyShow2 = true;
            this.haveAssetShow2 = false;
            this.canAssetShow3 = false;
          }
          else if (this.newDate - this.openDoorDate > 2592000000) {
//            alert(222)
            this.applyShow2 = false;
            this.haveAssetShow2 = false;
            this.canAssetShow3 = true;
          }
          else {
            console.log("else?")
//            alert(333)
            this.applyShow2 = false;
            this.haveAssetShow2 = true;
            this.canAssetShow3 = false;
          }

        })
      },
      haveAssetClick() {
        Toast("您6个月内无法重新提额")
      },
      haveAssetOneMonthClick() {
        Toast("您1个月内无法重新提额")
      },
      noStart() {
        Toast("暂未开放")
      },
      cash() {
        Toast("暂未开放")
      },
      returnRepeat() {
        let params = {
          mobile: this.accountTel,
        }
        let config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        axios.post(root + '/selfeval/query', params, config).then(res => {
          this.promoteScore = res.data.data.records[0].promoteScore;
//          this.promoteTotal = res.data.data.records[0].promoteTotal;
          this.quota = res.data.data.records[0].quota;
          this.score = res.data.data.records[0].score;
          this.promoteTotal = parseInt(this.totalGetMoney) + parseInt(this.quota)
          this.promoteScore = this.promoteScore + this.score
          this.$router.push(`/repeatEvaluation?accountTel=${this.accountTel}&promoteScore=${this.promoteScore}&promoteTotal=${this.promoteTotal}
          &from=promote`)
        })

      }
    }
  }
</script>

<style scoped lang="scss">
  @import "./promoteMoney.scss";
</style>
