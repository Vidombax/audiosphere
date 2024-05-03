<script setup>
import {onMounted, ref, inject} from "vue";
import axios from "axios";

const items = ref([])
const id = ref(Number(localStorage.getItem('id')) || 0)
const isLogged = ref(false)
const urlAddress = ref('/registration')

const {closeApp} = inject('app')

const fetchUser = async () => {
  try {
    const response = await axios.get(`/api/user/${id.value}`)
    if (response.data) {
      items.value = response.data

      isLogged.value = true
      urlAddress.value = '/account'
    }
  }
  catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  await fetchUser()
})
</script>

<template>
  <div class="profile">
    <router-link to="/settings">
      <box-icon name='cog' type='solid' color='#ffffff' style="cursor: pointer;"></box-icon>
    </router-link>
    <router-link :to="urlAddress">
      <div class="user" v-if="isLogged">
        <div class="left">
          <img :src="items.profile_picture">
        </div>
        <div class="right">
          <h5>{{ items.name }}</h5>
        </div>
      </div>
      <div class="user" @click="closeApp" v-else style="border-radius: 6px; background: #32323d; padding: 10px">
        <h5>Войти</h5>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.container .right-section .profile {
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

@media screen and (max-width: 850px) {
  .container .right-section .profile .user .left {
    border-radius: 6px;
  }
  .profile .user .right {
    display: none;
  }
}

@media screen and (max-width: 700px) {
  .container .right-section .profile {
    position: relative;
    left: 80%;
  }
}
</style>
