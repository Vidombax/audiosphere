<script setup>
defineProps({
  nameAlbum: String,
  performance: String,
  albumCover: String,
  numberSet: Number,
})
</script>

<template>
  <div class="item">
    <div class="info">
      <p>{{ numberSet }}</p>
      <img :src="albumCover">
      <div class="details">
        <h5>{{ nameAlbum }}</h5>
        <p>{{ performance }}</p>
      </div>
    </div>
    <div class="actions">
      <div class="icon">
        <box-icon name='right-arrow' class="playMusic" type='solid' color='#ffffff' ></box-icon>
      </div>
      <box-icon name='plus-square' type='solid' class="addMusicToFavourite" color='#ffffff' ></box-icon>
    </div>
  </div>
</template>

<style scoped>
.container main .albums .popularAlbums .items .item{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.container main .albums .popularAlbums .items .item:last-child{
  margin-bottom: 0;
}

.details h5 {
  margin-bottom: 0px;
}

.playMusic {
  cursor: pointer;
}

.addMusicToFavourite {
  cursor: pointer;
}

.container main .albums .popularAlbums .items .item .info,
.container main .albums .popularAlbums .items .item .actions{
  display: flex;
  align-items: center;
  gap: 20px;
}

.container main .albums .popularAlbums .items .item .info p{
  color: #919191;
  font-size: 12px;
  font-weight: bold;
  margin-top: 6px;
}

.container main .albums .popularAlbums .items .item .info img{
  width: 50px;
  height: 50px;
  border-radius: 6px;
}

.container main .albums .popularAlbums .items .item .actions p{
  font-size: 13px;
  font-weight: bold;
}

.container main .albums .popularAlbums .items .item .actions .icon{
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #32323d;
  padding: 6px;
  border: 2px solid #464748;
  border-radius: 6px;
}

.container main .albums .popularAlbums .items .item .actions .icon i{
  font-size: 10px;
  color: #5773ff;
}

.container main .albums .popularAlbums .items .item .actions i{
  color: #919191;
}
</style>