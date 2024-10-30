<template>
  <div v-if="product" class="product-page">
    <div class="product-content">
      <div class="images-wrapper">
        <div
          :style="{backgroundImage: `url(${currentImage})`}"
          class="big-image"/>
        <div class="previews">
          <div
            v-for="img in product.images"
            :style="{backgroundImage: `url(${img})`}"
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
            {{ product?.prices?.currentPrice }} ₽
          </div>
          <div class="old-price md-subheading">
            {{ product?.prices?.oldPrice }}  ₽
          </div>
        </div>
        <div class="description md-subheading">
        {{ product.description }}
        </div>
        <div class="button">
          <md-button class="md-raised md-primary">В корзину</md-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .product-page {
    padding: 16px;
    padding-top: 100px;
    .product-content {
      display: flex;
      .images-wrapper {
        width: 500px;
        flex-shrink: 0;
        margin-right: 20px;
        .big-image {
          width: 100%;
          padding-top: 100%;
          background-position: center;
          background-size: contain;
          margin-bottom: 20px;
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
</style>
<script>
export default {
  name: "product",
  data() {
    return {
      currentImage: null,
      product: null,
    }
  },
  created() {
    console.log(this.$route.params.productId)
    this.getProduct()
  },
  methods: {
    setImage(img) {
      this.currentImage = img
    },
    getProduct() {
      this.axios.get('http://localhost:5000/products', {
        params: {
          product: this.$route.params.productId
        }
      }).then(data => {
        this.product = data.data.data
        if (this.product.images && this.product.images.length) {
          this.currentImage = this.product.images[0]
        }
        // this.productsList = data.data.data.data.products
      })
    }
  }
}
</script>