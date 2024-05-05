<script setup>
import {ref, provide, inject} from "vue";
import ListSongs from "@/components/main/ListSongs.vue";

defineProps({
  title: String,
  author: String,
  albumCover: String,
  albumName: String
})

const listSongsOpen = ref(false)

const {stopMusic, playMusic, pastComposition, nextComposition, isPlaying} = inject('app')

const openListSongs = () => {
  listSongsOpen.value = true
}

const closeListSongs = () => {
  listSongsOpen.value = false
}

provide('musicPlayer', {
  closeListSongs,
  listSongsOpen
})
</script>

<template>
  <div class="music-player">
    <ListSongs v-if="listSongsOpen"/>
    <div class="top-section">
      <div class="header">
        <h5>Плеер</h5>
        <box-icon name='playlist' type='solid' color='#ffffff' style="cursor: pointer;" @click="openListSongs()"></box-icon>
      </div>
      <div class="song-info">
        <img :src="albumCover">
        <div class="description">
          <h3>{{ title }}</h3>
          <h5><a href="">{{ author }}</a></h5>
          <a href="">{{ albumName }}</a>
        </div>
      </div>
    </div>

    <div class="player-actions">
      <div class="progress">
        <!--    TODO: добавить прогресс бар который будет показывать сколько прошло и сколь осталось    -->
      </div>
      <div class="buttons">
        <box-icon name='repeat' color='#ffffff' style="cursor: pointer;"></box-icon>
        <box-icon name='first-page' @click="pastComposition" color='#ffffff' style="cursor: pointer;"></box-icon>
        <box-icon name='play-circle' @click="playMusic" v-if="isPlaying" color='#ffffff' style="cursor: pointer;"></box-icon>
        <box-icon name='pause-circle' @click="stopMusic" v-else color='#ffffff' style="cursor: pointer"></box-icon>
        <box-icon name='last-page' @click="nextComposition" color='#ffffff' style="cursor: pointer;"></box-icon>
        <box-icon name='shuffle' color="#ffffff" style="cursor: pointer;"></box-icon>
      </div>
      <div class="volumeChange">
        <!--   TODO: сделать настройку громкости     -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.container .right-section .music-player{
  color: #fff;
  background-color: #202026;
  border-radius: 6px;
  height: 70%;
  flex-direction: column;
  position: fixed;
}

.container .right-section .music-player .top-section{
  padding: 20px;
  height: 86%;
}

.container .right-section .music-player .header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}

.container .right-section .music-player .song-info{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
}

.container .right-section .music-player .song-info img{
  width: 280px;
  height: 220px;
}

.container .right-section .music-player .description{
  margin-bottom: 12px;
}

.container .right-section .music-player .description h3{
  font-size: 34px;
  font-weight: 500;
  margin-bottom: 8px;
}

.container .right-section .music-player .description h5 a{
  transition: .3s linear;
  font-size: 28px;
  margin-bottom: 8px;
  color: #fff;
  font-weight: normal;
}

.container .right-section .music-player .description h5 a:hover {
  color: #5773ff;
}

.container .right-section .music-player .description a{
  color: #919191;
  font-size: 14px;
  font-weight: bold;
  transition: .3s linear;
}

.container .right-section .music-player .description a:hover {
  color: #5773ff;
}

.container .right-section .music-player .player-actions{
  background-color: #5773ff;
  height: 26%;
  margin-top: 10px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  justify-content: center;
}

.container .right-section .music-player .player-actions .buttons{
  display: flex;
  align-items: center;
  gap: 30px;
}

.container .right-section .music-player .player-actions .buttons box-icon{
  font-size: 36px;
}

.container .right-section .music-player .player-actions .buttons .play-button{
  padding: 16px;
  background-color: #fff;
  color: #5773ff;
  border-radius: 18px;
}

.container .right-section .music-player .player-actions .lyrics{
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 8px;
}

@media screen and (max-width: 1540px) {
  .music-player {
    margin-left: 5px;
    width: 350px;
    display: flex;
  }
}

@media screen and (max-width: 1250px) {
  .music-player {
    display: none;
  }
}
</style>
