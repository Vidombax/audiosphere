<script setup>

</script>

<template>
  <header>
    <div class="nav-links">
      <button class="menu-btn" id="menu-open">
        <box-icon name='menu'  color='#ffffff'></box-icon>
      </button>
      <a href="#">Подписки</a>
    </div>
    <div class="search">
      <box-icon name='search' color='#ffffff' ></box-icon>
      <input type="text" placeholder="Поиск по аудиозаписям">
    </div>
  </header>
</template>

<style scoped>
.container main header{
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.container main header .nav-links{
  display: flex;
  align-items: center;
  gap: 20px;
}

.container main header .nav-links a{
  text-transform: uppercase;
  color: #919191;
  transition: all 0.3s ease;
}

.container main header .search{
  display: flex;
  align-items: center;
  gap: 6px;
  width: 70%;
  background-color: #1d1d1d;
  border: 1px solid #464748;
  padding: 10px;
  border-radius: 8px;
}

.container main header .search input{
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  color: #fff;
}

</style>