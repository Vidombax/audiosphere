<script setup>
import {onMounted, ref} from "vue";

defineProps({
  button: Object,
})

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

  </div>
</template>

<style scoped>
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

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.header p {
  font-size: 28px;
  font-weight: bold;
}

.header img {
  width: 32px;
  height: 32px;
}

.items {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
}

.items p:first-child {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 1rem;
}

.items p:last-child {
  font-size: small;
  color: #494949;
  cursor: pointer;
  transition: color 0.3s;
}

.items p:last-child:hover {
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
</style>