<script setup>
  import axios from "axios";
  import {inject, ref} from "vue";

  const props = defineProps({
    name: String,
    image: String,
    idPerformance: Number,
  })

  const musicByPerformer = ref([])
  const url = ref(``)

  const getMusicByAlbum = async () => {
    try {
      url.value = `/api/music-performer/${props.idPerformance}`
      const response = await axios.get(url.value)
      musicByPerformer.value = response.data
    }
    catch (err) {
      console.error(err)
    }
  }

  const {addToPlayerMusic} = inject('app')

  const handleClick = async () => {
    await getMusicByAlbum()
    await addToPlayerMusic(musicByPerformer.value[0].id, url.value)
  }
</script>

<template>
  <div class="item">
    <p hidden>{{ idPerformance }}</p>
    <img :src="image" class="performerImg" alt="performerImg">
    <a href="">{{ name }}</a>
    <box-icon name='right-arrow' class="playMusic" type='solid' color='#ffffff' @click="handleClick"></box-icon>
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
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  align-items: center;
  padding: 10px;
  border-radius: 12px;
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