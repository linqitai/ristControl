<template>
  <div class="organizingData">
    <div class="title">
      <div class="titleLeft" @click="back()"><img src="../../assets/nav_btn_back@2x.png" alt=""></div>
      <div class="titleMid"><span>提额-完善资料</span></div>
      <!--<div class="titleRight"><img src="../../assets/logo_zs@2x.png" alt=""></div>-->
    </div>
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
        <div @click.stop="selectState5('城区商业')">城区商业</div>
        <div @click.stop="selectState5('城区住宅')">城区住宅</div>
        <div @click.stop="selectState5('郊区商业')">郊区商业</div>
        <div @click.stop="selectState5('郊区住宅')">郊区住宅</div>
        <div @click.stop="selectState5('郊区工业')">郊区工业</div>
        <div id="boxBlank"></div>
        <div @click="popupVisible5 = false">取消</div>
      </mt-popup>
      <div class="table-infor"  @click="popupVisible = true">
        <div class="table-left">本地房产</div>
        <div class="table-right">
          <!--<span v-model="localHouse">有&ensp;</span>-->
          <input class="selectInput" type="text" placeholder="有" v-model="localHouse" readonly>
          <div class="rightIcon"><img src="../../assets/right.png" alt=""></div>
        </div>
      </div>
      <div class="table-infor" v-show="marketValueShow">
        <div class="table-left">市场价值</div>
        <div class="table-right"><input type="number" v-model='marketValue' placeholder="所有房产预估市场价值(万元)"/></div>
      </div>
      <div class="table-infor" @click="popupVisible2 = true">
        <div class="table-left">车辆信息</div>
        <div class="table-right"><input class="selectInput" type="text" placeholder="有无抵押" v-model="carInfor" readonly><div class="rightIcon"><img src="../../assets/right.png" alt=""></div></div>
      </div>
      <div class="table-infor" v-show="carMarketValueShow">
        <div class="table-left">市场价值</div>
        <div class="table-right"><input type="number" v-model='carMarketValue' placeholder="所有车产预估市场价值(万元)"/></div>
      </div>
      <div class="prompt2"></div>
      <div class="table-infor" @click="popupVisible3 = true">
        <div class="table-left">是否店铺所有者</div>
        <div class="table-right"><input class="selectInput" type="text" placeholder="是" v-model="isshopOwner" readonly><div class="rightIcon"><img src="../../assets/right.png" alt=""></div></div>
      </div>
      <div v-show="shopInfor">
      <div class="table-infor">
        <div class="table-left">店铺月经营收入</div>
        <div class="table-right"><input type="number" v-model='monthly_sales' placeholder="元"/></div>
      </div>
      <div class="table-infor">
        <div class="table-left">员工人数</div>
        <div class="table-right"><input type="number" v-model='employee_num' placeholder="人"/></div>
      </div>
      <div class="table-infor">
        <div class="table-left">店铺年租金</div>
        <div class="table-right"><input type="number" v-model='annual_rent' placeholder="元"/></div>
      </div>
      <div class="table-infor" @click="popupVisible4 = true">
        <div class="table-left">店铺开业时长</div>
        <div class="table-right"><input class="selectInput" type="text" placeholder="" v-model="shopYear" readonly><div class="rightIcon"><img src="../../assets/right.png" alt=""></div></div>
      </div>
      <div class="table-infor" @click="popupVisible5 = true">
        <div class="table-left">店铺所处区域</div>
        <div class="table-right"><input class="selectInput" type="text" placeholder="" v-model="shopPlace" readonly><div class="rightIcon"><img src="../../assets/right.png" alt=""></div></div>
      </div>
      </div>
      <div class="yesButton" @click="submit()">提交</div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {Toast} from 'mint-ui'
  const root = '/zsf'
  export default {
    data() {
      return {
        name:'',
        form: {
          name: ''
        },
        popupVisible:false,
        popupVisible2:false,
        popupVisible3:false,
        popupVisible4:false,
        popupVisible5:false,
        marketValueShow:true,
        carMarketValueShow:true,
        shopInfor:true,
        localHouse:'',
        carInfor:'',
        isshopOwner:'',
        shopYear:'',
        shopPlace:'',
        localHouseValue:1,
        carInforValue:0,
        marketValue:'',
        carMarketValue:'',
        isshopOwnerValue:1,
        monthly_sales:'',
        employee_num: '',
        annual_rent: '',
        shopYearValue: 0,
        shopPlaceValue: 0,
        asset: ''
      }
    },
    created(){
      this.accountTel = this.$route.query.accountTel;
    },
    methods:{
      back() {
        this.$router.goBack()
      },
      // 本地房产 选择事件
      selectState: function(state){
        this.localHouse = state;
        this.popupVisible = false;
         if(state == '无'){
         this.marketValueShow = false
          this.localHouseValue = 0
           this.marketValue = 0
        }else{
          this.marketValueShow = true
          this.localHouseValue = 1
        }
      },
      // 车辆信息 选择事件
      selectState2: function(state){
        this.carInfor = state;
        this.popupVisible2 = false;
        if(state == '有-已抵押' | state == '无'){
          this.carMarketValueShow = false
          this.carInforValue = 0
          this.carMarketValue = 0
        }else{
          this.carMarketValueShow = true
          this.carInforValue = 1
        }
      },
      // 是否店铺所有者 选择事件
      selectState3: function(state){
        this.isshopOwner = state;
        this.popupVisible3 = false;
        if(state == '是'){
          this.shopInfor = true
          this.isshopOwnerValue = 1
        }else{
          this.shopInfor = false
          this.isshopOwnerValue = 0
        }
      },
      // 店铺开业时长 选择事件
      selectState4: function(state){
        this.shopYear = state;
        this.popupVisible4 = false;
        if(state == '≤1年'){
          this.shopYearValue = 0
        }
        else if(state == '1-3年'){
          this.shopYearValue = 1
        }
        else{
          this.shopYearValue = 2
        }
      },
     // 店铺区域 选择事件
      selectState5: function(state){
        this.shopPlace = state;
        this.popupVisible5 = false;
        if(state=='城区商业'){
          this.shopPlaceValue = 4
        }
        else if(state=='城区住宅'){
          this.shopPlaceValue = 3
        }
        else if(state=='郊区商业'){
          this.shopPlaceValue = 2
        }
        else if(state=='郊区住宅'){
          this.shopPlaceValue = 1
        }
        else{
          this.shopPlaceValue = 0
        }
      },
      submit:function(){
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
        axios.post(root + '/promoteQuota/calculate', params, config).then(res => {
          console.log(res.data.data.asset)
          if (res.status == 200 && res.data.code == 1000 && res.data.data.asset) {
            this.asset = res.data.data.asset
            this.$router.push(`/promoteMoney?accountTel=${this.accountTel}`)
          }
          if (res.status == 200 && res.data.code == 1001) {
            Toast('您输入的信息输入有误')
          }
          })
        }
      }
    }
</script>

<style scoped lang="scss">
  @import "./organizingData.scss";
</style>
