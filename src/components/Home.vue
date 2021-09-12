<script setup lang="ts">
import { ref } from 'vue';
import Header from './header.vue'

import { useStore } from "vuex";
const store = useStore();

import Popup from './popup.vue'
let popupText = ref('别卷了！没有排行榜')
const showPopup = ref(false);
const showFn = () => {
  showPopup.value = true
}

let times = 0
let title = `已重开${times}次`
// get times() {return JSON.parse(localStorage.times||'0') || 0;}
// set times(v) {localStorage.times = JSON.stringify(parseInt(v) || 0)};


// 点击切换主题
const color = ref('黑');
const theme = ref('black');
const changeTheme = () => {
  let link = document.querySelectorAll('link')[1]
  let link1 = './src/assets/css/dark.css'
  let link2 = './src/assets/css/light.css'
  link.href = theme.value === 'black' ? link2 : link1
  theme.value = theme.value === 'black' ? 'white' : 'black'
  // 存到localStorage
  localStorage.setItem('theme', theme.value);
}

import { useRouter } from "vue-router";
const router = useRouter();
const gotoPage = (name: string) => {
  router.push({
    path: name
  });
};
</script>

<template>
  <Header :title="title" :hideTitle="true" :hideBack="true">
    <template v-slot:right>
      <div class="header-right" @click="showFn">排行榜</div>
    </template>
  </Header>

  <div id="main">
    <p class="t1">
      人生重开模拟器
    </p>
    <p class="title2">
      这垃圾人生一秒也不想呆了
    </p>
  </div>
  <button type="button" class="restart" @click="gotoPage('talent')">
    <van-icon name="replay" />
    立即重开
  </button>
  <div class="change" @click="changeTheme">{{ color }}</div>

  <Popup
    :show="showPopup"
    :text="popupText"
    type="info"
    @closePopup="showPopup = false"
    :close-on-click-overlay="false"
  >
  </Popup>
</template>

<style scoped lang="scss">
  .header-right{
    position: fixed;
    top: 1rem;
    right: 1rem;
    padding: 0.1rem 1rem;
    background-color: lightsteelblue;
    border-radius: 0.2rem;
    font-size: 1.4rem;
    cursor: pointer;
  }
  .t1{
    font-size: 3rem;
    font-weight: 700;
    text-align: center;
    white-space: nowrap;
  }
  .title2{
    font-size:1.5rem;
    text-align: center;
  }
  .restart{
    position: fixed;
    top: 65%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 0.5rem 1.5rem;
    border: 1px #eee solid;
    border-radius: 0.2rem;
    font-size: 1.6rem;
    white-space: nowrap;
    margin-top: 30px;
    cursor: pointer;
    &:hover {
      background: #ff7878;
      color: #fff;
      transition: all .4s ease 0s;
    }
  }
  .change{
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    padding: 0.1rem 1rem;
    border: none;
    border-radius: 0.2rem;
    font-size: 1.4rem;
    cursor: pointer;
    z-index: 2;
  }
</style>
