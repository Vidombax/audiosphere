<script setup>
import {inject, onMounted, ref} from "vue";
import axios from "axios";

const music = ref([])

const url = ref(`/api/afisha-music/`)

const fetchMusic = async () => {
  try {
    const response = await axios.get(url.value)
    music.value = response.data
  }
  catch (err) {
    console.log(err)
  }
}

const favMusic = ref([])
const isAdded = ref(true)

const checkFavourite = async () => {
  try {
    const idUser = ref(Number(localStorage.getItem('id')) || 0)
    if (idUser.value !== 0) {
      const response = await axios.get(`api/subscribe-music/${idUser.value}`)
      let index = ref(0)
      favMusic.value = response.data

      if (favMusic.value.length >= 1) {
        index = favMusic.value.findIndex(item => item.id === music.value.id)
        if (index !== -1) {
          isAdded.value = false
        }
      }
    }
    else {
      isAdded.value = true
    }
  }
  catch (err) {
    console.error(err)
  }
}


const addToFavouriteClick = async (idMusic) => {
  isAdded.value = false
  await addToFavourite(idMusic)

}

const removeFromFavouriteClick = async (idMusic) => {
  isAdded.value = true
  await removeFromFavourite(idMusic)
}

const {addToPlayerMusic, addToFavourite, removeFromFavourite} = inject('app')

const handleClick = async () => {
  await addToPlayerMusic(music.value.id, url.value)
}

onMounted(async () => {
  await fetchMusic()
  await checkFavourite()
})
</script>

<template>
  <div class="trending">
    <div class="left">
      <h3>Новые тренды</h3>
      <div class="info">
        <p hidden>{{ music.id }}</p>
        <h2>{{ music.name_music }}</h2>
        <p class="name">{{ music.name }}</p>
        <p class="count">{{ music.count_auditions }} прослушиваний</p>
        <div class="buttons">
          <button @click="handleClick">Слушать</button>
          <box-icon name='plus' color='#ffffff' style="cursor: pointer" v-if="isAdded" @click="addToFavouriteClick(music.id)"></box-icon>
          <box-icon name='heart' type='solid' v-else color='#ffffff' @click="removeFromFavouriteClick(music.id)"></box-icon>
        </div>
      </div>
    </div>
    <img :src="music.album_cover" alt="AlbumCover">
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
  font-size: 42px;
  margin-bottom: 8px;
}

.name {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: larger;
}

.count {
  font-size: medium;
  color: #919191;
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
    width: 140%;
  }
  .container main .trending img {
    width: 300px;
  }
}

@media screen and (max-width: 950px) {
  .trending {
    width: 100%;
  }
  .trending img {
    display: none;
  }
}
</style>