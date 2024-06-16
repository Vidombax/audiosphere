<script setup>
import {ref} from "vue";
import axios from "axios";

const nameTag = ref('');
const handleNameChange = (event) => {
  nameTag.value = event.target.value;
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

const addGenre = async () => {
  try {
    const response = await axios.post('api/tag', {
      name_tag: nameTag.value,
      genre_photo: fileName.value
    });
    location.reload();
  }
  catch (err) {
    console.error(err);
  }
}
</script>

<template>
  <div class="items">
    <h3>Название жанра</h3>
    <input type="text" @input="handleNameChange">
    <div>
      <label for="getFile1" id="labelFile">Выберите фото</label>
      <input type="file" id="getFile1" class="inputFile" ref="fileInput" @change="uploadFile">
    </div>
    <button @click="addGenre">Добавить жанр</button>
  </div>
</template>

<style scoped>
.items {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
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
</style>