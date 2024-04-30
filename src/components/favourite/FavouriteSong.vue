<script setup>

</script>

<template>
  <div class="item">
    <p>1</p>
    <img src="../../assets/albumAfisha.png" alt="songImg">
    <p>The Highlights</p>
    <p>The Weeknd</p>
    <p>00:00</p>
    <div class="icon">
      <box-icon name='right-arrow' class="playMusic" type='solid' color='#ffffff' ></box-icon>
    </div>
    <box-icon name='heart' type='solid' color='#ffffff' ></box-icon>
  </div>
</template>

<style scoped>
h1,
h3,
p {
  color: #fff;
}

.item {
  display: flex;
  gap: 36px;
  align-items: center;
  justify-content: center;
}

.item p {
  font-weight: bold;
  font-size: large;
}

.item p:first-child {
  font-size: 24px;
}

.item img {
  width: 64px;
  height: 64px;
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