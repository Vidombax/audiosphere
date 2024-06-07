<script setup>
  import axios from "axios";
  import {inject, ref} from "vue";

  const props = defineProps({
    numberMusic: Number,
  })

  const fileInput = ref(null);
  const fileName = ref('');

  const uploadFile = async () => {
    try {
      const file = fileInput.value.files[0];
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('/api/upload-music', formData);
      fileName.value = '/music/' + response.data.filename;
      document.getElementById(numberLabel.value).innerText = 'Музыка загружена'
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  const nameMusic = ref('');
  const durationMusic = ref('');

  const handleNameChange = (event) => {
    nameMusic.value = event.target.value;
  }

  const handleDurationChange = (event) => {
    durationMusic.value = event.target.value;
  }

  const numberLabel = ref('label' + String(props.numberMusic));
  const numberInputFile = ref('get' + String(props.numberMusic));

  const emit = defineEmits(['add-to-list']);
  const music = ref({});

  const {removeMusicFromArray} = inject('account')

  const checkAdd = ref(true);

  const handleCheckChange = () => {
    if (checkAdd.value === false) {
      checkAdd.value = true;
      removeMusicFromArray();
    }
    else {
      checkAdd.value = false;
      music.value = {
        file_music: fileName.value,
        name_music: nameMusic.value,
        duration_music: durationMusic.value
      }
      emit('add-to-list', music.value);
    }
  }
</script>

<template>
  <div class="item">
    <input type="text" placeholder="Название песни" @change="handleNameChange">
    <div>
      <label :for="numberInputFile" :id="numberLabel">Загрузить музыку</label>
      <input type="file" :id="numberInputFile" class="inputFile" ref="fileInput" @change="uploadFile">
    </div>
    <input type="text" placeholder="00:00" maxlength="5" v-mask="'##:##'" @change="handleDurationChange">
    <box-icon name='check-square' color='#ffffff' v-if="checkAdd" @click="handleCheckChange"></box-icon>
    <box-icon name='check-square' type='solid' color='#ffffff' v-else @click="handleCheckChange"></box-icon>
  </div>
</template>

<style scoped>
  .item {
    margin-bottom: 15px;
  }

  label {
    color: white;
    cursor: pointer;
  }

  input[type=text] {
    width: 250px;
    background-color: #1d1d1d;
    border: 1px solid #464748;
    outline: none;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
  }

  input[type=text]:nth-child(3) {
    width: 59px;
  }

  .inputFile {
    color: transparent;
    position: relative;
    display: none;
  }
</style>