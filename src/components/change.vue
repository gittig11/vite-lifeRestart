<script setup lang="ts">
import { talentsObj } from "./interfaces";
import Header from './header.vue'
import Popup from './popup.vue'

import { ref, computed } from 'vue'

import { useRouter } from "vue-router";
const router = useRouter();
const gotoPage = (name: string) => {
  router.push({
    path: name
  });
};

import { useStore } from "vuex";
const store = useStore();
// console.log(store.state.mytalents)

// 弹窗
let popupText = ref('')
const showPopup = ref(false);


// 可分配总属性
let totalPoints = ref(0)
// totalPoints 要加上 status，因为有一些天赋是扣除初始属性的
totalPoints = computed(() => {
  return 20 + store.state.mytalents.reduce((sum: number, item:talentsObj) => {
    item.status = item.status === undefined ? 0 : item.status
    return sum + item.status
  }, 0)
})
// console.log('totalPoints.value')
// console.log(totalPoints.value)

// 初始属性求和
let sumPoints = ref(0)
sumPoints = computed(() => {
  return beauty.value + intelligence.value + health.value + wealth.value
})

// 属性
let beauty = ref(0)
let intelligence = ref(0)
let health = ref(0)
let wealth = ref(0)

// 点击选择属性
const empArr:number[] = []
const talentSelectedArr = ref(empArr)
const selectTalent = (e: any) => {
  let idx: string = e.target.dataset.index // string
  if (!idx) return;

  let res: number = talentSelectedArr.value.indexOf(parseInt(idx))
  if (res > -1) {
    talentSelectedArr.value.splice(res, 1) // 删除指定元素
    return
  }
  talentSelectedArr.value.push(parseInt(idx))
}


// 按钮：随机分配
const randomDistribute = (t: number) => {
  const arr = [10, 10, 10, 10];
  while(t > 0) {
    const sub = Math.round(Math.random() * (Math.min(t, 10) - 1)) + 1; // [0, 10]
    while(true) {
      const select = Math.floor(Math.random() * 4) % 4; // [0, 3]
      if(arr[select] - sub <0) continue;
      arr[select] -= sub;
      t -= sub;
      break;
    }
  }

  let property = {
    beauty: 10 - arr[0],
    intelligence: 10 - arr[1],
    health: 10 - arr[2],
    wealth: 10 - arr[3],
    happy: 5,
    life: 1, // 初始值为1，<1表示去世
  }
  // 存到Vuex供travel页面使用
  store.commit("SAVE", { property: property })
  // 存到localStorage
  localStorage.setItem('property', JSON.stringify(property));
  console.log('property: ', property)
  // 更新属性
  beauty.value = 10 - arr[0]
  intelligence.value = 10 - arr[1]
  health.value = 10 - arr[2]
  wealth.value = 10 - arr[3]
}

// 调整四个初始属性时触发的函数
function compare(value: number, val: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // console.log(value, val)
      if (value > 10) { // 限制属性值最大为10
        resolve(false);
      }
      // 在 resolve 函数中返回 true 或 false
      if (value > val && totalPoints.value - sumPoints.value === 0) { // 点+ 且 剩余点数为0
        popupText.value = '你没有更多的点数可以分配了'
        showPopup.value = true
        resolve(false);
      } else {
        resolve(true);
      }
    }, 50);
  });
}
const beforeChange1 = (value: number) => {
  // console.log('beforeChange', value, beauty.value)
  return compare(value, beauty.value)
};
const beforeChange2 = (value: number) => {
  return compare(value, intelligence.value)
};
const beforeChange3 = (value: number) => {
  return compare(value, health.value)
};
const beforeChange4 = (value: number) => {
  return compare(value, wealth.value)
};

// 按钮：开始新人生
const restart = (name: string) => {
  let res = totalPoints.value - sumPoints.value
  if (res > 0) {
    popupText.value = `你还有${res}属性点没有分配完`
    showPopup.value = true
    return
  }
  gotoPage(name)
  return
}
</script>

<template>
  <Header title="调整初始属性"></Header>
  <p class="total">可用属性点：{{totalPoints - sumPoints}}</p>
  
  <div class="infos">
    <div class="info">
      颜值 <van-stepper v-model="beauty" integer min="0" :before-change="beforeChange1"
      />
    </div>
    <div class="info">
      智力 <van-stepper v-model="intelligence" min="0" :before-change="beforeChange2"
      />
    </div>
    <div class="info">
      体质 <van-stepper v-model="health" min="0" :before-change="beforeChange3" />
    </div>
    <div class="info">
      家境 <van-stepper v-model="wealth" min="0" :before-change="beforeChange4" />
    </div>
  </div>
  
  <div class="talent-box">
    <p class="talent-title">已选天赋</p>
    <ul class="talent-list" @click="selectTalent">
      <li
        v-for="(talent, index) in store.state.mytalents"
        :key="index"
        :class="{
          grade0b: talent.grade === 0,
          grade1b: talent.grade === 1,
          grade2b: talent.grade === 2,
          grade3b: talent.grade === 3,
          selected: talentSelectedArr.indexOf(Number(index)) > -1
        }"
        :data-index="index"
      >
        {{ talent.name }}（{{ talent.description }}）
      </li>
    </ul>

    <div class="btns">
      <p class="t2" @click="randomDistribute(totalPoints)"> 随机分配 </p>
      <p class="t2" @click="restart('travel')"> 开始新人生 </p>
    </div>
  </div>

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
  .infos{
    margin-top: 10px;
    .info{
      font-size: 1.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 10px;
      .van-stepper{
        margin-left: 10px;
      }
      :deep .van-stepper__input{
        font-size: 1.3rem;
      }
    }
  }

  .talent-box{
    position: fixed;
    left: 50%;
    bottom: 1.5rem;
    transform: translate(-50%, 0);
    .talent-title{
      font-size: 1.4rem;
      margin-bottom: 0.5rem;
    }
    .talent-list > li {
      font-size: 1.4rem;
    }
    .btns{
      display: flex;
      align-items: center;
      margin-top: 1rem;
    }
  }


  .t2{
    padding: 0.5rem 1.5rem;
    margin: 0 auto;
    width: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    border: 1px #eee solid;
    border-radius: 0.2rem;
    white-space: nowrap;
    cursor: pointer;
    &:hover {
      background: #ff7878;
      color: #fff;
      transition: all .4s ease 0s;
    }
  }
  .choose10{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .choose3{
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .restart{
    position: fixed;
    top: 65%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 0.5rem 1.5rem;
    border: 1px #eee solid;
    border-radius: 0.2rem;
    background-color: #393E46;
    font-size: 1.6rem;
    white-space: nowrap;
    color: #eee;
    margin-top: 30px;
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
    color: #222831;
    background-color: #eee;
    cursor: pointer;
    z-index: 2;
  }
</style>
