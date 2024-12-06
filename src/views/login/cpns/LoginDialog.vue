<template>
  <el-dialog class="container" v-model="visible" @click="clickOutside">
    <div class="welcome">
      <div
        class="pinkbox"
        :style="{ transform: isSignIn ? 'translateX(0%)' : 'translateX(100%)' }"
      >
        <div v-if="!isSignIn" class="nodisplay">
          <h1>register</h1>
          <form
            :model="registerForm"
            autocomplete="off"
            :rules="registerRules"
            ref="form"
          >
            <input
              type="text"
              placeholder="username"
              v-model="registerForm.username"
            />
            <input
              type="email"
              placeholder="email"
              v-model="registerForm.email"
            />
            <div class="sendEmailCode">
              <input
                v-model="registerForm.code"
                placeholder="verificationCode"
              />
              <button
                class="button submit"
                @click="sendEmailCode"
                :disabled="!disabled"
              >
                {{ isCountDown ? '获取验证码' : `请等待${count}秒重试` }}
              </button>
            </div>
            <input
              type="password"
              placeholder="password"
              v-model="registerForm.password"
            />
            <input
              type="password"
              placeholder="confirm password"
              v-model="registerForm.confirmPassword"
            />
            <button
              class="button submit"
              @click="register"
              :disabled="!disabled"
            >
              create account
            </button>
          </form>
        </div>
        <div v-if="isSignIn" class="signin">
          <h1>sign in</h1>
          <form
            :model="loginForm"
            class="more-padding"
            ref="loginFromRef"
            autocomplete="off"
            :rule="loginRules"
          >
            <input
              type="text"
              placeholder="username"
              v-model="loginForm.username"
            />
            <input
              type="password"
              placeholder="password"
              v-model="loginForm.password"
            />
            <div class="checkbox">
              <input type="checkbox" id="remember" v-model="rememberMe" />
              <label for="remember">remember me</label>
            </div>
            <button class="button submit" @click="submitFrom">login</button>
          </form>
        </div>
      </div>
      <div class="leftbox">
        <h2 class="title"><span>BLOOM</span>&<br />BOUQUET</h2>
        <p class="account">have an account?</p>
        <button class="button" @click="toggleSignIn" id="signin">login</button>
        <p class="desc">show your <span>beautiful</span></p>
      </div>
      <div class="rightbox">
        <h2 class="title"><span>BLOOM</span>&<br />BOUQUET</h2>
        <p class="account">don't have an account?</p>
        <button class="button" @click="toggleSignUp" id="signup">
          register
        </button>
        <p class="desc">show your <span>beautiful</span></p>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, onMounted, watch, computed } from 'vue'
import { isEmail } from '@/utils/validate'
import { login, Register, getEmail } from '@/utils/api'
const isKeepPassword = ref(true)
const isSignIn = ref(true)
const props = defineProps({
  loginDialogVisible: Boolean
})
const popupRef = ref<HTMLElement | null>(null)

const visible = ref(props.loginDialogVisible)
const rememberMe = ref(false)

const afterLogin = ref(false)

const emit = defineEmits(['update:modelValue', 'confirm', 'afterLogin'])

watch(
  () => props.loginDialogVisible,
  (newValue: boolean) => {
    visible.value = newValue
  }
)
onMounted(() => {
  emit('afterLogin', afterLogin)
})
//注册
const registerForm = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  code: ''
})

