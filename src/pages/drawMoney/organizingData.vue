<template>
  <div class="organizingData">
    <div class="title">
      <div class="titleLeft" @click="back()"><img src="../../assets/nav_btn_back@2x.png" alt=""></div>
      <div class="titleMid"><span>提额-完善资料</span></div>
      <!--<div class="titleRight"><img src="../../assets/logo_zs@2x.png" alt=""></div>-->
    </div>
    <section class="contentWrapper">
      <div class="myCellWrapper border-1px">
        <div class="title">姓名</div>
        <div class="value">
          <input type="text" v-model="form.name" placeholder="请输入姓名">
        </div>
        <div class="clear" @click="form.name=''" v-show="form.name">
          <van-icon name="clear" />
        </div>
      </div>
      <div class="myCellWrapper border-1px">
        <div class="title">身份证号</div>
        <div class="value">
          <input type="text" v-model="form.identity" placeholder="请输入身份证号" maxlength="18">
        </div>
        <div class="clear" @click="form.identity=''" v-show="form.identity">
          <van-icon name="clear" />
        </div>
      </div>
      <div class="myCellWrapper border-1px">
        <div class="title">联系方式</div>
        <div class="value">
          <input type="tel" v-model="form.mobile" placeholder="请输入联系方式" maxlength="11">
        </div>
        <div class="clear" @click="form.mobile=''" v-show="form.mobile">
          <van-icon name="clear" />
        </div>
      </div>
      <div class="myCellWrapper border-1px" @click="carTypeEvent">
        <div class="title">平台选择</div>
        <div class="value">
          <input type="text" v-model="form.platform" placeholder="未选择" readonly>
        </div>
        <div class="clear">
          <van-icon name="arrow" />
        </div>
      </div>
      <van-popup v-model="showPlatFormPop" position="bottom" class="van-popup-2">
        <van-picker v-model="form.platform" :title="titlePlatForm" :columns="pickerColumns" show-toolbar @cancel="handlePickerCancel" @confirm="handlePickerConfirm"></van-picker>
        </van-datetime-picker>
      </van-popup>
    </section>
    <div class="main">

      <div class="table-infor">
        <div class="table-left">本地房产</div>
        <div class="table-right"><span>有&ensp;</span><div class="rightIcon"><img src="../../assets/right.png" alt=""></div></div>
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
</script>

<style scoped lang="scss">
  @import "./organizingData.scss";
</style>
