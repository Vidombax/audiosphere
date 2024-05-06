<script setup>
import {inject, onMounted, ref} from "vue";
import axios from "axios";

import FavouriteSong from "@/components/favourite/FavouriteSong.vue";

document.title = 'AudioSphere | Любимые'

const id = ref(Number(localStorage.getItem('id')))
const numberSong = 1
const music = ref([])

const url = ref(`/api/subscribe-music/${id.value}`)

const fetchSubscribeMusic = async () => {
  try {
    const response = await axios.get(url.value)
    music.value = response.data
  }
  catch (err) {
    console.log(err)
  }
}

const {addToPlayerMusic} = inject('app')

const handleClick = async () => {
  await addToPlayerMusic(music.value[0].id, url.value)
}

onMounted(async () => {
  await fetchSubscribeMusic()
})
</script>

<template>
  <div class="containerPlaylist">
    <div class="playlist">
      <img src="../assets/favouritesPlaylist.png" alt="playlistImg">
      <div class="infoPlaylist">
        <h1>Любимые треки</h1>
        <div class="buttons">
          <button @click="handleClick">Слушать</button>
          <p>{{ music.length }} трек(ов)</p>
        </div>
      </div>
    </div>
    <div class="listSongs">
      <FavouriteSong v-for="item in music" :key="item.id"
                     :id-music="item.id"
                     :number-song="numberSong++"
                     :album-cover="item.album_cover"
                     :name-song="item.name_music"
                     :name-performer="item.name"
                     :duration-music="item.duration_music"
                     :url-api="url"
      />
    </div>
  </div>
</template>

<style scoped>
h1,
h3,
p {
  color: #fff;
}

.containerPlaylist {
  display: flex;
  margin-top: 3rem;
  flex-direction: column;
}

.playlist {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.playlist img {
  width: 150px;
  height: 150px;
}

.infoPlaylist {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 1rem;
}

.buttons{
  display: flex;
  align-items: center;
  gap: 24px;
}

.buttons p {
  font-size: smaller;
}

button{
  padding: 14px;
  background-color: #5773ff;
  border: none;
  border-radius: 14px;
  color: #fff;
  font-size: larger;
  font-weight: bold;
  cursor: pointer;
}

.listSongs {
  display: grid;
  gap: 22px;
  grid-template-columns: 1fr;
  background-color: #202026;
  padding: 20px 12px 12px 20px;
  margin-top: 20px;
  border-radius: 12px;
}
</style>