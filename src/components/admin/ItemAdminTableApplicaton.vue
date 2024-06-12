<script setup>
import axios from "axios";

const props = defineProps({
  id: Number,
  idUser: Number,
  name: String,
  email: String,
  dateApplication: String,
  applicationStatus: Number,
})

const approveApplication = async () => {
  try {
    const response = await axios.put(`api/application`, {
      status: 1,
      id: props.idUser,
    });
    const update = await axios.put('api/performer', {
      id: props.idUser,
    })
    location.reload();
  }
  catch (err) {
    console.error(err);
  }
}

const denyApplication = async () => {
  try {
    const response = await axios.put(`api/application`, {
      status: 2,
      id: props.idUser,
    });
    location.reload();
  }
  catch (err) {
    console.error(err);
  }
}

</script>

<template>
  <tr>
    <td>{{ id }}</td>
    <td>{{ name }}</td>
    <td>{{ email }}</td>
    <td>{{ dateApplication.substring(0, 10) }}</td>
    <td v-if="applicationStatus === 1">Выполнена</td>
    <td v-else-if="applicationStatus === 2">Отклонена</td>
    <td v-else>
      <box-icon name='check' color='#00ff07' @click="approveApplication"></box-icon>
      <box-icon name='x' color='#ff0000' @click="denyApplication"></box-icon>
    </td>
  </tr>
</template>

<style scoped>

</style>