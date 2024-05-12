<script setup>
import {inject, ref} from "vue";

const props = defineProps({
  title: String,
  nameAuthor: String,
  duration: String,
  albumCover: String,
  idMusic: Number,
})

const id = ref(Number(localStorage.getItem('id')))

const {addToPlayerMusic} = inject('app')

const handleClick = async () => {
  await addToPlayerMusic(props.idMusic, `api/subscribe-music/${id.value}`)
}
</script>

<template>
  <div class="item">
    <p hidden>{{ idMusic }}</p>
    <img :src="albumCover" alt="albumCover">
    <div class="infoSong">
      <h4>{{ title }}</h4>
      <h5 v-if="props.nameAuthor">{{ nameAuthor }}</h5>
    </div>
    <p>{{ duration }}</p>
    <div class="icon">
      <box-icon name='right-arrow' class="playMusic" type='solid' color='#ffffff' @click="handleClick"></box-icon>
    </div>
  </div>
</template>

<style scoped>
p,
h4,
h5,
img{
  color: #fff;
}


.infoSong {
  width: 110px;
}

.infoSong h5 {
  font-weight: normal;
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.infoSong {
  display: flex;
  align-items: center;
  justify-content: center;
}

.favouritesComposition .items .item img {
  width: 50px;
  height: 50px;
  border-radius: 6px;
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