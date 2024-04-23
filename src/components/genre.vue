<script setup>

</script>

<template>
  <div class="item">
    <p>Электро<br>Поп</p>
  </div>
</template>

<style scoped>
.container main .playlist .genres .items .item{
  padding: 24px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  cursor: pointer;
}

.container main .playlist .genres .items .item p{
  font-size: 14px;
  font-weight: bold;
}

.container main .playlist .genres .items .item:nth-child(1){
  background-color: #476a8a;
}

.container main .playlist .genres .items .item:nth-child(2){
  background-color: #a69984;
}

.container main .playlist .genres .items .item:nth-child(3){
  background-color: #a24c34;
}

.container main .playlist .genres .items .item:nth-child(4){
  background-color: #0d4045;
}

.container main .playlist .genres .items .item:nth-child(5){
  background-color: #a67894;
}

.container main .playlist .genres .items .item:nth-child(6){
  background-color: #5547a5;
}
</style>