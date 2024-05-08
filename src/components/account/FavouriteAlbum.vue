<script setup>

</script>

<template>
  <div class="item">
    <img src="../../assets/albumAfisha.png" alt="albumCover">
    <div class="infoSong">
      <h4>The Highlights</h4>
      <h5>The Weeknd</h5>
    </div>
    <div class="icon">
      <box-icon name='right-arrow' class="playMusic" type='solid' color='#ffffff' ></box-icon>
    </div>
  </div>
</template>

<style scoped>
p,
h4,
h5,
img{
  color: #fff;
}

.infoSong h4 {
  margin-bottom: 8px;
}

.infoSong h5 {
  font-weight: normal;
}

.favouritesAlbums .items .item img {
  width: 50px;
  height: 50px;
  border-radius: 6px;
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