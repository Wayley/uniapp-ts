<template>
  <view> Logger Page </view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app';
import { ConsoleAppender, FileAppender, Logger } from '../../utils/Logger';

const logger = new Logger('INDEX_PAGE');
logger.addAppender(new ConsoleAppender());
logger.addAppender(new FileAppender());

onShow(() => {
  for (let i = 0; i < 10; i++) {
    ((j) => {
      setTimeout(() => {
        logger.log(j, { name: `Hello Logger-${j}` });
      }, Math.random() * 1000);
    })(i);
  }
});
</script>
