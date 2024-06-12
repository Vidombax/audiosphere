<script setup>
import {onMounted, ref} from 'vue';
import ItemAdminTableApplicaton from "@/components/admin/ItemAdminTableApplicaton.vue";
import axios from "axios";

const applications = ref([]);
const getApplications = async () => {
  try {
    const response = await axios.get('/api/applications');
    applications.value = response.data;
  }
  catch (err) {
    console.error(err);
  }
}

onMounted(async () => {
  await getApplications();
})
</script>

<template>
  <div class="header-main">
    <h2>Фильтрация</h2>
    <select>
      <option value="0">В работе</option>
      <option value="1">Выполнено</option>
      <option value="2">Отклонено</option>
    </select>
    <button>Применить</button>
  </div>
  <div class="items">
    <table>
      <tr>
        <th>ID</th>
        <th>Заявитель</th>
        <th>Почта</th>
        <th>Дата заявки</th>
        <th>Решение</th>
      </tr>
      <ItemAdminTableApplicaton v-for="item in applications"
                                :key="item.id"
                                :id-user="item.id_user"
                                :id="item.id"
                                :email="item.mail"
                                :name="item.name"
                                :date-application="item.date_application"
                                :application-status="item.application_status"
      />
    </table>
  </div>
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