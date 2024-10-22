<template>
  <div class="login_dialog">
    <div class="top_nav">
      <button
        v-for="item in items"
        :key="item"
        @click="itemClick(item)"
        :class="{ active: currentItem == item }"
      >
        {{ item }}
      </button>
    </div>

    <div class="loginBody">
      <component :is="login"></component>
    </div>
  </div>

  <!-- 用户名：
  <input type="number" v-model="number">
  密码：
  <input type="password" v-model="password">
  <button @click="login()">登录</button> -->
</template>

<script></script>
