<template>
  <view class="main">
    {{ title }}
  </view>
</template>

<script setup lang="ts">
import { onHide, onShow, onUnload } from '@dcloudio/uni-app';
import { defineProps, onBeforeUnmount, onBeforeUpdate, onUnmounted, ref } from 'vue';
const props = defineProps({
  title: String,
});
let timer = ref<number | undefined | null>(undefined);

function init() {
  clear();
  timer.value = setInterval(() => {
    console.log(props.title);
  }, 1000);
}
function clear() {
  if (timer.value) {
    clearInterval(timer.value);
    timer.value = null;
  }
}

onShow(() => {
  console.log(props.title, 'onShow');
  init();
});
onHide(() => {
  console.log(props.title, 'onHide');
});
onUnload(() => {
  console.log(props.title, 'onUnload');
});

// VUE
onUnmounted(() => {
  console.log(props.title, 'onUnmounted');
  clear();
});
onBeforeUpdate(() => {
  console.log(props.title, 'onBeforeUpdate');
  // clear();
});
onBeforeUnmount(() => {
  console.log(props.title, 'onBeforeUnmount');
  clear();
});
</script>

<style lang="scss" scoped>
.main {
  background-color: #ccc;
}
</style>
