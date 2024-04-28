<script setup>

import PerformersAfisha from "@/components/performer/PerformersAfisha.vue";
import PerformerCard from "@/components/performer/PerformerCard.vue";


document.title = 'AudioSphere | Исполнители'
</script>

<template>
  <PerformersAfisha />
  <div class="genres">
    <div class="header">
      <h4>Ваши исполнители</h4>
      <a href="#">Смотреть все</a>
    </div>
    <div class="items">
      <PerformerCard />
      <PerformerCard />
    </div>
  </div>
  <div class="performers">
    <div class="popularPerformers">
      <div class="header">
        <h5>Популярные исполнители</h5>
        <a href="">Смотреть все</a>
      </div>
      <div class="items">
        <PerformerCard />
        <PerformerCard />
      </div>
    </div>
    <div class="newPerformers">
      <div class="header">
        <h5>Новые исполнители</h5>
        <a href="">Смотреть все</a>
      </div>
      <div class="items">
        <PerformerCard />
        <PerformerCard />
      </div>
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

.genres .items {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 12px;
  gap: 24px;
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

.container main .performers {
  margin-top: 14px;
  display: flex;
  gap: 20px;
}

.container main .performers .popularPerformers {
  color: #fff;
  background-color: #202026;
  padding: 20px;
  border-radius: 6px;
  width: 55%;
}

.container main .performers .newPerformers{
  background-color: #202026;
  padding: 20px;
  color: #fff;
  border-radius: 6px;
  width: 55%;
}

.container main .performers .popularPerformers .header,
.container main .performers .newPerformers .header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}

.container main .performers .popularPerformers .header a,
.container main .performers .newPerformers .header a{
  color: #919191;
  font-size: 12px;
}

.container main .performers .popularPerformers .items,
.container main .performers .newPerformers .items{
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}
</style>