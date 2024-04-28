<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";

const items = ref([])

const fetchData = async () => {
  try {
    const response = await axios.get('api/data')
    items.value = response.data
  }
  catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  await fetchData()
})
</script>

<template>
  <div class="profile">
    <box-icon name='cog' type='solid' color='#ffffff' style="cursor: pointer;"></box-icon>
    <router-link to="/account">
      <div class="user">
        <div class="left">
          <img src="../assets/profile.png">
        </div>
        <div class="right">
          <h5 v-if="items.length > 0">{{ items[0].nameUser }}</h5>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.container .right-section .profile{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 18px;
  margin-bottom: 40px;
}

.container .right-section .profile .user{
  display: flex;
}

.container .right-section .profile .user .left{
  display: flex;
  align-items: center;
  background: #32323d;
  padding: 6px;
  border-radius: 6px 0 0 6px;
}

.container .right-section .profile .user .left img{
  width: 30px;
  height: 30px;
}

.container .right-section .profile .user .right{
  background-color: #25252d;
  border-radius: 0 6px 6px 0;
  padding: 13px;
  color: #fff;
}
</style>
