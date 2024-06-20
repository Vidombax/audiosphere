<script setup>
import {ref, provide, onMounted} from "vue";
import axios from "axios";

import MusicPlayer from "@/components/musicPlayer.vue";
import Sidebar from "@/components/Sidebar.vue";
import Profile from "@/components/Profile.vue";
import Header from "@/components/Header.vue";
import Swal from "sweetalert2";

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
    audio.onloadedmetadata = () => {

      audio.currentTime = 0;
      currentTime.value = audio.currentTime
      allTimeMusic.value = Math.round(audio.duration)
      increaseVariable(currentTime);

      audio.play();
    };
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
    audio.onloadedmetadata = () => {

      audio.currentTime = 0;
      currentTime.value = audio.currentTime
      allTimeMusic.value = Math.round(audio.duration)
      increaseVariable(currentTime);

      audio.play();
    };
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
    await addToFavourite(idMusic)
}

const removeFromFavouriteClick = async (idMusic) => {
  isAdded.value = true
  await removeFromFavourite(idMusic)
}

const addToFavourite = async (idMusic) => {
  try {
    const idUser = ref(Number(localStorage.getItem('id')) || 0)
    isAdded.value = false
    if (idUser.value !== 0) {
      await axios.post(`api/add-favourite`, {
        idUser: idUser.value,
        idMusic: idMusic
      })
    }
    else {
      console.log('Пользователь не зарегистрирован');
      Toast.fire({
        icon: "error",
        title: "Авторизируйтесь чтобы добавить трек в избранное!"
      });
    }
  }
  catch (err) {
    console.error(err)
  }
}

const idUser = ref(Number(localStorage.getItem('id')) || 0)
const removeFromFavourite = async (idMusic) => {
  try {
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

const openPlayerAdaptive = () => {
  document.getElementsByClassName('music-player')[0].classList.add('displayPlayer');
  document.getElementsByClassName('player-shortcut')[0].classList.add('player-shortcutClose');
}

const sendReport = async () => {
  try {
    if (idUser.value !== 0 && idMusic.value !== 0) {
      const { value: report } = await Swal.fire({
        title: "Выберите причину жалобы",
        input: "select",
        inputOptions: {
          copyright: "Нарушение авторских прав",
          notMusic: "Аудиофайл не содержит музыки",
          notPlay: "Музыка не воспроизводится",
        },
        inputPlaceholder: "Причины",
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            resolve();
          });
        }
      });

      const response = await axios.post(`api/send-report`, {
        report: report,
        user: idUser.value,
        music: idMusic.value
      });
      Swal.fire("Жалоба отправлена");
    }
    else {
      Toast.fire({
        icon: "error",
        title: "Выберите музыку!"
      });
    }
  }
  catch (err) {
    console.log(err);
  }
}

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

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
  Toast,
  sendReport
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
          :title="title"
          :author="author"
          :album-cover="albumCover"
          :album-name="albumName"
          :duration-music="durationMusic"
          :id-music="idMusic"
          :is-added="isAdded"
          :id-performer="idPerformer"
          :url-performer="urlPerformer"
          @volume-change="volumeChanged"
      />
      <div class="player-shortcut" @click="openPlayerAdaptive">
        <p>Плеер</p>
      </div>
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

.player-shortcut {
  background-color: #5773ff;
  rotate: -90deg;
  position: fixed;
  z-index: 1;
  padding: 8px;
  cursor: pointer;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  right: 0;
  top: 40%;
  margin-right: -31px;
  width: 100px;
}

.player-shortcut p {
  color: #ffffff;
  font-size: large;
  text-align: center;
}

.displayPlayer {
  display: flex !important;
  position: fixed !important;
  right: 0 !important;
  top: 12% !important;
  box-shadow: 1px 5px 5px #919191;
}

.swal2-select {
  position: relative;
  left: 90px;
}

.player-shortcutClose {
  display: none !important;
}

@media screen and (max-width: 1540px) {
  .container main {
    margin-left: 50px;
  }
  .player-shortcut {
    display: none;
  }
}

@media screen and (max-width: 1250px) {
  .container main {
    margin-left: 10%;
  }
  .player-shortcut {
    display: block;
  }
}

@media screen and (max-width: 950px) {
  .container main {
    margin-left: 10%;
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
    position: absolute;
    right: 0;
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
}
</style>
