<script setup>

import Genre from "@/components/genre.vue";
import NewInTrend from "@/components/newInTrend.vue";
import TopChartMusic from "@/components/topChartMusic.vue";
import NewAlbums from "@/components/NewAlbums.vue";
import CustomPlaylists from "@/components/CustomPlaylists.vue";
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
  <NewAlbums />
  <CustomPlaylists />
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
</style>
