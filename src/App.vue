<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import '@/assets/main.css'; // 引入公共样式

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: MicrosoftYaHei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #4d4d4d;
  background-color: #f8f8f8;
}
.el-table th.is-leaf {
  background-color: #f6fbff;
}
</style>
