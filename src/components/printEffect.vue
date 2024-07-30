<script setup>
  import {
    ref,
    onMounted
  } from 'vue'
  import {
    type,
    type as loop
  } from "@camwiegert/typical"

  const startArticle =
    "君不见，黄河之水天上来，奔流到海不复回。君不见，高堂明镜悲白发，朝如青丝暮成雪！人生得意须尽欢，莫使金樽空对月。天生我材必有用，千金散尽还复来。烹羊宰牛且为乐，会须一饮三百杯。岑夫子，丹丘生，将进酒，杯莫停。与君歌一曲，请君为我倾耳听。钟鼓馔玉不足贵，但愿长醉不复醒。古来圣贤皆寂寞，惟有饮者留其名。陈王昔时宴平乐，斗酒十千恣欢谑。主人何为言少钱，径须沽取对君酌。五花马、千金裘，呼儿将出换美酒，与尔同销万古愁！";
  const endArticle =
    "噫吁嚱，危乎高哉！蜀道之难，难于上青天！蚕丛及鱼凫，开国何茫然！尔来四万八千岁，不与秦塞通人烟。西当太白有鸟道，可以横绝峨眉巅。地崩山摧壮士死，然后天梯石栈相钩连。上有六龙回日之高标，下有冲波逆折之回川。黄鹤之飞尚不得过，猿猱欲度愁攀援。青泥何盘盘，百步九折萦岩峦。扪参历井仰胁息， 以手抚膺坐长叹。问君西游何时还？ 畏途巉岩不可攀。但见悲鸟号古木， 雄飞雌从绕林间。又闻子规啼夜月， 愁空山。蜀道之难， 难于上青天， 使人听此凋朱颜！连峰去天不盈尺， 枯松倒挂倚绝壁。飞湍瀑流争喧豗， 砯崖转石万壑雷。其险也如此， 嗟尔远道之人胡为乎来哉！(也如此 一作： 也若此)剑阁峥嵘而崔嵬， 一夫当关， 万夫莫开。所守或匪亲， 化为狼与豺。朝避猛虎， 夕避长蛇， 磨牙吮血， 杀人如麻。锦城虽云乐， 不如早还家。蜀道之难， 难于上青天， 侧身西望长咨嗟！ "

  onMounted(() => {
    const ele = document.getElementById("printEffect-box")
    type(ele, startArticle, 5000, endArticle);
  })
  const openGitHub = () => {
    window.open("https://github.com/camwiegert/typical")
  }
</script>

<template>
  <div class="top-header">
    <h2>打印效果</h2>
    <img src="../assets/images/github.png" alt="原作者Git" title="原作者Git" @click="openGitHub">
  </div>
  <div id="printEffect-box">

  </div>
</template>

<style scoped lang="less">
  .top-header {
    position: relative;
    img{
      cursor: pointer;
      width: 24px;
      height: 24px;
      position: absolute;
      top: 0;
      right: 0;
    }
  }

  h2 {
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
  }

  #printEffect-box {
    width: 100%;
    // height: 100%;
    font-size: 24px;
  }
</style>