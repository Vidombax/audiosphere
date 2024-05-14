<script setup>
import {inject, ref} from "vue";
import axios from "axios";

const props = defineProps({
  namePerformer: String,
  photoPerformer: String,
  idPerformer: Number,
})

const musicByPerformer = ref([])
const url = ref(``)
const urlPerfomer = ref(`/performer/${props.idPerformer}`)

const getMusicByAlbum = async () => {
  try {
    url.value = `/api/music-performer/${props.idPerformer}`
    const response = await axios.get(url.value)
    musicByPerformer.value = response.data
  }
  catch (err) {
    console.error(err)
  }
}

const {addToPlayerMusic} = inject('app')

const handleClick = async () => {
  await getMusicByAlbum()
  await addToPlayerMusic(musicByPerformer.value[0].id, url.value)
}
</script>

<template>
  <div class="item">
    <img :src="photoPerformer" class="performerImg">
    <router-link :to="urlPerfomer"><h3>{{ namePerformer }}</h3></router-link>
    <div class="icon">
      <box-icon name='right-arrow' class="playMusic" type='solid' color='#ffffff' @click="handleClick"></box-icon>
    </div>
  </div>
</template>

<style scoped>
h3 {
  font-weight: normal;
}

.performerImg {
  width: 55px;
  height: 55px;
}

.favouritesPerformances .items .item{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 12px;
}

.icon{
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #32323d;
  padding: 6px;
  border: 2px solid #464748;
  border-radius: 6px;
}
</style>