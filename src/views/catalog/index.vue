<template>
  <div v-if="category" class="catalog-page">
    <div class="page-title">
      <md-button class="md-icon-button" @click="showMenu = true">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-display-1">Приобретите {{ category.title }} в Mobile City</span>
    </div>

    <div class="content">
      <div class="categories-menu">
        <div class="menu-items">
          <md-list>
            <md-list-item v-for="category in categoryList" :to="`/catalog/${category.slug}`">
              <span class="md-list-item-text">{{ category.title }}</span>
            </md-list-item>
          </md-list>
        </div>
      </div>
      <div class="mobile-menu" :class="{ open: showMenu}">
        <div class="head-menu">
          <div class="title">
            Каталог
          </div>
          <md-button class="md-icon-button" @click="showMenu = false">
            <md-icon>close</md-icon>
          </md-button>
        </div>
        <div class="menu-items">
          <md-list>
            <md-list-item v-for="category in categoryList" :to="`/catalog/${category.slug}`">
              <span class="md-list-item-text">{{ category.title }}</span>
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
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .burger {
    display: none;
    @media screen and (max-width: 768px)  {
      display: block;
    }
  }

  .content {
    display: flex;

    .mobile-menu {
      display: none;
      @media screen and (max-width: 768px)  {
        display: block;
      }
      position: fixed;
      top: 0;
      right: 0;
      z-index: 99;
      width: 100vw;
      height: 100vh;
      background-color: white;
      transition: all 0.3s ease;
      transform: translateX(-100%);

      &.open {
        transform: translateX(0);
      }

      .head-menu {
        padding: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;

        .title {
          font-size: 18px;
          font-weight: bold;
          width: 100%;
        }
      }
    }

    .categories-menu {
      width: 300px;

      @media screen and (max-width: 768px)  {
        display: none;
      }
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
      showMenu: false,
      productsList: [],
      category: null,
      categoryList: []
    }
  },
  components: {
    ProductCard
  },
  methods: {
    show() {
      console.log('here')
    },
    getData() {
      this.axios.get(`http://localhost:5000/catalog/categories/${this.$route.params.categoryId}`, {
      }).then(data => {
        // console.log(data.data.data)
        this.category = data.data.data
        // this.productsList = data.data.data.data.products
      })
      this.axios.get(`http://localhost:5000/catalog/categories/`, {
      }).then(data => {
        console.log(data.data.data)
        // this.category = data.data.data
        this.categoryList = data.data.data
      })
    }
  },
  created() {
    this.getData()
  },
  watch: {
    $route() {
      this.getData()
      this.showMenu = false
    }
  }
}
</script>