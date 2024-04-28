<script setup>
import {inject} from "vue";
const {closeListSongs} = inject('musicPlayer')
</script>

<template>
  <div class="listSongs">
    <div class="header">
      <h4>Название плейлиста</h4>
      <box-icon name='chevron-right' type='solid' color='#ffffff' style="cursor: pointer" @click="closeListSongs()"></box-icon>
    </div>
    <div class="items">
      <div class="item">
        <img src="../../assets/song-1.png" alt="albumCover">
        <p>Название музыки</p>
        <p>3:45</p>
        <box-icon name='right-arrow' class="playMusic" type='solid' color='#ffffff' style="cursor: pointer"></box-icon>
        <box-icon name='plus-square' type='solid' class="addMusicToFavourite" color='#ffffff' style="cursor: pointer"></box-icon>
      </div>
    </div>
  </div>
  <div class="blackout">

  </div>
</template>

<style scoped>
.listSongs {
  padding: 15px;
  width: 325px;
  background-color: #17171c;
  position: absolute;
  left: 10%;
  height: 60vh;
}

.listSongs .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.listSongs .items {
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;
}

.listSongs .items .item {
  display: flex;
  align-items: center;
  gap: 22px;
  justify-content: center;
  margin-bottom: 10px;
}

.listSongs .items .item img {
  width: 50px;
  height: 50px;
}

.listSongs .items .item p {
  font-size: 14px;
}

.blackout {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.45);
  width: 36px;
  height: 60vh;
}
</style>