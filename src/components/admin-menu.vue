
<template>
  <div class="links">
    <router-link to="/admin/categories">
      Категории
    </router-link>
    <router-link to="/admin/products">
      Товары
    </router-link>
    <router-link to="/admin/users">
      Пользователи
    </router-link>
    <router-link to="/admin/orders">
      Заказы
    </router-link>
  </div>
</template>

<style scoped lang="scss">
.links {
  a {
    text-transform: uppercase;
    margin-right: 10px;
  }
}

</style>
<script>
export default {
  name: "admin-menu"
}
</script>