<script setup>
import {inject, ref} from 'vue'
import axios from "axios";

const {openRegistrationForm} = inject('registr')

defineProps({
  button: Object,
})

const username = ref( localStorage.getItem('username') || '')
const password = ref(localStorage.getItem('password') || '')

const checkUserAuthorization = async () => {
  try {
    const response = await axios.get(`/api/user/${username.value}/${password.value}`)
    localStorage.setItem('id', response.data.iduser)
    location.replace('/')
  }
  catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <form class="form" onsubmit="return false">
    <div class="header">
      <router-link to="/">
        <img src="../../assets/leftArrow.png" alt="leftArrow" @click="button">
      </router-link>
      <p>AudioSphere</p>
    </div>
    <div class="items">
      <p>Авторизация</p>
      <input type="text" placeholder="Логин" v-model="username" required>
      <input type="password" placeholder="Пароль" v-model="password" required>
      <button @click="checkUserAuthorization">Войти</button>
      <p @click="openRegistrationForm">Создать аккаунт</p>
    </div>
  </form>
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
    justify-content: space-evenly;
    width: 100%;
    position: relative;
    left: -60px;
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