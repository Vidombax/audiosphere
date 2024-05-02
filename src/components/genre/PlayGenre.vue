<script setup>
  defineProps({
    title: String,
  })
</script>

<template>
  <div class="item">
    <p>{{ title }}</p>
    <img src="../../assets/play.png" style="cursor: pointer">
  </div>
</template>

<style scoped>
.genres .items .item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  margin-left: 10%;
}

.genres .items .item:nth-child(even) {
  background-color: #0D4045;
}

.genres .items .item:nth-child(odd) {
  background-color: #A24C34;
}

.genres .items .item p {
  color: #fff;
  font-size: larger;
}

@media screen and (max-width: 1350px) {
  .genres .items .item {
    margin-left: 10%;
    width: 250px;
  }
}

@media screen and (max-width: 1250px) {
  .genres .items .item {
    width: 300px;
  }
}
</style>