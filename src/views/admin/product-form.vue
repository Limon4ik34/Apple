<template>
  <div class="page">
    <div class="form">
      <AdminMenu />
      <h1>
        {{ $route.params.productId === 'new' ? 'Создать новый товар' : 'Редактирование товара' }}
      </h1>
      <md-field>
        <label>Картинки</label>
        <md-file @md-change="changeImages" v-model="model.images" multiple />
      </md-field>
      <div class="images">
        <div v-for="img in previewImages" class="img">
          <img :src="img" alt="">
        </div>
      </div>
      <md-field :class="{'md-invalid': errors.title}">
        <label>Название Товара</label>
        <md-input
          v-model="model.title">
        </md-input>
        <span class="md-error">{{ errors.title }}</span>
      </md-field>
      <md-field :class="{'md-invalid': errors.currentPrice}">
        <label>Текущая цена</label>
        <md-input
          v-model="model.currentPrice">
        </md-input>
        <span class="md-error">{{ errors.currentPrice }}</span>
      </md-field>
      <md-field :class="{'md-invalid': errors.oldPrice}">
        <label>Старая цена</label>
        <md-input
          v-model="model.oldPrice">
        </md-input>
        <span class="md-error">{{ errors.oldPrice }}</span>
      </md-field>
      <md-field :class="{'md-invalid': errors.slug}">
        <label>ЧПУ</label>
        <md-input
          v-model="model.slug">
        </md-input>
        <span class="md-error">{{ errors.slug }}</span>
      </md-field>
      <md-field :class="{'md-invalid': errors.description}">
        <label>Описание</label>
        <md-textarea v-model="model.description"></md-textarea>
        <span class="md-error">{{ errors.description }}</span>
      </md-field>
      <md-field :class="{'md-invalid': errors.category}">
        <label for="movie">Категория</label>
        <md-select v-model="model.category">
          <md-option v-for="category in categoriesList" :value="category.id">{{ category.title }}</md-option>
        </md-select>
      </md-field>
      <md-field>
        <md-button
          @click="save"
          style="width: 100%"
          class="md-raised md-primary"
        >
          Сохранить
        </md-button>
      </md-field>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  .form {
    width: 700px;
    margin: 0 auto;

    .images {
      width: 100%;
      display: flex;
      flex-wrap: wrap;

      .img {
        width: calc(100% / 5);
        padding: 5px;

        img {
          width: 100%;
        }
      }
    }
  }
}

</style>
<script>
import AdminMenu from "@/components/admin-menu.vue";

export default {
  name: "product-form",
  components: {AdminMenu},
  data() {
    return {
      previewImages: [],
      imagesList: [],
      errors: {

      },
      categoriesList: [],
      model: {
        title: '',
        currentPrice: '',
        oldPrice: '',
        description: '',
        category: '',
        slug: '',
        images: []
      }
    }
  },
  created() {
    this.getCategoriesList()
    if (this.$route.params.productId === 'new') {

    } else {
      this.axios.get(`http://localhost:5000/admin/products/${this.$route.params.productId}`, {
        headers: {
          Authorization: localStorage.token
        }
      }).then(data => {
        this.model = {...data.data.data.product}
        this.previewImages = this.model.images
        // this.categoriesList = [...data.data.data.product]
        // this.$router.push('/admin/products')
        console.log(data)
      }).catch((err)=> {
        // this.regErrors = err.response.data.data.errors
      });
    }
  },
  methods: {
    debug() {
      console.log(this.model)
    },
    save() {
      const formData = new FormData()
      if (this.imagesList.length) {
        for (var key in this.imagesList) {
          console.log('key', key)
          if (key !== 'length' && key !== 'item') {
            formData.append('images[]', this.imagesList[key])
          }
        }
      }
      formData.append('title', this.model.title)
      formData.append('currentPrice', this.model.currentPrice)
      formData.append('oldPrice', this.model.oldPrice)
      formData.append('description', this.model.description)
      formData.append('category', this.model.category)
      formData.append('slug', this.model.slug)

      if (this.$route.params.productId === 'new') {
        this.axios.post('http://localhost:5000/admin/products', formData, {
          headers: {
            Authorization: localStorage.token
          }
        }).then(data => {
          // this.categoriesList = [...data.data.data]
          this.$router.push('/admin/products')
        }).catch((err)=> {
          // this.regErrors = err.response.data.data.errors
        });
      } else {
        formData.append('id', this.model.id)
        this.axios.patch(`http://localhost:5000/admin/products/${this.model.id}`, formData, {
          headers: {
            Authorization: localStorage.token
          }
        }).then(data => {
          // this.categoriesList = [...data.data.data]
          this.$router.push('/admin/products')
        }).catch((err)=> {
          // this.regErrors = err.response.data.data.errors
        });
      }

    },
    changeImages(event) {
      this.imagesList = event
      this.previewImages = []
      if (this.imagesList.length) {
        for (var key in this.imagesList) {
          console.log('key', key)
          if (key !== 'length' && key !== 'item') {
            this.previewImages.push(URL.createObjectURL(this.imagesList[key]))
          }
        }
      }
    },
    getCategoriesList() {
      this.axios.get('http://localhost:5000/catalog/categories', {
        headers: {
          Authorization: localStorage.token
        }
      }).then(data => {
        this.categoriesList = [...data.data.data]
      }).catch((err)=> {
        // this.regErrors = err.response.data.data.errors
      });
    }
  }
}
</script>