<script setup>
  defineProps({
    name: String,
    image: String,
  })
</script>

<template>
  <div class="item">
    <img :src="image" class="performerImg" alt="performerImg">
    <a href="">{{ name }}</a>
  </div>
</template>

<style scoped>
.performerImg {
  width: 64px;
  height: 64px;
}

.genres .items .item,
.performers .popularPerformers .items .item,
.performers .newPerformers .items .item{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 12px;
  gap: 24px;
}

.genres .items .item:nth-child(1),
.performers .popularPerformers .items .item:nth-child(1),
.performers .newPerformers .items .item:nth-child(1){
  background-color: #0D4045;
}

.genres .items .item:nth-child(2),
.performers .popularPerformers .items .item:nth-child(2),
.performers .newPerformers .items .item:nth-child(2){
  background-color: #A69984;
}

.genres .items .item:nth-child(3),
.performers .popularPerformers .items .item:nth-child(3),
.performers .newPerformers .items .item:nth-child(3){
  background-color: #a24c34;
}

.genres .items .item:nth-child(4),
.performers .popularPerformers .items .item:nth-child(4),
.performers .newPerformers .items .item:nth-child(4){
  background-color: #5547a5;
}

a {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: larger;
  font-weight: bold;
}

@media screen and (max-width: 850px) {
  .performerImg {
    width: 32px;
    height: 32px;
  }
}
</style>