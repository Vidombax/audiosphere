<script setup>
import {onMounted, ref} from 'vue'
import axios from 'axios'

const newAlbums = ref([])

const fetchNewAlbums = async () => {
  try {
    const response = await axios.get('/api/new-albums')
    newAlbums.value = response.data
  }
  catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  await fetchNewAlbums()
})
</script>

<template>
  <div class="newAlbums">
    <div class="header">
      <h4>Новые альбомы</h4>
      <a href="#">Смотреть все</a>
    </div>
    <div class="items">
      <div class="item" v-for="item in newAlbums" :key="item.id">
        <a href="#">
          <img :src="item.album_cover" alt="albumCover">
          <p>{{ item.name_album }}</p>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  gap: 12px;
}

.newAlbums .items .item a {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.newAlbums .items .item a p {
  margin-top: 8px;
  color: #fff;
}

.newAlbums .items .item a img {
  width: 200px;
  height: 200px;
}

@media screen and (max-width: 1540px) {
  .newAlbums .items .item a img {
    width: 150px;
    height: 150px;
  }
}

@media screen and (max-width: 1450px) {
  .newAlbums {
    width: 82.5%;
  }
  .newAlbums .items .item a img {
    width: 100px;
    height: 100px;
  }
  .newAlbums .items {
    grid-template-columns: repeat(4, 26%);
  }
  .newAlbums .items .item a p {
    font-size: small;
  }
}

@media screen and (max-width: 1250px) {
  .newAlbums {
    width: 140%;
  }
  .newAlbums .items .item a img {
    width: 130px;
    height: 130px;
  }
  .newAlbums .items {
    grid-template-columns: repeat(4, 26%);
  }
}

@media screen and (max-width: 950px) {
  .newAlbums {
    width: 98%;
  }
  .newAlbums .items {
    grid-template-columns: repeat(2, 50%);
    gap: 10px;
  }
}
</style>