<script setup lang="ts">
import { useStore } from "vuex";
const store = useStore();
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

// 根据localStorage的数值去展示theme
const initTheme = () => {
  let theme = localStorage.getItem('theme');
  if (theme) {
    let link = document.querySelectorAll('link')[1]
    let link1 = './src/assets/css/dark.css'
    let link2 = './src/assets/css/light.css'
    link.href = theme === 'black' ? link1 : link2
    // 存到localStorage
    localStorage.setItem('theme', theme);
  }
}
initTheme()

// mytalents
let mytalentsStr = localStorage.getItem('mytalents')
if (mytalentsStr) {
  let arr = JSON.parse(mytalentsStr)
  store.commit("SAVE", { mytalents: arr })
}

// property
let propertyStr = localStorage.getItem('property');
if (propertyStr) {
  let property = JSON.parse(propertyStr)
  store.commit("SAVE", { property })
}
</script>

<template>
  <router-view></router-view>
</template>

<style>
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
