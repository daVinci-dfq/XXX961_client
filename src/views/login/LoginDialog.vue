<template>
  <el-dialog v-model="visible" title="Please Login" style="width: 500px">
    <div class="login_body">
      <h1 class="title">Login</h1>
      <el-tabs type="border-card" scretch>
        <el-tab-pane>
          <template #label>
            <span>
              <el-icon><UserFilled /></el-icon> Login with Account
            </span>
          </template>
          <login-account ref="accountRef"></login-account>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <span>
              <el-icon><iphone /></el-icon> Login with Phone
            </span>
          </template>
        </el-tab-pane>
      </el-tabs>

      <div class="account_control">
        <el-checkbox v-model="isKeepPassword">remember me</el-checkbox>
        <el-link type="primary">forget password?</el-link>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancel">Cancel</el-button>
        <el-button type="primary" @click="login">Login</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue'
import { UserFilled, Iphone } from '@element-plus/icons-vue'
import LoginAccount from './cpns/LoginAccount.vue'

const isKeepPassword = ref(true)

const props = defineProps({
  loginDialogVisible: Boolean
})

const emit = defineEmits(['update:modelValue', 'confirm'])

const visible = ref(props.loginDialogVisible)
const username = ref('')
const password = ref('')

// watch(() => props.modelValue, (newVal) => {
//   visible.value = newVal
// })

const cancel = () => {
  visible.value = false
  emit('update:modelValue', false)
}

const login = () => {
  const data = { username: username.value, password: password.value }
  emit('confirm', data)
  visible.value = false
  emit('update:modelValue', false)
}

const handleBeforeClose = (done: () => void) => {
  visible.value = false
  emit('update:modelValue', false)
  done()
}
</script>

<style scoped>
.login_body {
  margin: 50px;
}

.title {
  text-align: center;
}

.account_control {
  display: flex;
  justify-content: space-between;
}
</style>
