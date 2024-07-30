<script setup>
  import {
    ElMessage,
    tourContentProps
  } from 'element-plus';
  import {
    reactive,
    ref,
    watch,
    computed,
    onMounted,
    nextTick
  } from 'vue'
  import {
    useRouter
  } from 'vue-router';
  import userImg from "../assets/images/cat.png"
  const menuList = reactive([{
    id: "1",
    menuLabel: "常用插架",
    icon: "SetUp",
    routePath: "",
    menuChildren: [{
        id: "1-1",
        menuLabel: "打印效果",
        icon: "Tickets",
        routePath: "/printEffect",
      },
      {
        id: "1-2",
        menuLabel: "循环滚动",
        icon: "Tickets",
        routePath: "/cyclicRolling",
      },
      {
        id: "1-3",
        menuLabel: "电子签名",
        icon: "Tickets",
        routePath: "/electronicSignature",
      }
    ]
  },{
    id: "2",
    menuLabel: "常用组件",
    icon: "Postcard",
    routePath: "",
    menuChildren: [{
        id: "2-1",
        menuLabel: "获取验证码",
        icon: "Tickets",
        routePath: "/getVerificationCode",
      },
      {
        id: "2-2",
        menuLabel: "分享屏幕",
        icon: "Tickets",
        routePath: "/shareScreen",
      },
    ]
  } ])
  const currentUserInfo = JSON.parse(localStorage.getItem('currentUserInfo'))
  const isCollapse = ref(false);
  const editDialogVisible = ref(false);
  const open = ref(false);
  const currentMenu = ref("首页");
  const menuRef = ref(null);
  // const iconRef = ref(null);
  // const backRef = ref(null);
  // const userInfoRef = ref(null);

  const activeIndex = ref("")
  const pwdForm = reactive({
    oldPassword: '',
    newPassword: ''

  })
  const pwdFormRules = {
    oldPassword: [{
      required: true,
      message: '请输入原密码',
      trigger: ['blur', 'change']
    }],
    newPassword: [{
      required: true,
      message: '请输入新密码',
      trigger: ['blur', 'change']
    }]
  }
  let router = useRouter();

  const handleMenuClick = (item) => {
    currentMenu.value = item.menuLabel
  }
  onMounted(() => {
    nextTick(() => {
      setTimeout(() => {
        open.value = true
      }, 400)
    })
    if(window.performance.navigation.type == 1){
       router.push("/home");
        currentMenu.value = '首页';
    }
  })

  const handleBack = () => {
    currentMenu.value = '首页';
    router.push("/home");
    activeIndex.value = '-1'
  }
  const getToDay = computed(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    return `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}`
  })
  const handleCommand = (item) => {
    if (item == 'switchUser') {
      router.push("/login");
    } else if (item == 'editPwd') {
      editDialogVisible.value = true
    } else if (item == 'exit') {
      router.push("/login");
      localStorage.clear()
      sessionStorage.clear()
    }
  }
  const pwdFormRef = ref(null);
  const setNewPwd = () => {
    pwdFormRef.value.validate((valid, fields) => {
      if (valid) {
        let userInfoArr = JSON.parse(localStorage.getItem('userInfo'));
        let currentIndex = userInfoArr.findIndex(item => item.userName == currentUserInfo.userName);
        if (pwdForm.oldPassword == pwdForm.newPassword) {
          ElMessage.error("新密码与原密码一致，请重新输入！");
          return
        } else if (currentUserInfo.password != pwdForm.oldPassword) {
          ElMessage.error("原密码错误，请重新输入！");
          return
        } else {
          userInfoArr[currentIndex].password = pwdForm.newPassword
          localStorage.setItem('userInfo', JSON.stringify(userInfoArr))
          editDialogVisible.value = false
          ElMessage.success("密码修改成功！请重新登录");
          localStorage.setItem('currentUserInfo', '')
          router.push("/login");
        }
      }

    })
  }
  const resetForm = (formRef) => {
    if (!formRef) return
    formRef.resetFields()
  }
</script>

