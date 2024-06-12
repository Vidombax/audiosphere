<script setup>
import {onMounted, provide, ref} from "vue";
import axios from "axios";

import FavouriteComposition from "@/components/account/FavouriteComposition.vue";
import FavouritePerfomance from "@/components/account/FavouritePerfomance.vue";
import FavouriteAlbum from "@/components/account/FavouriteAlbum.vue";
import MusicToNewAlbum from "@/components/account/MusicToNewAlbum.vue";

const id = ref(Number(localStorage.getItem('id')))
const data = ref([])
const subMusic = ref([])
const isAuthor = ref(false)

const fetchUser = async () => {
  try {
    const response = await axios.get(`/api/user/${id.value}`)
    data.value = response.data
    isAuthor.value = data.value.is_performance
    document.title = 'AudioSphere | ' + response.data.name[0].toUpperCase() + response.data.name.slice(1)
  }
  catch (err) {
    console.log(err)
  }
}

const exitFromAccount = async () => {
  try {
    localStorage.clear()
    location.replace('/')
  }
  catch (err) {
    console.log(err)
  }
}

const getMusicByUser = async () => {
  try {
    const response = await axios.get(`api/subscribe-music/${id.value}`)
    subMusic.value = response.data
  }
  catch (err) {
    console.log(err)
  }
}

const subPerformer = ref([]);
const getSubPerformer = async () => {
  try {
    const response = await axios.get(`/api/subscribes-performer/${id.value}`)
    subPerformer.value = response.data;
  }
  catch (err) {
    console.log(err)
  }
}

const subPlaylist = ref([]);
const getSubPlaylist = async () => {
  try {
    const response = await axios.get(`api/get-playlists/${id.value}`);
    subPlaylist.value = response.data;
  }
  catch (err) {
    console.error(err)
  }
}

const isOpened = ref(false)

const openModalBecomePerformer = () => {
  isOpened.value = true;
}

const closeModalBecomePerformer = () => {
  isOpened.value = false;
}

const createApplication = async () => {
  try {
    const response = await axios.post(`/api/user-application`, {
      id: id.value
    });
    alert('Заявка отправлена!');
    isOpened.value = false;
    isAuthor.value = true;
    location.reload();
  }
  catch (err) {
    console.error(err)
  }
}

const performerAlbums = ref([]);

const getPerformerAlbums = async () => {
  try {
    if (isAuthor.value === true) {
      const response = await axios.get(`api/albums-performer/${id.value}`);
      performerAlbums.value = response.data;
    }
  }
  catch (err) {
    console.error(err)
  }
}

const performerMusic = ref([]);

const getMusicPerformer = async () => {
  try {
    if (isAuthor.value === true) {
      const response = await axios.get(`api/music-performer/${id.value}`);
      performerMusic.value = response.data;
    }
  }
  catch (err) {
    console.error(err);
  }
}

const isOpenedCreateAlbum = ref(false);

const openModalCreateAlbum = () => {
  isOpenedCreateAlbum.value = true;
}

const closeModalCreateAlbum = () => {
  isOpenedCreateAlbum.value = false;
}

const fileInput = ref(null);
const fileName = ref('');

