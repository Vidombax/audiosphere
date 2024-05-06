<script setup>
import {ref, provide, onUnmounted, onMounted} from "vue";
import axios from "axios";

import MusicPlayer from "@/components/musicPlayer.vue";
import Sidebar from "@/components/Sidebar.vue";
import Profile from "@/components/Profile.vue";
import Header from "@/components/Header.vue";

const visibleComponent = ref(true)
let index = 0
const isPlaying = ref(true)
const music = ref([])
let audio = new Audio()
const volume = ref(1)

const allTimeMusic = ref(200)
const currentTime = ref(0)

const openApp = () => {
  visibleComponent.value = true
}

const closeApp = () => {
  visibleComponent.value = false
}

const title = ref('-')
const author = ref('-')
const albumCover = ref('/defaultPlaylistPhoto.png')
const albumName = ref('')
const durationMusic = ref('00:00')


function playerInformation(index) {
  title.value = music.value[index].name_music;
  author.value = music.value[index].name;
  albumCover.value = music.value[index].album_cover;
  albumName.value = music.value[index].name_album;
  durationMusic.value = music.value[index].duration_music

  allTimeMusic.value = Math.floor(audio.duration) * 2
}

function increaseVariable(currentTime) {

  const intervalId = setInterval(() => {
    currentTime.value++;

    if (currentTime.value === allTimeMusic.value) {
      clearInterval(intervalId);
    }
  }, 1000);
}


const playMusic = async () => {
  try {
    audio.pause()
    isPlaying.value = false
    await audio.play()
  }
  catch (err) {
    console.error(err)
  }
}

const stopMusic = () => {
  isPlaying.value = true
  audio.pause()
}

const pastComposition = () => {
  if (index !== 0) {
    index--
    playerInformation(index);
    audio.pause()

    audio = new Audio(music.value[index].file_path_music);
    audio.volume = volume.value
    audio.play()
    audio.onended = () => endTrack()
  }
}

const nextComposition = () => {
  if (index !== music.value.length - 1) {
    index++
    playerInformation(index);
    audio.pause()

    audio = new Audio(music.value[index].file_path_music);
    audio.volume = volume.value
    audio.play()
    audio.onended = () => endTrack()
  }
}

const endTrack = async  () => {
  if (index < music.value.length - 1) {
    audio.pause()
    allTimeMusic.value = 0
    currentTime.value = 0

    index++
    playerInformation(index);

    increaseVariable(currentTime)
    audio = new Audio(music.value[index].file_path_music);
    audio.volume = volume.value
    isPlaying.value = false;

    await audio.play();
    audio.onended = () => endTrack()
  }
  else {
    isPlaying.value = true
  }
}

const loopMusic = () => {
  if (audio.loop === false) {
    audio.loop = true
    audio.onended = () => console.log('включен цикл')
  }
  else {
    audio.loop = false
    audio.onended = () => endTrack()
  }
}

const volumeChanged = (newVolume) => {
  audio.volume = newVolume / 100;
  volume.value = audio.volume = newVolume / 100
}

const url = ref('')

const addToPlayerMusic = async (id, urlApi) => {
  try {
    audio.pause()

    const response = await axios.get(urlApi);
    url.value = urlApi
    music.value = response.data;

    index = music.value.findIndex(item => item.id === id)

    if (index !== -1) {
      currentTime.value = 0
      allTimeMusic.value = 0
      playerInformation(index);

      increaseVariable(currentTime)
      audio = new Audio(music.value[index].file_path_music);
      isPlaying.value = false;

      audio.volume = volume.value
      await audio.play();
      audio.onended = () => endTrack()
    }
  } catch (err) {
    console.error(err);
  }
};

const addMusicToList = async () => {
  try {
    return {
      music: music.value,
      url: url.value
    }
  }
  catch (err) {
    console.error(err)
  }
}

provide('app', {
  closeApp,
  openApp,
  addToPlayerMusic,
  stopMusic,
  playMusic,
  pastComposition,
  nextComposition,
  addMusicToList,
  loopMusic,
  music,
  isPlaying
})
</script>

<template>
  <div class="container" v-if="visibleComponent">
    <Sidebar />
    <main>
      <Header />
      <router-view></router-view>
    </main>
    <div class="right-section">
      <Profile />
      <MusicPlayer
          :all-time-music="allTimeMusic"
          :current-time="currentTime"
          :title="title" :author="author"
          :album-cover="albumCover" :album-name="albumName"
          :duration-music="durationMusic"
          @volume-change="volumeChanged"/>
    </div>
  </div>
  <div class="containerRegistration" v-else>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style>
img{
  object-fit: cover;
  object-position: top;
  border-radius: 8px;
}

.container main{
  padding: 20px 36px;
  margin-left: 65px;
}

.container .right-section{
  padding: 20px 36px 20px 0;
}

.container .sidebar .logo button{
  display: none;
  align-items: center;
  justify-content: center;
  background-color: #1d1d1d;
  border: 1px solid #464748;
  font-size: 20px;
  padding: 4px;
  border-radius: 8px;
  cursor: pointer;
}

.containerRegistration {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 1540px) {
  .container main {
    margin-left: 20px;
  }
}

@media screen and (max-width: 1250px) {
  .container main {
    margin-left: 25%;
  }
}

@media screen and (max-width: 950px) {
  .container main {
    margin-left: 30%;
    width: 95%;
  }
  .right-section {
    width: 320px;
  }
}

@media screen and (max-width: 850px) {
  .right-section {
    width: 220px;
  }
}

@media screen and (max-width: 750px) {
  .right-section {
    width: 120px;
  }
}

@media screen and (max-width: 700px) {
  .container main {
    margin-left: 22%;
    width: 95%;
  }
}

@media screen and (max-width: 650px) {
  .container main {
    margin-left: 0;
  }
  .right-section {
    position: relative;
    left: -20%;
    width: 50px;
  }
}
</style>
