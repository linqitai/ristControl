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
      this.$emit('closePage', null)
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

