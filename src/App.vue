<script setup>
import {ref, provide, onMounted} from "vue";
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

const allTimeMusic = ref(250)
const currentTime = ref(0)

const openApp = () => {
  visibleComponent.value = true
}

const checkAdminPage = async () => {
  if (location.href === 'http://localhost:5173/admin') {
    visibleComponent.value = false
  }
  else {
    visibleComponent.value = true
  }
}

const closeApp = () => {
  visibleComponent.value = false
}

const title = ref('-')
const author = ref('-')
const albumCover = ref('/defaultPlaylistPhoto.png')
const albumName = ref('')
const durationMusic = ref('00:00')
const idMusic = ref(0)
const idPerformer = ref(0)
const urlPerformer = ref(``)


function playerInformation(index) {
  if (index !== -2) {
    title.value = music.value[index].name_music;
    author.value = music.value[index].name;
    albumCover.value = music.value[index].album_cover;
    albumName.value = music.value[index].name_album;
    durationMusic.value = music.value[index].duration_music;
    idMusic.value = music.value[index].id;
    idPerformer.value = music.value[index].id_performance;
    if (idPerformer.value === undefined) {
      idPerformer.value = music.value[index].iduser;
    }
    urlPerformer.value = `/performer/${idPerformer.value}`;
  }
  else {
    title.value = music.value.name_music;
    author.value = music.value.name;
    albumCover.value = music.value.album_cover;
    albumName.value = music.value.name_album;
    durationMusic.value = music.value.duration_music;
    idMusic.value = music.value.id;
    idPerformer.value = music.value.id_performance;
    if (idPerformer.value === undefined) {
      idPerformer.value = music.value.iduser;
    }
    urlPerformer.value = `/performer/${idPerformer.value}`;
  }

  allTimeMusic.value = audio.duration;
}

let intervalId = ref()

function increaseVariable(currentTime) {
  clearInterval(intervalId);

  intervalId = setInterval(() => {
    currentTime.value++;
    if (currentTime.value === Math.round(audio.duration)) {
      setTimeout(() => {
        clearInterval(intervalId)

      })
    }
  }, 1000);
}


const playMusic = async () => {
  try {
    audio.pause()
    isPlaying.value = false
    await audio.play()
    increaseVariable({ value: Math.round(audio.currentTime) })
  }
  catch (err) {
    console.error(err)
  }
}

const stopMusic = () => {
  isPlaying.value = true
  audio.pause()
  clearInterval(intervalId)
}

const pastComposition = () => {
  if (index !== 0) {
    index--
    playerInformation(index);
    checkFavourite()
    audio.pause()

    audio = new Audio(music.value[index].file_path_music);
    audio.volume = volume.value
    isPlaying.value = false
    audio.play()
    audio.onended = () => endTrack()
  }
}

const nextComposition = () => {
  if (index !== music.value.length - 1) {
    index++
    playerInformation(index);
    checkFavourite()
    audio.pause()

    audio = new Audio(music.value[index].file_path_music);
    audio.volume = volume.value
    isPlaying.value = false
    audio.play()
    audio.onended = () => endTrack()
  }
}

const endTrack = async  () => {
  const id = ref(music.value[index].id)
  const auditions = ref(music.value[index].count_auditions + 1)
  await axios.put('/api/music-auditions', {
    id: id.value,
    newCount: auditions.value
  })
  if (index < music.value.length - 1) {
    audio.pause()
    audio.currentTime = 0
    allTimeMusic.value = 0

    index++
    playerInformation(index);
    await checkFavourite()

    audio = new Audio(music.value[index].file_path_music);
    audio.volume = volume.value
    isPlaying.value = false;

    audio.onloadedmetadata = () => {

      audio.currentTime = 0;
      currentTime.value = audio.currentTime
      allTimeMusic.value = Math.round(audio.duration)

      increaseVariable(currentTime);

      audio.play();
    };

    audio.onended = () => endTrack()
  }
  else {
    isPlaying.value = true
  }
}

const changeAudioTime = (audioTime) => {
  currentTime.value = audioTime;
  audio.currentTime = audioTime;
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

    if (music.value.length >= 1) {
      index = music.value.findIndex(item => item.id === id)

      if (index !== -1) {
        await checkFavourite()

        currentTime.value = 0
        allTimeMusic.value = 0
        playerInformation(index);

        audio = new Audio(music.value[index].file_path_music);

        audio.currentTime = 0;

        audio.onloadedmetadata = () => {

          audio.currentTime = 0;
          currentTime.value = audio.currentTime
          allTimeMusic.value = Math.round(audio.duration)
          increaseVariable(currentTime);

          audio.play();
        };

        isPlaying.value = false;

        audio.volume = volume.value

        audio.onended = () => endTrack()
      }
    }
    else {
      index = -2
      currentTime.value = 0
      allTimeMusic.value = 0
      playerInformation(index);

      increaseVariable(currentTime)

      audio = new Audio(music.value.file_path_music);
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

const isAdded = ref(true)
const favMusic = ref([])

const checkFavourite = async () => {
  try {
    const idUser = ref(Number(localStorage.getItem('id')) || 0)
    if (idUser.value !== 0) {
      const response = await axios.get(`/api/subscribe-music/${idUser.value}`)
      favMusic.value = response.data

      let indexFav = ref(0)
      if (favMusic.value.length >= 1) {
        indexFav = favMusic.value.findIndex(item => item.id === music.value[index].id)
        if (indexFav !== -1) {
          isAdded.value = false
        }
        else {
          isAdded.value = true
        }
      }
    }
    else {
      console.log('Пользователь не зарегистрирован')
    }
  }
  catch (err) {
    console.error(err)
  }
}

const addToFavouriteClick = async (idMusic) => {
  isAdded.value = false
  await addToFavourite(idMusic)

}

const removeFromFavouriteClick = async (idMusic) => {
  isAdded.value = true
  await removeFromFavourite(idMusic)
}

const addToFavourite = async (idMusic) => {
  try {
    const idUser = ref(Number(localStorage.getItem('id')) || 0)
    if (idUser.value !== 0) {
      await axios.post(`api/add-favourite`, {
        idUser: idUser.value,
        idMusic: idMusic
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

const removeFromFavourite = async (idMusic) => {
  try {
    const idUser = ref(Number(localStorage.getItem('id')) || 0)
    if (idUser.value !== 0) {
      await axios.delete(`api/del-favourite/${idUser.value}/${idMusic}`)
    }
    else {
      console.log('Пользователь не зарегистрирован')
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
  changeAudioTime,
  intervalId,
  addMusicToList,
  loopMusic,
  music,
  isPlaying,
  addToFavourite,
  removeFromFavourite,
  addToFavouriteClick,
  removeFromFavouriteClick,
})

onMounted(async () => {
  await checkAdminPage()
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
          @volume-change="volumeChanged"
          :id-music="idMusic"
          :is-added="isAdded"
          :id-performer="idPerformer"
          :url-performer="urlPerformer"
      />
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
