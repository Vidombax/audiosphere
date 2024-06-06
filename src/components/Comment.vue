<script setup>
import {ref} from 'vue';

const props = defineProps({
  idUser: Number,
  nameUser: String,
  commentUser: String,
  imgUser: String,
});

const urlUser = ref(`/performer/${props.idUser}`);
</script>

<template>
<div class="comment">
  <img :src="imgUser" alt="logo">
  <div class="info">
    <router-link :to="urlUser">{{ nameUser }}</router-link>
    <p>{{ commentUser }}</p>
  </div>
</div>
</template>

<style scoped>
.comment {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-bottom: 30px;
  position: relative;
  left: 7%;
}

img {
  width: 42px;
  height: 42px;
}

a {
  transition: .3s linear;
  color: #818385;
}

a:hover {
  color: #5773ff;
}

p {
  word-break: break-all;
  width: 230px;
  color: #d2cfcf;
}

.info {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 4px;
}
</style>