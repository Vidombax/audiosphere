<script setup>

</script>

<template>
  <div class="header-main">
    <h2>Фильтрация</h2>
    <select>
      <option value="true">ID</option>
      <option value="false">По прослушиванием</option>
    </select>
    <input type="text" placeholder="Название">
    <button>Применить</button>
  </div>
  <div class="items">
    <div class="table">
      <div class="header-table">
        <h2>ID</h2>
        <h2>Название</h2>
        <h2>Исполнитель</h2>
        <h2>Кол-во прослушиваний</h2>
        <h2>Жанр</h2>
        <h2>Время</h2>
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
  grid-template-columns: repeat(6, 1fr);
  align-items: center;
}
</style>