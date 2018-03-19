<template>
  <div class="help">
    <!-- <m-header :isHelp="isHelp">帮助</m-header> -->
    <div ref="base" class="base">
      <div class="content">
        <div class="title" @click="titleClick(1)">臻商信用分是什么?<img src="../../assets/right.png" alt=""></div>
        <div class="titleContent" v-show="title1Show">
          <span class="smallTitle"></span>臻e盾平台针对注册用户推出的信用评估系统。<br/>
          通过大数据、云计算与人工智能等核心技术，依据个人基本信息、资产信息、经营状况、现金流、历史信用等多维度数据， 对您的个人信用进行综合、客观的量化评估。<br>信用中心将基于您的信用分值与额度，提供相对应的纯信用优质金融服务。<br><br>
        </div>
        <div class="title" @click="titleClick(2)">信用中心 微介绍<img src="../../assets/right.png" alt=""></div>
        <div class="titleContent" v-show="title2Show">
          <span class="smallTitle1">信用中心</span>是臻商信用分系统的主界面，是臻e盾用户使用臻商信用分系统及申请纯信用优质金融服务的平台。用户可通过信用中心进行额度自评、增信提额及申请金融服务，以及查看融资信息、还款计划及借款记录等。
          <br/>
          <div class="titleContent1">
            <span class="smallTitle">1-信用额度球：</span><br>信用额度球是根据用户填写的多维度信息，结合后台大数据、云计算及人工智能等核心技术，自动评估计算信用分值及额度的信用展示球体，用户可在所获分值和额度范围内自行申请纯信用金融服务。<br>信用总分值为1000分，由250分的基础分值与750分的提额分值组成。相对应的，总信用额度为20万元，由5万元自评额度与15万元提额额度组成。信用额度球作为动态球体，完成融资提款后，额度将被占用；还款后则重新释放额度。<br/>
          </div>
          <div class="titleContent1">
            <span class="smallTitle">2-自评：</span><br>首次使用“融资”或臻商信用分系统，用户需填写基础信息、进行自评后才能够获得信用分值与额度。<br>
          </div>
           <div class="titleContent1">
             <span class="smallTitle">3-重自评：</span><br>如果您的个人基础信息有变化，需要更新，可点击“重自评”按钮完成操作。<br>
           </div>
          <div class="titleContent1">
            <span class="smallTitle">4-去提额：</span><br>如果您需要增加信用额度，请点击信用额度球下方的“去提额”，然后根据后续提示补充完善资料去提高额度。<br>
          </div>
          <div class="titleContent1">
            <span class="smallTitle">5-再提额：</span><br>假如您的信用额度不足，或者欲增加提额维度，或者个人资料发生变化，点击“再提额”可再次补充或更新维度资料，以提高或更新您的额度。<br>
          </div>
          <div class="titleContent1">
            <span class="smallTitle">6-融资消息：</span><br>您的融资信息将在此栏实时更新，您可通过此栏了解您的各项融资信息。<br>
          </div>
          <div class="titleContent1">
            <span class="smallTitle">7-最近还款计划：</span><br>查看您最近的还款计划明细，提醒您及时还款，避免延误和逾期。<br>
          </div>
          <div class="titleContent1">
            <span class="smallTitle">8-借款记录：</span><br>查看您的历史借款与还款记录，方便您进行对账。<br><br>
          </div>
        </div>
        <div class="title" @click="titleClick(3)">多款纯信用金融产品，解决资金烦恼<img src="../../assets/right.png" alt=""></div>
        <div class="titleContent" v-show="title3Show">
          助力小微，践行普惠金融，臻e盾与网商银行等大型金融机构倾力合作，推出了多款特性不一的纯信用金融产品，满足注册用户不同的融资需求。目前已上线的产品:<br>
          <span class="smallTitle">1-臻e贷：</span><br>臻e盾与网商银行联合推出的一款小额信贷产品，专门面向臻e盾用户，提供无抵押、免担保、0~5万元的纯信用贷款。<br>
          <span class="smallTitle">2-臻分期：</span><br>臻e盾联合全国各地安保公司推出的安保分期产品，0利息，0手续费，先消费再付款，享受人性化的安全服务消费新模式。<br><br>
        </div>
        <div class="title" @click="titleClick(4)">臻商信用分常见问题<img src="../../assets/right.png" alt=""></div>
        <div class="titleContent" v-show="title4Show">
          <div class="titleContent1">
            <span class="smallTitle">1-臻商信用分的总额度有多少？</span><br>
            总额度为20万元，满足不同用户的不同金融需求。<br>
          </div>
          <div class="titleContent1">
            <span class="smallTitle">2-如何提高额度？</span><br>
            点击信用额度球下方的“去提额”，补充资产与经营资料、银行卡流水、个人征信报告，经审核后即可获得额外信用额度。另外，使用臻收银、客流统计、安保服务等产品服务，也可大幅提高信用额度。<br>
          </div>
          <div class="titleContent1">
            <span class="smallTitle">3-如何使用臻商信用分？</span><br>
            臻商信用分作为臻e盾的唯一信用等级，彰显您的个人信用价值。您可根据您的可用信用额度，申请“臻e贷”和“臻分期”等多种纯信用金融产品。<br><br>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mHeader from '@/components/Header'
  //  import BScroll from 'better-scroll'
  export default {
    created() {
      // this._initScroll()
    },
    methods: {
      titleClick(flag) {
        if(flag === 1) {
          this.title1Show = !this.title1Show
        } else if(flag === 2) {
          this.title2Show = !this.title2Show
        } else if(flag === 3) {
          this.title3Show = !this.title3Show
        } else if(flag === 4) {
          this.title4Show = !this.title4Show
        }
      }
    },
    components: {
      mHeader
    },
    data() {
      return {
        title1Show: false,
        title2Show: false,
        title3Show: false,
        title4Show: false,
        isHelp: false
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "./help.scss";
</style>
