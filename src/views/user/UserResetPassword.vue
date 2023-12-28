<script setup>

import {reactive} from "vue";
import {ElMessage} from "element-plus";

const pwd = reactive({
  old_pwd : null,
  new_pwd : null,
  re_pwd : null
})

const checkRePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== pwd.new_pwd) {
    callback(new Error('请确保两次输入的密码一致'))
  } else {
    callback()
  }
}

// 定义表单校验规则
const rules = ({
  old_pwd: [
    {required: true, message: '请输入原密码', trigger: 'blur'},
    {min: 5, max: 16, message: '密码长度为5~16位非空字符', trigger: 'blur'}
  ],
  new_pwd: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 5, max: 16, message: '密码长度为5~16位非空字符', trigger: 'blur'}
  ],
  re_pwd: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {validator: checkRePassword, trigger: 'blur'}
  ],
})

import userInfoStore from '@/stores/userStore.js'
import useTokenStore from '@/stores/token.js'
import router from "@/router/index.js";
import {updatePwdService} from "@/api/user.js";

const userInfo = userInfoStore()
const useToken = useTokenStore()

const updatePwd = async () => {
  console.log(pwd)
  const { message } = await updatePwdService(pwd)
  ElMessage.success(message ? message : "密码修改成功,请重新登录")
  // 清空数据
  userInfo.removeUser()
  useToken.removeToken()
  // 跳转到登录页
  await router.replace({
    name: 'login'
  })
}
</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>修改密码</span>
      </div>
    </template>
    <el-row>
      <el-col :span="12">
        <el-form :model="pwd" :rules="rules" label-width="100px" size="large">
          <el-form-item label="原密码" prop="old_pwd">
            <el-input type="password" v-model="pwd.old_pwd"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new_pwd">
            <el-input type="password" v-model="pwd.new_pwd"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="re_pwd">
            <el-input type="password" v-model="pwd.re_pwd"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updatePwd">修改密码</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>
