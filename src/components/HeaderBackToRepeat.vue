<template>
  <header>
    <div class="back-img" @click="back">
    </div>
    <div class="text">
      <slot></slot>
    </div>
    <div class="logo" @click="toHelpPage" v-show="isHelp">
      <i class="iconfont iconHelp">&#xe64a;</i>
    </div>
  </header>
</template>
<script>
export default {
  props: {
    isHelp: {
      type: Boolean,
      default: true
    },
    accountTel: {
      type: String,
      default: ''
    }
  },
  methods: {
    back() {
//      this.$router.goBack()
      this.$router.push(`/repeatEvaluation?accountTel=${this.accountTel}`)
    },
    toHelpPage() {
      this.$router.push(`/help`)
    }
  }
}
</script>
<style lang="scss" scoped>
@import './header.scss'
</style>

