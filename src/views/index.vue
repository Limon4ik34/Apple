<template>
  <div class="main-page">
    <router-link to="/catalog/phones">
      Перейти в каталог
    </router-link>
  </div>
</template>

<style scoped lang="scss">
.main-page {
  padding: 20px;
  .categories-menu {
    width: 300px;
    .menu-title {

    }
  }
}
</style>

<script>
import VueHeader from '@/components/VHead.vue'
export default {
  name: "index",
  components: {
    VueHeader
  }
}
</script>