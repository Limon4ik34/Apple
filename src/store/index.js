import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: [],
    user: null,
  },
  getters: {
    getProductId: (state) => (id) => {
      return state.cart.find((item) => {
        return item.id === id
      })
    },
    getCart(state) {
      return state.cart
    }
  },
  mutations: {
    changeCart(state, products) {
      state.cart = products
    }
  },
  actions: {
    getCart() {
      if (localStorage.token)  {
        this._vm.axios.get('http://localhost:5000/cart', {
          headers: {
            Authorization: localStorage.token
          }
        }).then((data) => {
          this.state.cart = data.data.data.products
        } )
      }
    },
    getUserData() {
      if (localStorage.token)  {
        this._vm.axios.get('http://localhost:5000/auth/user-data', {
          headers: {
            Authorization: localStorage.token
          }
        }).then((data) => {
          this.state.user = data.data.data
        } )
      }
    },

  },
  modules: {
  }
})
