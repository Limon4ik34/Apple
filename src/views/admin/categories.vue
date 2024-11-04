<template>
  <div class="page">
    <h1>Администрирование категорий</h1>
    <md-button
      class="md-dense md-raised md-primary"
      @click="showCreateNewDialog = true"
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
        <md-table-row v-for="category in categoriesList">
          <md-table-cell>{{ category.id }}</md-table-cell>
          <md-table-cell>{{ category.title }}</md-table-cell>
          <md-table-cell>{{ category.slug }}</md-table-cell>
          <md-table-cell>
            <md-button @click="openEdit(category)" class="md-icon-button md-raised md-primary">
              <md-icon>edit</md-icon>
            </md-button>
            <md-button  @click="deleteCategory(category.id)" class="md-icon-button md-raised md-primary">
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
      :md-title="`Вы уверены что хотите удалить категорию ${deleteOptions.category.title}`"
      md-confirm-text="Да"
      md-cancel-text="Нет"
      @md-cancel="cancelDelete"
      @md-confirm="onConfirm" />
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
        category: null,
        show:false
      },
      categoriesList: [],
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
    this.getCategoriesList()
  },
  methods: {
    openEdit(category) {
      this.newCategoryModel = { ...category}
      this.showCreateNewDialog = true
    },
    create() {
      this.axios.post('http://localhost:5000/admin/categories', {
        ...this.newCategoryModel
      }).then(data => {
        this.showCreateNewDialog = false
        this.clearModel()
        this.getCategoriesList()
      }).catch((err)=> {
        // this.regErrors = err.response.data.data.errors
      });
    },
    edit() {
      this.axios.patch(`http://localhost:5000/admin/categories/${this.newCategoryModel.id}`, {
        ...this.newCategoryModel
      }).then(data => {
        this.showCreateNewDialog = false
        this.clearModel()
        this.getCategoriesList()
      }).catch((err)=> {
        // this.regErrors = err.response.data.data.errors
      });
    },
    deleteCategory(id) {
      this.axios.delete(`http://localhost:5000/admin/categories/${id}`).then(data => {
        this.showCreateNewDialog = false
        this.clearModel()
        this.getCategoriesList()
      }).catch((err)=> {
        // this.regErrors = err.response.data.data.errors
      });
    },
    cancelDelete() {
      this.deleteOptions = {
        category: null,
        show:false
      }
    },
    send() {
      if (this.newCategoryModel.id) {
        this.edit()
      } else {
        this.create()
      }
    },
    clearModel() {
      this.newCategoryModel = {
        title: '',
        slug: ''
      }
    },
    getCategoriesList() {
      this.axios.get('http://localhost:5000/catalog/categories', {}).then(data => {
        this.categoriesList = [...data.data.data]
      }).catch((err)=> {
        // this.regErrors = err.response.data.data.errors
      });
    }
  },

}
</script>