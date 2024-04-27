<script setup>

</script>

<template>
  <li>
    <box-icon name='caret-right-circle' type='solid' color='#ffffff' ></box-icon>
    <a href="#">Лучшее за 2023</a>
  </li>
</template>

<style>
.container .sidebar .menu ul li{
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
}
.container .sidebar .menu ul li a{
  font-size: 14px;
  font-weight: bold;
  transition: all 0.3s ease;
}
.container .sidebar .logo a:hover,
.container .sidebar .menu ul li:hover a,
.container .sidebar .menu ul li:hover i,
.container main header .nav-links a:hover{
  color: #5773ff;
}
</style>
