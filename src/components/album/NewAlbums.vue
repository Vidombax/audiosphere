<script setup>
import {inject, onMounted, ref} from 'vue'
import axios from 'axios'

const newAlbums = ref([])
const musicByAlbum = ref([])
const url = ref(``)
const index = ref(0)

const fetchNewAlbums = async () => {
  try {
    const response = await axios.get('/api/new-albums')
    newAlbums.value = response.data
    newAlbums.value.length = 8
  }
  catch (err) {
    console.log(err)
  }
}

const getMusicByAlbum = async (id_album) => {
  try {
    url.value = `/api/music-album/${id_album}`
    const response = await axios.get(url.value)
    musicByAlbum.value = response.data
  }
  catch (err) {
    console.error(err)
  }
}

const {addToPlayerMusic} = inject('app')

const handleClick = async (id_album) => {
  await getMusicByAlbum(id_album)
  await addToPlayerMusic(musicByAlbum.value[0].id, url.value)
}

onMounted(async () => {
  await fetchNewAlbums()
})
</script>

<template>
  <div class="newAlbums">
    <div class="header">
      <h4>Новые альбомы</h4>
    </div>
    <div class="items">
      <div class="item" v-for="item in newAlbums" :key="item.id" @click="() => handleClick(item.id_album)">
        <p hidden id="idAlbum">item.id_album</p>
        <div class="imgPlay">
          <img :src="item.album_cover" class="albumImg" alt="albumCover">
          <img src="/play.png" class="playMusic" style="cursor: pointer">
        </div>
          <p>{{ item.name_album }}</p>
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

.newAlbums .header {
  color: #919191;
  font-size: 12px;
  padding-right: 5px;
}

.newAlbums .items {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 12px;
  gap: 24px;
}

.newAlbums .items .item {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.newAlbums .items .item p {
  margin-top: 8px;
  color: #fff;
}

.newAlbums .items .item .albumImg {
  width: 200px;
  height: 200px;
}

.imgPlay {
  position: relative;
  transition: .1s linear;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.imgPlay:hover {
  background-color: #000000;
}

.imgPlay:hover .playMusic {
  opacity: 1;
}

.imgPlay:hover .albumImg {
  opacity: 0.6;
}

.playMusic {
  position: absolute;
  transition: .1s linear;
  opacity: 0;
  width: 54px;
  height: 54px;
}

@media screen and (max-width: 1540px) {
  .newAlbums .items .item .albumImg {
    width: 150px;
    height: 150px;
  }
}

@media screen and (max-width: 1450px) {
  .newAlbums {
    width: 100%;
  }
  .newAlbums .items .item .albumImg {
    width: 100px;
    height: 100px;
  }
  .newAlbums .items {
    grid-template-columns: repeat(4, 22%);
  }
  .newAlbums .items .item p {
    font-size: small;
  }
}

@media screen and (max-width: 1250px) {
  .newAlbums {
    width: 140%;
  }
  .newAlbums .items .item .albumImg {
    width: 130px;
    height: 130px;
  }
  .newAlbums .items {
    grid-template-columns: repeat(4, 22%);
  }
}

@media screen and (max-width: 950px) {
  .newAlbums {
    width: 100%;
  }
  .newAlbums .items {
    grid-template-columns: repeat(2, 50%);
    gap: 10px;
  }
}
</style>