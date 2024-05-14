<script setup>

import Playlist from "@/components/Playlist.vue";
</script>

<template>
  <div class="sidebarNotFixed">
    dick
  </div>
  <aside class="sidebar">
    <div class="logo">
      <button class="menu-btn" id="menu-close">
        <box-icon name='log-out-circle' type='solid' ></box-icon>
      </button>
      <router-link to="/"><p>AudioSphere</p></router-link>
    </div>

    <div class="menu">
      <h5>Меню</h5>
      <ul>
        <li>
          <box-icon name='bolt-circle' type='solid' color='#ffffff' ></box-icon>
          <router-link to="/">
            <p>Главная</p>
          </router-link>
        </li>
        <li>
          <box-icon name='volume-full' type='solid' color='#ffffff' ></box-icon>
          <router-link to="/genres">
            <p>Жанры</p>
          </router-link>
        </li>
        <li>
          <box-icon type='solid' name='album' color='#ffffff'></box-icon>
          <router-link to="/albums">
            <p>Альбомы</p>
          </router-link>
        </li>
        <li>
          <box-icon type='solid' name='microphone' color='#ffffff'></box-icon>
          <router-link to="/performers">
            <p>Исполнители</p>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="menu">
      <h5>Библиотека</h5>
      <ul>
<!--        <li>-->
<!--          <box-icon name='album' type='solid' color='#ffffff' ></box-icon>-->
<!--          <router-link to="/favourite-albums">-->
<!--            <p>Ваши альбомы</p>-->
<!--          </router-link>-->
<!--        </li>-->
        <li>
          <box-icon name='heart' type='solid' color='#ffffff' ></box-icon>
          <router-link to="/favourites">
            <p>Любимые</p>
          </router-link>
        </li>

      </ul>
    </div>

    <div class="menu">
      <h5>Плейлисты</h5>
      <ul>
        <li>
          <box-icon name='plus-square' type='solid' color='#ffffff' ></box-icon>
          <p class="createNewPlaylistBtn">Создать новый</p>
        </li>
        <Playlist />
      </ul>
    </div>
  </aside>
</template>

<style scoped>
.container .sidebar{
  height: 100vh;
  padding: 20px 36px;
  flex-direction: column;
  justify-content: space-between;
  z-index: 10000;
  position: fixed;
  transition: all 0.6s ease;
}
.sidebarNotFixed {
  height: 100vh;
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

.createNewPlaylistBtn {
  color: #fff;
  transition: all 0.3s ease;
}

.createNewPlaylistBtn:hover {
  color: #5773ff;
}

p {
  color: #fff;
}

.container .sidebar .logo p{
  font-weight: bold;
  transition: all 0.3s ease;
}

.container .sidebar .menu h5{
  color: #919191;
  margin-bottom: 12px;
  text-transform: uppercase;
  font-size: 14px;
}

.container .sidebar .menu ul{
  list-style: none;
}

@media screen and (min-width: 651px) {
  .sidebar {
    background-color: #18181d;
    display: flex;
  }
}

@media screen and (max-width: 650px) {
  .sidebarNotFixed {
    display: none;
  }
  .sidebar {
    display: none;
  }
}
</style>
