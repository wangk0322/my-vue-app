<script setup>
  import {
    reactive,
    ref
  } from 'vue'
  import vueEsign from 'vue-esign'
  const esignRef = ref(null)
  const signatureOption = reactive({
    lineWidth: 6,
    lineColor: '#000000',
    bgColor: '#fff',
    resultImg: '',
    isCrop: false,
    isClearBgColor:true
  })
  const imgStr = ref("")

  const getSignature = () => {
    esignRef.value.generate().then(res => {
      imgStr.value = res
    }).catch(err => {
      console.log(err)
    })
  }
  const clearSignature = () => {
    esignRef.value.reset()
  }
</script>

<template>
  <div class="content-box">
    <el-form label-width="auto" :inline="true">
      <el-form-item label="画笔粗细：">
        <el-select v-model="signatureOption.lineWidth" style="width:80px">
          <el-option v-for="item in 5" :key="item" :label="item*2" :value="item*2" />
        </el-select>
      </el-form-item>
      <el-form-item label="画笔颜色：">
        <el-color-picker v-model="signatureOption.lineColor" show-alpha />
      </el-form-item>
      <el-form-item label="画布背景：">
        <el-color-picker v-model="signatureOption.bgColor" show-alpha />
      </el-form-item>
      <el-form-item label="是否裁剪：">
        <el-checkbox v-model="signatureOption.isCrop" />
      </el-form-item>
      <el-form-item label="是否清空画布背景色：">
        <el-checkbox v-model="signatureOption.isClearBgColor" />
      </el-form-item>
    </el-form>
    <div style="display:flex">
      <vue-esign ref="esignRef" :width="1000" :height="300" :isCrop="signatureOption.isCrop"
        :lineWidth="signatureOption.lineWidth" :lineColor="signatureOption.lineColor"
        v-model:bgColor="signatureOption.bgColor" :isClearBgColor='signatureOption.isClearBgColor'/>
      <img :src="imgStr" alt="" style="margin-left:10px;width:calc(100% - 1000px)">
    </div>

    <div class="btn-box">
      <el-button type="primary" @click="getSignature">获取签名</el-button>
      <el-button @click="clearSignature">清空</el-button>
    </div>
  </div>
</template>

<style scoped lang="less">
  .content-box {
    width: 100%;
    height: 100%;

    .btn-box {
      display: flex;
      align-items: center;
      margin: 10px 0;
    }
  }
</style>