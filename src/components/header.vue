<template>
  <div>
    <md-toolbar class="md-dense">
      <router-link to="/" class="md-title">
        <h3>Mobile City</h3>
      </router-link>
      <div class="links">
        <router-link to="/catalog/headphones">
          Наушники
        </router-link>
        <router-link to="/catalog/phones">
          Смартфоны
        </router-link>
        <router-link to="/catalog/notebooks">
          Ноутбуки
        </router-link>
        <router-link to="/catalog/clock">
          Часы
        </router-link>
        <router-link to="/catalog/ipad">
          Планшеты
        </router-link>
      </div>
      <div class="md-toolbar-section-end">
        <md-button
            @click="showSearchDialog = true"
            class="md-icon-button md-raised md-mini"
        >
          <md-icon>search</md-icon>
        </md-button>
        <md-button class="md-icon-button md-raised md-mini">
          <md-icon>shopping_cart</md-icon>
        </md-button>
        <md-button class="md-icon-button md-raised">
          <md-icon>login</md-icon>
        </md-button>
      </div>
    </md-toolbar>
    <div>
      <md-dialog class="search-dialog" :md-active.sync="showSearchDialog">
        <md-dialog-title>Поиск в Mobile City</md-dialog-title>
        <div class="wrapper">

        <md-field>
          <label>Поисковый запрос</label>
          <md-input
              @keyup.enter="search"
              v-model="searchText">
          </md-input>
          <span class="md-helper-text">Введите название товара</span>

        </md-field>
        <md-content class="results md-scrollbar">
          <div
              v-for="product in searchResults"
              class="result"

          >
            <ProductCard
                @goTo="showSearchDialog = false"
                :product="product"/>

          </div>
        </md-content>
        </div>

      </md-dialog>
    </div>
  </div>
</template>

<style scoped lang="scss">
.links {
  margin-left: 16px;
  display: inline;
  text-align: center;
  a {
    margin-right: 16px;
    text-transform: uppercase;
  }
}
.search-dialog{
  width: 100%;

}
.results{
  max-height: 400px;
  overflow: auto;
  min-height: 400px;
  min-width: 700px;
  display: flex;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 10px;
  width: 700px;
  .result{
    width: calc((100% - 32px) / 3);

  }
}
.wrapper{
  padding: 16px;
}
</style>
<script>
import ProductCard from "@/components/product.vue";

export default {
  name: "header",
  components: {ProductCard},
  data(){
    return{
      showSearchDialog:false,
      searchText:'',
      searchResults:[]
    }
  },
  methods:{
    search() {
      this.axios.get('http://localhost:5000/search', {
        params: {
          queryText: this.searchText
        }
      }).then(data => {
        this.searchResults = [...data.data.data.result];
       console.log(data.data.result)
        // this.productsList = data.data.data.data.products
      })
    }
  }
}

</script>