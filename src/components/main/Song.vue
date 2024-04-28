<script setup>

</script>

<template>
  <div class="song">
    <div class="imgPlay">
      <img src="../../assets/song-3.png" class="albumImg" alt="AlbumCover">
      <img src="../../assets/playOnImage.png" class="playMusic" style="cursor: pointer">
    </div>
    <div class="songInfo">
      <p>Название песни</p>
      <p><a href="">Имя автора</a></p>
    </div>
    <p class="timeSong">00:00</p>
  </div>
</template>

<style scoped>
.song {
  display: flex;
  gap: 24px;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
}

.song:last-child {
  margin-bottom: 4px;
}

.song img {
  width: 50px;
  height: 50px;
}

.imgPlay {
  position: relative;
  transition: .1s linear;
  border-radius: 9px;
  height: 50px;
}

.imgPlay:hover {
  background-color: #000000;
}

.imgPlay:hover .playMusic {
  opacity: 1;
}

.imgPlay:hover .albumImg {
  opacity: 0.6;
}

.playMusic {
  position: absolute;
  transition: .1s linear;
  opacity: 0;
  left: 3px;
}

.songInfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.songInfo p {
  color: #cfcccc;
}

.songInfo p a {
  color: #696977;
  transition: .2s linear;
  font-size: small;
}

.songInfo p a:hover {
  color: #5773ff;
}

.timeSong {
  color: #cfcccc;
  font-size: small;
  font-weight: bold;
}
</style>