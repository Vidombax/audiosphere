<script setup>
import {onMounted, ref} from 'vue';
import ItemAdminTableMusic from "@/components/admin/ItemAdminTableMusic.vue";
import axios from "axios";

const music = ref([]);
const getMusic = async () => {
  try {
    const response = await axios.get('api/music-for-admin');
    music.value = response.data;
  }
  catch (err) {
    console.error(err);
  }
}

const musicBySelector = ref([]);
const getMusicBySelector = async () => {
  try {
    const select = document.querySelector('select');
    const type = ref(0);

    if (select.value === "ID") {
      type.value = 0;
    }
    else {
      type.value = 1;
    }

    const response = await axios.get(`api/music-for-admin-selector/${type.value}`);
    musicBySelector.value = response.data;
    music.value = null;
  }
  catch (err) {
    console.error(err);
  }
}

onMounted(async () => {
  await getMusic();
})
</script>

<template>
  <div class="header-main">
    <h2>Фильтрация</h2>
    <select>
      <option value="ID">ID</option>
      <option value="По прослушиванием">По прослушиванием</option>
    </select>
    <button @click="getMusicBySelector">Применить</button>
  </div>
  <div class="items">
    <table>
      <tr>
        <th>ID</th>
        <th>Название музыки</th>
        <th>Исполнитель</th>
        <th>Кол-во прослушиваний</th>
        <th>Жанр</th>
        <th>Продолжительность</th>
        <th>Детализация</th>
      </tr>
      <ItemAdminTableMusic v-for="item in music" v-if="music !== null"
                           :key="item.id"
                           :name="item.name_music"
                           :id="item.id"
                           :duration="item.duration_music"
                           :count-auditions="item.count_auditions"
                           :name-performance="item.name"
                           :genre="item.name_tag"
      />
      <ItemAdminTableMusic v-for="item in musicBySelector" v-else
                           :key="item.idd"
                           :name="item.name_music"
                           :id="item.id"
                           :duration="item.duration_music"
                           :count-auditions="item.count_auditions"
                           :name-performance="item.name"
                           :genre="item.name_tag"
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
    font-size: large;
  }
  tr, td {
    padding: 5px;
    font-size: large;
  }
</style>