const registerRules = {
  username: [{ required: true, message: '用户名不能为空！', trigger: 'blur' }],
  email: [{ required: true, message: '邮箱不能为空！', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空！', trigger: 'blur' }]
}
const disabled = computed(() => {
  return (
    registerForm.value.email &&
    isEmail(registerForm.value.email) &&
    isCountDown.value
  )
})

const isCountDown = ref(true)
const count = ref(60)
const sendEmailCode = async () => {
  isCountDown.value = false
  countDown()
  await getEmail.getEmailCode({ email: registerForm.value.email })
}

const countDown = () => {
  if (count.value > 0) {
    count.value--
    setTimeout(() => {
      countDown()
    }, 1000)
  } else {
    isCountDown.value = true
    count.value = 60
  }
}
const form = ref(null as any)
const register = async () => {
  const res = await isEmail(registerForm.value.email)
  if (!res) return
  try {
    await Register(registerForm.value)
  } catch (error) {
    console.log('格式不对')
  }
}
//登录
const loading = ref<boolean>(false)
const loginRules = {
  username: [{ required: true, message: '用户名不能为空！', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空！', trigger: 'blur' }]
}
const loginForm = ref({
  username: '',
  password: ''
})
const loginFromRef = ref(null as any)

function toggleSignIn() {
  isSignIn.value = true
}

function toggleSignUp() {
  isSignIn.value = false
}
const submitFrom = async () => {
  try {
    loading.value = true
    const res = await login(loginForm.value)
    console.log('🚀 ~ submitForm ~ res:', res)
    afterLogin.value = true
  } catch (error) {
    console.log('登陆失败')
  } finally {
    loading.value = false
  }
}

// const cancel = () => {
//   visible.value = false
//   emit('update:modelValue', false)
// }
// const loginAccount = () => {
//   const data = { username: username.value, password: password.value }
//   emit('confirm', data)
//   visible.value = false
//   emit('update:modelValue', false)
// }

// const handleBeforeClose = (done: () => void) => {
//   visible.value = false
//   emit('update:modelValue', false)
//   done()
// }

// const checkEamilFrom = (email: string) => {
//   if (!isEmail(email)) {
//     return callback
//   }
//   callback
// }

const clickOutside = (event: MouseEvent) => {
  if (popupRef.value && !popupRef.value.contains(event.target as Node)) {
    visible.value = false
    emit('update:modelValue', false)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400|Lora');

body {
  background: #cbc0d3;
}

.container {
  margin: 100px auto 0;
  width: 650px;
  height: 550px;
  position: relative;
}

.welcome {
  background: #f6f6f6;
  width: 100%;
  height: 415px;
  position: absolute;
  top: 25%;
  left: 0%;
  border-radius: 5px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
}

.pinkbox {
  position: absolute;
  top: -10%;
  left: 5%;
  background: #eac7cc;
  width: 320px;
  height: 500px;
  border-radius: 5px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease-in-out;
  z-index: 2;
}

.nodisplay {
  transition: all 0.5s ease;
}

.leftbox,
.rightbox {
  position: absolute;
  width: 50%;
  transition: 1s all ease;
}

.leftbox {
  left: -2%;
}

.rightbox {
  right: -2%;
}

h1 {
  font-family: 'OpenSans', sans-serif;
  text-align: center;
  margin-top: 95px;
  text-transform: uppercase;
  color: #f6f6f6;
  font-size: 2em;
  letter-spacing: 8px;
}

.title {
  font-family: 'Lora', serif;
  color: #8e9aaf;
  font-size: 2.8em;
  line-height: 1.1em;
  letter-spacing: 3px;
  text-align: center;
  font-weight: 300;
  margin-top: 20%;
}

.desc {
  font-size: 13px;
  margin-top: 20%;
}

.account {
  margin-top: 17%;
  font-size: 13px;
}

p {
  font-family: 'OpenSans', sans-serif;
  font-size: 0.7em;
  letter-spacing: 2px;
  color: #8e9aaf;
  text-align: center;
}

span {
  color: #eac7cc;
}

.flower {
  position: absolute;
  width: 120px;
  height: 120px;
  top: 46%;
  left: 29%;
  opacity: 0.7;
}

.smaller {
  width: 90px;
  height: 100px;
  top: 48%;
  left: 38%;
  opacity: 0.9;
}

button {
  padding: 12px;
  font-family: 'OpenSans', sans-serif;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 11px;
  border-radius: 10px;
  margin: auto;
  outline: none;
  display: block;
}

button:hover {
  background: #eac7cc;
  color: #f6f6f6;
  transition: background-color 1s ease-out;
}

.button {
  margin-top: 5%;
  background: #f6f6f6;
  color: #ce7d88;
  border: solid 1px #eac7cc;
}

form {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 7px;
}

.more-padding {
  padding-top: 35px;
}

.more-padding input {
  padding: 12px;
}

.more-padding .submit {
  margin-top: 45px;
}

.submit {
  margin-top: 25px;
  padding: 12px;
  border-color: #ce7d88;
}

.submit:hover {
  background: #cbc0d3;
  border-color: #bfb1c9;
}

input {
  background: #eac7cc;
  width: 65%;
  color: #ce7d88;
  border: none;
  border-bottom: 1px solid rgba(246, 246, 246, 0.5);
  padding: 9px;
  margin: 7px;
}

input::placeholder {
  color: #f6f6f6;
  letter-spacing: 2px;
  font-size: 1.3em;
  font-weight: 100;
}

input:focus {
  color: #ce7d88;
  outline: none;
  border-bottom: 1.2px solid rgba(206, 125, 136, 0.7);
  font-size: 1em;
  transition: 0.8s all ease;
}

input:focus::placeholder {
  opacity: 0;
}

label {
  font-family: 'OpenSans', sans-serif;
  color: #ce7d88;
  font-size: 0.8em;
  letter-spacing: 1px;
}

.checkbox {
  display: inline;
  white-space: nowrap;
  position: relative;
  left: -62px;
  top: 5px;
}
.checkbox-custom {
  transform: scale(1.5); /* 放大1.5倍 */
}

input[type='checkbox'] {
  width: 15px;
  background: #ce7d88;
}

.checkbox input[type='checkbox']:checked· + ·label {
  color: #ce7d88;
  transition: 0.5s all ease;
}
.sendEmailCode {
  display: flex;
  justify-content: space-between;
  gap: 0px;
}
.sendEmailCode button {
  width: 70px;
  height: 50px;
}
</style>
