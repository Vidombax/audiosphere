<script setup>
import SearchSong from "@/components/SearchSong.vue";
import {provide, ref} from 'vue';
import axios from "axios";

const props = defineProps({
  closeModal: Function,
})

const searchText = ref('');
const searchData = ref([]);
const typeSearch = 'createPlaylist';
const musicToPlaylist = ref([]);
const fileInput = ref(null);
const fileName = ref('')
const namePlaylist = ref('')

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

const publishPlaylist = async () => {
  try {
    if (musicToPlaylist.value.length !== 0) {
      if (fileName.value === '') {
        fileName.value = '/public/defaultPlaylistPhoto.png';
      }
      const response = await axios.post('api/add-playlist', {
        name: namePlaylist.value,
        cover: fileName.value,
        id: Number(localStorage.getItem('id'))
      });
      const idPlaylist = response.data.id_album;
      for (let i = 0; i < musicToPlaylist.value.length; i++) {
        await axios.post('api/add-music-playlist', {
          id_album: idPlaylist,
          id_music: musicToPlaylist.value[i].id_music
        });
      }
      location.reload()
    }
  } catch (err) {
    console.error(err);
  }
};


const handleNameChange = (event) => {
  namePlaylist.value = event.target.value;
}

const uploadFile = async () => {
  try {
    const file = fileInput.value.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post('/api/upload-photo-playlist', formData);
    fileName.value = '/albumPictures/' + response.data.filename;
    document.getElementById('labelFile').innerText = 'Обложка выбрана'
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}

provide('createPlaylist', {
  musicToPlaylist
})
</script>

<template>
  <div class="modalPlaylist">
    <div class="header">
      <h4>Создание плейлистов</h4>
      <p @click="closeModal">Выход</p>
    </div>
    <div class="items">
      <div class="infoPlaylist">
        <div>
          <label for="getFile1" id="labelFile">Выберите обложку</label>
          <input type="file" id="getFile1" class="inputFile" ref="fileInput" @change="uploadFile">
        </div>
        <input type="text" placeholder="Название плейлиста" @change="handleNameChange">
      </div>
      <div class="search">
        <input type="text" placeholder="Поиск по аудиозаписям" v-model="searchText" @input="searchQuery">
      </div>
      <div class="search-items" v-if="searchText">
        <div class="items" v-if="searchData.length > 3" style="margin-top: 150px">
          <SearchSong v-for="item in searchData" :key="item.id"
                      :id-performance="item.id_performance" :album-cover="item.album_cover"
                      :id-music="item.id" :search-text="searchText"
                      :duration-music="item.duration_music"
                      :name-song="item.name_music" :name-performance="item.name"
                      :type-search="typeSearch" :id-album="item.id_album"
          />
        </div>
        <div class="items" v-else-if="searchData.length > 2" style="margin-top: -10px">
          <SearchSong v-for="item in searchData" :key="item.id"
                      :id-performance="item.id_performance" :album-cover="item.album_cover"
                      :id-music="item.id" :search-text="searchText"
                      :duration-music="item.duration_music"
                      :name-song="item.name_music" :name-performance="item.name"
                      :type-search="typeSearch" :id-album="item.id_album"
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
                      :type-search="typeSearch" :id-album="item.id_album"
          />
        </div>
      </div>
      <button @click="publishPlaylist">Опубликовать плейлист</button>
    </div>
  </div>
</template>

<style scoped>
  .modalPlaylist {
    display: flex;
    position: fixed;
    left: 30%;
    width: 40%;
    justify-content: center;
    align-items: center;
    background-color: #202026;
    padding: 20px 12px 12px 20px;
    margin-top: 8%;
    border-radius: 12px;
    flex-direction: column;
    z-index: 1;
    box-shadow: 1px 5px 5px #919191;
  }

  .header {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
  }

  .header p {
    cursor: pointer;
    color: #919191;
    font-size: 12px;
  }

  input {
    width: 300px;
    background-color: #1d1d1d;
    border: 1px solid #464748;
    outline: none;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
  }

  label {
    cursor: pointer;
    display: block;
    color: #919191;
    font-size: 16px;
    width: 150px;
  }

  .items {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 32px;
  }

  .infoPlaylist {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 32px;
    margin-bottom: 24px;
  }

  .inputFile {
    color: transparent;
    position: relative;
    display: none;
  }

  .search{
    display: flex;
    align-items: center;
    gap: 6px;
    width: 70%;
    background-color: #1d1d1d;
    border: 1px solid #464748;
    padding: 5px;
    border-radius: 8px;
    z-index: 10;
  }

  .search input{
    width: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    color: #fff;
  }

  .search-items {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    top: 20%;
    left: 0;
    background-color: #202026;
    width: 500px;
    height: 300px;
    border-radius: 12px;
    z-index: 9;
    overflow-y: auto;
    box-shadow: 0 10px 5px #202026;
  }

</style>