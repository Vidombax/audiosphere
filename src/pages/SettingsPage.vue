<script setup>

</script>

<template>
  <div class="settings">
      <div class="header">
        <h4>Настройки</h4>
      </div>
      <div class="items">
        <div class="settingsUser">
          <h3>Поменять аватарку</h3>
          <div>
            <box-icon name='upload' color='#ffffff' ></box-icon>
            <box-icon name='trash' color='#ffffff' ></box-icon>
          </div>
          <h3>Поменять никнейм</h3>
          <input type="text" value="ник">
          <h3>Поменять почту</h3>
          <input type="text" value="почта">
          <h3>Поменять пароль</h3>
          <input type="password" value="******">
        </div>
        <button>Сохранить</button>
      </div>
  </div>
</template>

<style scoped>
h3 {
  color: white;
}

.settings {
  background-color: #202026;
  padding: 20px 12px 12px 20px;
  border-radius: 12px;
  margin-top: 2.5rem;
}

.settings .header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}

.settings .header h4 {
  color: #fff;
}

.items {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  align-self: center;
}

.settingsUser {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-self: center;
  align-items: center;
}

.settingsUser div {
  display: flex;
  gap: 24px;
  justify-content: center;
  align-items: center;
}

input {
  border: none;
  padding: 10px;
  background-color: transparent;
  font-size: large;
  color: #fff;
  text-align: center;
}

button{
  padding: 12px 16px;
  background-color: #5773ff;
  border: none;
  border-radius: 14px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  font-size: x-large;
}
</style>