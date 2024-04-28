<script setup>

</script>

<template>
  <div class="genres">
    <div class="header">
      <h4>Новые альбомы</h4>
      <a href="#">Смотреть все</a>
    </div>
    <div class="items">
      <div class="item">
        <a href="#">
          <img src="../../assets/albumCover1.jpeg" alt="albumCover">
          <p>Название альбома</p>
        </a>
      </div>
      <div class="item">
        <a href="#">
          <img src="../../assets/albumCover1.jpeg" alt="albumCover">
          <p>Название альбома</p>
        </a>
      </div>
      <div class="item">
        <a href="#">
          <img src="../../assets/albumCover1.jpeg" alt="albumCover">
          <p>Название альбома</p>
        </a>
      </div>
      <div class="item">
        <a href="#">
          <img src="../../assets/albumCover1.jpeg" alt="albumCover">
          <p>Название альбома</p>
        </a>
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
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 12px;
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
</style>