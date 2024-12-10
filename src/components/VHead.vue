<template>
  <div>
    <md-toolbar class="bar md-dense ">
      <router-link to="/" class="md-title">
        <h3>Mobile City</h3>
      </router-link>
      <div class="links">
        <router-link v-for="category in categoryList" :to="`/catalog/${category.slug}`">
          {{ category.title }}
        </router-link>
      </div>
      <div class="md-toolbar-section-end buttons">
        <md-button
            @click="showSearchDialog = true"
            class="md-icon-button md-raised md-mini"
        >
          <md-icon>search</md-icon>
        </md-button>
          <md-button @click="goToCart" class="md-icon-button md-raised md-mini">
            <md-icon>shopping_cart</md-icon>
          </md-button>
        <md-button v-if="user" @click="logout" class="md-icon-button md-raised">
          <md-icon>logout</md-icon>
        </md-button>
        <md-button v-else @click="showAuthDialog = true" class="md-icon-button md-raised">
          <md-icon>login</md-icon>
        </md-button>
        <router-link v-if="user && user.role === 'admin'" to="/admin/categories">
          <md-button  class="md-icon-button md-raised">
            <md-icon>admin_panel_settings</md-icon>
          </md-button>
        </router-link>

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
      <md-dialog  class="auth-dialog" :md-active.sync="showAuthDialog">
        <md-dialog-title>Авторизация в Mobile City</md-dialog-title>
        <md-tabs :md-active-tab="activeTab" style="width: 400px;">
          <md-tab @click.prevent="activeTab = 'auth'" id="auth" md-label="Авторизация"/>
          <md-tab @click.prevent="activeTab = 'reg'" id="reg" md-label="Регистрация"/>
        </md-tabs>
        <div v-if=" activeTab === 'auth'" class="wrapper">
          <md-field :class="{'md-invalid': authErrors.login}">
            <label>Логин</label>
            <md-input
              @keyup.enter="search"
              v-model="authModel.login">
            </md-input>
            <span class="md-error">{{ authErrors.login }}</span>
          </md-field>
          <md-field :class="{'md-invalid': authErrors.password}">
            <label>Пароль</label>
            <md-input
                type="password"
              @keyup.enter="search"
              v-model="authModel.password">
            </md-input>
            <span class="md-error">{{ authErrors.password }}</span>
          </md-field>
          <md-field>
            <md-button @click="auth" style="width: 100%" class="md-raised md-primary">Войти</md-button>
          </md-field>
        </div>
        <div v-if=" activeTab === 'reg'" class="wrapper">
          <md-field :class="{'md-invalid': regErrors.name}">
            <label>Имя</label>
            <md-input
              @keyup.enter="search"
              v-model="regModel.name">
            </md-input>
            <span class="md-error">{{ regErrors.name }}</span>
          </md-field>
          <md-field :class="{'md-invalid': regErrors.lastName}">
            <label>Фамилия</label>
            <md-input
              @keyup.enter="search"
              v-model="regModel.lastName">
            </md-input>
            <span class="md-error">{{ regErrors.lastName }}</span>

          </md-field>
          <md-field :class="{'md-invalid': regErrors.login}">
            <label>Логин</label>
            <md-input
              @keyup.enter="search"
              v-model="regModel.login">
            </md-input>
          <span class="md-error">{{ regErrors.login }}</span>
          </md-field>
          <md-field :class="{'md-invalid': regErrors.password}">
            <label>Пароль</label>
            <md-input
                type="password"
              @keyup.enter="search"
              v-model="regModel.password">
            </md-input>
          <span class="md-error">{{ regErrors.password }}</span>
          </md-field>
          <md-field :class="{'md-invalid': regErrors.passwordAgain}">
            <label>Пароль ещё раз</label>
            <md-input
                type="password"
              @keyup.enter="search"
              v-model="regModel.passwordAgain">
            </md-input>
          <span class="md-error">{{ regErrors.passwordAgain }}</span>
          </md-field>
          <md-field>
            <md-button @click="registration" style="width: 100%" class="md-raised md-primary">Зарегистрироваться</md-button>
          </md-field>
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

