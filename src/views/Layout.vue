<script setup>
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import {userInfoService} from "@/api/user.js";
import userInfoStore from "@/stores/userStore.js";

const userStore = userInfoStore()
const getUserInfo = async () => {
  const {data} = await userInfoService()
  // 将用户信息存入pinia中
  userStore.setUser(data)
}
const {user} = userStore
getUserInfo()

// 条目被点击后,调用函数
import {useRouter} from 'vue-router'
import {ElMessage, ElMessageBox} from "element-plus"
import {useTokenStore} from "@/stores/token.js";

const router = useRouter()
const useToken = useTokenStore()

const handleCommand = (command) => {
  if (command === 'logout') {
    //退出登录
    ElMessageBox.confirm(
        '你确认退出登录码？',
        '温馨提示',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
    )
        .then(async () => {
          //清空pinia中的token和个人信息
          userStore.removeUser()
          useToken.removeToken()
          //跳转到登录页
          await router.replace({
            name: "login"
          })
        })
        .catch(() => {
          //用户点击了取消
          ElMessage.info('取消退出')
        })
  } else {
    router.push({
      name: command
    })
  }
}
</script>

<template>
  <el-container class="layout-container">
    <!-- 左侧菜单 -->
    <el-aside width="200px">
      <div class="el-aside__logo"></div>
      <el-menu active-text-color="#ffd04b" background-color="#232323" text-color="#fff"
               router>
        <el-menu-item index="/article/category">
          <el-icon>
            <Management/>
          </el-icon>
          <span>文章分类</span>
        </el-menu-item>
        <el-menu-item index="/article/manage">
          <el-icon>
            <Promotion/>
          </el-icon>
          <span>文章管理</span>
        </el-menu-item>
        <el-sub-menu index="/">
          <template #title>
            <el-icon>
              <UserFilled/>
            </el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item index="/user/info">
            <el-icon>
              <User/>
            </el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon>
              <Crop/>
            </el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/user/password">
            <el-icon>
              <EditPen/>
            </el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <!-- 右侧主区域 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <div>当前用户：<strong>{{ user.nickName }}</strong></div>
        <!--  下拉菜单      -->
        <!--  command: 条目被点击后触发,在事件函数上申明一个参数,接收条目对应的指令      -->
        <el-dropdown placement="bottom-end" @command="handleCommand">
                    <span class="el-dropdown__box">
                        <el-avatar :src="user.userPic? user.userPic : avatar"/>
                        <el-icon>
                            <CaretBottom/>
                        </el-icon>
                    </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="info" :icon="User">基本资料</el-dropdown-item>
              <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
              <el-dropdown-item command="password" :icon="EditPen">重置密码</el-dropdown-item>
              <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <!-- 中间区域 -->
      <el-main>
        <div style="width: 1290px; height: 570px;">
          <router-view/>
        </div>
      </el-main>
      <!-- 底部区域 -->
      <el-footer>大事件 ©2023 Created by restructure snake</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;

  .el-aside {
    background-color: #232323;

    &__logo {
      height: 120px;
      background: url('@/assets/logo.png') no-repeat center / 120px auto;
    }

    .el-menu {
      border-right: none;
    }
  }

  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
