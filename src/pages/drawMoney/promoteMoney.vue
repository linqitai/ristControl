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
         <div class="table-line"><mt-range :value="this.assetCount" :bar-height="7" :max="60000" :min="0"></mt-range></div>
         <div class="table-number">{{assetScore/5}}万</div>
         <div class="table-noDrawMoney" v-show="noAssetShow">未提额</div>
         <div class="table-noDrawMoney" v-show="haveAssetShow">已提额</div>
         <div class="table-img" @click="intoOrganizingData()"><img src="../../assets/right.png" alt=""></div>
       </div>
       <div class="table">
         <div class="table-leftT">银行卡流水</div>
         <div class="table-leftB">提额高达2万元</div>
         <div class="table-line"><mt-range :value="0" :bar-height="7"></mt-range></div>
         <div class="table-number">0</div>
         <div class="table-noDrawMoney">未提额</div>
         <div class="table-img"><img src="../../assets/right.png" alt=""></div>
       </div>
       <div class="table">
         <div class="table-leftT">个人征信报告</div>
         <div class="table-leftB">提额高达2万元</div>
         <div class="table-line"><mt-range :value="0" :bar-height="7"></mt-range></div>
         <div class="table-number">0</div>
         <div class="table-noDrawMoney">未提额</div>
         <div class="table-img"><img src="../../assets/right.png" alt=""></div>
       </div>
       <div class="prompt"></div>
       <div class="table">
         <div class="table-leftT">臻收银</div>
         <div class="table-leftB">多收多贷，提额高达2万元</div>
         <div class="table-line"><mt-range :value="0" :bar-height="7"></mt-range></div>
         <div class="table-number">0</div>
         <div class="table-noDrawMoney">申请</div>
         <div class="table-img"><img src="../../assets/right.png" alt=""></div>
       </div>
       <div class="table">
         <div class="table-leftT">客流统计</div>
         <div class="table-leftB">提额高达2万元</div>
         <div class="table-line"><mt-range :value="0" :bar-height="7"></mt-range></div>
         <div class="table-number">0</div>
         <div class="table-noDrawMoney">申请</div>
         <div class="table-img"><img src="../../assets/right.png" alt=""></div>
       </div>
       <div class="table">
         <div class="table-leftT">安保服务</div>
         <div class="table-leftB">提额高达1万元</div>
         <div class="table-line"><mt-range :value="0" :bar-height="7"></mt-range></div>
         <div class="table-number">0</div>
         <div class="table-noDrawMoney">申请</div>
         <div class="table-img"><img src="../../assets/right.png" alt=""></div>
       </div>
       <div class="prompt"></div>
       <div class="prompt3">您当前已提额:0元</div>

       <!--<canvas id="myCanvas" width="200px" height="200px"></canvas>-->
         <!--&lt;!&ndash;<div class="ciycle">&ndash;&gt;-->
           <!--&lt;!&ndash;<div class="pie_left"><div class="left"></div></div>&ndash;&gt;-->
           <!--&lt;!&ndash;&lt;!&ndash;<div class="pie_right"><div class="right"></div></div>&ndash;&gt;&ndash;&gt;-->
           <!--&lt;!&ndash;<div class="mask"><span>20</span>%</div>&ndash;&gt;-->
         <!--&lt;!&ndash;</div>&ndash;&gt;-->
       <div class="app3" id="rotate" v-bind:style="{ 'background-color':ic }">
         <div class="w-right">
           <div class="right" id="right" v-bind:style="{ 'background-color':oc }"></div>
         </div>
         <div class="w-left">
           <div class="left" id="left" v-bind:style="{ 'background-color':oc }"></div>
         </div>
       </div>

     </div>
   </div>
