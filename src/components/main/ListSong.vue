<script setup>
import {inject, ref} from "vue";


const props = defineProps({
  idMusic: Number,
  title: String,
  albumCover: String,
  durationMusic: String
})

const {addToPlayerPopularMusic} = inject('app')

const handleClick = async () => {
  await addToPlayerPopularMusic(props.idMusic)
}
</script>

<template>
  <div class="item" @click="handleClick" style="cursor:pointer;">
    <p hidden>{{ idMusic }}</p>
    <img :src="albumCover" alt="albumCover">
    <p class="name">{{ title }}</p>
    <p>{{ durationMusic }}</p>
  </div>
</template>

<style scoped>
.listSongs .items .item {
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
  margin-bottom: 10px;
  width: 270px;
  border-radius: 8px;
  padding: 5px 20px 5px 5px;
  transition: .3s linear;
}

.item:active {
  background-color: #555560;
}

.item:focus {
  background-color: #555560;
}

.listSongs .items .item img {
  width: 50px;
  height: 50px;
}

.listSongs .items .item p {
  font-size: 12px;
}

.name {
  width: 120px;
}
</style>