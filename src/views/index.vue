<template>
  <div>
    <router-link to="/catalog/phones">
      Перейти в каталог
    </router-link>
  </div>
</template>

<style scoped lang="scss">
.catalog-page {
  .categories-menu {
    width: 300px;
    .menu-title {

    }
  }
}
</style>

<script>
import VueHeader from '@/components/VHeader.vue'
export default {
  name: "index",
  components: {
    VueHeader
  }
}
</script>