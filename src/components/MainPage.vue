<script setup>

import Genre from "@/components/genre.vue";
import NewInTrend from "@/components/newInTrend.vue";
import TopChartMusic from "@/components/topChartMusic.vue";
</script>

<template>
  <div class="trending">
    <div class="left">
      <h3>Новые тренды</h3>
      <NewInTrend />
    </div>
    <img src='../assets/trend.png'>
  </div>

  <div class="playlist">
    <div class="genres">
      <div class="header">
        <h5>Жанры</h5>
        <a href="#">Смотреть все</a>
      </div>

      <div class="items">
        <Genre />
        <Genre />
        <Genre />
        <Genre />
        <Genre />
        <Genre />
      </div>

    </div>

    <div class="music-list">
      <div class="header">
        <h5>Топ песен</h5>
        <a href="#">Смотреть все</a>
      </div>
      <div class="items">
        <TopChartMusic />
        <TopChartMusic />
        <TopChartMusic />
        <TopChartMusic />
      </div>
    </div>
  </div>
  <div class="newAlbums">
    <div class="header">
      <h4>Новые альбомы</h4>
      <a href="#">Смотреть все</a>
    </div>
    <div class="items">
      <div class="item">
        <a href="#">
          <img src="../assets/albumCover1.jpeg" alt="albumCover">
          <p>Название альбома</p>
        </a>
      </div>
      <div class="item">
        <a href="#">
          <img src="../assets/albumCover1.jpeg" alt="albumCover">
          <p>Название альбома</p>
        </a>
      </div>
      <div class="item">
        <a href="#">
          <img src="../assets/albumCover1.jpeg" alt="albumCover">
          <p>Название альбома</p>
        </a>
      </div>
      <div class="item">
        <a href="#">
          <img src="../assets/albumCover1.jpeg" alt="albumCover">
          <p>Название альбома</p>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container main .trending img{
  width: 300px;
  height: 200px;
}

.container main .trending{
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
}

.container main .playlist{
  margin-top: 14px;
  display: flex;
  gap: 20px;
}

.container main .playlist .genres{
  color: #fff;
  background-color: #202026;
  padding: 20px;
  border-radius: 6px;
  width: 40%;
}

.container main .playlist .genres .header,
.container main .playlist .music-list .header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}

.container main .playlist .genres .header a,
.container main .playlist .music-list .header a{
  color: #919191;
  font-size: 12px;
}

.container main .playlist .genres .items{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.container main .playlist .music-list{
  background-color: #202026;
  padding: 20px;
  color: #fff;
  border-radius: 6px;
  width: 65%;
}

.newAlbums {
  background-color: #202026;
  padding: 20px 12px 12px 20px;
  margin-top: 20px;
  border-radius: 12px;
}

.newAlbums .header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}

.newAlbums .header h4 {
  color: #fff;
}

.newAlbums .header a {
  color: #919191;
  font-size: 12px;
  padding-right: 5px;
}

.newAlbums .items {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 12px;
}

.newAlbums .items .item a {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.newAlbums .items .item a img {
  width: 200px;
  height: 200px;
}

.newAlbums .items .item a p {
  margin-top: 8px;
  color: #fff;
}
</style>
