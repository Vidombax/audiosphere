<script setup>
import {onMounted, ref} from 'vue';
import Song from "@/components/main/Song.vue";
import axios from "axios";

const props = defineProps({
  idPlaylist: Number,
  namePlaylist: String,
  nameUser: String,
  idPerformance: Number,
})

const urlUser = ref(`/performer/${props.idPerformance}`);
const urlPlaylist = ref(`/playlist/${props.idPlaylist}`);
const music = ref([]);

const getMusicByPlaylist = async () => {
  try {
    const response = await axios.get(`api/music-album/${props.idPlaylist}`);
    music.value = response.data;
    music.value.length = 3;
    console.log(music.value)
  }
  catch (err) {
    console.error(err);
  }
}

onMounted(async () => {
  await getMusicByPlaylist();
})
</script>

<template>
  <div class="item">
    <div class="headerItem">
      <router-link :to="urlPlaylist">
        <p>{{ namePlaylist }}</p>
      </router-link>
      <router-link :to="urlUser">
        <p>{{ nameUser }}</p>
      </router-link>
    </div>
    <div class="songs">
      <Song v-for="item in music" :key="item.id"
            :id-music="item.id" :name-song="item.name_music"
            :name-performance="item.name" :duration-song="item.duration_music"
            :id-playlist="idPlaylist" :id-performer="item.id_performance"
      />
    </div>
  </div>
</template>

<style scoped>
.customPlaylists .items .item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 12px;
}

.customPlaylists .items .item {
  border: 2px solid #5773ff;
}

.headerItem {
  display: flex;
  flex-direction: column;
  width: 360px;
  margin-bottom: 20px;
  border-radius: 8px;
  padding: 20px;
  background-color: #5773ff;
}

.headerItem a {
  font-size: large;
  margin-bottom: 5px;
}

.headerItem a p {
  transition: .2s linear;
}

.headerItem a p:hover {
  color: #202026;
}

.songs {
  display: flex;
  flex-direction: column;
  width: 360px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

@media screen and (max-width: 1550px) {
  .customPlaylists .items .item {
    width: 100%;
  }
  .headerItem {
    width: 100%;
  }
}

@media screen and (max-width: 950px) {
  .customPlaylists .items .item:first-child {
    margin-bottom: 12px;
  }
  .customPlaylists .items .item {
    width: 87%;
  }
}
</style>