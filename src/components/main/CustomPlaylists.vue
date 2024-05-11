<script setup>

import Song from "@/components/main/Song.vue";
</script>

<template>
  <div class="customPlaylists">
    <div class="header">
      <h4>Слушайте друг друга</h4>
      <a href="#">Смотреть все</a>
    </div>
    <div class="items">
      <div class="item">
        <div class="headerItem">
          <a href="#">
            <p>Название альбома</p>
          </a>
            <p>Ник автора</p>
        </div>
        <div class="songs">
          <Song />
          <Song />
          <Song />
        </div>
      </div>
      <div class="item">
        <div class="headerItem">
          <a href="#">
            <p>Название альбома</p>
          </a>
            <p>Ник автора</p>
        </div>
        <div class="songs">
          <Song />
          <Song />
          <Song />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.customPlaylists {
  background-color: #202026;
  padding: 20px 12px 12px 20px;
  margin-top: 20px;
  border-radius: 12px;
}

.customPlaylists .header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.customPlaylists .header h4 {
  color: #fff;
}

.customPlaylists .header a {
  color: #919191;
  font-size: 12px;
  padding-right: 5px;
}

.customPlaylists .items {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 12px;
  gap: 10px;
}

.customPlaylists .items .item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 12px;
}

.customPlaylists .items .item {
  border: 2px solid #5773ff;
}

.headerItem {
  display: flex;
  flex-direction: column;
  width: 360px;
  margin-bottom: 20px;
  border-radius: 8px;
  padding: 20px;
  background-color: #5773ff;
}

.headerItem a {
  font-size: large;
  margin-bottom: 5px;
}

.songs {
  display: flex;
  flex-direction: column;
  width: 360px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

@media screen and (min-width: 1450px) {
  .headerItem {
    width: 438px;
  }
}

@media screen and (max-width: 1450px) {
  .customPlaylists .items {
    grid-template-columns: 1fr;
  }
  .customPlaylists {
    width: 82.5%;
  }
  .customPlaylists .items .item {
    width: 100%;
  }
  .headerItem {
    width: 100%;
  }
}

@media screen and (max-width: 1250px) {
  .customPlaylists {
    width: 140%;
  }
}

@media screen and (max-width: 950px) {
  .customPlaylists {
    width: 98%;
  }
  .customPlaylists .items .item:first-child {
    margin-bottom: 12px;
  }
  .customPlaylists .items .item {
    width: 87%;
  }
}
</style>