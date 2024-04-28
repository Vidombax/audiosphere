<script setup>

</script>

<template>
  <div class="info">
    <h2>Lost Emotions</h2>
    <h4>Rion Clarke</h4>
    <h5>63 миллиона прослушиваний</h5>
    <div class="buttons">
      <button>Слушать</button>
      <box-icon name='heart' type='solid' color='#ffffff' ></box-icon>
    </div>
  </div>
</template>

<style scoped>
.container main .trending .left .info{
  margin-top: 12px;
  padding: 26px;
}

.container main .trending .left .info h2{
  font-size: 56px;
  margin-bottom: 8px;
}

.container main .trending .left .info h4,
.container main .trending .left .info h5{
  display: inline;
}

.container main .trending .left .info h5{
  margin-left: 12px;
  color: #919191;
}

.container main .trending .left .info .buttons{
  margin-top: 30px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.container main .trending .left .info .buttons button{
  padding: 12px 16px;
  background-color: #5773ff;
  border: none;
  border-radius: 14px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}

.container main .trending .left .info .buttons i{
  color: #5773ff;
  font-size: 20px;
  border: 2px solid #fff;
  padding: 10px;
  border-radius: 50%;
}
</style>