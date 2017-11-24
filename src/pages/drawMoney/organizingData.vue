<template>
  <div class="organizingData">
    <!--<div class="title">-->
      <!--<div class="titleLeft" @click="back()"><img src="../../assets/nav_btn_back@2x.png" alt=""></div>-->
      <!--<div class="titleMid"><span>提额-完善资料</span></div>-->
      <!--&lt;!&ndash;<div class="titleRight"><img src="../../assets/logo_zs@2x.png" alt=""></div>&ndash;&gt;-->
    <!--</div>-->
    <m-header>提额-资产与经营</m-header>
    <div class="main">

      <mt-popup
        v-model="popupVisible"
        position="bottom" class="box">
        <div @click.stop="selectState('有')">有</div>
        <div @click.stop="selectState('无')">无</div>
        <div id="boxBlank"></div>
        <div @click="popupVisible = false">取消</div>
      </mt-popup>
      <mt-popup
        v-model="popupVisible2"
        position="bottom" class="box">
        <div @click.stop="selectState2('有-无抵押')">有-无抵押</div>
        <div @click.stop="selectState2('有-已抵押')">有-已抵押</div>
        <div @click.stop="selectState2('无')">无</div>
        <div id="boxBlank"></div>
        <div @click="popupVisible2 = false">取消</div>
      </mt-popup>
      <mt-popup
        v-model="popupVisible3"
        position="bottom" class="box">
        <div @click.stop="selectState3('是')">是</div>
        <div @click.stop="selectState3('否')">否</div>
        <div id="boxBlank"></div>
        <div @click="popupVisible3 = false">取消</div>
      </mt-popup>
      <mt-popup
        v-model="popupVisible4"
        position="bottom" class="box">
        <div @click.stop="selectState4('≤1年')">≤1年</div>
        <div @click.stop="selectState4('1-3年')">1-3年</div>
        <div @click.stop="selectState4('3年以上')">3年以上</div>
        <div id="boxBlank"></div>
        <div @click="popupVisible4 = false">取消</div>
      </mt-popup>
      <mt-popup
        v-model="popupVisible5"
        position="bottom" class="box">
        <div @click.stop="selectState5('城区-商业')">城区-商业</div>
        <div @click.stop="selectState5('城区-住宅')">城区-住宅</div>
        <div @click.stop="selectState5('郊区-商业')">郊区-商业</div>
        <div @click.stop="selectState5('郊区-住宅')">郊区-住宅</div>
        <div @click.stop="selectState5('郊区-工业')">郊区-工业</div>
        <div id="boxBlank"></div>
        <div @click="popupVisible5 = false">取消</div>
      </mt-popup>
      <div class="table-infor" @click="popupVisible = true">
        <div class="table-left">本地房产</div>
        <div class="table-right">
          <!--<span v-model="localHouse">有&ensp;</span>-->
          <input class="selectInput" type="text" placeholder="有" v-model="localHouse" readonly>
          <div class="rightIcon"><img src="../../assets/right.png" alt=""></div>
        </div>
      </div>
      <div class="table-infor" v-show="marketValueShow">
        <div class="table-left">房产价值</div>
        <div class="table-right">
          <div class="cell">
            <input type="number" v-model='marketValue' placeholder="所有房产预估市场价值"/>
            <div class="rightUnit">万元</div>
          </div>
        </div>
      </div>
      <div class="table-infor" @click="popupVisible2 = true">
        <div class="table-left">车辆信息</div>
        <div class="table-right"><input class="selectInput" type="text" placeholder="有无抵押" v-model="carInfor" readonly>
          <div class="rightIcon"><img src="../../assets/right.png" alt=""></div>
        </div>
      </div>
      <div class="table-infor" v-show="carMarketValueShow">
        <div class="table-left">车辆价值</div>
        <div class="table-right">
          <div class="cell">
            <input class="width120" type="number" v-model='carMarketValue' placeholder="所有车产预估市场价值"/>
            <div class="rightUnit">万元</div>
          </div>
        </div>
      </div>
      <div class="prompt2"></div>
      <div class="table-infor" @click="popupVisible3 = true">
        <div class="table-left">是否店铺所有者</div>
        <div class="table-right"><input class="selectInput" type="text" placeholder="是" v-model="isshopOwner" readonly>
          <div class="rightIcon"><img src="../../assets/right.png" alt=""></div>
        </div>
      </div>
      <div v-show="shopInfor">
        <div class="table-infor">
          <div class="table-left">店铺月经营收入</div>
          <div class="table-right">
            <input class="width100" type="number" v-model='monthly_sales'>
            <div class="rightUnit">元</div>
          </div>
        </div>
        <div class="table-infor">
          <div class="table-left">员工人数</div>
          <div class="table-right">
            <input class="width100" type="number" v-model='employee_num'/>
            <div class="rightUnit">人</div>
          </div>
        </div>
        <div class="table-infor">
          <div class="table-left">店铺年租金</div>
          <div class="table-right">
            <input class="width100" type="number" v-model='annual_rent'>
            <div class="rightUnit">万元</div>
          </div>
        </div>
        <div class="table-infor" @click="popupVisible4 = true">
          <div class="table-left">店铺开业时长</div>
          <div class="table-right"><input class="selectInput" type="text" v-model="shopYear" readonly>
            <div class="rightIcon"><img src="../../assets/right.png" alt=""></div>
          </div>
        </div>
        <div class="table-infor" @click="popupVisible5 = true">
          <div class="table-left">店铺所处区域</div>
          <div class="table-right"><input class="selectInput" type="text" v-model="shopPlace" readonly>
            <div class="rightIcon"><img src="../../assets/right.png" alt=""></div>
          </div>
        </div>
      </div>
      <div class="yesButton" @click="submit()">提交</div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {Toast} from 'mint-ui'
  import mHeader from '@/components/Header'

  const root = '/zsf'
  export default {
    components: {
      mHeader
    },
    data() {
      return {
        name: '',
        form: {
          name: ''
        },
        popupVisible: false,
        popupVisible2: false,
        popupVisible3: false,
        popupVisible4: false,
        popupVisible5: false,
        marketValueShow: true,
        carMarketValueShow: true,
        shopInfor: true,
        localHouse: '',
        carInfor: '',
        isshopOwner: '',
        shopYear: '',
        shopPlace: '',
        localHouseValue: 1,
        carInforValue: 1,
        marketValue: '',
        carMarketValue: '',
        isshopOwnerValue: 1,
        monthly_sales: '',
        employee_num: '',
        annual_rent: '',
        shopYearValue: 0,
        shopPlaceValue: 0,
        asset: ''
      }
    },
    created() {
      this.accountTel = this.$route.query.accountTel;
    },
    methods: {
      back() {
        this.$router.goBack()
      },
      // 本地房产 选择事件
      selectState: function (state) {
        this.localHouse = state;
        this.popupVisible = false;
        if (state == '无') {
          this.marketValueShow = false
          this.localHouseValue = 0
          this.marketValue = 0
        } else {
          this.marketValueShow = true
          this.localHouseValue = 1
          this.marketValue = ''
        }
      },
      // 车辆信息 选择事件
      selectState2: function (state) {
        this.carInfor = state;
        this.popupVisible2 = false;
        if (state == '有-已抵押' | state == '无') {
          this.carMarketValueShow = false
          this.carInforValue = 0
          this.carMarketValue = 0

        } else {
          this.carInforValue = 1
          this.carMarketValueShow = true
          this.carMarketValue = ''
        }
      },
      // 是否店铺所有者 选择事件
      selectState3: function (state) {
        this.isshopOwner = state;
        this.popupVisible3 = false;
        if (state == '是') {
          this.shopInfor = true
          this.isshopOwnerValue = 1
        } else {
          this.shopInfor = false
          this.isshopOwnerValue = 0
        }
      },
      // 店铺开业时长 选择事件
      selectState4: function (state) {
        this.shopYear = state;
        this.popupVisible4 = false;
        if (state == '≤1年') {
          this.shopYearValue = 0
        }
        else if (state == '1-3年') {
          this.shopYearValue = 1
        }
        else {
          this.shopYearValue = 2
        }
      },
      // 店铺区域 选择事件
      selectState5: function (state) {
        this.shopPlace = state;
        this.popupVisible5 = false;
        if (state == '城区-商业') {
          this.shopPlaceValue = 4
        }
        else if (state == '城区-住宅') {
          this.shopPlaceValue = 3
        }
        else if (state == '郊区-商业') {
          this.shopPlaceValue = 2
        }
        else if (state == '郊区-住宅') {
          this.shopPlaceValue = 1
        }
        else {
          this.shopPlaceValue = 0
        }
      },
      submit: function () {
        let params = {
          mobile: this.accountTel,
          house: this.localHouseValue,
          houseValue: parseInt(this.marketValue),
          car: this.carInforValue,
          carValue: parseInt(this.carMarketValue),
          shop: this.isshopOwnerValue,
          monthlySales: parseInt(this.monthly_sales),  // 月租金
          employeeNum: parseInt(this.employee_num),        // 员工数量
          annualRent: parseInt(this.annual_rent),          // 店铺年租金
          startBusinessTime: this.shopYearValue,     // 开业年限
          area: this.shopPlaceValue                    // 店铺所处区域
        }
        let config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        if(this.marketValue === ''){
          Toast('请输入房产价值')
          return
        }
        if(this.carMarketValue === ''){
          Toast('请输入车辆价值')
          return
        }
//        if(this.localHouseValue === 0 && this.carInforValue === 0 && this.isshopOwnerValue === 0){
//          Toast('您未填信息,请重新输入')
//          return
//        }
        if(this.employee_num > 50) {
          Toast('员工人数过大')
          return
        }
        if(this.annual_rent >100){
          Toast('年租金过大')
          return
        }
//        if(this.localHouseValue === 0 && this.carInforValue === 0 && this.isshopOwnerValue === 1){
//          Toast('请输入完整的店铺信息')
//          return
//        }
        axios.post(root + '/promoteQuota/calculate', params, config).then(res => {
          console.log(res.data.code)
          if (res.status == 200 && res.data.code == 1000) {
            this.asset = res.data.data.asset
            this.$router.push(`/promoteMoney?accountTel=${this.accountTel}`)
          }
          if (res.status == 200 && res.data.code == 1001) {
            Toast('请输入完整的信息')
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "./organizingData.scss";
</style>
