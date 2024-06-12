<script setup>

</script>

<template>
  <div class="header-main">
    <h2>Фильтрация</h2>
    <select>
      <option value="false">Альбомы</option>
      <option value="true">Плейлисты</option>
    </select>
    <input type="text" placeholder="Название альбома">
    <button>Применить</button>
  </div>
  <div class="items">
    <div class="table">
      <div class="header-table">
        <h2>ID</h2>
        <h2>Название</h2>
        <h2>Автор</h2>
        <h2>Дата публикации</h2>
        <h2>Плейлист</h2>
      </div>
      <div class="items-table">
        <div class="item">

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table .header-table {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
}
</style>