<template>
  <el-container class="home-box">
    <el-aside :width="!isCollapse? '300px' :'50px'">
      <h1 v-show="!isCollapse">某某项目管理平台</h1>
      <el-scrollbar class="scrollbar-box" :style="{marginTop:isCollapse ? '50px':''}">
        <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
          text-color="#1d2129" :collapse="isCollapse" :collapse-transition="false" router ref="menuRef"
          :default-active='activeIndex'>
          <el-sub-menu :index="item.id" v-for="item in menuList" :key="item.id">
            <template #title>
              <el-icon size='24px'>
                <component :is="item.icon"></component>
              </el-icon>
              <span class="menuLable-box">{{item.menuLabel}}</span>
            </template>
            <el-menu-item :index="subItem.routePath" v-for="subItem in item.menuChildren" :key="subItem.id"
              @click="handleMenuClick(subItem)">
              <template #title>
                <el-icon size='24px'>
                  <component :is="subItem.icon"></component>
                </el-icon>
                <span class="menuLable-box">{{subItem.menuLabel}}</span>
              </template>
            </el-menu-item>
          </el-sub-menu>



        </el-menu>
      </el-scrollbar>
      <div class="Collapse-box" id="iconRef">
        <el-icon v-if="!isCollapse" size="20px" @click="isCollapse=true">
          <Fold />
        </el-icon>
        <el-icon v-else size="20px" @click="isCollapse=false">
          <Expand />
        </el-icon>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <el-page-header :icon="router.currentRoute.value.path =='/home' ? null:'Back'" @back='handleBack'>
          <template #title>
            <span v-if="router.currentRoute.value.path =='/home'" id="backRef">欢迎页</span>
            <span v-else>返回</span>
          </template>
          <template #content>
            <span> {{currentMenu}} </span>
          </template>
        </el-page-header>
        <el-dropdown trigger="click" @command="handleCommand" id="userInfoRef">
          <div class="userInfo-box">
            <el-avatar :size="50" :src="userImg" />
            <div class="userInfo-text">
              <p>{{currentUserInfo.userName}}</p>
              <p>{{getToDay}}</p>
            </div>
          </div>
          <template #dropdown>

            <el-dropdown-menu>
              <el-dropdown-item command="switchUser">
                <el-icon size="18px">
                  <User />
                </el-icon>
                切换用户
              </el-dropdown-item>
              <el-dropdown-item command="editPwd">
                <el-icon size="18px">
                  <Unlock />
                </el-icon>
                修改密码
              </el-dropdown-item>
              <el-dropdown-item command="exit">
                <el-icon size="18px">
                  <SwitchButton />
                </el-icon>
                退出
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

      </el-header>
      <el-main>
        <div class="welcome-page" v-if="router.currentRoute.value.path =='/home'">欢迎你！</div>
        <router-view v-else></router-view>
      </el-main>
    </el-container>
    <el-dialog v-model="editDialogVisible" title="修改密码" :append-to-body="true" width="500" align-center
      @close='resetForm(pwdFormRef)'>
      <el-form ref="pwdFormRef" :model="pwdForm" :rules="pwdFormRules" status-icon label-width="120px">
        <el-form-item label="原密码" prop="oldPassword">
          <el-input v-model="pwdForm.oldPassword" type="password" placeholder="请输入原密码" show-password />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="pwdForm.newPassword" type="password" placeholder="请输入新密码" show-password />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="setNewPwd" type="primary">确定</el-button>
          <el-button type="warning" @click="editDialogVisible = false">
            取消
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-config-provider :locale="zhCn">
      <el-tour v-model="open">
        <el-tour-step target="#iconRef" title="收缩按钮" description="点击此处收起菜单">
        </el-tour-step>
        <el-tour-step target="#backRef" title="返回" description="点击此处返回首页" />
        <el-tour-step target="#userInfoRef" title="信息设置" description="点击此处可以进行退出等操作" />
      </el-tour>
    </el-config-provider>

  </el-container>
</template>

<style scoped lang="less">
  .home-box {
    width: 100vw;
    height: 100vh;

    .el-aside {
      height: 100%;
      background: url("@/assets/images/aside-bg.jpg") no-repeat;
      background-size: 100% 100%;
      position: relative;
      transition: width 0.15s;
      -webkit-transition: width 0.15s;
      -moz-transition: width 0.15s;
      -webkit-transition: width 0.15s;
      -o-transition: width 0.15s;



      h1 {
        text-align: center;
        // color: #fff;
        line-height: 60px;
        font-size: 24px;
        font-weight: 500;
        // background-color: #545c64;
      }

      .Collapse-box {
        position: absolute;
        top: 22px;
        right: 10px;
      }



      .el-scrollbar {
        height: calc(100% - 60px);

        :deep(.el-scrollbar__view) {
          height: 100%;
        }

        .el-menu {
          height: 100%;
          border-right: none;
          background: none;

          :deep(.el-menu-item) {
            &:hover {
              background-color: #427ebc;
            }

            transition: none;

          }

          :deep(.el-sub-menu) {
            .el-sub-menu__title:hover {
              background-color: #427ebc;
            }

            .el-sub-menu__icon-arrow {
              font-size: 18px;
            }

            .el-menu {
              background: none;

              .el-menu-item:hover {
                background-color: #427ebc;
              }
            }
          }

          .menuLable-box {
            font-size: 20px;
            font-weight: 600;
          }
        }
      }



    }

    .el-header {
      background-color: #427ebc;
      display: flex;
      align-items: center;
      position: relative;

      .el-dropdown {
        height: 100%;
        position: absolute;
        top: 0px;
        right: 10px;
      }

      .userInfo-box {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        .el-avatar:hover {
          transform: rotate(666turn);
          transition-delay: 1s;
          transition-property: all;
          transition-duration: 59s;
          transition-timing-function: cubic-bezier(.34, 0, .84, 1);
        }

        .userInfo-text {
          color: #fff;
          margin-left: 10px;

          p {
            line-height: 24px;
          }
        }
      }

    }

    .el-main {
      padding: 10px;
      background: url("@/assets/images/content-bg.jpg") no-repeat;
      background-size: 100% 100%;

      .welcome-page {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 30px;
        font-weight: bold;
        color: #427ebc;
      }
    }
  }

  // @keyframes rotation {
  //   from {
  //     transform: rotate(0deg);
  //   }

  //   to {
  //     transform: rotate(360deg);
  //   }
  // }
</style>