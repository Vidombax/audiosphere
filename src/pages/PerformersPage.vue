<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";

import PerformersAfisha from "@/components/performer/PerformersAfisha.vue";
import PerformerCard from "@/components/performer/PerformerCard.vue";

document.title = 'AudioSphere | Исполнители'

const subPerformers = ref([])
const newPerformers = ref([])
const popularPerformers = ref([])
const idUser = ref(Number(localStorage.getItem('id')) || 0)

const fetchSubPerformers = async () => {
  try {
    const response = await axios.get(`/api/subscribes-performer/${idUser.value}`)
    subPerformers.value = response.data
    if (subPerformers.value.length <= 4) {

    }
    else {
      subPerformers.value.length = 4;
    }
  }
  catch (err) {
    console.log(err)
  }
}

const fetchNewPerformers = async () => {
  try {
    const response = await axios.get('/api/new-performer');
    newPerformers.value = response.data;
    newPerformers.value.length = 4;
  }
  catch (err) {
    console.log(err)
  }
}

const fetchPopularPerformers = async () => {
  try {
    const response = await axios.get('/api/popular-performer')
    popularPerformers.value = response.data;
    popularPerformers.value.length = 4;
  }
  catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  await fetchSubPerformers()
  await fetchNewPerformers()
  await fetchPopularPerformers()
})
</script>

<template>
  <div class="performersContainer">
    <PerformersAfisha />
    <div class="genres" v-if="idUser !== 0">
      <div class="header">
        <h5>Ваши любимые исполнители</h5>
        <router-link to="/account">Смотреть все</router-link>
      </div>
      <div class="items">
        <PerformerCard v-for="item in subPerformers" :key="item.id"
                       :name="item.name" :image="item.profile_picture"
                       :id-performance="item.iduser"
        />
      </div>
    </div>
    <div class="performers">
      <div class="popularPerformers">
        <div class="header">
          <h5>Популярные исполнители</h5>
          <a href="">Смотреть все</a>
        </div>
        <div class="items">
          <PerformerCard v-for="item in popularPerformers" :key="item.id"
                         :name="item.name" :image="item.profile_picture"
                         :id-performance="item.iduser"
          />
        </div>
      </div>
      <div class="newPerformers">
        <div class="header">
          <h5>Новые исполнители</h5>
          <a href="">Смотреть все</a>
        </div>
        <div class="items">
          <PerformerCard v-for="item in newPerformers" :key="item.id"
                         :name="item.name" :image="item.profile_picture"
                         :id-performance="item.iduser"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h5 {
  color: white;
}
.genres {
  background-color: #202026;
  padding: 20px 12px 12px 20px;
  margin-top: 20px;
  border-radius: 12px;
}

.genres .items {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 12px;
  gap: 24px;
}

.genres .header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}

.genres .header h4 {
  color: #fff;
}

.genres .header a {
  color: #919191;
  font-size: 12px;
  padding-right: 5px;
}

.container main .performers {
  margin-top: 14px;
  display: flex;
  gap: 32px;
}

.container main .performers .popularPerformers {
  color: #fff;
  background-color: #202026;
  padding: 20px;
  border-radius: 6px;
}

.container main .performers .newPerformers{
  background-color: #202026;
  padding: 20px;
  color: #fff;
  border-radius: 6px;
}

.container main .performers .popularPerformers .header,
.container main .performers .newPerformers .header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}

.container main .performers .popularPerformers .header a,
.container main .performers .newPerformers .header a{
  color: #919191;
  font-size: 12px;
}

.container main .performers .popularPerformers .items,
.container main .performers .newPerformers .items{
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media screen and (min-width: 1250px) {
  .container main .performers .popularPerformers {
    width: 55%;
  }
  .container main .performers .newPerformers {
    width: 55%;
  }
}

@media screen and (max-width: 1250px) {
  .genres,
  .performers{
    width: 139%;
  }
}

@media screen and (max-width: 850px) {
  .genres,
  .performers{
    width: 130%;
  }
  .genres .items {
    grid-template-columns: 1fr;
  }
}

@media screen and (max-width: 760px) {
  .performers {
    flex-direction: column;
    width: 100%;

  }
  .performers .newPerformers,
  .performers .popularPerformers{
    width: 130%;
  }
}

@media screen and (max-width: 650px) {
  .performersContainer {
    width: 300px;
    margin-left: 40%;
  }
}

@media screen and (max-width: 500px) {
  .performersContainer {
    margin-left: 5%;
  }
}
</style>