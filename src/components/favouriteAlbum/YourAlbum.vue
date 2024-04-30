<script setup>

</script>

<template>
  <div class="favouriteAlbum">
    <p class="numberAlbum">1</p>
    <img src="../../assets/albumAfisha.png" alt="albumCover">
    <div class="infoAlbum">
      <h2>The Highlights</h2>
      <div>
        <h3>The Weeknd</h3>
        <p>20 треков</p>
        <p>R&B</p>
      </div>
      <div class="buttons">
        <button>Слушать</button>
        <box-icon name='heart' type='solid' color='#ffffff' ></box-icon>
      </div>
    </div>
  </div>
</template>

<style scoped>
h3,
h2,
h5,
p {
  color: #fff;
}

.favouriteAlbum {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  background-color: #202026;
  padding: 20px 12px 12px 20px;
  margin-top: 20px;
  border-radius: 12px;
}

.favouriteAlbum img {
  width: 150px;
  height: 150px;
}

.infoAlbum {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.infoAlbum div {
  display: flex;
  gap: 24px;
  align-items: center;
}

.buttons{
  display: flex;
  align-items: center;
  gap: 12px;
}

button{
  padding: 14px;
  background-color: #5773ff;
  border: none;
  border-radius: 14px;
  color: #fff;
  font-size: larger;
  font-weight: bold;
  cursor: pointer;
}

.numberAlbum {
  font-size: 32px;
  font-weight: bold;
  margin-right: 12px;
}
</style>