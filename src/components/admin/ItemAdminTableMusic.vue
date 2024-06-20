<script setup>
import {inject} from 'vue';

const {openModal} = inject('admin');

const props = defineProps({
  id: Number,
  name: String,
  namePerformance: String,
  countAuditions: Number,
  genre: String,
  duration: String,
})
</script>

<template>
  <tr>
    <td>{{ id }}</td>
    <td>{{ name }}</td>
    <td>{{ namePerformance }}</td>
    <td>{{ countAuditions }}</td>
    <td>{{ genre }}</td>
    <td>{{ duration }}</td>
    <td class="detalizationBtn" @click="openModal(id)">Открыть</td>
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