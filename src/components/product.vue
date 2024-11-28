<template>
  <md-card v-if="product" class="product-card">
    <div class="product-image">
      <img :src="`http://localhost:5000/${product.images[0].name}`" class="image" alt="Product Image">
    </div>
    <router-link
        :to="`/product/${product.slug}`"
        class="md-title">
      <span @click="$emit('goTo')" class="product-title">
        {{ product.title }}
      </span>
    </router-link>
    <div class="actions">
      <div class="info">
        <div class="cost-old">
          {{ product?.oldPrice }} ₽
        </div>
        <div class="cost">
          {{ product?.currentPrice }} ₽
        </div>
      </div>
      <md-button @click="addToCart" class="md-fab md-mini md-primary add-to-cart">
        <md-icon>shopping_basket</md-icon>
      </md-button>
    </div>
  </md-card>
</template>

<style scoped lang="scss">
.product-card {
  padding: 16px;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;
  background: linear-gradient(135deg, #ffffff, #f9f9f9);
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  }

  .product-image {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 12px;

    .image {
      display: block;
      height: 250px;
      border-radius: 8px;
      object-fit: cover;
      transition: transform 0.3s;

      &:hover {
        transform: scale(1.05);
      }
    }
  }

  .product-title {
    font-size: 22px;
    font-weight: bold;
    color: #333;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #007BFF;
    }
  }

  .actions {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    .info {
      .cost-old {
        font-size: 16px;
        text-decoration: line-through;
        color: gray;
      }
      .cost {
        font-size: 20px;
        font-weight: bold;
        color: #FF5722; // Цвет для текущей цены
      }
    }

    .add-to-cart {
      background-color: #FF5722; // Цвет кнопки
      color: white;
      transition: background-color 0.3s, transform 0.3s;

      &:hover {
        background-color: #E64A19; // Цвет кнопки при наведении
        transform: scale(1.1);
      }
    }
  }
}
</style>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: null
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
        // Обработка успешного добавления в корзину
      }).catch(error => {
        console.error('Ошибка при добавлении в корзину:', error);
      });
    }
  }
}
</script>