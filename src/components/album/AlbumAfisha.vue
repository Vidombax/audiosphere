<script setup>
import {inject, onMounted, ref} from "vue";
import axios from "axios";

const newAlbum = ref([])
const musicByAlbum = ref([])
const url = ref(``)

const fetchAlbum = async () => {
  try {
    const response = await axios.get('/api/new-albums')
    newAlbum.value = response.data
  }
  catch (err) {
    console.log(err)
  }
}

const getMusicByAlbum = async () => {
  try {
    url.value = `/api/music-album/${newAlbum.value[0].id_album}`
    const response = await axios.get(url.value)
    musicByAlbum.value = response.data
  }
  catch (err) {
    console.error(err)
  }
}

const {addToPlayerMusic} = inject('app')

const handleClick = async () => {
  await addToPlayerMusic(musicByAlbum.value[0].id, url.value)
}

onMounted(async () => {
  await fetchAlbum()
  await getMusicByAlbum()
})
</script>

<template>
  <div class="trending">
    <div class="left">
      <h3>Новый альбом</h3>
      <div class="info">
        <h2 v-if="newAlbum.length > 0">{{ newAlbum[0].name_album }}</h2>
        <h4 v-if="newAlbum.length > 0">{{ newAlbum[0].name }}</h4>
        <div class="buttons">
          <button @click="handleClick">Слушать</button>
        </div>
      </div>
    </div>
    <img v-if="newAlbum.length > 0" :src="newAlbum[0].album_cover">
  </div>
</template>

<style scoped>
.container main .trending img{
  width: 250px;
  height: 250px;

}

.container main .trending{
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
}

.container main .trending .left .info{
  margin-top: 12px;
  padding: 26px;
}

.container main .trending .left .info h2{
  font-size: 56px;
  margin-bottom: 8px;
}

.container main .trending .left .info h4,
.container main .trending .left .info h5{
  display: inline;
}

.container main .trending .left .info h5{
  margin-left: 12px;
  color: #919191;
}

.container main .trending .left .info .buttons{
  margin-top: 30px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.container main .trending .left .info .buttons button{
  padding: 12px 16px;
  background-color: #5773ff;
  border: none;
  border-radius: 14px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}

.container main .trending .left .info .buttons i{
  color: #5773ff;
  font-size: 20px;
  border: 2px solid #fff;
  padding: 10px;
  border-radius: 50%;
}

@media screen and (max-width: 1250px) {
  .container main .trending {
    gap: 64px;
  }
}

@media screen and (max-width: 1035px) {
  .container main .trending {
    gap: 0px;
  }
}

@media screen and (max-width: 950px) {
  .container main .trending img {
    display: none;
  }
}
</style>