<script setup>
  import {inject, ref} from "vue";

  const props = defineProps({
    idMusic: Number,
    nameSong: String,
    namePerformance: String,
    durationSong: String,
    idPlaylist: Number,
    idPerformer: String,
  })

  const {addToPlayerMusic} = inject('app');
  const urlApi = ref(`/api/music-album/${props.idPlaylist}`);
  const urlPerformer = ref(`/performer/${props.idPerformer}`);

  const handleClick = async () => {
    await addToPlayerMusic(props.idMusic, urlApi.value);
  }
</script>

<template>
  <div class="song">
    <div class="songInfo">
      <p>{{ nameSong }}</p>
      <p><router-link :to="urlPerformer">{{ namePerformance }}</router-link></p>
    </div>
    <p class="timeSong">{{ durationSong }}</p>
    <div class="icon">
      <box-icon name='right-arrow' class="playMusic" type='solid' color='#ffffff' @click="handleClick"></box-icon>
    </div>
  </div>
</template>

<style scoped>
.song {
  display: grid;
  grid-template-columns: 250px 50px 50px;
  align-items: center;
  margin-bottom: 16px;
}

.song:last-child {
  margin-bottom: 4px;
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

.icon{
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #32323d;
  padding: 6px;
  border: 2px solid #464748;
  border-radius: 6px;
}

@media screen and (max-width: 1250px) {
  .song {
    grid-template-columns: 100px 40px 35px;
  }
}
</style>