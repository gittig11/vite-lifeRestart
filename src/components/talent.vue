<script setup lang="ts">
import { talentsObj } from "./interfaces";
import { ref } from 'vue'
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
// console.log(store.state.mytalents)

import Header from './header.vue'
import Popup from './popup.vue'
import talents from '../../data/talents.json'
// console.log(talents['1001'])

// 路由跳转
const router = useRouter();
const gotoPage = (name: string) => {
  router.push({
    path: name
  });
};


let choose3Tips = ref('请选择3个')
let popupText = ref('')
const showPopup = ref(false);


// 从talents对象中选出10个属性
const talentRandom = (talents: object, include: any) => {
  // reactjs - Element implicitly has an 'any' type because expression of type 'string' can't be used to index - Stack Overflow
  // https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b
  type talentListType = { // 为talentList指定元素类型
    [key: string]: any
  }
  const talentList: talentListType = {};

  for(const talentId in talents) {
    const { id, grade, name, description, status, effect, exclusive, condition } = talents[talentId as keyof typeof talents]; // 增加 status
    if(id == include) {
      include = { id, grade, name, description, status, effect, exclusive, condition };
      continue;
    }
    // 下面可能报错
    if(!talentList[grade]) talentList[grade] = [{ id, grade, name, description, status, effect, exclusive, condition }];
    else talentList[grade].push({ id, grade, name, description, status, effect, exclusive, condition });
  }
  return new Array(10).fill(1).map((v, i)=>{
    if(!i && include) return include;
    const gradeRandom = Math.random();
    let grade;
    if(gradeRandom>=0.111) grade = 0;
    else if(gradeRandom>=0.011) grade = 1;
    else if(gradeRandom>=0.001) grade = 2;
    else grade = 3;

    while(talentList[grade].length == 0) grade--;

    const length = talentList[grade].length;

    const random = Math.floor(Math.random()*length) % length;
    return talentList[grade].splice(random, 1)[0];
  });
}

// talentsArr存储随机的10个天赋
const talentsArr:talentsObj[] = talentRandom(talents, null)
// console.log('talentsArr')
// console.log(talentsArr)

// 点击选择天赋时触发
const empArr:number[] = []
const talentSelectedArr = ref(empArr) // 存储选择的3个天赋的索引
const selectTalent = (e: any) => {
  let idx: string = e.target.dataset.index // string, 选择的天赋对应的索引
  if (!idx) return;

  // 取消选择已选的天赋
  let res: number = talentSelectedArr.value.indexOf(parseInt(idx))
  if (res > -1) {
    talentSelectedArr.value.splice(res, 1) // 删除指定元素
    choose3Tips.value = '请选择3个'
    return
  }

  // 将天赋存入talentSelectedArr
  if (talentSelectedArr.value.length === 2) {
    choose3Tips.value = '开始新人生'
  }
  if (talentSelectedArr.value.length >= 3) {
    popupText.value = '只能选3个天赋'
    showPopup.value = true
    return
  }
  talentSelectedArr.value.push(parseInt(idx))
  
  // 选择的3个天赋存入Vuex中的mytalents
  if (talentSelectedArr.value.length === 3) {
    let arr = talentsArr.filter((item, index) => talentSelectedArr.value.indexOf(index) > -1)
    store.commit("SAVE", { mytalents: arr })
    localStorage.setItem('mytalents', JSON.stringify(arr))
  }
}

// 按钮：10连抽
let isShowList = ref(false) // false
let showChoose10 = ref(true)
const showTalentList = () => {
  isShowList.value = true
  showChoose10.value = false
}

// 按钮：请选择3个
const choose3Popup = () => {
  if (talentSelectedArr.value.length < 3) {
    popupText.value = '请选择3个天赋'
    showPopup.value = true
    return
  } else {
    gotoPage('change')
  }
}
</script>

<template>
  <Header title="天赋抽卡"></Header>

  <p class="t2 choose10" @click="showTalentList" v-show="showChoose10">10连抽！</p>
  <p class="t2 choose3" @click="choose3Popup"> {{ choose3Tips }} </p>

  <ul class="talent-list" v-show="isShowList" @click="selectTalent">
    <li
      v-for="(talent, index) in talentsArr"
      :key="index"
      :class="{
        grade0b: talent.grade === 0,
        grade1b: talent.grade === 1,
        grade2b: talent.grade === 2,
        grade3b: talent.grade === 3,
        selected: talentSelectedArr.indexOf(index) > -1
      }"
      :data-index="index"
    >
      {{ talent.name }}（{{ talent.description }}）
    </li>
  </ul>

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
  .t2{
    padding: 0.5rem 1.5rem;
    margin: 0 auto;
    width: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    border-radius: 0.2rem;
    white-space: nowrap;
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
    cursor: pointer;
  }
  .choose3{
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate(-50%,-50%);
    cursor: pointer;
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
