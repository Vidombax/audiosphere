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
  idPerformance: Number,
  searchText: String,
})

const urlPerfomer = ref(`/performer/${props.idPerformance}`)

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
  await addToPlayerMusic(props.idMusic, `api/music-search/${props.searchText}`)
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
      <img :src="albumCover">
      <div class="details">
        <h5>{{ nameSong }}</h5>
        <router-link :to="urlPerfomer"><p>{{ namePerformance }}</p></router-link>
      </div>
    </div>
    <div class="actions">
      <div class="icon">
        <box-icon name='right-arrow' class="playMusic" type='solid' color='#ffffff' @click="handleClick"></box-icon>
      </div>
      <box-icon name='plus-square' v-if="isAdded" type='solid' class="addMusicToFavourite" color='#ffffff' @click="addToFavouriteClick"></box-icon>
      <box-icon name='heart' type='solid' v-else color='#ffffff' @click="removeFromFavouriteClick"></box-icon>
    </div>
  </div>
</template>


<style scoped>
h5 {
  color: white;
  font-size: larger;
}

.item{
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 10px;
  margin-left: 22%;
}

.item:first-child {
  margin-top: 100px;
}

.item:last-child{
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

.item .info,
.item .actions{
  display: flex;
  align-items: center;
  gap: 50px;
}

.item .info p{
  color: #919191;
  font-size: 16px;
  font-weight: bold;
  margin-top: 6px;
  transition: .3s linear;
}

.item .info p:hover {
  color: #5773ff;
}

img{
  width: 70px;
  height: 70px;
  border-radius: 6px;
}

.item .actions p{
  font-size: 13px;
  font-weight: bold;
}

.item .actions .icon{
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #32323d;
  padding: 6px;
  border: 2px solid #464748;
  border-radius: 6px;
}

@media screen and (max-width: 1540px) {
  .item {
    margin-left: 15%;
    grid-template-columns: 1.5fr 1fr;
  }
}
</style>
