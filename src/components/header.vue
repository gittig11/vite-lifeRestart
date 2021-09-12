<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    hideTitle: {
      type: Boolean,
      default: false
    },
    hideBack: {
      type: Boolean,
      default: false
    },
  },
  setup() {
    const router = useRouter();
    const gotoPage = (name: string) => {
      router.push({
        path: name
      });
    };
    const goBack = () => {
      router.go(-1)
    }
    return {
      gotoPage,
      goBack
    };
  }
})
</script>

<template>
  <p class="header">
    <van-icon name="arrow-left" title="返回" class="back" @click="goBack" v-if="!hideBack" />
    <span v-if="!hideTitle">{{title}}</span>
    <slot name="right"></slot>
  </p>
</template>

<style scoped lang="scss">
  .header{
    font-size: 1.6rem;
    text-align: center;
    margin: 1rem 0;
    .back{
      position: fixed;
      left: 1.3rem;
      top: 1.3rem;
      cursor: pointer;
    }
  }
</style>
