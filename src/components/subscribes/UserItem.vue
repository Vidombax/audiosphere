<script setup>
import {ref} from 'vue';

const props = defineProps({
  idUser: Number,
  photoProfile: String,
  name: String
})

const urlUser = ref(`/performer/${props.idUser}`);
</script>

<template>
  <router-link :to="urlUser">
    <div class="item">
      <img :src="photoProfile" alt="performanceImg">
      <h2>{{ name }}</h2>
    </div>
  </router-link>
</template>

<style scoped>

</style>