<script setup>
import {onMounted, ref} from 'vue';
import axios from "axios";
import ItemAdminTableSub from "@/components/admin/ItemAdminTableSub.vue";

const subscribes = ref([]);
const getSubscribes = async () => {
  try {
    const response = await axios.get('api/subscribes-admin');
    subscribes.value = response.data;
  }
  catch (err) {
    console.error(err);
  }
}

onMounted(async () => {
  await getSubscribes();
})
</script>

<template>
  <table>
    <tr>
      <th>ID</th>
      <th>Подписчик</th>
      <th>Пользователь</th>
      <th>Дата подписки</th>
    </tr>
    <ItemAdminTableSub v-for="item in subscribes"
                       :key="item.id"
                       :id="item.id"
                       :name-follower="item.follower"
                       :name-following="item.following"
                       :date-following="item.date_following"
    />
  </table>
</template>

<style scoped>
  table {
    color: white;
    text-align: center;
    width: 100%;
  }
  th {
    font-size: larger;
  }
  tr, td {
    padding: 5px;
    font-size: large;
  }
</style>