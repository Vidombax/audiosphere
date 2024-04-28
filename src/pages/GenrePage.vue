<script setup>
import PlayGenre from "@/components/genre/PlayGenre.vue";
import GenreAfisha from "@/components/genre/GenreAfisha.vue";

document.title = 'AudioSphere | Жанры'
</script>

<template>
  <GenreAfisha />
  <div class="genres">
    <div class="header">
      <h4>Все жанры</h4>
    </div>
    <div class="items">
      <PlayGenre />
      <PlayGenre />
      <PlayGenre />
      <PlayGenre />
      <PlayGenre />
      <PlayGenre />
      <PlayGenre />
      <PlayGenre />
    </div>
  </div>
</template>

<style scoped>

.genres {
  background-color: #202026;
  padding: 20px 12px 12px 20px;
  margin-top: 20px;
  border-radius: 12px;
}

.genres .header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}

.genres .header h4 {
  color: #fff;
}

.genres .header a {
  color: #919191;
  font-size: 12px;
  padding-right: 5px;
}

.genres .items {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 12px;
}

</style>