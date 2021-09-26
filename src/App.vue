<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300&display=swap');
#app {
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #A9B1BD;
  margin-top: 10px;
}

body {
  overflow-y: hidden;
}

.AppView {
  width: 100%;
  height: 100%;
}

</style>
