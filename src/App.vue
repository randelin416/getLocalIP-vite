<template>
  <div id="app">
    <p>BASE_IP: {{ baseIP }}</p>
  </div>
</template>

<script setup>
const baseIP = import.meta.env.BASE_IP;
console.log(baseIP); // 輸出 BASE_IP 的值
</script>

<style>
/* 這裡可以加入你的樣式 */
</style>
