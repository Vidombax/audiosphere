<script setup>
  import {inject} from "vue";

  const props = defineProps({
    title: String,
    idTag: Number,
  })

  const {addToPlayerMusic} = inject('app')

  const handleClick = async () => {
    await addToPlayerMusic(props.idTag, `/api/music-tag/${props.idTag}`)
  }
</script>

<template>
  <div class="item">
    <p hidden>{{ idTag }}</p>
    <p>{{ title }}</p>
    <img src="../../assets/play.png" style="cursor: pointer" @click="handleClick">
  </div>
</template>

<style scoped>
.genres .items .item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  margin-left: 10%;
}

.genres .items .item:nth-child(even) {
  background-color: #0D4045;
}

.genres .items .item:nth-child(odd) {
  background-color: #A24C34;
}

.genres .items .item p {
  color: #fff;
  font-size: larger;
}

@media screen and (max-width: 1350px) {
  .genres .items .item {
    margin-left: 10%;
    width: 250px;
  }
}

@media screen and (max-width: 1250px) {
  .genres .items .item {
    width: 300px;
  }
}
</style>