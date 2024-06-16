<script setup>
  import {inject} from "vue";
  import ItemsUsersModal from "@/components/admin/modalItemsAdmin/ItemsUsersModal.vue";
  import ItemGenresModal from "@/components/admin/modalItemsAdmin/ItemGenresModal.vue";

  const {closeModal} = inject('admin')
  const props = defineProps({
    typeDetaliztaion: String,
    idObject: Number,
    selectedTable: Number,
  })
</script>

<template>
  <div class="detalModal">
    <div class="header">
      <h3>Детализация {{ typeDetaliztaion }} №{{ idObject }}</h3>
      <h4 @click="closeModal">Закрыть</h4>
    </div>
    <ItemsUsersModal v-if="selectedTable === 0"
                     :id-user="idObject"
    />
    <ItemGenresModal v-else-if="selectedTable === 5"
                     :id-genre="idObject"
    />
  </div>
</template>

<style scoped>
.detalModal {
  position: fixed;
  background-color: #202026;
  padding: 20px;
  color: #fff;
  border-radius: 6px;
  right: 0;
  top: 10%;
  width: 78%;
}

.detalModal .header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}

.detalModal .header h4 {
  color: #919191;
  font-size: 12px;
  cursor: pointer;
}
</style>