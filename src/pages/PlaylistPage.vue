<script setup>
import {useRoute} from "vue-router";
import {inject, onMounted, ref} from "vue";

import PlaylistSong from "@/components/playlist/PlaylistSong.vue";
import axios from "axios";

const route = useRoute();

const id = ref(route.params.id);
const namePlaylist = ref('');
const urlApi = ref(``);
const dataArray = ref([]);
const photoPlaylist = ref('/defaultPlaylistPhoto.png');
const index = 1;

if (id.value === 'top-songs') {
  document.title = 'AudioSphere | Популярные песни';
  namePlaylist.value = 'Популярные песни';
  urlApi.value = `/api/popular-music-player`;
}

const getPlaylist = async () => {
  try {
    const response = await axios.get(`/api/album/${id.value}`);

    document.title = `AudioSphere | ${response.data.name_album}`;
    namePlaylist.value = response.data.name_album;
    urlApi.value = `/api/music-album/${id.value}`;
    photoPlaylist.value = response.data.album_cover;
  }
  catch (err) {
    console.error(err)
  }
}

const getMusic = async () => {
  try {
    const response = await axios.get(urlApi.value);
    dataArray.value = response.data;
    console.log(dataArray.value)
  }
  catch (err) {
    console.log(err);
  }
}

const {addToPlayerMusic} = inject('app')

const handleClick = async () => {
  await addToPlayerMusic(dataArray.value[0].id, urlApi.value)
}

onMounted(async () => {
  if (id.value !== 'top-songs') {
    await getPlaylist()
    await getMusic()
  }
  else {
    await getMusic()
  }
})
</script>

<template>
  <div class="containerPlaylist">
    <div class="playlist">
      <img :src="photoPlaylist" alt="playlistImg">
      <div class="infoPlaylist">
        <h1>{{ namePlaylist }}</h1>
        <div class="buttons">
          <button @click="handleClick">Слушать</button>
          <p>{{ dataArray.length }} треков</p>
        </div>
      </div>
    </div>
    <div class="listSongs">
      <PlaylistSong v-for="item in dataArray" :key="item.id"
                    :duration-music="item.duration_music" :name-song="item.name_music"
                    :id-music="item.id" :album-cover="item.album_cover"
                    :name-performer="item.name" :url-api="urlApi" :number-song="index++"
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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 22px;
  flex-direction: column;
  background-color: #202026;
  padding: 20px 12px 12px 20px;
  margin-top: 20px;
  border-radius: 12px;
}
</style>