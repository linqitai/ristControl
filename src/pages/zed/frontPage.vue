<template>
  <div class="frontPage">
    <m-header>臻e贷</m-header>
    <div class="line1Wrapper">
      <div class="line1">
        <b class="boxTitle left">臻e贷</b>
        <span class="description left">臻e贷是臻e盾与网商银行联合推出的一款面向臻e盾商户的小额信贷产品。</span>
      </div>
    </div>
  </div>

</template>

<script>
  import mHeader from '@/components/Header'
  // const root = '/rz' // 线上
  const root = '/zsf' // 本地测试，打包后线上
  export default {
    data() {
      return {
      }
    },
    filters: {
    },
    created() {
    },
    methods: {
    },
    components: {
      mHeader
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "./frontPage.scss";
</style>
