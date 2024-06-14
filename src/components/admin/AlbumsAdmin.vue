<script setup>
import {onMounted, ref} from 'vue';
import ItemAdminTableAlbum from "@/components/admin/ItemAdminTableAlbum.vue";
import axios from "axios";

const albums = ref([]);
const getAlbums = async () => {
  try {
    const response = await axios.get('/api/album');
    albums.value = response.data;
  }
  catch (err) {
    console.error(err);
  }
}

const albumsSelector = ref([]);
const getAlbumsSelector = async () => {
  try {
    const select = document.querySelector('select');
    const type = ref(select.value);

    const response = await axios.get(`api/get-albums-selector/${type.value}`);
    albumsSelector.value = response.data;
    albums.value = null;
  }
  catch (err) {
    console.error(err);
  }
}

onMounted(async () => {
  await getAlbums();
})
</script>

<template>
  <div class="header-main">
    <h2>Фильтрация</h2>
    <select>
      <option value="false">Альбомы</option>
      <option value="true">Плейлисты</option>
    </select>
    <button @click="getAlbumsSelector">Применить</button>
  </div>
  <div class="items">
    <table>
      <tr>
        <th>ID</th>
        <th>Название альбома</th>
        <th>Автор</th>
        <th>Дата публикации</th>
        <th>Тип</th>
      </tr>
      <ItemAdminTableAlbum v-for="item in albums" v-if="albums !== null"
                           :key="item.id"
                           :id="item.id_album"
                           :name-performance="item.name"
                           :name="item.name_album"
                           :date-publication="item.date_publication"
                           :type="item.is_playlist"
      />
      <ItemAdminTableAlbum v-for="item in albumsSelector" v-else
                           :key="item.idd"
                           :id="item.id_album"
                           :name-performance="item.name"
                           :name="item.name_album"
                           :date-publication="item.date_publication"
                           :type="item.is_playlist"
      />
    </table>
  </div>
</template>

<style scoped>
  table {
    color: white;
    text-align: center;
    width: 100%;
  }
  th {
    font-size: larger;
  }
  tr, td {
    padding: 5px;
    font-size: large;
  }
</style>