.bar {
  @media screen and (max-width: 768px)  {
   display: block;
    padding-bottom: 10px;

    h3 {
      margin: 0;
    }
  }
}

.buttons {
  @media screen and (max-width: 768px)  {
    width: 100%;
    flex-shrink: 0;
    justify-content: center;
  }
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
import { EventBus } from '@/utils/event-bus'
import ProductCard from "@/components/product.vue";

export default {
  name: "vHead",
  components: {ProductCard},
  data(){
    return{
      categoryList: [],
      showSearchDialog:false,
      showAuthDialog: false,
      searchText:'',
      searchResults:[],
      activeTab: 'auth',
      regModel: {
        name: '',
        lastName: '',
        login: '',
        password: '',
        passwordAgain: ''
      },
      authModel: {
        login: '',
        password: '',
      },
      regErrors: {
        name: '',
        lastName: '',
        login: '',
        password: '',
        passwordAgain: ''
      },
      authErrors: {
        login: '',
        password: '',
      }
    }
  },
  methods:{
    logout() {
      delete localStorage.token
      location.reload()
    },
    search() {
      console.log('search')
      this.axios.get('http://localhost:5000/search', {
        params: {
          queryText: this.searchText
        }
      }).then(data => {
        this.searchResults = [...data.data.data.result];
       console.log(data.data.data.result)
        // this.productsList = data.data.data.data.products
      })
    },
    registration() {
      this.regErrors = {}
      let err = 0
      if (!this.regModel.name.trim()) {
        this.regErrors.name = 'Поле имя обязательно для заполнения'
        err++
      }
      if (!this.regModel.lastName.trim()) {
        this.regErrors.lastName = 'Поле фамилия обязательно для заполнения'
        err++
      }
      if (!this.regModel.login.trim()) {
        this.regErrors.login = 'Поле логин обязательно для заполнения'
        err++
      }
      if (!this.regModel.password.trim()) {
        this.regErrors.password = 'Поле пароль обязательно для заполнения'
        err++
      }
      if (!this.regModel.passwordAgain.trim()) {
        this.regErrors.passwordAgain = 'Потверждение пароля обязательно для заполнения'
        err++
      }
      if (this.regModel.password.trim().length <= 8 || this.regModel.password.trim().length > 18) {
        this.regErrors.password = 'Поле пароль должно содержать от 8 до 18 символов'
        err++
      }
      if (this.regModel.passwordAgain.trim() !== this.regModel.password.trim()) {
        this.regErrors.passwordAgain = 'Пароли должны совпадать'
        err++
      }
      if (err === 0) {
        this.axios.post('http://localhost:5000/auth/registration', {
          ...this.regModel
        }).then(data => {
          this.regModel = {
            name: '',
            lastName: '',
            login: '',
            password: '',
            passwordAgain: ''
          }
          this.activeTab = 'auth'
        }).catch((err)=> {
          this.regErrors = err.response.data.data.errors
        });
      }
    },
    goToCart() {
      if (localStorage.token) {
        this.$router.push('/cart')
      } else {
        this.showAuthDialog = true
      }
    },
    auth() {
      this.authErrors = {}
      let err = 0
      if (!this.authModel.login.trim()) {
        this.authErrors.login = 'Поле логин обязательно для заполнения'
        err++
      }
      if (!this.authModel.password.trim()) {
        this.authErrors.password = 'Поле пароль обязательно для заполнения'
        err++
      }
      if (err === 0) {
        this.axios.post('http://localhost:5000/auth/auth', {
          ...this.authModel
        }).then(data => {
          this.authModel = {
            name: '',
            password: '',
          }
          this.showAuthDialog = false
          localStorage.token = data.data.data.token
          location.reload()
        }).catch((err)=> {
          this.authErrors = err.response.data.data.errors
        });
      }
    }
  },
  created() {
    EventBus.$on('SHOW-AUTH', () => {
      this.showAuthDialog = true
      console.log('here')
    })
    this.axios.get(`http://localhost:5000/catalog/categories/`, {
    }).then(data => {
      console.log(data.data.data)
      // this.category = data.data.data
      this.categoryList = data.data.data
    })
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  }
}

</script>