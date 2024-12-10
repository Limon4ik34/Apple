<template>
<div>
  <div class="payment-form">
    <div v-if="!success">
      <h1 class="cart-title">Оформление заказа</h1>
      <md-field>
        <label>Номер карты</label>
        <md-input v-model="orderData.cardNumber"></md-input>
      </md-field>
      <md-field>
        <label>Срок действия</label>
        <md-input v-model="orderData.cardDate"></md-input>
      </md-field>
      <md-field>
        <label>CVV</label>
        <md-input v-model="orderData.cvv"></md-input>
      </md-field>
      <md-field>
        <label>Как с вами связаться</label>
        <md-textarea v-model="orderData.contacts"></md-textarea>
      </md-field>
      <button class="checkout-button" @click="createOrder">Оформить заказ</button>
    </div>
    <div v-else>
      <h1 class="cart-title">Успешно</h1>
      <p>
        Ваш заказ успешно оформлен. Мы с вами свяжемся!
      </p>
      <router-link to="/">
        <button class="checkout-button">На главную</button>
      </router-link>

    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.payment-form {
  max-width: 400px;
  padding: 16px;
  margin: 0 auto;
}
.cart-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
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
  width: 100%;
}
</style>
<script>
export default {
  name: "payment",
  data() {
    return {
      success: false,
      orderData: {
        cardNumber: '',
        cardDate: '',
        cvv: '',
        contacts: '',
      }
    }
  },
  created() {
    this.axios.get('http://localhost:5000/cart', {
      headers: {
        Authorization: localStorage.token
      }
    }).then((data) => {
      console.log(data.data.data.products.length)
      if (!data.data.data.products.length) {
        this.$router.replace('/')
      }
    } ).catch(() => {
      this.$router.replace('/')
    })
  },
  methods: {
    createOrder() {
      this.axios.post('http://localhost:5000/orders/', this.orderData ,{
        headers: {
          Authorization: localStorage.token
        }
      }).then(data => {
        console.log(data)
        this.success = true
      }).catch((err)=> {
      });
    }
  }
}
</script>