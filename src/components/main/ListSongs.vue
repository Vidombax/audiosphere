<script setup>
import {inject, onMounted, ref} from "vue";
import ListSong from "@/components/main/ListSong.vue";

const {closeListSongs} = inject('musicPlayer')
const {addMusicToList} = inject('app')
const listSong = ref([])
const url = ref('')

onMounted(async () => {
  listSong.value = (await addMusicToList()).music;
  url.value = ((await addMusicToList()).url)
});
</script>

<template>
  <div class="listSongs">
    <div class="header">
      <box-icon name='chevron-right' type='solid' color='#ffffff' style="cursor: pointer" @click="closeListSongs()"></box-icon>
    </div>
    <div class="items">
      <ListSong v-for="item in listSong" :key="item.id" v-if="listSong.length !== undefined"
                :id-music="item.id"
                :album-cover="item.album_cover"
                :title="item.name_music"
                :duration-music="item.duration_music"
                :url-api="url"
      />
      <ListSong v-else
                :id-music="listSong.id"
                :album-cover="listSong.album_cover"
                :title="listSong.name_music"
                :duration-music="listSong.duration_music"
                :url-api="url"
      />
    </div>
  </div>
  <div class="blackout">

  </div>
</template>

<style scoped>

.listSongs {
  padding: 15px;
  width: 325px;
  background-color: #17171c;
  position: absolute;
  left: 7.5%;
  height: 50vh;
}

.listSongs .header {
  display: flex;
  float: right;
  margin-bottom: 10px;
}

.listSongs .items {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 395px;
  width: 300px;
  overflow-y: auto;
}

.blackout {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.45);
  width: 26px;
  height: 60vh;
}

@media screen and (min-width: 1550px) {
  .listSongs {
    height: 65vh;
    left: 5.8%;
    width: 425px;
    margin-top: 0;
  }
  .blackout {
    height: 65vh;
  }
  .listSongs .header {
    margin-bottom: 0;
  }
  .listSongs .items {
    width: 370px;
    height: 500px;
    margin-top: -10px;
  }
}

@media screen and (max-width: 1540px) {
  .listSongs {
    width: 325px;
    left: 7.3%;
    margin-top: 0;
    height: 59vh;
  }
  .blackout {
    height: 60vh;
  }
  .listSongs .header {
    margin-bottom: 0;
  }
  .listSongs .items {
    width: 295px;
    height: 500px;
    margin-top: -10px;
  }
}
</style>