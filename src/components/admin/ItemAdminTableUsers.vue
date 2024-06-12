<script setup>
  import {ref} from 'vue';

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
  </tr>
</template>

<style scoped>

</style>