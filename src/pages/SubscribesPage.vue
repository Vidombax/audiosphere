<script setup>
import {ref, onMounted} from "vue";
import axios from "axios";

import PerformanceItem from "@/components/subscribes/PerformanceItem.vue";
import UserItem from "@/components/subscribes/UserItem.vue";

document.title = 'AudioSphere | Подписки'

const performersSub = ref([]);
const usersSub = ref([]);
const idUser = ref(Number(localStorage.getItem('id')) || 0)

const getSubscribes = async () => {
  try {
    if (idUser.value !== 0) {
      const response = await axios.get(`/api/subscribes-performer/${idUser.value}`);
      performersSub.value = response.data;
    }
  }
  catch (err) {
    console.error(err);
  }
}

onMounted(async () => {
  await getSubscribes()
})
</script>

<template>
  <div class="containerSubscribes">
    <div class="performanceSubscribes">
      <div class="header">
        <h4>Исполнители на которых вы подписаны</h4>
      </div>
      <div class="items">
        <PerformanceItem v-for="item in performersSub" :key="item.id"
                         :photo-profile="item.profile_picture" :name="item.name"
                         :id-performer="item.iduser"
        />
      </div>
    </div>
    <div class="userSubscribes">
      <div class="header">
        <h4>Пользователи на которых вы подписаны</h4>
      </div>
      <div class="items">
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
      </div>
    </div>
  </div>
</template>

<style>
h2 {
  color: white;
}

.containerSubscribes {
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
}

.performanceSubscribes,
.userSubscribes {
  background-color: #202026;
  padding: 20px 12px 12px 20px;
  margin-top: 20px;
  border-radius: 12px;
}

.performanceSubscribes .header,
.userSubscribes .header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}

.performanceSubscribes .header h4,
.userSubscribes .header h4 {
  color: #fff;
}

.performanceSubscribes .items ,
.userSubscribes .items {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 32px;
}

.performanceSubscribes .item,
.userSubscribes .item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 6px;
}

.performanceSubscribes .item img,
.userSubscribes .item img {
  width: 150px;
  height: 150px;
}

.performanceSubscribes .item p,
.userSubscribes .item p {
  color: #676767;
  font-size: 14px;
}

@media screen and (max-width: 1340px) {
  .performanceSubscribes .items ,
  .userSubscribes .items {
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
}

@media screen and (max-width: 1020px) {
  .performanceSubscribes,
  .userSubscribes {
    width: 170%;
  }
}

@media screen and (max-width: 850px) {
  .performanceSubscribes,
  .userSubscribes {
    width: 120%;
  }
}

@media screen and (max-width: 660px) {
  .performanceSubscribes .items ,
  .userSubscribes .items {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 24px;
  }
  .performanceSubscribes,
  .userSubscribes {
    width: 110%;
  }
}

@media screen and (max-width: 510px) {
  .performanceSubscribes .items ,
  .userSubscribes .items {
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
  .performanceSubscribes,
  .userSubscribes {
    width: 130%;
  }
}
</style>