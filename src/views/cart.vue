<template>
<div>
  <div class="product-wrapper">
    <div v-for="product in products" class="product">
      <div class="product-image">
        <img :src=product.img class="image">
      </div>
      <div class="title">
        {{ product.title }} кол-во : {{product.qty}}
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
  .product-wrapper {
    .product {
      .product-image {
        img {
          display: block;
          height: 250px;
        }
      }
    }
  }
</style>
<script>
export default {
  name: "cart",
  data() {
    return {
      products: []
    }
  },
  created() {
    this.axios.get('http://localhost:5000/cart', {
      headers: {
        Authorization: localStorage.token
      }
    }).then(data => {
      this.products = data.data.data.products
      // console.log('token', data.data.data.data.token)
      // localStorage.token = data.data.data.data.token
    });
  },
}
</script>