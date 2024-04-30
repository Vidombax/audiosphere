<script setup>

import PerformanceItem from "@/components/subscribes/PerformanceItem.vue";
import UserItem from "@/components/subscribes/UserItem.vue";
</script>

<template>
  <div class="containerSubscribes">
    <div class="performanceSubscribes">
      <div class="header">
        <h4>Исполнители на которых вы подписаны</h4>
      </div>
      <div class="items">
        <PerformanceItem />
        <PerformanceItem />
        <PerformanceItem />
        <PerformanceItem />
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
</style>