<script setup>

</script>

<template>
  <router-view v-slot="{ Component  }">
    <transition name="fade" mode="out-in" appear>
      <!-- <keep-alive> -->
        <component :is="Component" />
      <!-- </keep-alive> -->
    </transition>
  </router-view>
</template>

<style scoped lang="less">
  body,
  div,
  p,
  ul,
  li {
    margin: 0;
    padding: 0;
    list-style: none;
    box-sizing: border-box;
  }

  .fade-enter-from {
    /* 进入时的透明度为0 和 刚开始进入时的原始位置通过active透明度渐渐变为1 */
    opacity: 0;
    transform: translateX(-100%);
  }

  .fade-enter-to {
    /*定义进入完成后的位置 和 透明度 */
    transform: translateX(0%);
    opacity: 1;
  }

  .fade-leave-active,
  .fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .fade-leave-from {
    /* 页面离开时一开始的css样式,离开后为leave-to，经过active渐渐透明 */
    transform: translateX(0%);
    opacity: 1;
  }

  .fade-leave-to {
    /* 这个是离开后的透明度通过下面的active阶段渐渐变为0 */
    transform: translateX(100%);
    opacity: 0;

  }
</style>