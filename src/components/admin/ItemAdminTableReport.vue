<script setup>
import axios from "axios";

const props = defineProps({
  id: Number,
  nameUser: String,
  typeReport: String,
  nameMusic: String,
})

const denyReport = async () => {
  const response = await axios.delete(`api/report/${props.id}`);
  location.reload();
}
</script>

<template>
  <tr>
    <td>{{ id }}</td>
    <td>{{ nameUser }}</td>
    <td>{{ typeReport }}</td>
    <td>{{ nameMusic }}</td>
    <td class="detalizationBtn" @click="denyReport">Да</td>
  </tr>
</template>

<style scoped>
.detalizationBtn {
  cursor: pointer;
  color: #7099be;
  border-radius: 4px;
}
.detalizationBtn:hover {
  background-color: rgba(71, 106, 138, 0.2);
}
</style>