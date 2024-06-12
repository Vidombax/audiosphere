<script setup>
  import {onMounted, ref} from 'vue';
  import axios from "axios";
  import ItemAdminTableUsers from "@/components/admin/ItemAdminTableUsers.vue";

  const users = ref([]);
  const getUsers = async () => {
    try {
      const response = await axios.get('/api/user');
      users.value = response.data;
    }
    catch (err) {
      console.log(err);
    }
  }

  const usersSelector = ref([]);
  const getUsersBySelect = async () => {
    try {
      const select = document.querySelector('select');
      const typeUser = ref(false);

      if (select.value === "Исполнитель") {
        typeUser.value = true;
      }
      if (select.value === 'Пользователь') {
        typeUser.value = false;
      }

      const response = await axios.get(`/api/users-by-select/${typeUser.value}`);
      usersSelector.value = response.data;
      users.value = null;
    }
    catch (err) {
      console.log(err);
    }
  }

  const searchText = ref('');
  const getUsersBySearch = async () => {
    try {
      const response = await axios.get(`/api/users-by-nick/${searchText.value}`);
      users.value = response.data;
    }
    catch (err) {
      console.error(err);
    }
  }

  onMounted(async () => {
    await getUsers();
  })
</script>

<template>
  <div class="header-main">
    <h2>Фильтрация</h2>
    <select id="selector">
      <option value="Пользователь">Пользователь</option>
      <option value="Исполнитель">Исполнитель</option>
    </select>
    <input type="text" placeholder="Никнейм" v-model="searchText">
    <button @click="getUsersBySelect" v-if="searchText === ''">Применить</button>
    <button @click="getUsersBySearch" v-else>Применить</button>
  </div>
  <div class="items">
    <table>
      <tr>
        <th>ID</th>
        <th>Никнейм</th>
        <th>Почта</th>
        <th>Кол-во подписчиков</th>
        <th>Дата регистрации</th>
        <th>Верификация</th>
      </tr>
      <ItemAdminTableUsers v-for="item in users" v-if="users !== null"
        :key="item.id"
        :id="item.iduser"
        :name="item.name"
        :email="item.mail"
        :count-followers="item.count_follower"
        :date-registration="item.date_registration"
        :type-user="item.is_performance"
      />
      <ItemAdminTableUsers v-for="item in usersSelector" v-else
                      :key="item.ids"
                      :id="item.iduser"
                      :name="item.name"
                      :email="item.mail"
                      :count-followers="item.count_follower"
                      :date-registration="item.date_registration"
                      :type-user="item.is_performance"
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