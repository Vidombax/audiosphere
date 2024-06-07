<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";

import AlbumAfisha from "@/components/album/AlbumAfisha.vue";
import TopAlbumsChart from "@/components/album/TopAlbumsChart.vue";
import NewAlbumsChart from "@/components/album/NewAlbumsChart.vue";

document.title = 'AudioSphere | Альбомы'

const newAlbums = ref([])
const popularAlbums = ref([])

const fetchNewAlbums = async () => {
  try {
    const response = await axios.get('/api/new-albums')
    newAlbums.value = response.data
  }
  catch (err) {
    console.log(err)
  }
}

const fetchPopularAlbums = async () => {
  try {
    const response = await axios.get('/api/popular-albums')
    popularAlbums.value = response.data
  }
  catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  await fetchNewAlbums()
  await fetchPopularAlbums()
})
</script>

<template>
  <AlbumAfisha />
  <div class="albums">
    <div class="popularAlbums">
      <div class="header">
        <h5>Популярные альбомы</h5>
      </div>
      <div class="items">
        <TopAlbumsChart v-for="item in popularAlbums" :key="item.id"
                        :name-album="item.name_album" :album-cover="item.album_cover"
                        :performance="item.name" :id-album="item.id_album"
                        :id-performance="item.iduser"
        />
      </div>
    </div>
    <div class="newAlbums">
      <div class="header">
        <h5>Новые альбомы</h5>
      </div>
      <div class="items">
        <NewAlbumsChart v-for="item in newAlbums" :key="item.id"
                        :name-album="item.name_album" :album-cover="item.album_cover"
                        :performance="item.name" :id-album="item.id_album"
                        :id-performance="item.iduser"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .container main .albums {
    margin-top: 14px;
    display: flex;
    gap: 20px;
  }

  .container main .albums .popularAlbums {
    color: #fff;
    background-color: #202026;
    padding: 20px;
    border-radius: 6px;
    width: 55%;
  }

  .container main .albums .newAlbums{
    background-color: #202026;
    padding: 20px;
    color: #fff;
    border-radius: 6px;
    width: 55%;
  }

  .container main .albums .popularAlbums .header,
  .container main .albums .newAlbums .header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
  }

  .container main .albums .popularAlbums .header a,
  .container main .albums .newAlbums .header a{
    color: #919191;
    font-size: 12px;
  }

  .container main .albums .popularAlbums .items,
  .container main .albums .newAlbums .items{
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    overflow-y: auto;
    height: 500px;
    padding-right: 24px;
  }
  
  @media screen and (max-width: 1250px) {
    .container main .albums .popularAlbums {
      width: 80%;
    }
    .container main .albums .newAlbums {
      width: 80%;
    }
  }
  
  @media screen and (max-width: 1035px) {
    .container main .albums {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 140%;
    }
  }
</style>