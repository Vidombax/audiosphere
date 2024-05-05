<script setup>
defineProps({
  title: String,
  albumCover: String,
  durationMusic: String
})
</script>

<template>
  <div class="item">
    <img :src="albumCover" alt="albumCover">
    <p class="name">{{ title }}</p>
    <p>{{ durationMusic }}</p>
    <box-icon name='right-arrow' class="playMusic" type='solid' color='#ffffff' style="cursor: pointer"></box-icon>
    <box-icon name='plus-square' type='solid' class="addMusicToFavourite" color='#ffffff' style="cursor: pointer"></box-icon>
  </div>
</template>

<style scoped>
.listSongs .items .item {
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
  margin-bottom: 10px;
  width: 270px;
}
.listSongs .items .item img {
  width: 50px;
  height: 50px;
}

.listSongs .items .item p {
  font-size: 12px;
}

.name {
  width: 120px;
}
</style>