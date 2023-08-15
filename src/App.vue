<script setup>
import { RouterView } from 'vue-router';





</script>

<template>

  <RouterView />

  
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;

}

a {
  text-decoration: none;
  color: black;
}
ul {
  list-style-type: none;
}

button,
.photo-item {
  cursor: pointer;
}
button, a {
  border-radius: 10px;
}

img {
  filter: contrast(150%)
}
</style>
