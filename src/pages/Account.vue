<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";

import FavouriteComposition from "@/components/account/FavouriteComposition.vue";
import FavouritePerfomance from "@/components/account/FavouritePerfomance.vue";
import FavouriteAlbum from "@/components/account/FavouriteAlbum.vue";

const id = ref(Number(localStorage.getItem('id')))
const data = ref([])
const subMusic = ref([])

const fetchUser = async () => {
  try {
    const response = await axios.get(`/api/user/${id.value}`)
    data.value = response.data
    document.title = 'AudioSphere | ' + response.data.name[0].toUpperCase() + response.data.name.slice(1)
  }
  catch (err) {
    console.log(err)
  }
}

const exitFromAccount = async () => {
  try {
    localStorage.clear()
    location.replace('/')
  }
  catch (err) {
    console.log(err)
  }
}

const getMusicByUser = async () => {
  try {
    const response = await axios.get(`api/subscribe-music/${id.value}`)
    subMusic.value = response.data
  }
  catch (err) {
    console.log(err)
  }
}

const subPerformer = ref([]);
const getSubPerformer = async () => {
  try {
    const response = await axios.get(`/api/subscribes-performer/${id.value}`)
    subPerformer.value = response.data;
    console.log(subPerformer.value)
  }
  catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  await fetchUser()
  await getMusicByUser()
  await getSubPerformer()
})
</script>

<template>
  <div class="profile">
    <div class="subscribers">
      <h2>{{ data.count_follower }}</h2>
      <h3>подписчиков</h3>
    </div>
    <div class="name">
      <img :src="data.profile_picture" alt="photoProfile">
      <h1>{{ data.name }}</h1>
    </div>
    <div class="exit" @click="exitFromAccount">
      <img src="../assets/exitAccount.png" alt="exit">
      <h3>выход</h3>
    </div>
  </div>
  <div class="favourites">
    <div class="favouritesAlbums">
      <div class="header">
        <h4>Любимые альбомы</h4>
      </div>
      <div class="items">
<!--        <FavouriteAlbum />-->
      </div>
    </div>
    <div class="favouritesPerformances">
      <div class="header">
        <h4>Любимые исполнители</h4>
      </div>
      <div class="items">
        <FavouritePerfomance v-if="subPerformer.length > 0" v-for="item in subPerformer" :key="item.id" :id-performer="item.iduser"
                             :name-performer="item.name" :photo-performer="item.profile_picture"
        />
        <div class="item" v-else style="height: 50px;">
          <h4>Подписок нет</h4>
        </div>
      </div>
    </div>
  </div>
  <div class="favouritesComposition">
    <div class="header">
      <h4>Любимые композиции</h4>
    </div>
    <div class="items">
      <FavouriteComposition v-for="item in subMusic" :key="item.id"
                            :title="item.name_music"
                            :id-music="item.id"
                            :album-cover="item.album_cover"
                            :duration="item.duration_music"
      />
    </div>
  </div>
</template>

<style scoped>
p,
h1,
h2,
h3,
h4,
h5,
img{
  color: #fff;
}

.infoSong h5 {
  font-weight: normal;
}

.profile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #202026;
  padding: 20px 12px 12px 20px;
  margin-top: 8%;
  border-radius: 12px;
}

.subscribers,
.name,
.exit {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.exit {
  margin-right: 24px;
  cursor: pointer;
}

.exit img {
  width: 40px;
  height: 40px;
}

.name img {
  margin-top: -25%;
  width: 245px;
  height: 208px;
  border-radius: 32px;
  margin-bottom: 12px;
}

.favourites {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
}

.favouritesAlbums {
  width: 60%;
}

.favouritesAlbums,
.favouritesPerformances {
  display: flex;
  flex-direction: column;
  background-color: #202026;
  padding: 20px 12px 12px 20px;
  margin-top: 20px;
  border-radius: 12px;
}

.favouritesComposition {
  display: flex;
  flex-direction: column;
  background-color: #202026;
  padding: 20px 12px 12px 20px;
  margin-top: 20px;
  border-radius: 12px;
}

.favouritesComposition .items {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}

.favouritesAlbums .items {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 32px;
}

.items {
  display: grid;
  grid-template-columns: 1fr;
}

.item {
  display: flex;
  gap: 32px;
  align-items: center;
}

.favouritesAlbums .header,
.favouritesPerformances .header,
.favouritesComposition .header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}

.favouritesPerformances {
  width: 45%;
}

.header a {
  color: #919191;
  font-size: 12px;
}
</style>