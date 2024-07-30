<script setup>
  import {
    ref
  } from 'vue'

  const handleShareScreen = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });
    const mime = MediaRecorder.isTypeSupported("video/webm;codecs=h264") ?
      "video/webm;codecs=h264" :
      "video/webm";

    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: mime
    });

    const chunks = [];
    mediaRecorder.addEventListener("dataavailable", function (e) {
      chunks.push(e.data);
    });

    mediaRecorder.addEventListener("stop", () => {
      const blob = new Blob(chunks, {
        type: chunks[0].type
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "video.webm";
      a.click();
    });
    mediaRecorder.start();

  }
</script>

<template>
  <div style="text-align:center">
    <el-button type="primary" style="width:120px" @click="handleShareScreen">分享屏幕</el-button>
  </div>
</template>

<style scoped lang="less">

</style>