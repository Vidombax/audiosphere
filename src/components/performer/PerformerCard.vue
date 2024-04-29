<script setup>

</script>

<template>
  <div class="item">
    <img src="../../assets/newPerfomer.png" class="performerImg">
    <a href="">Хаски</a>
    <img src="../../assets/play.png" style="cursor: pointer" class="playBtn">
  </div>
</template>

<style scoped>
.performerImg {
  width: 64px;
  height: 64px;
}

.playBtn {
  width: 32px;
  height: 32px;
}

.genres .items .item,
.performers .popularPerformers .items .item,
.performers .newPerformers .items .item{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 12px;
}

.genres .items .item:nth-child(odd),
.performers .popularPerformers .items .item:nth-child(odd),
.performers .newPerformers .items .item:nth-child(odd){
  background-color: #0D4045;
}

.genres .items .item:nth-child(even),
.performers .popularPerformers .items .item:nth-child(even),
.performers .newPerformers .items .item:nth-child(even){
  background-color: #A69984;
}

.genres .items .item a {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.genres .items .item a p {
  margin-top: 8px;
  color: #fff;
}

@media screen and (max-width: 850px) {
  .performerImg {
    width: 32px;
    height: 32px;
  }
}
</style>