<script setup>
  import {
    ref
  } from 'vue'
import {Vue3SeamlessScroll}  from "vue3-seamless-scroll"

  const dataArr = ["昔人已乘黄鹤去，此地空余黄鹤楼。", "黄鹤一去不复返，白云千载空悠悠。", "晴川历历汉阳树，芳草萋萋鹦鹉洲。", "日暮乡关何处是？烟波江上使人愁。","凤凰台上凤凰游，凤去台空江自流。","吴宫花草埋幽径，晋代衣冠成古丘。"
  ,"三山半落青天外，二水中分白鹭洲。","总为浮云能蔽日，长安不见使人愁。","锦瑟无端五十弦，一弦一柱思华年。","庄生晓梦迷蝴蝶，望帝春心托杜鹃。","沧海月明珠有泪，蓝田日暖玉生烟。"
  ,"此情可待成追忆？只是当时已惘然。","相见时难别亦难，东风无力百花残。","春蚕到死丝方尽，蜡炬成灰泪始干。","晓镜但愁云鬓改，夜吟应觉月光寒。","蓬山此去无多路，青鸟殷勤为探看。",
  "昨夜星辰昨夜风，画楼西畔桂堂东。","身无彩凤双飞翼，心有灵犀一点通。","隔座送钩春酒暖，分曹射覆蜡灯红。","嗟余听鼓应官去，走马兰台类转蓬。"]

  const openGitHub = () => {
    window.open("https://github.com/xfy520/vue3-seamless-scroll")
  }
</script>

<template>
  <div class="top-header">
    <h2>循环滚动</h2>
    <img src="../assets/images/github.png" alt="原作者Git" title="原作者Git" @click="openGitHub">
  </div>
  <Vue3SeamlessScroll :list="dataArr" class="cyclicRolling-content" :hover='true' :step='0.5'>
    <!-- <div style="height:100%;width:100%;text-align:center"> -->
      <p v-for="(item,index) in dataArr" :key="index">{{item}}</p>
    <!-- </div> -->
  </Vue3SeamlessScroll>
</template>

<style scoped lang="less">
  .top-header {
    position: relative;

    h2 {
      width: 100%;
      text-align: center;
      margin-bottom: 20px;
    }

    img {
      cursor: pointer;
      width: 24px;
      height: 24px;
      position: absolute;
      top: 0;
      right: 0;
    }
  }

  .cyclicRolling-content {
    width: 100%;
    height: 600px;
    font-size: 24px;
    text-align: center;
    overflow: hidden;
  }
</style>