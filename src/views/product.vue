<template>
  <div v-if="product" class="product-page">
    <div class="product-content">
      <div class="images-wrapper">
        <div class="image-navigation">
          <button @click="prevImage" class="nav-button">❮</button>
          <div
              class="big-image"
              :style="{
              backgroundImage: `url(${currentImage})`,
              backgroundPosition: `${bgPosition.x}% ${bgPosition.y}%`,
              backgroundSize: `${bgSize.width}% ${bgSize.height}%`
            }"
              @mousemove="updateBackgroundPosition"
              @mouseleave="resetBackground"
          />
          <button @click="nextImage" class="nav-button">❯</button>
        </div>
        <div class="previews">
          <div
              v-for="(img, index) in product.images"
              :key="index"
              :style="{ backgroundImage: `url(${img})` }"
              @click="setImage(img)"
              class="preview"
          />
        </div>
      </div>
      <div class="product-info">
        <div class="title md-title">
          {{ product.title }}
        </div>
        <div class="prices">
          <div class="current-price md-subheading">
            {{ product?.currentPrice }} ₽
          </div>
          <div class="old-price md-subheading">
            {{ product?.oldPrice }}  ₽
          </div>
        </div>
        <div class="description md-subheading">
          {{ product.description }}
        </div>
        <div v-if="!inCart" class="button" :class="{disabled: pending}">
          <md-button class="md-raised md-primary" @click="addToCart()">В корзину</md-button>
        </div>
        <div v-else>
          <div class="actions" :class="{disabled: pending}">
            <md-button @click="decrement" class="md-fab md-mini md-primary add-to-cart">
              <md-icon>remove</md-icon>
            </md-button>
            <div class="counter">
              {{ inCart.qty }}
            </div>
            <md-button @click="increment" class="md-fab md-mini md-primary add-to-cart">
              <md-icon>add</md-icon>
            </md-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {EventBus} from "@/utils/event-bus";

export default {
  name: "product",
  data() {
    return {
      pending: false,
      currentImageIndex: 0, // Индекс текущего изображения
      product: null,
      bgPosition: { x: 50, y: 50 },
      bgSize: { width: 100, height: 100 }
    };
  },
  computed: {
    currentImage() {
      return this.product.images[this.currentImageIndex]; // Получаем текущее изображение по индексу
    },
    inCart() {
      return this.$store.getters.getProductId(this.product.id)
    }
  },
  created() {
    this.getProduct();
  },
  methods: {
    setImage(img) {
      this.currentImageIndex = this.product.images.indexOf(img); // Устанавливаем индекс изображения
    },
    getProduct() {
      this.axios.get(`http://localhost:5000/products/${this.$route.params.productId}`, {
      }).then(data => {
        this.product = data.data.data;
        if (this.product.images && this.product.images.length) {
          this.currentImageIndex = 0; // Устанавливаем индекс на первое изображение
        }
      });
    },
    updateBackgroundPosition(event) {
      const {offsetX, offsetY} = event;
      const {clientWidth, clientHeight} = event.currentTarget;

      this.bgPosition.x = (offsetX / clientWidth) * 100;
      this.bgPosition.y = (offsetY / clientHeight) * 100;
      this.bgSize.width = 150;
      this.bgSize.height = 150;
    },
    resetBackground() {
      this.bgSize.width = 100;
      this.bgSize.height = 100;
    },
    prevImage() {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex--;
      } else {
        this.currentImageIndex = this.product.images.length - 1; // Переключаемся на последнее изображение
      }
    },
    nextImage() {
      if (this.currentImageIndex < this.product.images.length - 1) {
        this.currentImageIndex++;
      } else {
        this.currentImageIndex = 0; // Переключаемся на первое изображение
      }
    },
    addToCart() {
      console.log('here', localStorage.token)
      if (localStorage.token) {
        this.pending = true
        this.axios.post('http://localhost:5000/cart', {
          id: this.product.id,
          qty: 1
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
      } else {
        console.log('here')
        EventBus.$emit('SHOW-AUTH')
      }
    },
    increment() {
      if (localStorage.token) {
        this.pending = true
        this.axios.post('http://localhost:5000/cart', {
          id: this.product.id,
          qty: this.inCart.qty + 1
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
      } else {
        console.log('here')
        EventBus.$emit('SHOW-AUTH')
      }
    },
    decrement() {
      if (localStorage.token) {
        this.pending = true
        this.axios.post('http://localhost:5000/cart', {
          id: this.product.id,
          qty: this.inCart.qty - 1
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
      } else {
        console.log('here')
        EventBus.$emit('SHOW-AUTH')
      }
    },
  }
}
</script>

<style scoped lang="scss">
.disabled {
  opacity: 0.5;
  pointer-events: none;
}
.product-page {
  padding: 16px;
  padding-top: 100px;

  @media screen and (max-width: 768px)  {
    padding-top: 16px;
  }

  .product-content {
    display: flex;
    @media screen and (max-width: 768px)  {
      display: block;
    }

    .images-wrapper {
      width: 500px;
      flex-shrink: 0;
      margin-right: 20px;

      @media screen and (max-width: 768px)  {
        width: 100%;
      }

      .image-navigation {
        display: flex;
        align-items: center;
        position: relative;
      }

      .nav-button {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        z-index: 1;

        &:hover {
          color: gray; /* Изменяем цвет при наведении */
        }
      }

      .big-image {
        width: 100%;
        padding-top: 100%;
        background-position: center;
        background-size: contain;
        margin-bottom: 20px;
        transition: background-size 0.3s ease;
        cursor: crosshair;
      }

      .previews {
        display: flex;
        row-gap: 5px;
        column-gap: 5px;

        .preview {
          width: 70px;
          height: 70px;
          background-position: center;
          background-size: contain;
          border: 1px solid transparent;
          border-radius: 8px;
          transition: all 0.3s ease;
          cursor: pointer;

          &:hover {
            border: 1px solid black;
          }
        }
      }
    }

    .product-info {
      .title {
        margin-bottom: 16px;
      }

      .description {
        white-space: pre-wrap;
      }
    }

    .prices {
      margin-bottom: 16px;

      .current-price {
      }

      .old-price {
        text-decoration: line-through;
        color: gray;
      }
    }

    .button {
      padding-top: 20px;
      display: flex;
      justify-content: flex-end;
      width: 100%;
    }
  }
}

.actions {
  display: flex;
  align-items: center;
}
</style>
