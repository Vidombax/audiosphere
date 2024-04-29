<script setup>

</script>

<template>
  <div class="item">
    <img src="../../assets/newPerfomer.png" class="performerImg">
    <a href=""><h2>Хаски</h2></a>
    <div class="icon">
      <box-icon name='right-arrow' class="playMusic" type='solid' color='#ffffff' ></box-icon>
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-weight: normal;
}

.performerImg {
  width: 55px;
  height: 55px;
}

.playBtn {
  width: 32px;
  height: 32px;
}

.favouritesPerformances .items .item{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 12px;
}

.icon{
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #32323d;
  padding: 6px;
  border: 2px solid #464748;
  border-radius: 6px;
}
</style>