const uploadFile = async () => {
  try {
    const file = fileInput.value.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post('/api/upload-photo-playlist', formData);
    fileName.value = '/albumPictures/' + response.data.filename;
    document.getElementById('labelFile2').innerText = 'Обложка выбрана'
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}

const genres = ref([])

const fetchGenres = async () => {
  try {
    const response = await axios.get('/api/tags')
    genres.value = response.data
  }
  catch (err) {
    console.log(err)
  }
}

const musicToAlbum = ref(0);

const addMusicToAlbum = () => {
  musicToAlbum.value++;
}

const removeMusicToAlbum = () => {
  if (musicToAlbum.value !== 0) {
    musicToAlbum.value--;
    removeMusicFromArray();
  }
}

const musicArray = ref([]);

const addMusicToArray = (music) => {
  musicArray.value.push(music);
}

const removeMusicFromArray = () => {
  musicArray.value.pop();
}

const nameAlbum = ref('');
const albumID = ref(0);

const handleNameChange = (event) => {
  nameAlbum.value = event.target.value;
}

const addAlbum = async () => {
  try {
    const responseAlbum = await axios.post('api/album', {
      albumPictures: fileName.value,
      nameAlbum: nameAlbum.value,
      idPerformer: id.value
    });

    albumID.value = responseAlbum.data.id_album;
    const select = document.querySelector('select');
    const selectedValue = ref(select.value);

    const musicPromises = musicArray.value.map(async (music) => {
      try {
        const responseMusic = await axios.post('api/music', {
          nameMusic: music.name_music,
          fileMusic: music.file_music,
          durationMusic: music.duration_music,
          idPerformance: id.value,
          idTag: selectedValue.value
        });

        const musicID = responseMusic.data.id;
        const responseAddMusicToAlbum = await axios.post('api/add-music-playlist', {
          id_music: musicID,
          id_album: albumID.value
        });
      } catch (musicError) {
        console.error('Error adding music:', musicError);
      }
    });

    await Promise.all(musicPromises);

    location.reload();
  } catch (err) {
    console.error('Error adding album:', err);
  }
};


provide('account', {
  removeMusicFromArray,
  isAuthor
})

onMounted(async () => {
  await fetchUser();
  await getMusicByUser();
  await getSubPerformer();
  await getSubPlaylist();
  await getPerformerAlbums();
  await getMusicPerformer();
  await fetchGenres();
})
</script>

<template>
  <div class="profile">
    <div class="subscribers">
      <h2>{{ data.count_follower }}</h2>
      <h3>подписчиков</h3>
    </div>
    <div class="name">
      <img :src="data.profile_picture" alt="photoProfile">
      <h1>{{ data.name }}</h1>
    </div>
    <div class="exit" @click="exitFromAccount">
      <img src="../assets/exitAccount.png" alt="exit">
      <h3>выход</h3>
    </div>
  </div>
  <div class="favourites">
    <div class="favouritesAlbums">
      <div class="header">
        <h4>Ваши плейлисты</h4>
      </div>
      <div class="items" v-if="subPlaylist.length > 0">
        <FavouriteAlbum v-for="item in subPlaylist" :key="item.id"
                        :id-album="item.id_album" :name-album="item.name_album"
                        :album-cover="item.album_cover" :name-author="item.name"
        />
      </div>
      <div class="items" v-else style="height: 220px;">
        <h4 style="height: 100px; display: flex; justify-content: center; align-items: center;">Плейлистов нет</h4>
      </div>
    </div>
    <div class="favouritesPerformances">
      <div class="header">
        <h4>Любимые исполнители</h4>
      </div>
      <div class="items">
        <FavouritePerfomance v-if="subPerformer.length > 0" v-for="item in subPerformer" :key="item.id" :id-performer="item.iduser"
                             :name-performer="item.name" :photo-performer="item.profile_picture"
        />
        <div class="item" v-else style="height: 200px; display: flex; justify-content: center; align-items: center;">
          <h4>Подписок нет</h4>
        </div>
      </div>
    </div>
  </div>
  <div class="favouritesComposition">
    <div class="header">
      <h4>Любимые композиции</h4>
    </div>
    <div class="items" v-if="subMusic.length > 0">
      <FavouriteComposition v-for="item in subMusic" :key="item.id"
                            :title="item.name_music"
                            :id-music="item.id"
                            :album-cover="item.album_cover"
                            :duration="item.duration_music"
      />
    </div>
    <div class="items" v-else style="height: 70px; display: flex; justify-content: center; align-items: center;">
      <h4>Композиций нет</h4>
    </div>
  </div>
  <div class="yourAlbums" v-if="isAuthor === true">
    <div class="header">
      <h4>Ваши альбомы</h4>
    </div>
    <div class="items" v-if="performerAlbums.length > 0">
      <FavouriteAlbum v-for="item in performerAlbums" :key="item.id"
                      :id-album="item.id_album" :name-album="item.name_album"
                      :album-cover="item.album_cover"
      />
    </div>
    <div class="items" v-else style="height: 100px; display: flex; justify-content: center; align-items: center; flex-direction: column">
      <h4>Альбомов нет</h4>
    </div>
    <h5 @click="openModalCreateAlbum">Добавить альбом</h5>
  </div>
  <div class="yourComposition" v-if="isAuthor === true">
    <div class="header">
      <h4>Ваши композиции</h4>
    </div>
    <div class="items" v-if="performerMusic.length > 0">
      <FavouriteComposition v-for="item in performerMusic" :key="item.id"
                            :title="item.name_music"
                            :id-music="item.id"
                            :album-cover="item.album_cover"
                            :duration="item.duration_music"
      />
    </div>
    <div class="items" v-else style="height: 100px; display: flex; justify-content: center; align-items: center;">
      <h4>Композиций нет</h4>
    </div>
  </div>
  <div class="verificationPerformer" v-if="isAuthor === false">
    <h5 @click="openModalBecomePerformer">Стать исполнителем</h5>
  </div>
  <div class="modalBecomePerformer" v-if="isOpened">
    <div class="header">
      <h4>Форма отправки заявки на получение статуса исполнителя</h4>
      <h5 @click="closeModalBecomePerformer">Закрыть окно</h5>
    </div>
    <div class="items">
      <h4>Вы хотите оставить заявку на получение статуса исполнителя на платформе?</h4>
      <button @click="createApplication">Оставить заявку</button>
    </div>
  </div>
  <div class="createAlbumModal" v-if="isOpenedCreateAlbum">
    <div class="header">
      <h4>Создать альбом</h4>
      <h5 @click="closeModalCreateAlbum">Закрыть окно</h5>
    </div>
    <div class="items">
      <div class="infoAboutAlbum">
        <input type="text" placeholder="Название альбома" @change="handleNameChange">
        <div>
          <label for="getFile2" id="labelFile2">Выберите обложку</label>
          <input type="file" id="getFile2" class="inputFile" ref="fileInput" @change="uploadFile">
        </div>
        <select>
          <option v-for="item in genres" :value="item.id">{{ item.name_tag}}</option>
        </select>
      </div>
      <div class="musicInAlbum">
        <div class="buttons">
          <div class="addMusic" @click="addMusicToAlbum">
            <box-icon name='plus' color='#ffffff' ></box-icon>
            <h4>Добавить</h4>
          </div>
          <div class="addMusic" @click="removeMusicToAlbum">
            <box-icon name='minus' color='#ffffff' ></box-icon>
            <h4>Убрать</h4>
          </div>
        </div>
        <div class="music" id="music">
          <MusicToNewAlbum v-for="item in musicToAlbum" :key="item.id"
                           :number-music="item" @add-to-list="addMusicToArray"
          />
        </div>
      </div>
      <button @click="addAlbum">Добавить альбом</button>
    </div>
  </div>
</template>

<style scoped>
p,
h1,
h2,
h3,
h4,
h5,
img,
label {
  color: #fff;
}

label {
  cursor: pointer;
}

.infoSong h5 {
  font-weight: normal;
}

.profile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #202026;
  padding: 20px 12px 12px 20px;
  margin-top: 8%;
  border-radius: 12px;
}

