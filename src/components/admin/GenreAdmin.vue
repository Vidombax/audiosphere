<script setup>
import {onMounted, ref, inject} from 'vue';
import axios from "axios";
import ItemAdminTableGenres from "@/components/admin/ItemAdminTableGenres.vue";

const {openAddModal} = inject('admin')

const genres = ref([]);
const getGenres = async () => {
  try {
    const response = await axios.get('/api/tags');
    genres.value = response.data;
  }
  catch (err) {
    console.log(err);
  }
}

const searchText = ref('');
const searchGenre = ref([]);
const getGenresBySearch = async () => {
  try {
    if (searchText.value === '') {
      await getGenres();
    }
    else {
      const response = await axios.get(`/api/genres-by-search/${searchText.value}`);
      genres.value = null;
      searchGenre.value = response.data;
    }
  }
  catch (err) {
    console.error(err);
  }
}

onMounted(async () => {
  await getGenres();
})
</script>

<template>
  <div class="header-main">
    <h2>Фильтрация</h2>
    <input type="text" placeholder="Название жанра" v-model="searchText">
    <button @click="getGenresBySearch">Применить</button>
    <button @click="openAddModal">Создать жанр</button>
  </div>
  <div class="items">
    <table>
      <tr>
        <th>ID</th>
        <th>Название жанра</th>
        <th>Детализация</th>
      </tr>
      <ItemAdminTableGenres v-for="item in genres" v-if="genres !== null"
                            :key="item.id"
                            :id="item.id"
                            :name="item.name_tag"
      />
      <ItemAdminTableGenres v-for="item in searchGenre" v-else
                            :key="item.idd"
                            :id="item.id"
                            :name="item.name_tag"
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