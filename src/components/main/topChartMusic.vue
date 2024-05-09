<script setup>
import {defineProps, inject, onMounted, ref} from "vue";
import axios from "axios";

const {addToPlayerMusic, addToFavourite, removeFromFavourite} = inject('app')
const isAdded = ref(true)
const favMusic = ref([])

const props = defineProps({
  idMusic: Number,
  numberSet: Number,
  nameSong: String,
  namePerformance: String,
  albumCover: String,
  durationMusic: String,
  sendMessage: Function,
})

const checkFavourite = async () => {
  try {
    const idUser = ref(Number(localStorage.getItem('id')) || 0)
     if (idUser.value !== 0) {
       const response = await axios.get(`api/subscribe-music/${idUser.value}`)
       let index = ref(0)
       favMusic.value = response.data

       if (favMusic.value.length >= 1) {
         index = favMusic.value.findIndex(item => item.id === props.idMusic)
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

const handleClick = async () => {
  await addToPlayerMusic(props.idMusic, `/api/popular-music-player`)
}

const addToFavouriteClick = async () => {
  isAdded.value = false
  await addToFavourite(props.idMusic)

}

const removeFromFavouriteClick = async () => {
  isAdded.value = true
  await removeFromFavourite(props.idMusic)
}

onMounted(async () => {
  await checkFavourite()
})
</script>


<template>
  <div class="item">
    <div class="info">
      <p hidden>{{ idMusic }}</p>
      <p>{{ numberSet }}</p>
      <img :src="albumCover">
      <div class="details">
        <h5>{{ nameSong }}</h5>
        <p>{{ namePerformance }}</p>
      </div>
    </div>
    <div class="actions">
      <p>{{ durationMusic }}</p>
      <div class="icon">
        <box-icon name='right-arrow' class="playMusic" type='solid' color='#ffffff' @click="handleClick"></box-icon>
      </div>
      <box-icon name='plus-square' v-if="isAdded" type='solid' class="addMusicToFavourite" color='#ffffff' @click="addToFavouriteClick"></box-icon>
      <box-icon name='heart' type='solid' v-else color='#ffffff' @click="removeFromFavouriteClick"></box-icon>
    </div>
  </div>
</template>


<style scoped>
.container main .playlist .music-list .items .item{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.container main .playlist .music-list .items .item:last-child{
  margin-bottom: 0;
}

.details h5 {
  margin-bottom: 0;
}

.playMusic {
  cursor: pointer;
}

.addMusicToFavourite {
  cursor: pointer;
}

.container main .playlist .music-list .items .item .info,
.container main .playlist .music-list .items .item .actions{
  display: flex;
  align-items: center;
  gap: 20px;
}

.container main .playlist .music-list .items .item .info p{
  color: #919191;
  font-size: 12px;
  font-weight: bold;
  margin-top: 6px;
}

.container main .playlist .music-list .items .item .info img{
  width: 50px;
  height: 50px;
  border-radius: 6px;
}

.container main .playlist .music-list .items .item .actions p{
  font-size: 13px;
  font-weight: bold;
}

.container main .playlist .music-list .items .item .actions .icon{
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #32323d;
  padding: 6px;
  border: 2px solid #464748;
  border-radius: 6px;
}

.container main .playlist .music-list .items .item .actions .icon i{
  font-size: 10px;
  color: #5773ff;
}

.container main .playlist .music-list .items .item .actions i{
  color: #919191;
}
</style>
