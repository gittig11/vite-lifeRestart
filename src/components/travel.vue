<script setup lang="ts">
  import Header from './header.vue'

  import { eventInt } from "./interfaces";
  import { ref, computed } from 'vue'
  import ages from '../../data/age.json'
  // console.log('ages')
  // console.log(ages['0'])
  import events from '../../data/events.json'
  // console.log('events')
  // console.log(events['10000'])

  import { useStore } from "vuex";
  const store = useStore();

  console.log('mytalents')
  console.log(store.state.mytalents)
  console.log(store.state.property)

  // 判断是否去世
  const isEnd = (event: eventInt) => {
    return event.effect && event.effect.LIF && event.effect.LIF < 1
  }

  // 年龄AGE
  let AGE = -1
  // prop的值每次+num，即年龄每次+1
  function changeAge(prop: number, num: number) {
    prop += Number(num)
    return prop
  }
  function getAgeData(key: string): any { // objectInt
    return ages[key as keyof typeof ages]
  }
  function ageNext() {
    AGE = changeAge(AGE, 1); // 每次调用+1岁
    let key = String(AGE)
    const {age, event} = getAgeData(key);
    return {age, event};
  }


  const empArr1: eventInt[] = []
  let allEvents = ref(empArr1)

  // 随机取出数组events的一个元素
  function getRandomElement(events: (string|number)[]) {
    let idx = Math.floor(Math.random() * events.length)
    return events[idx]
  }
  // 生成一个事件
  function getALine() {
    let {age, event} = ageNext()
    let ii = getRandomElement(event)
    let eId: string = typeof ii === 'number' ? String(ii) : ii.split('*')[0]
    let aevent: eventInt = events[eId as keyof typeof events]
    allEvents.value.push({age, ...aevent})
    displayArr.value.push({age, ...aevent})
    // console.log('event')
    // console.log(event) // event: ['10001*110', '10002*100', 10110, 10111, '10494*999999']
    console.log(aevent)
    // console.log(displayArr.value)

    setTimeout(() => {
      let element = document.querySelector(`.age${age}`)
      element && element.scrollIntoView({ behavior: "smooth" });
    }, 50);
    if(isEnd(aevent)) {
      console.log('end')
      return
    }
  }

  // displayArr：存储 mytalents属性 和 新增属性
  const empArr2: eventInt[] = [] // 命名和empArr1区分开，因为是不一样的
  let displayArr = ref(empArr2)
  displayArr.value.push(...store.state.mytalents)


  // 进入页面时自动显示0岁的事件
  getALine()


  // 属性值使用计算属性
  const getPropertySum = (name: string) => {
    return displayArr.value.reduce((sum: number, item:eventInt) => {
      let tmp = item.effect && item.effect[name as keyof typeof item.effect] || 0
      return sum + tmp
    }, 0)
  }
  let beautyVal = computed(() => {
    return store.state.property.beauty + getPropertySum('CHR')
  })
  let intelligenceVal = computed(() => {
    return store.state.property.intelligence + getPropertySum('INT')
  })
  let healthVal = computed(() => {
    return store.state.property.health + getPropertySum('STR')
  })
  let wealthVal = computed(() => {
    return store.state.property.wealth + getPropertySum('MNY')
  })
  let happyVal = computed(() => {
    return store.state.property.happy + getPropertySum('SPR')
  })

  import { Dialog } from 'vant';
  import { useRouter } from "vue-router";
  const router = useRouter();
  const gotoPage = (name: string) => {
    router.push({
      path: name
    });
  };
  const goHome = () => {
    Dialog.confirm({
      title: '确认从头再来？',
    })
      .then(() => {
        router.push('/')
      })
      .catch(() => {
        // on cancel
      });
  }
</script>

<template>
  <Header title="人生之旅">
    <template v-slot:right>
      <van-icon name="replay" title="从头再来" class="replay" @click="goHome" />
    </template>
  </Header>
  <ul class="status">
    <li class="beauty">颜值：{{beautyVal}}</li>
    <li class="intelligence">智力：{{intelligenceVal}}</li>
    <li class="health">体质：{{healthVal}}</li>
    <li class="wealth">家境：{{wealthVal}}</li>
    <li class="happy">快乐：{{happyVal}}</li>
  </ul>

  <ul class="life-route" @click="getALine">
    <li class="life-event" :class="`age${aEvent.age}`" v-for="(aEvent, index) in allEvents" :key="index">
      <span class="year">{{aEvent.age}}岁：</span>
      {{aEvent.event}}
    </li>
  </ul>

  <button v-if="false" class="growBtn t2" @click="getALine">Click</button>
</template>

<style scoped lang="scss">
  .replay{
    position: fixed;
    right: 1.3rem;
    top: 1.3rem;
    cursor: pointer;
  }
  .status{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 2rem;
    li{
      border: 1px #ccc solid;
      text-align: center;
      padding: 5px;
    }
  }

  .life-route{
    border-radius: 10px;
    text-align: center;
    height: 80%;
    overflow: auto; // 不显示滚动条
    margin: 1rem;
    .life-event{
      margin: 0.5rem 0;
      padding: 0.5rem 1rem;
      font-size: 1.4rem;
    }
  }

  .growBtn{
    padding: 5px;
    font-size: 1.4rem;
    padding: 0.5rem 1.5rem;
    border: 1px #eee solid;
    border-radius: 0.2rem;
    font-size: 1.4rem;
  }
</style>
