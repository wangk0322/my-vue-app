<script setup>
  import {
    ref,
    onUnmounted,
    computed
  } from 'vue'

  const verificationCode = ref("");

  // const currentCount = ref

  const currentCount = ref(60);
  const isStart = ref(false);
  let timerId = null;

  const clear = () => {
    timerId && clearInterval(timerId);
  }
  const stop = () => {
    isStart.value = false;
    clear();
    timerId = null;
  }

  const reSet = () => {
    currentCount.value = 60;
    stop()
  }
  const start = () => {
    if (isStart.value || !!timerId) return;
    isStart.value = true;
    timerId = setInterval(() => {
      if (currentCount.value === 1) {
        reSet()
      } else {
        currentCount.value -= 1
      }
    }, 1000)
  }
  const reStart = () => {
    reSet();
    start()
  }

  onUnmounted(() => {
    reSet()
  })
  const getVerificationCode = () => {
    start()
  }
  const buttonText = computed(() => {
    return isStart.value ? `${currentCount.value}s后重新获取` : "获取验证码"
  });
</script>

<template>
  <div>
    <el-input v-model="verificationCode" style="width: 400px" placeholder="请输入验证码">
      <template #append>
        <el-button type="primary" style="width:120px" @click="getVerificationCode" :disabled='isStart'>{{buttonText}}</el-button>
      </template>
    </el-input>
  </div>
</template>

<style scoped lang="less">

</style>