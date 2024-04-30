<script setup>

</script>

<template>
  <router-link to="/playlist">
    <li>
      <box-icon name='caret-right-circle' type='solid' color='#ffffff' ></box-icon>
      <p>Лучшее за 2023</p>
    </li>
  </router-link>
</template>

<style>
.container .sidebar .menu ul li{
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
}
.container .sidebar .menu ul li p{
  font-size: 14px;
  font-weight: bold;
  transition: all 0.3s ease;
  color: #fff;
}
.container .sidebar .logo a:hover,
.container .sidebar .menu ul li:hover p,
.container .sidebar .menu ul li:hover i,
.container main header .nav-links a:hover{
  color: #5773ff;
}
</style>
