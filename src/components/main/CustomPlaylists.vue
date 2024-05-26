<script setup>
import {onMounted, ref} from 'vue';
import CustomPlaylist from "@/components/main/CustomPlaylist.vue";
import axios from "axios";

const playlists = ref([]);

const getPlaylists = async () => {
  try {
    const response = await axios.get('api/get-playlists');
    playlists.value = response.data;
  }
  catch (err) {
    console.error(err);
  }
}

onMounted(async () => {
  await getPlaylists();
})
</script>

<template>
  <div class="customPlaylists">
    <div class="header">
      <h4>Слушайте друг друга</h4>
      <a href="#">Смотреть все</a>
    </div>
    <div class="items">
      <CustomPlaylist v-for="item in playlists" :key="item.id"
                      :id-playlist="item.id_album" :id-performance="item.id_performance"
                      :name-playlist="item.name_album" :name-user="item.name"
      />
    </div>
  </div>
</template>

<style scoped>
.customPlaylists {
  background-color: #202026;
  padding: 20px 12px 12px 20px;
  margin-top: 20px;
  border-radius: 12px;
}

.customPlaylists .header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.customPlaylists .header h4 {
  color: #fff;
}

.customPlaylists .header a {
  color: #919191;
  font-size: 12px;
  padding-right: 5px;
}

.customPlaylists .items {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 12px;
  gap: 10px;
}

@media screen and (min-width: 1450px) {
  .headerItem {
    width: 438px;
  }
}

@media screen and (max-width: 1550px) {
  .customPlaylists .items {
    grid-template-columns: 1fr 1fr;
  }
  .customPlaylists {
    width: 100%;
  }
}

@media screen and (max-width: 1250px) {
  .customPlaylists {
    width: 140%;
  }
}

@media screen and (max-width: 950px) {
  .customPlaylists {
    width: 98%;
  }
}
</style>