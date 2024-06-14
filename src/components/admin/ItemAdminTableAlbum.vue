<script setup>
import {ref} from 'vue';
const props = defineProps({
  id: Number,
  name: String,
  namePerformance: String,
  datePublication: String,
  type: Boolean,
})

const nameType = ref('');
if (props.type === true) {
  nameType.value = 'Плейлист';
}
else {
  nameType.value = 'Альбом'
}
</script>

<template>
  <tr>
    <td>{{ id }}</td>
    <td>{{ name }}</td>
    <td>{{ namePerformance }}</td>
    <td>{{ datePublication.substring(0, 10) }}</td>
    <td>{{ nameType }}</td>
  </tr>
</template>

<style scoped>

</style>