<script setup>
import {ref, onMounted} from "vue";
import axios from "axios";

const props = defineProps({
  idGenre: Number,
});

const genre = ref([]);
const getGenre = async () => {
  try {
    const response = await axios.get(`api/tag/${props.idGenre}`);
    genre.value = response.data;
  }
  catch (err) {
    console.log(err);
  }
}

const nameTag = ref('');
const handleNameChange = (event) => {
  nameTag.value = event.target.value;
}

const updateGenre = async () => {
  try {
    const response = await axios.put(`api/tag`, {
      id: props.idGenre,
      name: nameTag.value,
      photo: fileName.value
    });
    location.reload();
  }
  catch (err) {
    console.error(err);
  }
}

const fileInput = ref(null);
const fileName = ref('')
const uploadFile = async () => {
  try {
    const file = fileInput.value.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post('/api/upload-photo-genre', formData);
    fileName.value = '/tagPictures/' + response.data.filename;
    document.getElementById('labelFile').innerText = 'Фото выбрано'
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}

const deleteGenre = async () => {
  const response = await axios.delete(`api/tag/${props.idGenre}`);
  location.reload();
}

onMounted(async () => {
  await getGenre();
})
</script>

<template>
  <div class="items">
    <h3>Название жанра</h3>
    <input type="text" v-model="genre.name_tag" @input="handleNameChange">
    <h3>Фото жанра</h3>
    <img :src="genre.genre_photo" alt="photoGenre" v-if="fileName === ''">
    <img :src="fileName" alt="photoGenreUpdated" v-else>
    <div>
      <label for="getFile1" id="labelFile">Поменять фото</label>
      <input type="file" id="getFile1" class="inputFile" ref="fileInput" @change="uploadFile">
    </div>
    <button @click="updateGenre">Обновить жанр</button>
    <button @click="deleteGenre">Удалить жанр</button>
  </div>
</template>

<style scoped>
.items {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  justify-items: center;
}

label {
  cursor: pointer;
  display: block;
  color: #919191;
  font-size: 16px;
  width: 150px;
}

.inputFile {
  color: transparent;
  position: relative;
  display: none;
}

img {
  width: 300px;
  height: 300px;
}
</style>