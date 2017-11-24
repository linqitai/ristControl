<template>
  <div class="promoteMoney">
    <!--<div class="title">-->
    <!--<div class="titleLeft" @click="back()"><img src="../../assets/nav_btn_back@2x.png" alt=""></div>-->
    <!--<div class="titleMid"><span>提额</span></div>-->
    <!--</div>-->
    <m-header :accountTel="accountTel">提额</m-header>
    <div class="main">
      <div class="topciycle">
        <div class="ciycle">
          <div class="outCiycle">
            <div class="bgimg"></div>
            <div class="circlebiginner">
              <div class=""></div>
            </div>
            <div class="transfer"
                 v-bind:style="{transform:'rotate(' +transferdeg+'deg)',WebkitTransform:'rotate(' +transferdeg+'deg)',backgroundColor:'blue'}"></div>
            <div class="transfer"
                 v-bind:style="{transform:'rotate(' +transferdega+'deg)',WebkitTransform:'rotate(' +transferdega+'deg)'}"></div>
            <div class="transfer"
                 v-bind:style="{transform:'rotate(' +transferdegb+'deg)',WebkitTransform:'rotate(' +transferdegb+'deg)'}"></div>
            <div class="transfer"
                 v-bind:style="{transform:'rotate(296deg)',WebkitTransform:'rotate(296deg)'}"
                 style="background:#DEE8FC;"></div>
          </div>
          <!--<div class="circleinner" v-show="selfShow">自评</div>-->
          <div class="circleinner2"><span>已提额度</span>
            <div>{{money}}元</div>
          </div>
          <div class="transfer-block" v-show="circleshow"
               v-bind:style="{transform:'rotate(' +(transferdeg-2)+'deg)',WebkitTransform:'rotate(' +(transferdeg-2)+'deg)'}">
            <div class="transfer-circle"
                 v-bind:style="{transform:'rotate(-' +transferdeg+'deg)',WebkitTransform:'rotate(-' +transferdeg+'deg)'}">
              <div class="transfer-score" ref="score" v-show="scoreshow" :class="{'rightscore':rightscore}">
                {{money / 200}}
              </div>
            </div>
          </div>
          <div class="circlebiginner-left">0</div>
          <div class="circlebiginner-right">1000分</div>
        </div>
      </div>
    </div>
    <!--圆结束-->
    <!--<div class="prompt2"><span>提交材料越多，获取额度越高，最高可达15万元</span></div>-->
    <div class="prompt"></div>
    <div class="table" @click="intoOrganizingData()">
      <div class="table-leftT">资产与经营<span class="table-leftT-span">(最高可提额4万元)</span></div>
      <div class="table-leftB" v-if="noAssetMgShow">尚未提额</div>
      <div class="table-leftB" v-if="noAssetMgShow2">已提额{{assetCount / 10000}}万元</div>
      <div class="table-noDrawMoney-new" v-show="noAssetShow">去提额<div class="table-imgnew"><i class="iconfont" style="color:cornflowerblue">&#xe600;</i></div></div>
      <div class="table-noDrawMoney-new" v-show="noAssetShow2">去更新<div class="table-imgnew"><i class="iconfont" style="color:cornflowerblue">&#xe600;</i></div></div>
    </div>
    <!--银行流水-->
    <div class="table" @click="noneStart()">
      <div class="table-leftT">银行卡流水<span class="table-leftT-span">(最高可提额2万元)</span></div>
      <div class="table-leftB">尚未提额</div>
      <div class="table-noDrawMoney-new">去提额<div class="table-imgnew"><i class="iconfont" style="color:cornflowerblue">&#xe600;</i></div></div>
    </div>
    <!--个人征信-->
    <div class="table" @click="noOpened">
      <div class="table-leftT">个人征信报告<span class="table-leftT-span">(最高可提额2万元)</span></div>
      <div class="table-leftB">尚未提额</div>
      <div class="table-noDrawMoney-new">去提额<div class="table-imgnew"><i class="iconfont" style="color:cornflowerblue">&#xe600;</i></div></div>
    </div>
    <div class="prompt"></div>
    <!--安保服务-->
    <div class="table" @click="services">
      <div class="table-leftT">安保服务<span class="table-leftT-span">(最高可提额1万元)</span></div>
      <!--<div class="table-leftB" v-if="protectMgShow">尚未安装，安装并使用最高可提额1万元</div>-->
      <div class="table-leftB" v-if="protectMgShow">尚未申请安装</div>
      <!--<div class="table-leftB" v-if="protectMgShow2">已提额{{securityMoney / 10000}}万元,最高可提额1万元</div>-->
      <div class="table-leftB" v-if="protectMgShow2">已提额{{securityMoney / 10000}}万元</div>
      <!--<div class="table-noDrawMoney" v-show="protectShow">申请</div>-->
      <div class="table-noDrawMoney-new" v-show="protectShow">去申请<div class="table-imgnew"><i class="iconfont" style="color:cornflowerblue">&#xe600;</i></div></div>
      <div class="table-noDrawMoney-new" v-show="protectShow2">去提额<div class="table-imgnew"><i class="iconfont">&#xe600;</i></div>
      </div>
      <!--<div class="table-img"><i class="iconfont" style="color:cornflowerblue">&#xe600;</i></div>-->
    </div>
    <!--客流统计-->
    <div class="table" @click="peopleStatist()">
      <div class="table-leftT">客流统计<span class="table-leftT-span">(最高可提额2万元)</span></div>
      <div class="table-leftB" v-if="peopleMgShow">尚未申请安装</div>
      <div class="table-leftB" v-if="peopleMgShow2">已提额{{peopleMoney / 10000}}万元</div>
      <!--<div class="table-noDrawMoney" v-show="peopleApplyShow">申请</div>-->
      <!--<div class="table-noDrawMoney" v-show="peopleApplyShow2"-->
      <!--v-bind:style="{backgroundColor:'white',color:'gray',border:'1px solid gray'}">申请-->
      <!--</div>-->
      <div class="table-noDrawMoney-new" v-show="peopleApplyShow">去申请<div class="table-imgnew"><i class="iconfont" style="color:cornflowerblue">&#xe600;</i></div></div>
      <div class="table-noDrawMoney-new" v-show="peopleApplyShow2"">去提额<div class="table-imgnew"><i class="iconfont" style="color:cornflowerblue">&#xe600;</i></div></div>
  </div>
    <!--臻收银-->
    <div class="table" @click="noneStart()">
      <div class="table-leftT">臻收银<span class="table-leftT-span">(最高可提额4万元)</span></div>
      <div class="table-leftB">尚未申请安装</div>
      <div class="table-noDrawMoney-new">去申请<div class="table-imgnew"><i class="iconfont" style="color:cornflowerblue">&#xe600;</i></div></div>
    </div>
    <div class="yes" @click="back">返回</div>
  </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import {Toast, Indicator} from 'mint-ui'
  import {
    currentBorrowAmount,
    borrowRecord,
    recentRepaymentPlan,
    addRecord,
    repaymentPlan,
    query
  } from '../../api/index'
  import {getTime, getDate, dateAddHorizontal} from '../../common/js/times'
  import mHeader from '@/components/HeaderBackToRepeat.vue'

  const root = '/zsf'
  export default {
    components: {
      mHeader
    },
    data() {
      return {
        noAssetShow: true,
        noAssetShow2: false,
        noAssetMgShow: false,
        noAssetMgShow2: false,
        canAssetShow: false,
        protectShow2: false,
        canAssetShow3: false,
        canAssetShowBlue: false,
        peopleApplyShow: true,
        peopleApplyShow2: false,
        protectShow: true,
        peopleMgShow: false,
        peopleMgShow2: false,
        protectMgShow: false,
        protectMgShow2: false,
        assetCount: '',
        promoteTotal: '',
        assetScore: '',
        peopleMoney: '',
        peopleScore: '',
        servicesMoney: '',
        servicesScore: '',
        securityMoney: '',
        totalGetMoney: '',
        haveMoney: '',
        data2: '',
        isShowMasker: false,
        initialdeg: 50,//初始化半角度
        allscore: 1000,//总分值
        transferdeg: 245,
        transferdega: 238,
        transferdegb: 238,
        scoreshow: true,
        circleshow: false,
        score: null,
        rightscore: true,
        money: 0,
        accountTel: '',
        aa: true,
        bb: true
      }
    },
    created() {
      this.accountTel = this.$route.query.accountTel;
      console.log('this.accountTel:' + this.accountTel);
      this.username = this.$route.query.username;
      this.atborrowMoney = this.$route.query.atborrowMoney;
      this.promoteMoneyTotal();
//      this.peopleClick()
    },
    methods: {
      noOpened() {
        Toast('即将上线，敬请期待')
      },
      noneStart() {
        Toast("即将上线,敬请期待")
      },
      noOpen() {
        Toast('即将上线，敬请期待')
      },
      back() {
        console.log('back')
        this.$router.push(`/repeatEvaluation?accountTel=${this.accountTel}`)
      },
      intoOrganizingData() {
        this.promoteMoneyTotal2()
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
        axios.defaults.timeout = 60000
        Indicator.open()
        axios.post(root + '/promoteQuota/query', params, config).then(res => {
          Indicator.close()
          this.code = res.data.code
          this.asset = (res.data.data.asset === undefined) ? -1 : res.data.data.asset;
          // 资产与经营
          if (this.code === 1005 || this.asset === -1) {
            this.noAssetShow = true;
            this.noAssetShow2 = false;
            this.noAssetMgShow = true;
            this.noAssetMgShow2 = false;
          }
          else{
            this.noAssetShow = false;
            this.noAssetShow2 = true;
            this.noAssetMgShow = false;
            this.noAssetMgShow2 = true;
          }
            // 圆
            this.money = res.data.data.promTotal
            this.score = res.data.data.totalScore
            if (this.score > 150 && this.score < 350) {
              this.$refs.score.style.right = 0
              this.$refs.score.style.top = '-10px'
            }
            if (this.score > 350) {
              this.$refs.score.style.left = '23px'
              this.$refs.score.style.right = 0
              this.$refs.score.style.top = 0
            }
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
            this.transferdega = this.transferdega + 50;
            this.transferdegb = this.transferdegb + 50;
            this.transferdeg = this.transferdeg + 50;
            this.circleshow = true
            // 资产状态判断
            this.assetScore = res.data.data.assetScore
            this.assetDate = res.data.data.assetDate
            var date = new Date()
            var newDate = date.getTime()
            this.newDate = newDate
            this.assetCount = res.data.data.asset
            this.totalGetMoney = res.data.data.promTotal
            // 客流状态判断
            this.peopleMoney = (res.data.data.passenger === undefined) ? 0 : res.data.data.passenger;
//            this.peopleMoney = (res.data.data.hasOwnProperty(passenger))
//            this.fallFootDate = res.data.data.fallFootDate
          this.fallFootDate = (res.data.data.fallFootDate === undefined) ? -1 : res.data.data.fallFootDate;
            this.isInstallKL = res.data.data.isInstallKL
            if (this.isInstallKL === 0 || this.isInstallKL === -1) {
              this.peopleApplyShow = true;
              this.peopleApplyShow2 = false;
              this.peopleMgShow = true;
              this.peopleMgShow2 = false;

            }
//            else if (this.newDate - this.fallFootDate > 2592000000) {
//              this.peopleApplyShow = false;
//              this.peopleApplyShow2 = true;
//              this.peopleMgShow = false;
//              this.peopleMgShow2 = true;
//            }
            else if (this.isInstallKL === 1){
                this.peopleApplyShow = false;
                this.peopleApplyShow2 = true;
                this.peopleMgShow = false;
                this.peopleMgShow2 = true;
            }
            //安保服务
            this.securityMoney = (res.data.data.security === undefined) ? 0 : res.data.data.security;
          this.openDoorDate = (res.data.data.openDoorDate === undefined) ? -1 : res.data.data.openDoorDate;
            this.openDoorDate = res.data.data.openDoorDate
//            if(this.securityMoney > 0) {
//              this.money = this.money + this.securityMoney
//            }
            this.isInstallAB = res.data.data.isInstallAB
            if (this.isInstallAB === 0 || this.isInstallAB === -1) {
              this.protectShow = true;
              this.peopleApplyShow2 = false;
              this.protectMgShow = true;
              this.protectMgShow2 = false
            }
//            else if (this.newDate - this.openDoorDate > 2592000000) {
//              this.protectShow = false;
//              this.protectShow2 = true;
//              this.protectMgShow = false;
//              this.protectMgShow2 = true;
//            }
            else if(this.isInstallAB === 1){
              this.protectShow = false;
              this.protectShow2 = true;
              this.protectMgShow = false;
              this.protectMgShow2 = true;
            }
        }).catch(() => {
          Indicator.close()
          Toast('网络请求超时')
        })
      },
      promoteMoneyTotal2() {
        if(this.noAssetShow == true){
          this.$router.push(`/OrganizingData?accountTel=${this.accountTel}`)
        }
        else if(this.noAssetShow2 == true){
          if(this.newDate - this.assetDate < 2592000000){
            Toast('您1个月内无法重新提额')
          }
          else{
            this.$router.push(`/OrganizingData?accountTel=${this.accountTel}`)
          }
        }
      },
      // 客流点击函数
      peopleClick() {
        let params = {
          mobile: this.accountTel,
        }
        let config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        axios.post(root + '/promoteQuota/fallFootPro', params, config).then(res => {
          this.code = res.data.code
          this.msg = res.data.msg
          console.log(this.aa)
          if(this.aa == true){
            this.aa = false;
            if(this.code === 1000){
              this.peopleMoney = (res.data.data.passenger === undefined) ? 0 : res.data.data.passenger;
              if (this.peopleMoney > 0) {
                this.money = this.money + this.peopleMoney
              }
            }
            else{
              Toast(this.msg)
            }
          }
          else{
            setTimeout(()=>{
              this.aa = true
              },3000
            )
          }

        })
      },
      // 客流点击的事件
      peopleStatist() {
        if (this.peopleApplyShow == true) {

          var asd = JSON.stringify({"stageproductId": '2', "atborrowMoney": this.atborrowMoney});
          let ua = navigator.userAgent.toLowerCase();
          if (/iphone|ipad|ipod/.test(ua)) {
//                popToViewController()
            navigateToNativeUI(asd)
          } else if (/android/.test(ua)) {
            htmlToJava.navigateToNativeUI(2, parseInt(this.atborrowMoney))
          }
        }
        else if (this.peopleApplyShow2 == true){
            this.peopleClick()
        }
      },
      // 安保服务点击函数
      servicesClick() {
        let params = {
          mobile: this.accountTel,
        }
        let config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        axios.post(root + '/promoteQuota/securityPro', params, config).then(res => {
          this.code = res.data.code
          this.msg = res.data.msg
          if(this.bb == true){
            this.bb = false
            if(this.code === 1000){
              this.securityMoney = (res.data.data.security === undefined) ? 0 : res.data.data.security;
              this.openRateScore = (res.data.data.openRateScore === undefined) ? 0 : res.data.data.openRateScore;
              if (this.securityMoney > 0) {
                this.money = this.money + this.securityMoney
              }
              if (this.openRateScore > 0) {
                this.score = this.score + this.openRateScore
              }
            }
            else if (res.data.code == 1004) {
              Toast('系统繁忙')
              return
            }
            else {
              Toast(this.msg)
            }
          }
          else{
            setTimeout(()=>{
                this.bb = true
              },3000
            )
          }
        })
      },
      // 安保服务点击事件
      services() {
        if (this.protectShow === true) {
          var asd = JSON.stringify({"stageproductId": '1', "atborrowMoney": this.atborrowMoney});
          let ua = navigator.userAgent.toLowerCase()
          if (/iphone|ipad|ipod/.test(ua)) {
            navigateToNativeUI(asd)
          } else if (/android/.test(ua)) {
            htmlToJava.navigateToNativeUI(1, parseInt(this.atborrowMoney))
          }
        }
        else if (this.protectShow2 === true){
            this.servicesClick()
          }
        }
      },
    }
</script>

<style scoped lang="scss">
  @import "./promoteMoney.scss";
</style>