.subscribers,
.name,
.exit {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.exit {
  margin-right: 24px;
  cursor: pointer;
}

.exit img {
  width: 40px;
  height: 40px;
}

.name img {
  margin-top: -25%;
  width: 245px;
  height: 208px;
  border-radius: 32px;
  margin-bottom: 12px;
}

.favourites {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
}

.favouritesAlbums {
  width: 50%;
}

.favouritesAlbums,
.favouritesPerformances {
  display: flex;
  flex-direction: column;
  background-color: #202026;
  padding: 20px 12px 12px 20px;
  margin-top: 20px;
  border-radius: 12px;
  height: 350px;
  overflow-y: auto;
}

.createAlbumModal {
  display: flex;
  flex-direction: column;
  background-color: #202026;
  padding: 20px 12px 12px 20px;
  margin-top: 20px;
  border-radius: 12px;
  overflow-y: auto;
  position: fixed;
  left: 15%;
  top: 5%;
  width: 850px;
  box-shadow: 1px 5px 5px #919191;
}

.createAlbumModal .header h5 {
  cursor: pointer;
}

.favouritesComposition,
.yourComposition,
.yourAlbums {
  display: flex;
  flex-direction: column;
  background-color: #202026;
  padding: 20px 12px 12px 20px;
  margin-top: 20px;
  border-radius: 12px;
}

.favouritesAlbums .items {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  align-items: center;
}

.yourAlbums h5 {
  color: #464748;
  cursor: pointer;
  transition: .3s linear;
  position: relative;
  left: 42.5%;
  margin-top: 25px;
}

.yourAlbums h5:hover {
  color: #919191;
}

input {
  width: 300px;
  background-color: #1d1d1d;
  border: 1px solid #464748;
  outline: none;
  padding: 12px;
  border-radius: 8px;
  color: #fff;
  font-size: medium;
  margin-bottom: 0;
}

.favouritesComposition .items,
.yourComposition .items,
.yourAlbums .items {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-top: 25px;
}

.createAlbumModal .items {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.createAlbumModal .items .infoAboutAlbum {
  display: flex;
  gap: 24px;
  width: 500px;
  justify-content: center;
  align-items: center;
}

.createAlbumModal .items .infoAboutAlbum input:nth-child(1) {
  width: 150px;
}

.items {
  display: grid;
  grid-template-columns: 1fr;
}

.item {
  display: flex;
  gap: 32px;
  align-items: center;
}

.favouritesAlbums .item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.favouritesAlbums .header,
.favouritesPerformances .header,
.favouritesComposition .header,
.modalBecomePerformer .header,
.createAlbumModal .header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}

.inputFile {
  color: transparent;
  position: relative;
  display: none;
}

.musicInAlbum {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 25px;
}

.addMusic {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
  cursor: pointer;
}

select {
  width: 150px;
  background-color: #1d1d1d;
  border: 1px solid #464748;
  outline: none;
  padding: 6px;
  border-radius: 8px;
  color: #fff;
  text-align: center;
  font-size: 20px;
}

.favouritesPerformances {
  width: 45%;
}

.header a {
  color: #919191;
  font-size: 12px;
}

.verificationPerformer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.verificationPerformer h5 {
  color: #464748;
  cursor: pointer;
  transition: .3s linear;
}

.verificationPerformer h5:hover {
  color: #919191;
}

.modalBecomePerformer {
  display: flex;
  flex-direction: column;
  background-color: #202026;
  padding: 20px 12px 12px 20px;
  margin-top: 20px;
  border-radius: 12px;
}

.modalBecomePerformer .header h5 {
  color: #464748;
  cursor: pointer;
  transition: .3s linear;
}

.modalBecomePerformer .header h5:hover {
  color: #919191;
}

.modalBecomePerformer .items {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.modalBecomePerformer .items button {
  margin-top: 20px;
  margin-bottom: 10px;
  width: 200px;
}
</style>