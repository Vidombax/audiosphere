<script setup>
  import axios from "axios";
  import {inject, ref} from "vue";

  const props = defineProps({
    nameAlbum: String,
    albumCover: String,
    idAlbum: Number,
  })

  const musicByAlbum = ref([])
  const url = ref(``)

  const getMusicByAlbum = async () => {
    try {
      url.value = `/api/music-album/${props.idAlbum}`
      const response = await axios.get(url.value)
      musicByAlbum.value = response.data
      console.log(musicByAlbum.value)
    }
    catch (err) {
      console.error(err)
    }
  }

  const {addToPlayerMusic} = inject('app')

  const handleClick = async () => {
    await getMusicByAlbum()
    await addToPlayerMusic(musicByAlbum.value[0].id, url.value)
  }
</script>

<template>
  <div class="item">
    <img :src="albumCover" alt="albumCover">
    <div class="infoSong">
      <h4>{{ nameAlbum }}</h4>
    </div>
    <div class="icon">
      <box-icon name='right-arrow' class="playMusic" type='solid' color='#ffffff' @click="handleClick"></box-icon>
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

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.infoSong {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.infoSong h4 {
  margin-bottom: 8px;
}

.infoSong h5 {
  font-weight: normal;
}

.item img {
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