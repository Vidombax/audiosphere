<script setup>
import {ref, provide} from "vue";

import 'boxicons'
import MusicPlayer from "@/components/musicPlayer.vue";
import Sidebar from "@/components/Sidebar.vue";
import Profile from "@/components/Profile.vue";
import Header from "@/components/Header.vue";

const visibleComponent = ref(true)

const openApp = () => {
  visibleComponent.value = true
}

const closeApp = () => {
  visibleComponent.value = false
}

provide('app', {
  closeApp,
  openApp
})
</script>

<template>
  <div class="container">
    <Sidebar v-if="visibleComponent"/>
    <div v-else></div>
    <main>
      <Header v-if="visibleComponent"/>
      <div v-else></div>
      <router-view></router-view>
    </main>
    <div class="right-section" v-if="visibleComponent">
      <Profile />
      <MusicPlayer />
    </div>
    <div v-else></div>
  </div>
</template>

<style>
img{
  object-fit: cover;
  object-position: top;
  border-radius: 8px;
}

.container main{
  padding: 20px 36px;
  margin-left: 65px;
}

.container .right-section{
  padding: 20px 36px 20px 0;
}

.container .sidebar .logo button{
  display: none;
  align-items: center;
  justify-content: center;
  background-color: #1d1d1d;
  border: 1px solid #464748;
  font-size: 20px;
  padding: 4px;
  border-radius: 8px;
  cursor: pointer;
}


@media screen and (max-width: 1540px) {
  .container main {
    margin-left: 20px;
  }
}

@media screen and (max-width: 1250px) {
  .container main {
    margin-left: 25%;
  }
}

@media screen and (max-width: 950px) {
  .container main {
    margin-left: 30%;
    width: 95%;
  }
  .right-section {
    width: 320px;
  }
}

@media screen and (max-width: 850px) {
  .right-section {
    width: 220px;
  }
}

@media screen and (max-width: 750px) {
  .right-section {
    width: 120px;
  }
}

@media screen and (max-width: 700px) {
  .container main {
    margin-left: 22%;
    width: 95%;
  }
}

@media screen and (max-width: 650px) {
  .container main {
    margin-left: 0;
  }
  .right-section {
    position: relative;
    left: -20%;
    width: 50px;
  }
}
</style>
