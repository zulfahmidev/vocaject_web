<template>
  <div>
    <Navbar />
    <NuxtPage />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

* {
  font-family: Poppins;
}
</style>

<script setup>
$fetch('/', {
  baseURL: 'http://34.101.227.89/api/'
})
</script>
