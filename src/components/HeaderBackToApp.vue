<template>
  <header>
    <div class="back-img" @click="back">
    </div>
    <div class="text">
      <slot></slot>
    </div>
    <div class="logo" @click="toHelpPage">
      <i class="iconfont iconHelp">&#xe64a;</i>
    </div>
  </header>
</template>
<script>
export default {
  methods: {
    back() {
      let ua = navigator.userAgent.toLowerCase()
      if (/iphone|ipad|ipod/.test(ua)) {
        popToViewController()
      } else if (/android/.test(ua)) {
        htmlToJava.popToViewController()
      }
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

