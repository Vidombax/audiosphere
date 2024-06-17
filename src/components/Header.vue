<script setup>
import {ref} from 'vue';
import axios from "axios";
import SearchSong from "@/components/SearchSong.vue";

const searchText = ref('');
const searchData = ref([]);

const searchQuery = async () => {
  try {
    if (searchText.value !== '') {
      const response = await axios.get(`api/music-search/${searchText.value}`);
      searchData.value = response.data;
    }
  }
  catch (err) {
    console.error(err);
  }
}

const id = ref(Number(localStorage.getItem('id')) || 0)

const openSideBar = () => {
  document.getElementsByClassName('sidebar')[0].classList.add('asideAdaptive');
  document.getElementsByClassName('sidebarNotFixed')[0].classList.add('asideAdaptive');
  document.getElementById('menu-close').style.display = 'flex';
}
</script>

<template>
  <header>
    <div class="nav-links">
      <button class="menu-btn" id="menu-open" @click="openSideBar">
        <box-icon name='menu'  color='#ffffff'></box-icon>
      </button>
      <router-link to="/subscribes" v-if="id !== 0">
        <p>Подписки</p>
      </router-link>
    </div>
    <div class="search">
      <box-icon name='search' color='#ffffff' ></box-icon>
      <input type="text" placeholder="Поиск по аудиозаписям" v-model="searchText" @input="searchQuery">
    </div>
    <div class="search-items" v-if="searchText">
      <div class="items" v-if="searchData.length > 3" style="margin-top: 110px">
        <SearchSong
            v-for="item in searchData" :key="item.id"
                    :id-performance="item.id_performance" :album-cover="item.album_cover"
                    :id-music="item.id" :search-text="searchText"
                    :duration-music="item.duration_music"
                    :name-song="item.name_music" :name-performance="item.name"
        />
      </div>
      <div class="items" v-else-if="searchData.length > 2" style="margin-top: -10px">
        <SearchSong v-for="item in searchData" :key="item.id"
                    :id-performance="item.id_performance" :album-cover="item.album_cover"
                    :id-music="item.id" :search-text="searchText"
                    :duration-music="item.duration_music"
                    :name-song="item.name_music" :name-performance="item.name"
        />
      </div>
      <div class="items" v-else-if="searchData.length === 0" style="margin-top: -10px; display: flex; justify-content: center; align-items: center;">
        <h4 style="color: white;">Треков не найдено</h4>
      </div>
      <div class="items" v-else style="margin-top: -80px">
        <SearchSong v-for="item in searchData" :key="item.id"
                    :id-performance="item.id_performance" :album-cover="item.album_cover"
                    :id-music="item.id" :search-text="searchText"
                    :duration-music="item.duration_music"
                    :name-song="item.name_music" :name-performance="item.name"
        />
      </div>
    </div>
  </header>
</template>

<style>
.asideAdaptive {
  display: block !important;
}

.container main header{
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.container main header .nav-links{
  display: flex;
  align-items: center;
  gap: 20px;
}

.container main header .nav-links p{
  text-transform: uppercase;
  color: #919191;
  transition: all 0.3s ease;
}

.container main header .nav-links p:hover {
  color: #5773ff;
}

.container main header .search{
  display: flex;
  align-items: center;
  gap: 6px;
  width: 70%;
  background-color: #1d1d1d;
  border: 1px solid #464748;
  padding: 10px;
  border-radius: 8px;
  z-index: 10;
}

.container main header .search input{
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: small;
  margin-bottom: 0;
}

.container main header .nav-links button {
  align-items: center;
  justify-content: center;
  background-color: #1d1d1d;
  border: 1px solid #464748;
  font-size: 20px;
  padding: 4px;
  border-radius: 8px;
  cursor: pointer;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background-color: #ffffff;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background-color: #5773ff;
  border-radius: 5px;
}

.search-items {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  background-color: #202026;
  width: 400px;
  height: 200px;
  border-radius: 12px;
  left: 34.6%;
  top: 8%;
  z-index: 9;
  overflow-y: auto;
  box-shadow: 0 10px 5px #202026;
}


@media screen and (min-width: 1540px) {
  .search-items {
    width: 665px;
  }
}

@media screen and (max-width: 1550px) {
  .search-items {
    left: 34.5%;
    top: 9.4%;
    width: 525px;
  }
}

@media screen and (max-width: 850px) {
  .container main header {
    justify-content: space-around;
  }
  .container main header .search {
    width: 50%;
  }
}

@media screen and (max-width: 750px) {
  .container main header {
    justify-content: normal;
    gap: 10px;
    margin-left: -10%;
  }
}

@media screen and (max-width: 700px) {
  .container main header {
    margin-left: 0;
  }
}

@media screen and (min-width: 651px) {
  .container main header .nav-links button {
    display: none;
  }
}

@media screen and (max-width: 650px) {
  .container main header .nav-links button {
    display: flex;
  }
  .search-items {
    left: 1%;
    width: 480px;
  }
}
</style>