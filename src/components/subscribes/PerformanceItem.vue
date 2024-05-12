<script setup>
import {ref} from 'vue';

const props = defineProps({
  idPerformer: Number,
  photoProfile: String,
  name: String
})

const urlPerformer = ref(`/performer/${props.idPerformer}`);
</script>

<template>
  <router-link :to="urlPerformer">
    <div class="item">
      <img :src="photoProfile" alt="performanceImg">
      <h2>{{ name }}</h2>
    </div>
  </router-link>
</template>

<style scoped>

</style>