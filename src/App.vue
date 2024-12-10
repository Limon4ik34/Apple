<template>
  <div id="app">
    <VueHead/>
    <router-view/>
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}

body, html {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
<script>
import VueHead from '@/components/VHead.vue'
export default {
  components: {
    VueHead
  },
  beforeCreate() {
    this.$store.dispatch('getCart')
    this.$store.dispatch('getUserData')
    if (localStorage.token) {
      this.$store.dispatch('getUserData')
    }
  },
  watch: {
    $route() {
      this.$store.dispatch('getCart')
      this.$store.dispatch('getUserData')
    }
  }
}
</script>
