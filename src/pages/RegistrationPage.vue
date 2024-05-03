<script setup>
import {inject} from "vue";
const {openApp} = inject('app')

</script>

<template>
  <router-link to="/">
    <button @click="openApp">OK</button>
  </router-link>
</template>

<style scoped>

</style>