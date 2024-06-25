<script setup>
  import {
    reactive,
    ref
  } from 'vue'
  import {
    ElMessage
  } from 'element-plus'

  import {
    useRouter
  } from "vue-router"
  const route = useRouter()
  const setItem = (key, value) => {
    localStorage.setItem(key, value)
  }
  setItem('userInfo', '[]')
  const loginForm = reactive({
    userName: '',
    password: ''

  })
  const newForm = reactive({
    userName: '',
    password: ''

  })
  const dialogVisible = ref(false)
  const loginFormRules = {
    userName: [{
      required: true,
      message: '请输入用户名',
      trigger: ['blur', 'change']
    }],
    password: [{
      required: true,
      message: '请输入密码',
      trigger: ['blur', 'change']
    }]
  }
  const newFormRules = {
    userName: [{
      required: true,
      message: '请输入用户名',
      trigger: ['blur', 'change']
    }],
    password: [{
      required: true,
      message: '请输入密码',
      trigger: ['blur', 'change']
    }]
  }
  const loginFormRef = ref(null)
  const handleLogin = async () => {
    await loginFormRef.value.validate((valid, fields) => {
      if (valid) {
        const userInfo = localStorage.getItem('userInfo')
        if (userInfo) {
          const userInfoArr = JSON.parse(userInfo)
          let isExit = userInfoArr.some(item => item.userName == loginForm.userName && item.password ==
            loginForm.password)
          if (isExit) {
            ElMessage.success("登录成功！")
            route.push('/home')
          } else {
            ElMessage.error("用户名或密码错误，请重新输入！")
          }
        } else {
          ElMessage.error("暂无用户信息，请注册！")
        }
      } else {
        ElMessage.error("用户名或密码错误，请重新输入！")
      }
    })
  }

  const newFormRef = ref(null)
  const setUserInfo = async () => {
    await newFormRef.value.validate((valid, fields) => {
      if (valid) {
        const userInfo = localStorage.getItem('userInfo')
        if (userInfo) {
          const userInfoArr = JSON.parse(userInfo)
          let isExit = userInfoArr.some(item => item.userName == newForm.userName)
          if (isExit) {
            ElMessage.error("用户名已存在，请重新输入！")
          } else {
            userInfoArr.push(newForm)
            localStorage.setItem('userInfo', JSON.stringify(userInfoArr))
            ElMessage.success("注册成功！")
            dialogVisible.value = false;
          }
        }
      } else {
        ElMessage.error("用户名或密码错误，请重新输入！")
      }
    })
  }

  const resetForm = (formRef) => {
    if (!formRef) return
    formRef.resetFields()
  }
</script>

<template>
  <div class="login-main">
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" status-icon label-width="120px">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="loginForm.userName" type="text" placeholder="请输入用户名" clearable autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" show-password />
      </el-form-item>
      <el-form-item>
        <p class="notId" @click="dialogVisible = true">还没有账号？注册一下</p>
      </el-form-item>
      <el-form-item>
        <div class="btn-bar">
          <el-button type="primary" @click="handleLogin()">
            登录
          </el-button>
          <el-button @click="resetForm(loginFormRef)">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
    <el-dialog v-model="dialogVisible" title="注册账号" :append-to-body="true" width="500" align-center
      @close='resetForm(newFormRef)'>
      <el-form ref="newFormRef" :model="newForm" :rules="newFormRules" status-icon label-width="120px">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="newForm.userName" type="text" placeholder="请输入用户名" clearable autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="newForm.password" type="password" placeholder="请输入密码" show-password />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="setUserInfo" type="primary">确定</el-button>
          <el-button type="warning" @click="dialogVisible = false">
            取消
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>

</template>

<style scoped lang="less">
  .login-main {
    width: 100vw;
    height: 100vh;
    position: relative;
    // background-color: #ecf5ff;
    background: url("@/assets/images/my-app-bg.jpg") no-repeat;
    background-size: 100% 100%;

    .el-form {
      width: 500px;
      // height: 500px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      .notId {
        position: absolute;
        right: 0;
        bottom: -15px;
        color: red;
        font-size: 12px;
        cursor: pointer;
      }

      .btn-bar {
        margin-top: 10px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
</style>