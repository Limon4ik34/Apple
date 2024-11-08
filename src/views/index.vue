<template>
  <div class="banner-container">
    <h1 class="store-title">Добро пожаловать в наш магазин Mobile City!</h1>
    <p class="store-description">Лучшие предложения на технику Apple. Найдите свой идеальный продукт сегодня!</p>

    <div class="banner-images">
      <img src="@/assets/baner_1.jpg" alt="Banner 1" class="banner" />
      <img src="@/assets/baner_2.jpg" alt="Banner 2" class="banner" />
      <img src="@/assets/baner_3.jpg" alt="Banner 3" class="banner" />
      <img src="@/assets/baner_4.jpg" alt="Banner 4" class="banner" />
    </div>

    <button class="buy-now-button">
      <i class="fas fa-shopping-cart"></i> Купить сейчас
    </button>

    <div class="promotions">
      <h2 class="promotions-title">Акции</h2>
      <p class="promotion-item">Скидка 20% на все iPhone до конца месяца!</p>
      <p class="promotion-item">Купите iPad и получите Apple Pencil в подарок!</p>
    </div>

    <div class="reviews">
      <h2 class="reviews-title">Отзывы клиентов</h2>
      <p class="review-item">"Отличный сервис и быстрая доставка!" - Анна</p>
      <p class="review-item">"Купил MacBook, очень доволен!" - Сергей</p>
    </div>

    <div class="popular-products">
      <h2 class="popular-products-title">Популярные продукты</h2>
      <ul>
        <li>iPhone 14 Pro</li>
        <li>iPad Air</li>
        <li>MacBook Pro 16"</li>
        <li>Apple Watch Series 7</li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.banner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  background-color: #f5f5f5; /* светлый фон для контраста */
  padding: 20px; /* внутренние отступы */
  border-radius: 10px; /* скругление углов контейнера */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* тень для контейнера */
}

.banner-images {
  display: flex;
  flex-direction: row; /* Изменено на row для отображения в строку */
  flex-wrap: wrap; /* Позволяет элементам переходить на следующую строку */
  justify-content: center; /* Центрирует изображения по горизонтали */
}

.banner {
  width: 100%;
  max-width: 300px; /* Измените максимальную ширину для лучшего отображения в две строки */
  margin: 10px; /* Отступы между изображениями */
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s; /* плавный эффект при наведении */
}

.banner:hover {
  transform: scale(1.05); /* увеличение при наведении */
}

.store-title {
  font-size: 2.5rem; /* размер шрифта заголовка */
  color: #333; /* цвет текста */
  margin-bottom: 10px; /* отступ снизу */
}

.store-description {
  font-size: 1.2rem; /* размер шрифта описания */
  color: #666; /* цвет текста */
  margin-bottom: 20px; /* отступ снизу */
  text-align: center; /* выравнивание по центру */
}

.buy-now-button {
  background-color: #007aff; /* цвет кнопки */
  color: white; /* цвет текста */
  border: none; /* без рамки */
  border-radius: 5px; /* скругление углов */
  padding: 15px 60px; /* увеличенные внутренние отступы */
  font-size: 1.2rem; /* увеличенный размер шрифта */
  cursor: pointer; /* указатель при наведении */
  transition: background-color 0.3s, transform 0.3s; /* плавный переход цвета и эффекта */
  display: flex;
  align-items: center; /* выравнивание по центру */
}

.buy-now-button:hover {
  background-color: #005bb5; /* цвет кнопки при наведении */
  transform: scale(1.1); /* увеличение при наведении */
}

.promotions, .reviews, .popular-products {
  margin-top: 20px;
  text-align: center;
}

.promotions-title, .reviews-title, .popular-products-title {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
}

.promotion-item, .review-item {
  font-size: 1rem;
  color: #666;
  margin: 5px 0;
}
</style>

<script>
import VueHeader from '@/components/VHead.vue'
export default {
  name: "index",
  components: {
    VueHeader
  }
}
</script>