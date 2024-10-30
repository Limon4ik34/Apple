<template>
  <md-card v-if="product" class="product-card">
    <div class="product-image">
      <img :src=product.img class="image">
    </div>
    <router-link
      :to="`/product/${product.id}`"
      class="md-title">
      <span @click="$emit('goTo')">
        {{ product.title }}
      </span>
    </router-link>
    <div class="actions">
      <div class="info">
        <div class="cost-old">
          {{ product?.prices?.oldPrice }} ₽
        </div>
        <div class="cost">
          {{ product?.prices?.currentPrice }} ₽
        </div>
      </div>
      <md-button @click="addToCart" class="md-fab md-mini md-primary">
        <md-icon>shopping_basket</md-icon>
      </md-button>
    </div>
  </md-card>
</template>

<style scoped lang="scss">
.product-card {
  padding: 6px;
  width: 100%;

  .product-image {
    display: flex;
    justify-content: center;
    align-items: center;

    .image {
      display: block;
      height: 250px;
    }
  }

  .actions {
    display: flex;
    width: 100%;
    justify-content: space-between;

    .info {
      .cost-old {
        font-size: 16px;
        text-decoration: line-through;
        color: gray;
      }
      .cost {
        font-size: 18px;
      }
    }
  }
}
</style>
<script>
export default {
  props: {
    product: {
      default: false
    }
  },
  name: "product",
  methods: {
    addToCart() {
      this.axios.post('http://localhost:5000/cart', {
        id: this.product.id,
        qty: 1
      }, {
        headers: {
          Authorization: localStorage.token
        }
      }).then(data => {
        // console.log('token', data.data.data.data.token)
        // localStorage.token = data.data.data.data.token
      });
    }
  }
}
</script>