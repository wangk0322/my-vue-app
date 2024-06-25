<script setup>
  import {
    ref
  } from 'vue'
  import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
  } from '@element-plus/icons-vue'

  const handleOpen = (key, keyPath) => {
    console.log("🚀 ~ handleOpen ~ key,keyPath:", key, keyPath)

  }
  const handleClose = (key, keyPath) => {
    console.log("🚀 ~ handleClose ~ key,keyPath:", key, keyPath)

  }
</script>

<template>
  <el-container class="home-box">
    <el-aside width="300px">
      <h1>某某项目管理平台</h1>
      <el-scrollbar class="scrollbar-box">
        <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="2"
          text-color="#1d2129" @open="handleOpen" @close="handleClose">
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <location />
              </el-icon>
              <span>Navigator One</span>
            </template>
            <el-menu-item-group title="Group One">
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>item four</template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="2">
            <el-icon>
              <icon-menu />
            </el-icon>
            <span>Navigator Two</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon>
              <document />
            </el-icon>
            <span>Navigator Three</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon>
              <setting />
            </el-icon>
            <span>Navigator Four</span>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>

    </el-aside>
    <el-container>
      <el-header>
        <el-page-header>
          <template #title>
            返回
          </template>
          <template #content>
            <span> Title </span>
          </template>
        </el-page-header>
      </el-header>

      <el-main>Main</el-main>
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


      h1 {
        text-align: center;
        // color: #fff;
        line-height: 60px;
        font-size: 24px;
        font-weight: 500;
        // background-color: #545c64;
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

            .el-menu {
              background: none;

              .el-menu-item:hover {
                background-color: #427ebc;
              }
            }
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

    }
  }
</style>