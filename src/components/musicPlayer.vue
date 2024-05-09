<script setup>
import {ref, provide, inject, defineEmits, onMounted} from "vue";
import ListSongs from "@/components/main/ListSongs.vue";

const props = defineProps({
  title: String,
  author: String,
  albumCover: String,
  albumName: String,
  currentTime: Number,
  allTimeMusic: Number,
  durationMusic: String,
  idMusic: Number,
  isAdded: Boolean,
  idPerformer: Number,
  urlPerformer: String,
})

const listSongsOpen = ref(false)
const isLooping = ref(true)

const {stopMusic, playMusic, pastComposition, nextComposition, loopMusic,
  volumeChanged, isPlaying, addToFavouriteClick, removeFromFavouriteClick} = inject('app')

const volume = ref(100)

const emit = defineEmits(['volume-change'])

const handleVolumeChange = () => {
  emit('volume-change', volume.value);
}

const openListSongs = () => {
  listSongsOpen.value = true
}

const closeListSongs = () => {
  listSongsOpen.value = false
}

const loopMusicBtn = () => {
  isLooping.value = isLooping.value !== true;
}

const handlerLoop = async () => {
  loopMusicBtn()
  await loopMusic()
}

provide('musicPlayer', {
  closeListSongs,
  listSongsOpen
})
</script>

<template>
  <div class="music-player">
    <p hidden>{{ idPerformer }}</p>
    <p hidden>{{ idMusic }}</p>
    <ListSongs v-if="listSongsOpen"/>
    <div class="top-section">
      <div class="header">
        <h5>Плеер</h5>
        <box-icon name='playlist' type='solid' color='#ffffff' style="cursor: pointer;" @click="openListSongs()"></box-icon>
      </div>
      <div class="song-info">
        <img :src="albumCover">
        <div class="description">
          <h4>{{ title }}</h4>
          <h5><router-link :to="urlPerformer">{{ author }}</router-link></h5>
          <a href="">{{ albumName }}</a>
        </div>
      </div>
      <div class="progress">
        <p>00:00</p>
        <input type="range" :value="currentTime" :max="allTimeMusic">
        <p>{{ durationMusic }}</p>
      </div>
    </div>

    <div class="player-actions">
      <div class="buttons">
        <box-icon name='repeat' v-if="isLooping" color='#ffffff' style="cursor: pointer;" @click="handlerLoop"></box-icon>
        <box-icon name='repeat' v-else color='#1c3bd5' style="cursor: pointer;" @click="handlerLoop"></box-icon>
        <box-icon name='first-page' @click="pastComposition" color='#ffffff' style="cursor: pointer;"></box-icon>
        <box-icon name='play-circle' @click="playMusic" v-if="isPlaying" color='#ffffff' style="cursor: pointer;"></box-icon>
        <box-icon name='pause-circle' @click="stopMusic" v-else color='#ffffff' style="cursor: pointer"></box-icon>
        <box-icon name='last-page' @click="nextComposition" color='#ffffff' style="cursor: pointer;"></box-icon>
        <box-icon name='plus' color='#ffffff' style="cursor: pointer" v-if="isAdded" @click="addToFavouriteClick(idMusic)"></box-icon>
        <box-icon name='heart' type='solid' v-else color='#ffffff' @click="removeFromFavouriteClick(idMusic)"></box-icon>
      </div>
      <div class="volumeChange">
        <box-icon name='volume-low' color='#ffffff' ></box-icon>
        <input type="range" value="100" v-model="volume" @input="handleVolumeChange">
        <box-icon name='volume-full' color='#ffffff' ></box-icon>
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
  width: 200px;
  height: 200px;
}

.container .right-section .music-player .description{
  margin-bottom: 12px;
}

.container .right-section .music-player .description h4{
  font-size: 30px;
  font-weight: 500;
}

.container .right-section .music-player .description h5 a{
  transition: .3s linear;
  font-size: 28px;
  margin-bottom: 8px;
  color: #fff;
  font-weight: 500;
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

.volumeChange {
  display: flex;
  gap: 12px;
  margin-top: 2rem;
  align-items: center;
  justify-content: center;
}

.progress {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
}

input[type="range"]:nth-child(1) {
  width: 40%;
}

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 8px;
  background-color: #ccc;
  border-radius: 4px;
  outline: none;
  margin: 0;
  padding: 0;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
}

input[type="range"]::-ms-thumb {
  width: 16px;
  height: 16px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
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