</template>
<script>
//  gvChartInit();
//  $(document).ready(function(){
//    $('#myTable1').gvChart({
//      chartType: 'PieChart',
//      gvSettings: {
//        vAxis: {title: 'No of players'},
//        hAxis: {title: 'Month'},
//        width: 60,
//        height: 35
//      }
//    });
//  });
</script>
<script>
  import axios from 'axios'
  import {Toast} from 'mint-ui'
  import {currentBorrowAmount, borrowRecord, recentRepaymentPlan, addRecord, repaymentPlan, query} from '../../api/index'
  import {getTime, getDate, dateAddHorizontal} from '../../common/js/times'
  import {} from '../../common/js/jquery-3.2.1.slim.min.js'
  const root = '/zsf'
  export default {
    data() {
      return {
        noAssetShow: true,
        haveAssetShow: false,
        assetCount: '',
        assetScore: '',
        left: '',
        right: '',
        rotate: '',
        startDeg: 30, //开始 角度
        maskDeg: 250, // 表园 未遮挡 低园 角度
        ic: 'red', //底部 园颜色
        oc: 'blue' // 表 园 颜色

      }
    },
    created() {
      this.accountTel = this.$route.query.accountTel;
      this.promoteMoneyTotal()
      if(this.assetScore = 0){
        this.noAssetShow = true;
      }else{
        this.haveAssetShow = true
        this.noAssetShow = false
      }
      this.mounted();
//      $(function(){
//        if( $('.mask span').text() ){
//          $('.pie_right').css('transform','rotate('+($('.mask span').text()*3.6)+'deg)');
//        }
////        else{
////          $('.pie_right').css('transform','rotate(180deg)');
////          $('.pie_left').css('transform','rotate('+(($('.mask span').text()-50)*3.6)+'deg)');
////        }
//      })
    },
    methods: {
      back() {
        this.$router.goBack()
      },
      intoOrganizingData() {
        this.$router.push(`/OrganizingData?accountTel=${this.accountTel}`)
      },
      promoteMoneyTotal() {
//          let params = {
//            mobile: this.accountTel
//          }
//          query(params).then(res => {
////            if (res.code === 0 && res.list.length !== 0) {
////              console.log(res.list.length)
////              this.records = res.list;
////              this.noRecords = false
////              this.lookMoreShow = true
////            } else {
////              this.noRecords = true
////              this.lookMoreShow = false
////            }
//          })
//        },
        let params = {
          mobile: this.accountTel,
        }
        let config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        axios.post(root + '/promoteQuota/query', params, config).then(res => {
          this.assetScore = res.data.data.assetScore
          this.assetCount = res.data.data.asset
          console.log(res.data.data.asset)
        })
      },
      mounted: function() {
        this.rotate = document.getElementById('rotate');
        this.right = document.getElementById('right');
        this.left = document.getElementById('left');
        this.mask();
      },
      mask: function() {
        console.log(this.right);
        this.rotate.style.transform = `rotate(${this.startDeg}deg)`;
        if (this.maskDeg > 180) {
          this.right.style.transform = `rotate(180deg)`;
          this.left.style.transform = `rotate(${this.maskDeg-180}deg)`;
        } else {
          this.right.style.transform = `rotate(${this.maskDeg}deg)`;
        }
      }

    }
  }
//  //获取Canvas对象(画布)
//  var canvas = document.getElementById("myCanvas");
//  console.log(canvas);
//  //简单地检测当前浏览器是否支持Canvas对象，以免在一些不支持html5的浏览器中提示语法错误
//  if(canvas.getContext){
//    //获取对应的CanvasRenderingContext2D对象(画笔)
//    var ctx = canvas.getContext("2d");
//
//    //开始一个新的绘制路径
//    ctx.beginPath();
//    //设置弧线的颜色为蓝色
//    ctx.strokeStyle = "blue";
//    ctx.fillStyle='#FF0000';
//    var circle = {
//      x : 100,    //圆心的x轴坐标值
//      y : 100,    //圆心的y轴坐标值
//      r : 50      //圆的半径
//    };
//    //沿着坐标点(100,100)为圆心、半径为50px的圆的顺时针方向绘制弧线
//    ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI / 2, false);
//    //按照指定的路径绘制弧线
//    ctx.lineTo(100,100);
//    ctx.closePath();
//    ctx.stroke();
//    ctx.fill();
//  }
</script>

<style scoped lang="scss">
  @import "./promoteMoney.scss";
  .ring-container {
    .ring {
      transform: rotate(-89deg);
      transform-origin: 50% 50%;
      transition: all 1s;
    }
  }

</style>
