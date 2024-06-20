<script setup>
import axios from "axios";

const props = defineProps({
  idMusic: Number,
});

const deleteMusic = async () => {
  const response = await axios.delete(`api/music/${props.idMusic}`);
  location.reload();
}
</script>

<template>
  <div class="items">
    <button @click="deleteMusic">Удалить музыку</button>
  </div>
</template>

<style scoped>
.items {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  justify-items: center;
}

label {
  cursor: pointer;
  display: block;
  color: #919191;
  font-size: 16px;
  width: 150px;
}

.inputFile {
  color: transparent;
  position: relative;
  display: none;
}
</style>