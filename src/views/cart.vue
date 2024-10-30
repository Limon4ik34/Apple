<template>
  <div class="cart-container">
    <h1 class="cart-title">Корзина</h1>
    <div class="product-wrapper">
      <div v-for="product in products" :key="product.id" class="product">
        <div class="product-image">
          <img :src="product.img" class="image" alt="Product Image">
        </div>
        <div class="product-details">
          <div class="title">{{ product.title }}</div>
          <div class="quantity">
            <button @click="decreaseQty(product)" class="qty-button">-</button>
            <span>{{ product.qty }}</span>
            <button @click="increaseQty(product)" class="qty-button">+</button>
          </div>
          <div class="price">{{ formatPrice(product.price * product.qty) }} ₽</div>
        </div>
      </div>
    </div>
    <div class="total">
      <h2>Итого: {{ formatPrice(totalPrice) }} ₽</h2>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cart-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.cart-title {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.product-wrapper {
  display: flex;
  flex-direction: column;
}

.product {
  display: flex;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  .product-image {
    width: 150px;
    img {
      width: 100%;
      height: auto;
    }
  }

  .product-details {
    padding: 15px;
    flex-grow: 1;

    .title {
      font-size: 18px;
      font-weight: bold;
      color: #333;
    }

    .quantity {
      display: flex;
      align-items: center;
      margin: 10px 0;

      .qty-button {
        background-color: #007aff;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 5px 10px;
        cursor: pointer;
        margin: 0 5px;

        &:hover {
          background-color: #005bb5;
        }
      }
    }

    .price {
      font-size: 16px;
      color: #666;
    }
  }
}

.total {
  text-align: right;
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
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
  computed: {
    totalPrice() {
      return this.products.reduce((total, product) => total + (product.price * product.qty), 0);
    }
  },
  methods: {
    increaseQty(product) {
      product.qty++;
    },
    decreaseQty(product) {
      if (product.qty > 1) {
        product.qty--;
      }
    },
    formatPrice(price) {
      return price.toFixed(2);
    }
  },
  created() {
    this.axios.get('http://localhost:5000/cart', {
      headers: {
        Authorization: localStorage.token
      }
    }).then(data => {
      this.products = data.data.data.products;
    });
  },
}
</script>