<template>
  <div class="page" :class="{disabled: pending}">
    <AdminMenu />
    <h1>Администрирование заказов</h1>
    <div>
      <md-table>
        <md-table-row>
          <md-table-head>
            id
          </md-table-head>
          <md-table-head>
            Имя
          </md-table-head>
          <md-table-head>
            Фамилия
          </md-table-head>
          <md-table-head>
            Логин
          </md-table-head>
          <md-table-head>
            Товары
          </md-table-head>
          <md-table-head>
            Сумма
          </md-table-head>
          <md-table-head style="width: 200px">
            Статус заказа
          </md-table-head>
          <md-table-head style="width: 80px">
          </md-table-head>
        </md-table-row>
        <md-table-row v-for="order in orders">
          <md-table-cell>{{ order.id }}</md-table-cell>
          <md-table-cell>{{ order.user.name }}</md-table-cell>
          <md-table-cell>{{ order.user.lastName }}</md-table-cell>
          <md-table-cell>{{ order.user.login }}</md-table-cell>
          <md-table-cell>
            <div v-for="product in order.products">
              {{product.title}} - {{product.qty}}шт
            </div>
          </md-table-cell>
          <md-table-cell>{{ calculateSum(order.products) }}</md-table-cell>
          <md-table-cell>
            <md-field>
              <md-select v-model="order.status" name="status" id="status" @md-selected=changeStatus(order)>
                <md-option value="new">Новый</md-option>
                <md-option value="canceled">Отмененный</md-option>
                <md-option value="paymened">Оплаченный</md-option>
                <md-option value="closed">Завершенный</md-option>
              </md-select>
            </md-field>
          </md-table-cell>
          <md-table-cell>
            <md-button  @click="openOrder(order)" class="md-icon-button md-raised md-primary">
              <md-icon>read_more</md-icon>
            </md-button>
          </md-table-cell>

        </md-table-row>
      </md-table>
    </div>
    <md-dialog :md-active.sync="showDialog">
      <div class="current-order" v-if="currentOrder">
        <div class="title-dialog">Заказ №{{ currentOrder.id}}</div>
        <div class="line">
          <div class="line-title">
            Покупатель
          </div>
          <div class="line-value">
            {{currentOrder.user.name}} {{currentOrder.user.lastName}}
          </div>
        </div>
        <div class="line">
          <div class="line-title">
            Указанные контакты
          </div>
          <div class="line-value">
            {{currentOrder.contacts}}
          </div>
        </div>
        <div class="line">
          <div class="line-title">
            Платежные данные
          </div>
          <div class="line-value">
            Номер карты: {{currentOrder.cardNumber}} <br/>
            Дата карты: {{currentOrder.cardDate}} <br/>
            CVV: {{currentOrder.cvv}} <br/>
          </div>
        </div>
        <div class="line">
          <div class="line-title">
            Товары
          </div>
          <div class="line-value">
            <div v-for="product in currentOrder.products">
              {{product.title}} - {{product.qty}}шт | {{product.currentPrice}}р.
            </div>
          </div>
        </div>
        <div class="line">
          <div class="line-title">
            Итоговая сумма
          </div>
          <div class="line-value">
            {{ calculateSum(currentOrder.products) }}
          </div>
        </div>
      </div>


    </md-dialog>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  padding: 16px;
  width: 400px;
}

.disabled {
  pointer-events: none;
  opacity: 0.5;
}

.page {
  padding: 20px;
}

.current-order {
  width: 500px;
  padding: 16px;
}

.title-dialog {
  font-size: 24px;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
}

.line {
  margin-bottom: 10px;

  .line-title {
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
<script>
import AdminMenu from "@/components/admin-menu.vue";

export default {
  name: "orders",
  components: {AdminMenu},
  data() {
    return {
      pending: false,
      showDialog: false,
      currentOrder: null,
      orders: []
    }
  },
  created() {
    this.axios.get('http://localhost:5000/orders/', {
      headers: {
        Authorization: localStorage.token
      }
    }).then(data => {
      this.orders = [...data.data.data]
      console.log(data)
    }).catch((err)=> {
    });
  },
  methods: {
    openOrder(order) {
      this.showDialog = true
      this.currentOrder = order
    },
    calculateSum(products) {
      let sum = 0
      products.forEach(product => {
        sum+= (+product.currentPrice * +product.qty)
      })
      return sum
    },
    changeStatus(order) {
      this.pending = true
      this.axios.patch('http://localhost:5000/orders/', order ,{
        headers: {
          Authorization: localStorage.token
        }
      }).then(data => {
        console.log(data)
        this.axios.get('http://localhost:5000/orders/', {
          headers: {
            Authorization: localStorage.token
          }
        }).then(data => {
          this.pending = false
          this.orders = [...data.data.data]
          console.log(data)
        }).catch((err)=> {
        });
      }).catch((err)=> {
      });
      console.log(user)
    }
  }
}
</script>