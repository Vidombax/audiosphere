<script setup>
import {onMounted, ref} from 'vue';
import axios from "axios";

const props = defineProps({
  idUser: Number,
});

const userStatus = ref(false);
const getStatusUser = async () => {
  try {
    const response = await axios.get(`api/user/${props.idUser}`);
    userStatus.value = response.data.is_performance;
  }
  catch (error) {
    console.error(error);
  }
}

const removeStatus = async () => {
  const response = await axios.put(`api/performer-status/${props.idUser}`);
  location.reload();
}

onMounted(async () => {
  await getStatusUser();
})
</script>

<template>
  <div class="items">
    <button v-if="userStatus" @click="removeStatus">Убрать статус исполнителя</button>
  </div>
</template>

<style scoped>
.items {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}
</style>