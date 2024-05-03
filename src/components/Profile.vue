<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";

const items = ref([])
const isLogged = ref(false)
const urlAddress = ref('/registration')

const userIsRegistration = () => {
  isLogged.value = true
  urlAddress.value = '/account'
}

const userIsNotRegistration = () => {
  isLogged.value = false
}

const fetchData = async () => {
  try {
    const response = await axios.get('/api/user')
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
    <router-link to="/settings">
      <box-icon name='cog' type='solid' color='#ffffff' style="cursor: pointer;"></box-icon>
    </router-link>
    <router-link :to="urlAddress">
      <div class="user">
        <div class="left" v-if="isLogged">
          <img v-if="items.length > 0" :src="items[0].profile_picture">
        </div>
        <div class="left" style="display: none" v-else>

        </div>
        <div class="right" v-if="isLogged">
          <h5 v-if="items.length > 0">{{ items[0].name }}</h5>
        </div>
        <div class="right" v-else style="border-radius: 6px">
          <h5>Вход не выполнен</h5>
        </div>
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
