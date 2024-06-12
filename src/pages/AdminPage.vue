<script setup>
import {onMounted, ref} from "vue";
import UsersAdmin from "@/components/admin/UsersAdmin.vue";
import AlbumsAdmin from "@/components/admin/AlbumsAdmin.vue";
import MusicAdmin from "@/components/admin/MusicAdmin.vue";
import ApplicationAdmin from "@/components/admin/ApplicationAdmin.vue";

defineProps({
  button: Object,
});

document.title = 'Панель администратора | Пользователи'

const username = ref( '');
const password = ref('');
const authorizationOk = ref(false);

const checkAuthorization = async () => {
  try {
    if (localStorage.getItem('isAdmin') === 'false' || localStorage.getItem('isAdmin') === null) {
      authorizationOk.value = true;
    }
    else {
      authorizationOk.value = false;
    }
  }
  catch (err) {
    console.error(err);
  }
}

const authorization = () => {
  if (username.value === 'admin' && password.value === '1234') {
    localStorage.setItem('isAdmin', 'true');
    location.reload();
  }
}

const selectedTable = ref(0);
const points = document.getElementsByClassName('aside-point');

const handlerTableClick = (e) => {
  for (let i = 0; i < points.length; i++) {
    points[i].classList.remove('selected-point');
  }
  switch (e.target.innerText) {
    case 'Пользователи':
      selectedTable.value = 0;
      e.target.classList.add('selected-point');
      document.title = 'Панель администратора | Пользователи'
      break;
    case 'Альбомы':
      selectedTable.value = 1;
      e.target.classList.add('selected-point');
      document.title = 'Панель администратора | Альбомы'
      break;
    case 'Музыка':
      selectedTable.value = 2;
      e.target.classList.add('selected-point');
      document.title = 'Панель администратора | Музыка'
      break;
    case 'Заявка на получение статуса':
      selectedTable.value = 3;
      e.target.classList.add('selected-point');
      document.title = 'Панель администратора | Заявки'
      break;
  }
}

onMounted(async () => {
  await checkAuthorization();
})
</script>

<template>
  <div class="" v-if="authorizationOk">
    <form class="form" onsubmit="return false">
      <div class="header">
        <p>AudioSphere</p>
      </div>
      <div class="items">
        <p>Авторизация</p>
        <input type="text" placeholder="Логин" v-model="username" required>
        <input type="password" placeholder="Пароль" v-model="password" required>
        <button @click="authorization">Войти</button>
      </div>
    </form>
  </div>
  <div v-else>
    <div class="aside">
      <p class="selected-point aside-point" id="usersAdmin" @click="handlerTableClick">Пользователи</p>
      <p class="aside-point" id="albumsAdmin" @click="handlerTableClick">Альбомы</p>
      <p class="aside-point" id="musicAdmin" @click="handlerTableClick">Музыка</p>
      <p class="aside-point" id="performerAdmin" @click="handlerTableClick">Заявка на получение статуса</p>
    </div>
    <div class="main">
      <UsersAdmin v-if="selectedTable === 0" />
      <AlbumsAdmin v-else-if="selectedTable === 1" />
      <MusicAdmin v-else-if="selectedTable === 2" />
      <ApplicationAdmin v-else-if="selectedTable === 3" />
    </div>
  </div>
</template>

<style>
p {
  color: white;
}

input {
  color: #bdbbbb;
}

.form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #202026;
  border-radius: 24px;
  width: 500px;
  height: 400px;
  padding: 24px;
}

.form .header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.form .header p {
  font-size: 28px;
  font-weight: bold;
}

.form .header img {
  width: 32px;
  height: 32px;
}

.form .items {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
}

.form .items p:first-child {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 1rem;
}

.form .items p:last-child {
  font-size: small;
  color: #494949;
  cursor: pointer;
  transition: color 0.3s;
}

.form .items p:last-child:hover {
  color: #939090;
}

input {
  background-color: #131318;
  border: 0;
  padding: 10px;
  font-size: x-large;
  border-radius: 12px;
  margin-bottom: 2rem;
}

select {
  width: 200px;
}

button {
  padding: 14px;
  background-color: #5773ff;
  border: none;
  border-radius: 14px;
  color: #fff;
  font-size: larger;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 0.5rem;
}

.main {
  display: flex;
  flex-direction: column;
  width: 1000px;
  height: 800px;
  margin-left: 15rem;
}

.main .header-main {
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 24px;
}

.table .header-table h2 {
  width: 180px;
  text-align: center;
}

.aside {
  position: fixed;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #18181d;
  top: 0;
  gap: 1px;
  height: 100%;
}

.aside p {
  font-size: larger;
  transition: .3s linear;
  width: 100%;
  padding: 36px;
  text-align: center;
  cursor: pointer;
}

.selected-point {
  background-color: #476a8a;
}

.aside p:hover {
  background-color: #5a7fa1;
}
</style>