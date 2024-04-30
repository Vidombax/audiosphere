<script setup>

import FavouriteSong from "@/components/favourite/FavouriteSong.vue";

document.title = 'AudioSphere | Название плейлиста'
</script>

<template>
  <div class="containerPlaylist">
    <div class="playlist">
      <img src="../assets/defaultPlaylistPhoto.png" alt="playlistImg">
      <div class="infoPlaylist">
        <h1>Название плейлиста</h1>
        <div class="buttons">
          <button>Слушать</button>
          <p>20 треков</p>
        </div>
      </div>
    </div>
    <div class="listSongs">
      <FavouriteSong />
      <FavouriteSong />
      <FavouriteSong />
      <FavouriteSong />
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