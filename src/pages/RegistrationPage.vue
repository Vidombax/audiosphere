<script setup>
import {inject, provide, ref} from "vue";

import FormAuthorization from "@/components/registration/FormAuthorization.vue";
import FormRegistration from "@/components/registration/FormRegistration.vue";

const {openApp} = inject('app')

document.title = 'AudioSphere | Авторизация'

const isRegistrationFormClose = ref(true)

const openRegistrationForm = () => {
  isRegistrationFormClose.value = false
}

const closeRegistrationForm = () => {
  isRegistrationFormClose.value = true
}

provide('registr', {
  openRegistrationForm,
  closeRegistrationForm,
})
</script>

<template>
  <FormAuthorization v-if="isRegistrationFormClose" :button="openApp"/>
  <FormRegistration v-else :button="openApp"/>
</template>

<style scoped>


</style>