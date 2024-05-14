<script setup>
import {inject, ref} from "vue";
import axios from "axios";

const props = defineProps({
  title: String,
  idTag: Number,
})

const musicByTag = ref([]);

const {addToPlayerMusic} = inject('app')

const getMusicByTag = async () => {
  try {
    const response = await axios.get(`/api/music-tag/${props.idTag}`)
    musicByTag.value = response.data
    console.log(musicByTag.value)
  }
  catch (err) {
    console.error(err)
  }
}

const handleClick = async () => {
  await getMusicByTag()
  await addToPlayerMusic(musicByTag.value[0].id, `/api/music-tag/${props.idTag}`)
}
</script>

<template>
  <div class="item">
    <p hidden>{{ idTag }}</p>
    <p>{{ title }}</p>
    <img src="../../assets/play.png" style="cursor: pointer" @click="handleClick">
  </div>
</template>

<style scoped>
.genres .items .item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  margin-left: 10%;
}

.genres .items .item:nth-child(even) {
  background-color: #0D4045;
}

.genres .items .item:nth-child(odd) {
  background-color: #A24C34;
}

.genres .items .item p {
  color: #fff;
  font-size: larger;
}

@media screen and (max-width: 1350px) {
  .genres .items .item {
    margin-left: 10%;
    width: 250px;
  }
}

@media screen and (max-width: 1250px) {
  .genres .items .item {
    width: 300px;
  }
}
</style>