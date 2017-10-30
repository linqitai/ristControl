<template>
  <div class="organizingData">
    <div class="title">
      <div class="titleLeft" @click="back()"><img src="../../assets/nav_btn_back@2x.png" alt=""></div>
      <div class="titleMid"><span>提额-完善资料</span></div>
      <!--<div class="titleRight"><img src="../../assets/logo_zs@2x.png" alt=""></div>-->
    </div>
    <!--<section class="contentWrapper">-->
      <!--<div class="myCellWrapper border-1px">-->
        <!--<div class="title">姓名</div>-->
        <!--<div class="value">-->
          <!--<input type="text" v-model="form.name" placeholder="请输入姓名">-->
        <!--</div>-->
        <!--<div class="clear" @click="form.name=''" v-show="form.name">-->
          <!--<van-icon name="clear" />-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="myCellWrapper border-1px" @click="">-->
        <!--<div class="title">平台选择</div>-->
        <!--<div class="value">-->
          <!--<input type="text" v-model="form.platform" placeholder="未选择" readonly>-->
        <!--</div>-->
        <!--<div class="clear">-->
          <!--<van-icon name="arrow" />-->
        <!--</div>-->
      <!--</div>-->
    <!--</section>-->
    <div class="main">

      <!--<div class="table-infor">-->
        <!--<div class="table-left">本地房产</div>-->
        <!--<div class="table-right"><span>有&ensp;</span><div class="rightIcon"><img src="../../assets/right.png" alt=""></div></div>-->
      <!--</div>-->
      <div class="table-infor">
        <div class="table-left">本地房产</div>
        <div class="table-right">
          <span>有&ensp;</span>
          <div class="rightIcon"><img src="../../assets/right.png" alt=""></div>
        </div>
      </div>
      <div class="table-infor">
        <div class="table-left">市场价值</div>
        <div class="table-right"><input type="text" placeholder="所有房产预估市场价值(万元)"/></div>
      </div>
      <div class="table-infor">
        <div class="table-left">车辆信息</div>
        <div class="table-right"><span>有-无抵押&ensp;</span><div class="rightIcon"><img src="../../assets/right.png" alt=""></div></div>
      </div>
      <div class="table-infor">
        <div class="table-left">市场价值</div>
        <div class="table-right"></div>
      </div>
      <div class="prompt2"></div>
      <div class="table-infor">
        <div class="table-left">是否店铺所有者</div>
        <div class="table-right"><span>是&ensp;</span><div class="rightIcon"><img src="../../assets/right.png" alt=""></div></div>
      </div>
      <div class="table-infor">
        <div class="table-left">店铺月经营收入</div>
        <div class="table-right"></div>
      </div>
      <div class="table-infor">
        <div class="table-left">员工人数</div>
        <div class="table-right"></div>
      </div>
      <div class="table-infor">
        <div class="table-left">店铺年租金</div>
        <div class="table-right"></div>
      </div>
      <div class="table-infor">
        <div class="table-left">店铺开业时长</div>
        <div class="table-right"></div>
      </div>
      <div class="table-infor">
        <div class="table-left">店铺所处区域</div>
        <div class="table-right"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name:'',
        form: {
          name: ''
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "./organizingData.scss";
</style>
