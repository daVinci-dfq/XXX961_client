<template>
  <el-dialog class="container" v-model="visible" @click="clickOutside">
    <div class="welcome">
      <div
        class="pinkbox"
        :style="{ transform: isSignIn ? 'translateX(0%)' : 'translateX(80%)' }"
      >
        <div v-if="!isSignIn" class="nodisplay">
          <h1>register</h1>
          <form autocomplete="off" rule="rules">
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
            <button class="button submit" @click="createAccount">
              create account
            </button>
          </form>
        </div>
        <div v-if="isSignIn" class="signin">
          <h1>sign in</h1>
          <form class="more-padding" autocomplete="off" rule="rules">
            <input
              type="text"
              placeholder="username"
              v-model="signInForm.username"
            />
            <input
              type="password"
              placeholder="password"
              v-model="signInForm.password"
            />
            <div class="checkbox">
              <input type="checkbox" id="remember" v-model="rememberMe" />
              <label for="remember">remember me</label>
            </div>
            <button class="button submit" @click="login">login</button>
          </form>
        </div>
      </div>
      <div class="leftbox">
        <h2 class="title"><span>BLOOM</span>&<br />BOUQUET</h2>
        <p class="desc">pick your perfect <span>bouquet</span></p>
        <img
          class="flower smaller"
          src="https://image.ibb.co/d5X6pn/1357d638624297b.jpg"
          alt="1357d638624297b"
          border="0"
        />
        <p class="account">have an account?</p>
        <button class="button" @click="toggleSignIn" id="signin">login</button>
      </div>
      <div class="rightbox">
        <h2 class="title"><span>BLOOM</span>&<br />BOUQUET</h2>
        <p class="desc">pick your perfect <span>bouquet</span></p>
        <img
          class="flower"
          src="https://preview.ibb.co/jvu2Un/0057c1c1bab51a0.jpg"
          alt="0057c1c1bab51a0"
        />
        <p class="account">don't have an account?</p>
        <button class="button" @click="toggleSignUp" id="signup">
          sign up
        </button>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, onMounted, watch } from 'vue'
import { UserFilled, Iphone } from '@element-plus/icons-vue'
import LoginAccount from './cpns/LoginAccount.vue'
import { isEmail } from '@/utils/validate'
const isKeepPassword = ref(true)
const isSignIn = ref(true)
const props = defineProps({
  loginDialogVisible: Boolean
})
const popupRef = ref<HTMLElement | null>(null)

const emit = defineEmits(['update:modelValue', 'confirm'])

const visible = ref(props.loginDialogVisible)
const rememberMe = ref(false)
const username = ref('')
const password = ref('')

watch(
  () => props.loginDialogVisible,
  (newValue: boolean) => {
    visible.value = newValue
  }
)

const registerForm = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const signInForm = ref({
  username: '',
  password: ''
})

function toggleSignIn() {
  isSignIn.value = true
}

function toggleSignUp() {
  isSignIn.value = false
}

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

// const checkEamilFrom = (email: string) => {
//   if (!isEmail(email)) {
//     return callback
//   }
//   callback
// }
const rules = {
  username: [{ required: true, message: '用户名不能为空！', trigger: 'blur' }],
  email: [{ required: true, message: '邮箱不能为空！', trigger: 'blur' }]
}

const clickOutside = (event: MouseEvent) => {
  if (popupRef.value && !popupRef.value.contains(event.target as Node)) {
    visible.value = false
    emit('update:modelValue', false)
  }
}

// onMounted(() =>{

// })
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
  font-size: 1.8em;
  line-height: 1.1em;
  letter-spacing: 3px;
  text-align: center;
  font-weight: 300;
  margin-top: 20%;
}

.desc {
  margin-top: -8px;
}

.account {
  margin-top: 45%;
  font-size: 10px;
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
  margin-top: 3%;
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

input[type='checkbox'] {
  width: 7px;
  background: #ce7d88;
}

.checkbox input[type='checkbox']:checked· + ·label {
  color: #ce7d88;
  transition: 0.5s all ease;
}
</style>
