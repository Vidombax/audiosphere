<script setup>


import YourAlbum from "@/components/favouriteAlbum/YourAlbum.vue";

document.title = 'AudioSphere | Ваши альбомы'
</script>

<template>
  <div class="albums">
    <YourAlbum />
    <YourAlbum />
    <YourAlbum />
    <YourAlbum />
  </div>
</template>

<style scoped>
.albums {
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
}
</style>