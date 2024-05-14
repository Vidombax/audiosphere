<script setup>
  import {inject, ref} from "vue";

  const props = defineProps({
    nameSong: String,
    namePerformer: String,
    durationMusic: String,
    albumCover: String,
    idMusic: Number,
    numberSong: Number,
    urlApi: String
  })

  const {addToPlayerMusic, removeFromFavourite} = inject('app')

  const url = ref(window.location.pathname)
  const emit = defineEmits(['del-music'])

  const handleClick = async () => {
    await addToPlayerMusic(props.idMusic, props.urlApi)
  }

  const clickRemoveFromFavourite = async () => {
    await removeFromFavourite(props.idMusic)
    emit('del-music', props.idMusic)
  }
</script>

<template>
  <div class="item">
    <p hidden>{{ props.idMusic }}</p>
    <img :src="props.albumCover" alt="songImg">
    <p>{{ props.nameSong }}</p>
    <p v-if="props.namePerformer">{{ props.namePerformer }}</p>
    <p>{{ props.durationMusic }}</p>
    <div class="icon">
      <box-icon name='right-arrow' class="playMusic" type='solid' color='#ffffff' @click="handleClick"></box-icon>
    </div>
    <div v-if="url.includes('/performer/')" ></div>
    <box-icon name='heart' type='solid' color='#ffffff' @click="clickRemoveFromFavourite" v-else></box-icon>
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
  gap: 24px;
  grid-template-columns: 5px 50px 150px 100px 50px 40px 50px;
  align-items: center;
  justify-content: space-between;
  text-align: center;
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