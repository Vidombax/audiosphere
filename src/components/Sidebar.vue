<script setup>

</script>

<template>
  <aside class="sidebar">
    <div class="logo">
      <button class="menu-btn" id="menu-close">
        <box-icon name='log-out-circle' type='solid' ></box-icon>
      </button>
      <a href="#">AudioSphere</a>
    </div>

    <div class="menu">
      <h5>Menu</h5>
      <ul>
        <li>
          <box-icon name='bolt-circle' type='solid' color='#ffffff' ></box-icon>
          <a href="#">Главная</a>
        </li>
        <li>
          <box-icon name='volume-full' type='solid' color='#ffffff' ></box-icon>
          <a href="#">Жанры</a>
        </li>
        <li>
          <box-icon type='solid' name='album' color='#ffffff'></box-icon>
          <a href="#">Альбомы</a>
        </li>
        <li>
          <box-icon type='solid' name='microphone' color='#ffffff'></box-icon>
          <a href="#">Исполнители</a>
        </li>
      </ul>
    </div>
    <div class="menu">
      <h5>Библиотека</h5>
      <ul>
        <li>
          <box-icon name='undo' color='#ffffff'></box-icon>
          <a href="#">Недавние</a>
        </li>
        <li>
          <box-icon name='album' type='solid' color='#ffffff' ></box-icon>
          <a href="#">Альбомы</a>
        </li>
        <li>
          <box-icon name='heart' type='solid' color='#ffffff' ></box-icon>
          <a href="#">Любимые</a>
        </li>

      </ul>
    </div>

    <div class="menu">
      <h5>Плейлисты</h5>
      <ul>
        <li>
          <box-icon name='plus-square' type='solid' color='#ffffff' ></box-icon>
          <a href="#">Создать новый</a>
        </li>
        <li>
          <box-icon name='caret-right-circle' type='solid' color='#ffffff' ></box-icon>
          <a href="#">Лучшее за 2023</a>
        </li>

      </ul>
    </div>
  </aside>
</template>

<style scoped>
.container .sidebar{
  height: 100vh;
  background-color: #18181d;
  padding: 20px 36px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 10000;
  transition: all 0.6s ease;
}
.container .sidebar .logo{
  display: flex;
  align-items: center;
  gap: 6px;
}

.container .sidebar .logo > i{
  font-size: 24px;
  transition: all 0.3s ease;
}

.container .sidebar .logo a{
  font-weight: bold;
  transition: all 0.3s ease;
}

.container .sidebar .logo a:hover,
.container .sidebar .menu ul li:hover a,
.container .sidebar .menu ul li:hover i,
.container main header .nav-links a:hover{
  color: #5773ff;
}

.container .sidebar .menu h5{
  color: #919191;
  margin-bottom: 12px;
  text-transform: uppercase;
}

.container .sidebar .menu ul{
  list-style: none;
}

.container .sidebar .menu ul li{
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
}

.container .sidebar .menu ul li a{
  font-size: 14px;
  font-weight: bold;
  transition: all 0.3s ease;
}
</style>