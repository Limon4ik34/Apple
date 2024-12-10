<template>
  <div class="page">
    <AdminMenu />
    <h1>Администрирование пользователей</h1>
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
          <md-table-head style="width: 200px">
            Роль
          </md-table-head>
        </md-table-row>
        <md-table-row v-for="user in users">
          <md-table-cell>{{ user.id }}</md-table-cell>
          <md-table-cell>{{ user.name }}</md-table-cell>
          <md-table-cell>{{ user.lastName }}</md-table-cell>
          <md-table-cell>{{ user.login }}</md-table-cell>
          <md-table-cell>
            <md-field>
              <md-select v-model="user.role" name="role" id="role" @md-selected=changeRole(user)>
                <md-option value="admin">Админ</md-option>
                <md-option value="user">Пользователь</md-option>
              </md-select>
            </md-field>
          </md-table-cell>

        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  padding: 16px;
  width: 400px;
}

.page {
  padding: 20px;
}
</style>
<script>
import AdminMenu from "@/components/admin-menu.vue";

export default {
  name: "users",
  components: {AdminMenu},
  data() {
    return {
      users: []
    }
  },
  created() {
    this.axios.get('http://localhost:5000/users/', {
      headers: {
        Authorization: localStorage.token
      }
    }).then(data => {
      this.users = [...data.data.data]
      // this.productsList = [...data.data.data.products]
      console.log(data)
    }).catch((err)=> {
      // this.regErrors = err.response.data.data.errors
    });
  },
  methods: {
    changeRole(user) {
      this.axios.patch('http://localhost:5000/users/', user ,{
        headers: {
          Authorization: localStorage.token
        }
      }).then(data => {
        console.log(data)
      }).catch((err)=> {
      });
      console.log(user)
    }
  }
}
</script>