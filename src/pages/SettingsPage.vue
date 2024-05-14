<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";

document.title = 'AudioSphere | Настройки'

const id = ref(Number(localStorage.getItem('id')))
const data = ref([])

const name = ref('');
const mail = ref('');
const password = ref('');
const fileInput = ref(null);

const fetchUser = async () => {
  try {
    const response = await axios.get(`/api/user/${id.value}`);
    data.value = response.data;

    name.value = data.value.name;
    mail.value = data.value.mail;
    password.value = data.value.password;
  }
  catch (err) {
    console.log(err)
  }
}

const updateUser = async () => {
  try {
    const response = await axios.put('/api/update-user', {
      id: id.value,
      name: name.value,
      mail: mail.value,
      password: password.value,
    })
    location.reload();
  }
  catch (err) {
    console.error(err);
  }
}

const uploadFile = async () => {
  try {
    const file = fileInput.value.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post('/api/upload-photo', formData);
    const fileName = ref('/profilePictures/' + response.data.filename);

    const responseUpdate = await axios.put('/api/update-user-photo', {
      id: id.value,
      photoName: fileName.value,
    })

    location.reload();

  } catch (error) {
    console.error('Error uploading file:', error);
  }
}

const handleNameChange = (event) => {
  name.value = event.target.value;
};

const handleMailChange = (event) => {
  mail.value = event.target.value;
};

const handlePasswordChange = (event) => {
  password.value = event.target.value;
};

onMounted(async () => {
  await fetchUser()
})
</script>

<template>
  <div class="settings">
      <div class="header">
        <h4>Настройки</h4>
      </div>
      <div class="items">
        <div class="settingsUser">
          <h3>Поменять аватарку</h3>
          <div>
            <input type="file" ref="fileInput" @change="uploadFile" class="inputFile">
          </div>
          <h3>Поменять никнейм</h3>
          <input type="text" :value="data.name" @change="handleNameChange">
          <h3>Поменять почту</h3>
          <input type="text" :value="data.mail" @change="handleMailChange">
          <h3>Поменять пароль</h3>
          <input type="text" :value="data.password" @change="handlePasswordChange">
        </div>
        <button @click="updateUser">Сохранить</button>
      </div>
  </div>
</template>

<style scoped>
h3 {
  color: white;
}

.settings {
  background-color: #202026;
  padding: 20px 12px 12px 20px;
  border-radius: 12px;
  margin-top: 2.5rem;
}

.settings .header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}

.settings .header h4 {
  color: #fff;
}

.items {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  align-self: center;
}

.settingsUser {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-self: center;
  align-items: center;
}

.settingsUser div {
  display: flex;
  gap: 24px;
  justify-content: center;
  align-items: center;
}

input {
  border: none;
  padding: 10px;
  background-color: transparent;
  font-size: large;
  color: #fff;
  text-align: center;
}

button{
  padding: 12px 16px;
  background-color: #5773ff;
  border: none;
  border-radius: 14px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  font-size: x-large;
}

.inputFile {
  color: transparent;
  position: relative;
  left: 26%;
}
</style>