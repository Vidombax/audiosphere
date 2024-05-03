<script setup>
import {inject} from 'vue'

const {closeRegistrationForm} = inject('registr')

defineProps({
  button: Object
})
</script>

<template>
  <form class="form">
    <div class="header">
      <router-link to="/">
        <img src="../../assets/leftArrow.png" alt="leftArrow" @click="button">
      </router-link>
      <p>AudioSphere</p>
    </div>
    <div class="items">
      <p>Регистрация</p>
      <input type="text" placeholder="Логин" required>
      <input type="text" placeholder="Почта" required>
      <input type="password" placeholder="Пароль" required>
      <button>Зарегистрироваться</button>
      <p @click="closeRegistrationForm">У меня уже есть аккаунт</p>
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
    height: 500px;
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