<template>
  <div class="login_account">
    <el-form label-width="60px" :model="account" :rules="rules" ref="formRef">
      <el-form-item label="account" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { rules } from '../config/login_config'
// import { useStore } from 'vuex'
// import localCache from '@/utils/cache'
import type { ElForm } from 'element-plus'
// const store = useStore()

const account = reactive({
  name: '',
  password: ''
})

const formRef = ref<InstanceType<typeof ElForm>>()

const loginAction = (isKeepPassword: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      if (isKeepPassword) {
        localCache.setCache('name', account.name)
        localCache.setCache('password', account.password)
      } else {
        localCache.deleteCache('name')
        localCache.deleteCache('password')
      }

      // store.dispatch('login/accountLoginAction', { ...account })
    }
  })
}

const setFormFields = (name: string, password: string) => {
  account.name = name || account.name
  account.password = password || account.password
}

defineExpose({ loginAction, setFormFields })
</script>

<style>
.login_account {
  margin: 30px;
}
</style>
