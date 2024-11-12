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
</template>

<script></script>
