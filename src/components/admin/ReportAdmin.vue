<script setup>
import {onMounted, ref} from 'vue';
import axios from "axios";
import ItemAdminTableReport from "@/components/admin/ItemAdminTableReport.vue";

const reports = ref([]);
const getReports = async () => {
  try {
    const response = await axios.get('api/reports');
    reports.value = response.data;
  }
  catch (err) {
    console.error(err);
  }
}

onMounted(async () => {
  await getReports();
})
</script>

<template>
  <table>
    <tr>
      <th>ID</th>
      <th>Заявитель</th>
      <th>Жалоба</th>
      <th>Песня</th>
      <th>Отклонить?</th>
    </tr>
    <ItemAdminTableReport v-for="item in reports"
                       :key="item.id"
                       :id="item.id"
                       :name-user="item.name"
                       :type-report="item.reason_complaint" :name-music="item.name_music"
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