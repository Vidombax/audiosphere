<script setup>
  import {inject, ref} from 'vue';

  const {openModal} = inject('admin')

  const props = defineProps({
    id: Number,
    name: String,
    email: String,
    countFollowers: Number,
    dateRegistration: String,
    typeUser: Boolean,
  })

  const typeUserString = ref('');

  if (props.typeUser === false) {
    typeUserString.value = 'Пользователь'
  }
  else {
    typeUserString.value = 'Исполнитель';
  }
</script>

<template>
  <tr>
    <td>{{ id }}</td>
    <td>{{ name }}</td>
    <td>{{ email }}</td>
    <td>{{ countFollowers }}</td>
    <td>{{ dateRegistration.substring(0, 10) }}</td>
    <td>{{ typeUserString }}</td>
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