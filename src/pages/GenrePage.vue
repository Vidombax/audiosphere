<script setup>
import PlayGenre from "@/components/genre/PlayGenre.vue";
import GenreAfisha from "@/components/genre/GenreAfisha.vue";

document.title = 'AudioSphere | Жанры'
</script>

<template>
  <div class="containerGenres">
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
  </div>
</template>

<style scoped>

.containerGenres {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

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

@media screen and (max-width: 1540px) {
  .genres .items {
    gap: 6px;
    margin-left: -7%;
  }
}

@media screen and (max-width: 1250px) {
  .genres .items {
    gap: 24px;
  }
}

@media screen and (max-width: 950px) {
  .containerGenres {
    margin-left: -20%;
  }
  .genres .items {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}

@media screen and (max-width: 880px) {
  .containerGenres {
    margin-left: 40%;
  }

}
</style>