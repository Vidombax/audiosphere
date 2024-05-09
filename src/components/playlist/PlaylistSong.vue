<script setup>
import {inject} from "vue";

const props = defineProps({
  nameSong: String,
  namePerformer: String,
  durationMusic: String,
  albumCover: String,
  idMusic: Number,
  numberSong: Number,
  urlApi: String
})

const {addToPlayerMusic} = inject('app')

const handleClick = async () => {
  await addToPlayerMusic(props.idMusic, props.urlApi)
}
</script>

<template>
  <div class="item">
    <p hidden>{{ props.idMusic }}</p>
    <p>{{ numberSong }}</p>
    <img :src="props.albumCover" alt="songImg">
    <p>{{ props.nameSong }}</p>
    <p>{{ props.namePerformer }}</p>
    <p>{{ props.durationMusic }}</p>
    <div class="icon">
      <box-icon name='right-arrow' class="playMusic" type='solid' color='#ffffff' @click="handleClick"></box-icon>
    </div>
    <box-icon name='heart' type='solid' color='#ffffff' ></box-icon>
  </div>
</template>

<style scoped>
h1,
h3,
p {
  color: #fff;
}

.item {
  display: grid;
  gap: 36px;
  grid-template-columns:5px 50px 150px 100px 50px 40px 50px;
  align-items: center;
  justify-content: space-between;
}

.item p {
  font-weight: bold;
  font-size: large;
  text-align: center;
}

.item p:first-child {
  font-size: 24px;
}

.item img {
  width: 64px;
  height: 64px;
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