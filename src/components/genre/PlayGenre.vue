<script setup>

</script>

<template>
  <div class="item">
    <p>Рок</p>
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
</style>