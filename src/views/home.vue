<script setup>
  import {
    roleTypes
  } from 'element-plus';
  import {
    reactive,
    ref,
    watch,
    onMounted
  } from 'vue'
  import {
    useRouter
  } from 'vue-router';
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
      }
    ]
  }, ])

  const isCollapse = ref(false);
  const currentMenu = ref("首页");
  const menuRef = ref(null);
  const activeIndex = ref("")
  let router = useRouter();

  const handleMenuClick = (item) => {
    currentMenu.value = item.menuLabel
    // router.push(item.routePath)
    // console.log(item);
  }
  // watch(() => router.currentRoute.value.path, (newValue, oldValue) => {
  //   console.log("🚀 ~ watch ~ newValue,oldValue:", newValue, oldValue)

  // }, {
  //   immediate: true
  // })
  const handleBack = () => {
    currentMenu.value = '首页';
    router.push("/home");
    activeIndex.value = '-1'
  }
</script>

<template>
  <el-container class="home-box">
    <el-aside :width="!isCollapse? '300px' :'50px'">
      <h1 v-show="!isCollapse">某某项目管理平台</h1>
      <el-scrollbar class="scrollbar-box" :style="{marginTop:isCollapse ? '50px':''}">
        <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
          text-color="#1d2129" :collapse="isCollapse" :collapse-transition="false" router ref="menuRef" :default-active='activeIndex'>
          <el-sub-menu :index="item.routePath" v-for="item in menuList" :key="item.id">
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
      <el-icon v-if="!isCollapse" class="Collapse-box" size="20px" @click="isCollapse=true">
        <Fold />
      </el-icon>
      <el-icon v-else class="Collapse-box" size="20px" @click="isCollapse=false">
        <Expand />
      </el-icon>
    </el-aside>
    <el-container>
      <el-header>
        <el-page-header :icon="router.currentRoute.value.path =='/home' ? null:'Back'" @back='handleBack'>
          <template #title>
            <span v-if="router.currentRoute.value.path =='/home'">欢迎页</span>
            <span v-else>返回</span>
          </template>
          <template #content>
            <span> {{currentMenu}} </span>
          </template>
        </el-page-header>
      </el-header>
      <el-main>
        <div class="welcome-page" v-if="router.currentRoute.value.path =='/home'">欢迎你！</div>
        <router-view v-else></router-view>
      </el-main>
    </el-container>
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
</style>