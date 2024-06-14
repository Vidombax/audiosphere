<script setup>
const props = defineProps({
  id: Number,
  nameFollower: String,
  nameFollowing: String,
  dateFollowing: String,
})
</script>

<template>
  <tr>
    <td>{{ id }}</td>
    <td>{{ nameFollower }}</td>
    <td>{{ nameFollowing }}</td>
    <td>{{ dateFollowing.substring(0, 10) }}</td>
  </tr>
</template>

<style scoped>

</style>