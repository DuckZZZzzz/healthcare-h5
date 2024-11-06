<template>
  <h1>用户登录</h1>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field v-model="form.userName" name="userName" label="用户名" placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]" />
      <van-field v-model="form.passWord" type="password" name="passWord" label="密码" placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]" />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>
<script setup>
import { reactive, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'

// 路由
const router = useRouter()

// 获取当前vue实例
const { proxy } = getCurrentInstance()
// 定义表单数据
const form = reactive({
  userName: '',
  passWord: ''
})
// 表单提交
const onSubmit = async(res) => {
  const {data} = await proxy.$api.login(res)
  if(data.code === 10000) {
    localStorage.setItem('h5_token', data.data.token)
    localStorage.setItem('h5_userInfo', JSON.stringify(data.data.userInfo)) //因为数据是对象，所以要转换为字符串
    router.push('/')
  }
}

</script>
<style lang="less" scoped>
h1 {
  text-align: center;
}
</style>