<script setup>

import {onMounted, ref} from "vue";
import axios from "axios";

import Genre from "@/components/genre/Genre.vue";
import NewInTrend from "@/components/main/newInTrend.vue";
import TopChartMusic from "@/components/main/topChartMusic.vue";
import NewAlbums from "@/components/album/NewAlbums.vue";
import CustomPlaylists from "@/components/main/CustomPlaylists.vue";

document.title = 'AudioSphere | Главная'

const genres = ref([])

const fetchGenres = async () => {
  try {
    const response = await axios.get('/api/tag')
    genres.value = response.data
  }
  catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  await fetchGenres()
})
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
        <Genre v-for="item in genres" :key="item.id" :title="item.name_tag"/>
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
  gap: 20px;
  display: flex;
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

@media screen and (max-width: 1450px) {
  .container main .playlist .music-list {
    width: 50%;
  }
  .container main .playlist .genres {
    width: 30%;
  }
  .container main .trending {
    justify-content: normal;
  }
  .container main .trending img {
    width: 240px;
  }
}

@media screen and (max-width: 1250px) {
  .container main .playlist {
    width: 140%;
  }
  .container main .playlist .music-list {
    width: 98%;
  }
  .container main .playlist .genres {
    width: 98%;
  }
  .container main .trending {
    width: 140%;
  }
  .container main .trending img {
    width: 300px;
  }
}

@media screen and (max-width: 950px) {
  .playlist {
    flex-direction: column;
    width: 100%;
  }
  .trending {
    width: 100%;
  }
  .trending img {
    display: none;
  }
}

@media screen and (max-width: 850px) {
  .container main .trending {
    width: 100%;
  }
  .container main .playlist {
    width: 100%;
  }
}
</style>
