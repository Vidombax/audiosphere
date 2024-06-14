<script setup>
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
  </tr>
</template>

<style scoped>

</style>