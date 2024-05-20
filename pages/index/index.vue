<template>
  <view> </view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app';
import { FileAppender, Logger } from '../../utils/Logger';

function p() {
  return new Promise((r) => {
    setTimeout(() => {
      r(true);
    }, 2000);
  });
}
async function test() {
  console.log('TEST');
  const r = await p();
  console.log('111', r);
  p().then((res) => {
    console.log('222', res);
  });
}

const logger = new Logger();
let f = new FileAppender();
logger.addAppenders([f, f]);
function init() {
  logger.log('init', { mm: '' });

  logger.log(`000`, { mm: '' });
  setTimeout(() => {
    logger.log(100233);
  }, 200);
  setTimeout(() => {
    logger.log(1002);
  }, 200);
  setTimeout(() => {
    logger.log(1003, { mm: '' });
  }, 200);
  logger.log(`001`);

  for (let i = 1; i <= 10; i++) {
    logger.log(i);
  }

  logger.log(1000);
  logger.log(1004);

  setTimeout(() => {
    logger.log(1001);
  }, 100);
}
onShow(() => {
  // test();
  init();
});
</script>
