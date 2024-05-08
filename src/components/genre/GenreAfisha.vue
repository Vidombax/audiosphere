<script setup>
import {ref, onMounted, inject} from 'vue'
import axios from "axios";

const tag = ref([])
const musicByTag = ref([])
const url = ref(``)

const getNewestTag = async () => {
  try {
    const response = await axios.get('api/newest-tag')
    tag.value = response.data
  }
  catch (err) {
    console.log(err)
  }
}

const getMusicByTag = async () => {
  try {
    url.value = `/api/music-tag/${tag.value.id}`
    const response = await axios.get(url.value)
    musicByTag.value = response.data
  }
  catch (err) {
    console.error(err)
  }
}

const {addToPlayerMusic} = inject('app')

const handleClick = async () => {
  await addToPlayerMusic(musicByTag.value[0].id, url.value)
}

onMounted(async () => {
  await getNewestTag()
  await getMusicByTag()
})
</script>

<template>
  <div class="trending">
    <div class="left">
      <h3>Новый жанр</h3>
      <div class="info">
        <h2>{{ tag.name_tag }}</h2>
        <div class="buttons">
          <button @click="handleClick">Слушать</button>
        </div>
      </div>
    </div>
    <img :src='tag.genre_photo'>
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

@media screen and (max-width: 880px) {
  .container main .trending img {
    display: none;
  }
}
</style>