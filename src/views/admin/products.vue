<template>
  <div class="page">
    <h1>Администрирование товаров</h1>
    <md-button
      class="md-dense md-raised md-primary"
      @click="openNew"
    >
      Создать новую
    </md-button>
    <div>
      <md-table>
        <md-table-row>
          <md-table-head>
            id
          </md-table-head>
          <md-table-head>
            Название
          </md-table-head>
          <md-table-head>
            ЧПУ
          </md-table-head>
          <md-table-head style="width: 150px">
            Дейстрия
          </md-table-head>
        </md-table-row>
        <md-table-row v-for="product in productsList">
          <md-table-cell>{{ product.id }}</md-table-cell>
          <md-table-cell>{{ product.title }}</md-table-cell>
          <md-table-cell>{{ product.slug }}</md-table-cell>
          <md-table-cell>
            <md-button @click="openEdit(product.id)" class="md-icon-button md-raised md-primary">
              <md-icon>edit</md-icon>
            </md-button>
            <md-button  @click="deleteCategory(product)" class="md-icon-button md-raised md-primary">
              <md-icon>delete</md-icon>
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
    <md-dialog
      class="new-category-dialog"
      :md-active.sync="showCreateNewDialog"
      @md-closed="clearModel()"
    >
      <md-dialog-title>
        {{ newCategoryModel.id ? 'Редактировать категорию' : ' Создать новую категорию'}}
      </md-dialog-title>
      <div class="wrapper">
        <md-field :class="{'md-invalid': newCategoryErrors.title}">
          <label>Название категории</label>
          <md-input
            v-model="newCategoryModel.title">
          </md-input>
          <span class="md-error">{{ newCategoryErrors.title }}</span>
        </md-field>
        <md-field :class="{'md-invalid': newCategoryErrors.slug}">
          <label>ЧПУ (slug) категории</label>
          <md-input
            v-model="newCategoryModel.slug">
          </md-input>
          <span class="md-error">{{ newCategoryErrors.slug }}</span>
        </md-field>
        <md-field>
          <md-button @click="send()" style="width: 100%" class="md-raised md-primary">Отправить</md-button>
        </md-field>
      </div>
    </md-dialog>
    <md-dialog-confirm
      :md-active.sync="deleteOptions.show"
      :md-title="`Вы уверены что хотите удалить товар ${deleteOptions?.product?.title}`"
      md-confirm-text="Да"
      md-cancel-text="Нет"
      @md-cancel="cancelDelete"
      @md-confirm="confirmDelete" />
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
import {create} from "axios";

export default {
  name: "categories",
  data() {
    return {
      deleteOptions: {
        product: null,
        show:false
      },
      productsList: [],
      showCreateNewDialog: false,
      newCategoryModel: {
        title: '',
        slug: ''
      },
      newCategoryErrors: {
        title: '',
        slug: ''
      },
    }
  },
  created() {
    this.getProductsList()
  },
  methods: {
    openEdit(id) {
      this.$router.push(`/admin/products/${id}`)
    },
    openNew() {
      this.$router.push('/admin/products/new')
    },
    deleteCategory(product) {
     this.deleteOptions = {
       show: true,
       product
     }
    },
    confirmDelete() {

      this.axios.delete(`http://localhost:5000/admin/products/${this.deleteOptions.product.id}`).then(data => {
        this.showCreateNewDialog = false
        this.deleteOptions = {
          show: false,
          product: null
        }
        this.getProductsList()
      }).catch((err)=> {
        // this.regErrors = err.response.data.data.errors
      });
    },
    cancelDelete() {
      this.deleteOptions = {
        product: null,
        show:false
      }
    },
    getProductsList() {
      this.axios.get('http://localhost:5000/admin/products', {}).then(data => {
        this.productsList = [...data.data.data.products]
      }).catch((err)=> {
        // this.regErrors = err.response.data.data.errors
      });
    }
  },

}
</script>