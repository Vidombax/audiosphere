<script setup>
import {inject} from "vue";
import ItemsGenresAddModal from "@/components/admin/addModalItems/ItemsGenresAddModal.vue";

const {closeAddModal} = inject('admin')
const props = defineProps({
  idObject: Number,
  selectedTable: Number,
})
</script>

<template>
  <div class="detalModal">
    <div class="header">
      <h4 @click="closeAddModal">Закрыть</h4>
    </div>
    <ItemsGenresAddModal v-if="selectedTable === 5"/>
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