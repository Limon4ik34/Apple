<template>
  <div v-if="category" class="catalog-page">
    <div class="page-title">
      <span class="md-display-1">Приобретите {{ category.title }} в Mobile City</span>
    </div>

    <div class="content">
      <div class="categories-menu">
        <div class="menu-items">


          <md-list>
            <md-list-item to="/catalog/headphones">
              <md-icon>headset</md-icon>
              <span class="md-list-item-text">Наушники</span>
            </md-list-item>
            <md-list-item to="/catalog/phones">
              <md-icon>smartphone</md-icon>
              <span class="md-list-item-text">Смартфоны</span>
            </md-list-item>
            <md-list-item to="/catalog/notebooks">
              <md-icon>laptop</md-icon>
              <span class="md-list-item-text">Ноутбуки</span>
            </md-list-item>
            <md-list-item to="/catalog/clock">
              <md-icon>access_time</md-icon>
              <span class="md-list-item-text">Часы</span>
            </md-list-item>
            <md-list-item to="/catalog/ipad">
            <md-icon>tablet</md-icon>
            <span class="md-list-item-text">Планшеты</span>
            </md-list-item>

          </md-list>
        </div>
      </div>

      <div class="products">
        <div
          class="product" v-for="product in category.products"
        >
          <ProductCard :product="product"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.catalog-page {
  padding: 16px;

  .page-title {
    margin-bottom: 16px;
  }

  .content {
    display: flex;

    .categories-menu {
      width: 300px;
    }

    .products {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      column-gap: 10px;
      row-gap: 10px;

      .product {
        padding: 5px;
        width: calc(96% / 4);
        min-width: 300px;
        max-width: 380px;
      }
    }
  }

}
</style>

<script>
import ProductCard from '@/components/product.vue'

export default {
  name: "index",
  data() {
    return {
      productsList: [],
      category: null
    }
  },
  components: {
    ProductCard
  },
  methods: {
    getData() {
      this.axios.get('http://localhost:5000/catalog', {
        params: {
          category: this.$route.params.categoryId
        }
      }).then(data => {
        console.log(data.data.data)
        this.category = data.data.data
        // this.productsList = data.data.data.data.products
      })
    }
  },
  created() {
    this.getData()
  },
  watch: {
    $route() {
      this.getData()
    }
  }
}
</script>