<template>
  <div class="cart-container">
    <h1 class="cart-title">Корзина</h1>
    <div class="product-wrapper">
      <div v-for="product in products" :key="product.id" class="product">
        <div class="product-image">
          <img :src="product.images[0]" alt="Product Image" class="image">
        </div>
        <div class="product-details">
          <div class="title">{{ product.title }}</div>
          <div class="quantity">
            <button @click="decreaseQuantity(product)" class="quantity-button">-</button>
            {{ product.qty }}
            <button @click="increaseQuantity(product)" class="quantity-button">+</button>
          </div>
          <div class="price">
            <span class="current-price">{{ formatPrice(product.currentPrice) }}</span>
            <span class="old-price">{{ formatPrice(product.oldPrice) }}</span>
          </div>
          <div class="savings">
            Выгода: {{ formatPrice(calculateSavings(product)) }}
          </div>
        </div>
      </div>
    </div>
    <div class="cart-summary">
      <div class="total">
        <span>Итого:</span>
        <span>{{ formatPrice(calculateTotal()) }}</span>
      </div>
      <div class="total-savings">
        <span>Выгода всего:</span>
        <span>{{ formatPrice(calculateTotalSavings()) }}</span>
      </div>
      <router-link v-if="products.length" to="/payment" class="payment">
        <button class="checkout-button">Оформить заказ</button>
      </router-link>
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
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.cart-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
}

.product-wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.product {
  display: flex;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  padding: 15px;
}

.product-image {
  flex: 0 0 150px;

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
}

.product-details {
  flex: 1;
  padding-left: 15px;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.quantity {
  display: flex;
  align-items: center;
  margin: 5px 0;
}

.quantity-button {
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 1rem;
  cursor: pointer;
  margin: 0 5px;
  transition: background-color 0.3s;
}

.quantity-button:hover {
  background-color: #005bb5;
}

.price {
  font-size: 1.2rem;
  color: #e63946;
  font-weight: bold;

}

.old-price {
  text-decoration: line-through;
  color: #999;
  margin-left: 10px;
  @media screen and (max-width: 768px) {
    display: block;
    margin-left: 0;
  }
}

.savings {
  font-size: 1rem;
  color: #28a745; /* Зеленый цвет для сэкономленных денег */
  font-weight: bold;
  @media screen and (max-width: 768px) {
    display: block;
  }
}

.cart-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 768px) {
    display: block;
  }
}

.total {
  font-size: 1.5rem;
  font-weight: bold;
  @media screen and (max-width: 768px) {
    margin-bottom: 10px;
    text-align: center;
  }
}

.total-savings {
  font-size: 1.2rem;
  font-weight: bold;
  color: #28a745; /* Зеленый цвет для общей экономии */

  @media screen and (max-width: 768px) {
    margin-bottom: 10px;
    text-align: center;
  }
}

.checkout-button {
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

}

.payment {
  @media screen and (max-width: 768px) {
    margin: 0 auto;
    display: block;
    width: max-content;
  }
}

.checkout-button:hover {
  background-color: #005bb5;
}
</style>

<script>
export default {
  name: "cart",
  data() {
    return {
      pending: false
      // products: []
    }
  },
  created() {
    this.$store.dispatch('getCart')
    console.log(this.$store)
    // this.axios.get('http://localhost:5000/cart', {
    //   headers: {
    //     Authorization: localStorage.token
    //   }
    // }).then(response => {
    //   this.products = response.data.data.products;
    // });
  },

  computed: {
    products() {
      return this.$store.getters.getCart
    }
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB'
      }).format(price);
    },
    calculateTotal() {
      return this.products.reduce((total, product) => {
        return total + (product.currentPrice * product.qty);
      }, 0);
    },
    calculateTotalSavings() {
      return this.products.reduce((total, product) => {
        return total + this.calculateSavings(product);
      }, 0);
    },
    calculateSavings(product) {
      const savingsPerItem = product.oldPrice - product.currentPrice;
      return savingsPerItem > 0 ? savingsPerItem * product.qty : 0;
    },
    increaseQuantity(product) {
      this.pending = true
      this.axios.post('http://localhost:5000/cart', {
        id: product.id,
        qty: product.qty + 1
      }, {
        headers: {
          Authorization: localStorage.token
        }
      }).then(data => {
        this.pending = false
        this.$store.commit('changeCart', data.data.data.products)
      }).catch(error => {
        console.error('Ошибка при добавлении в корзину:', error);
      });
    },
    decreaseQuantity(product) {
      this.pending = true
      this.axios.post('http://localhost:5000/cart', {
        id: product.id,
        qty: product.qty - 1
      }, {
        headers: {
          Authorization: localStorage.token
        }
      }).then(data => {
        this.pending = false
        this.$store.commit('changeCart', data.data.data.products)
      }).catch(error => {
        console.error('Ошибка при добавлении в корзину:', error);
      });
    }
  }
}
</script>