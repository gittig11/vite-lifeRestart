<script setup lang="ts">
import { watch } from 'vue'

const props = defineProps<{
  show: boolean,
  type: string,
  text: string,
}>()

const emits = defineEmits(['closePopup'])

// 设置2s后自动关闭popup弹窗
let timer: number
watch(() => props.show, (newValue, oldValue) => { //直接监听
	// console.log("show改变了", props.show);
  if(props.show) {
    timer = window.setTimeout(() => {
      emits('closePopup')
    }, 2000);
  }
});
</script>

<template>
  <van-popup position="top" v-model:show="show">
    <div class="banner">
      <van-icon name="info-o" size="30" v-if="type === 'info'" />
      <van-icon name="close" size="30" v-else-if="type === 'error'" />
      <van-icon name="passed" size="30" v-else-if="type === 'success'" />
      <p class="text">{{ text }}</p>
      
      <van-icon name="cross" size="25" style="margin-left: auto;" @click="$emit('closePopup')" />
    </div>
  </van-popup>
</template>

<style scoped lang="scss">
  .banner{
    background-color: #87ceeb;
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 2rem;
    color: #fff;
    .text{
      margin-left: 10px;
      font-size: 1.4rem;
    }
  }
</style>
