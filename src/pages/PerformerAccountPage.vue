<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import { useRoute } from 'vue-router'

import FavouriteAlbum from "@/components/account/FavouriteAlbum.vue";
import FavouriteSong from "@/components/favourite/FavouriteSong.vue";

const route = useRoute()

const id = ref(Number(route.params.id))

const data = ref([])
const performerMusic = ref([])
const performerAlbums = ref([])
const isAdded = ref(true)

const fetchPerformer = async () => {
  try {
    const response = await axios.get(`/api/user/${id.value}`)
    data.value = response.data
    document.title = 'AudioSphere | ' + response.data.name[0].toUpperCase() + response.data.name.slice(1)
  }
  catch (err) {
    console.log(err)
  }
}

const countFollower = ref(0)
const fetchSubscribes = async () => {
  try {
    const response = await axios.get(`/api/follower-count/${id.value}`);
    countFollower.value = response.data
  }
  catch (err) {
    console.error(err)
  }
}

const url = ref(``)

const getMusicByPerformer = async () => {
  try {
    url.value = `/api/music-performer/${id.value}`
    const response = await axios.get(url.value)
    performerMusic.value = response.data
  }
  catch (err) {
    console.log(err)
  }
}

const getSubscribe = async () => {
  try {
    const idUser = ref(Number(localStorage.getItem('id')) || 0)
    const idPerformer = ref(Number(data.value.iduser))
    const response = await axios.get(`/api/subscribe-performer/${idUser.value}/${idPerformer.value}`)
    if (response.data.length > 0) {
      isAdded.value = false
    }
  }
  catch (err) {
    console.error(err)
  }
}

const getAlbumsByPerformer = async () => {
  try {
    const response = await axios.get(`/api/albums-performer/${id.value}`)
    performerAlbums.value = response.data
  }
  catch (err) {
    console.error(err)
  }
}

const subscribesToPerformer = async (idPerformer) => {
  try {
    const idUser = ref(Number(localStorage.getItem('id')) || 0)
    if (idUser.value !== 0) {
      await axios.post(`/api/sub-performer`, {
        idUser: idUser.value,
        idPerformer: idPerformer
      })
    }
    else {
      console.log('Пользователь не зарегистрирован')
    }
  }
  catch (err) {
    console.error(err)
  }
}

const unsubscribesToPerformer = async (idPerformer) => {
  try {
    const idUser = ref(Number(localStorage.getItem('id')) || 0)
    if (idUser.value !== 0) {
      await axios.delete(`/api/unsub-performer/${idUser.value}/${idPerformer}`)
    }
    else {
      console.log('Пользователь не зарегистрирован')
    }
  }
  catch (err) {
    console.error(err)
  }
}

const subClick = async () => {
  isAdded.value = false
  await subscribesToPerformer(data.value.iduser)
}

const unsubClick = async () => {
  isAdded.value = true;
  await unsubscribesToPerformer(data.value.iduser)
}

onMounted(async () => {
  await fetchPerformer()
  await fetchSubscribes()
  await getSubscribe()
  await getMusicByPerformer()
  await getAlbumsByPerformer()
})
</script>

<template>
  <div class="profile">
    <div class="subscribers">
      <h2>{{ countFollower.count }}</h2>
      <h3 v-if="countFollower.count !== 5">подписчик(-а)</h3>
      <h3 v-else>подписчиков</h3>
    </div>
    <div class="name">
      <img :src="data.profile_picture" alt="photoProfile">
      <h1>{{ data.name }}</h1>
    </div>
    <div class="exit">
        <box-icon name='plus' color='#ffffff' style="cursor: pointer" v-if="isAdded" @click="subClick"></box-icon>
        <box-icon name='heart' type='solid' v-else color='#ffffff' @click="unsubClick"></box-icon>
        <h3 v-if="isAdded">подписаться</h3>
        <h3 v-else>отписаться</h3>
    </div>
  </div>
  <div class="favouritesAlbums">
    <div class="header">
      <h4>Альбомы исполнителя</h4>
    </div>
    <div class="items">
      <FavouriteAlbum v-for="item in performerAlbums" :key="item.id"
                      :album-cover="item.album_cover" :id-album="item.id_album"
                      :name-album="item.name_album" :name-author="item.name"
      />
    </div>
  </div>
  <div class="favouritesComposition">
    <div class="header">
      <h4>Композиции автора</h4>
    </div>
    <div class="items">
      <FavouriteSong v-for="item in performerMusic" :key="item.id"
                     :name-song="item.name_music" :id-music="item.id"
                     :album-cover="item.album_cover" :duration-music="item.duration_music"
                     :url-api="url"
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

.subscribers {
  margin-left: 24px;
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
  height: 245px;
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
  width: 100%;
}

.favouritesAlbums {
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
  grid-template-columns: 1fr;
  gap: 12px;
}

.favouritesAlbums .items {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}

.items {
  display: grid;
  grid-template-columns: 1fr;
}

.favouritesAlbums .items .item {
  display: grid;
  gap: 24px;
  grid-template-columns: 50px 130px 50px;
  align-items: center;
}

.favouritesComposition .items .item {
  display: grid;
  gap: 24px;
  grid-template-columns: 50px 140px 30px 50px 40px;
  align-items: center;
}

.favouritesAlbums .header,
.favouritesComposition .header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}

.header a {
  color: #919191;
  font-size: 12px;
}
</style>