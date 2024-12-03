<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="aside">
        <p class="header">XXX961</p>
        <side-nav></side-nav>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SideNav from './cpns/SideNav.vue'

const fContainerRef = ref<HTMLDivElement | null>(null)
const column = ref(6)
const fContainerObserver = new ResizeObserver((entries) => {
  changeColumn(entries[0].target.clientWidth)
})

const changeColumn = (width: number) => {
  if (width > 960) {
    column.value = 5
  } else if (width >= 690 && width < 960) {
    column.value = 4
  } else if (width >= 500 && width < 690) {
    column.value = 3
  } else {
    column.value = 2
  }
}

onMounted(() => {
  fContainerRef.value && fContainerObserver.observe(fContainerRef.value)
})

onUnmounted(() => {
  fContainerRef.value && fContainerObserver.unobserve(fContainerRef.value)
})
</script>

<style scoped lang="scss">
.common-layout {
  height: 100vh;
}

p {
  font-size: 21px;
  letter-spacing: 9px;
  color: transparent;
  text-shadow: 0 0px 1px #66bfff;
}

.input {
  margin-top: 16px;
  width: 300px;
  height: 40px;
}

.search-icon {
  display: flex;
  place-items: center;
}
.el-main {
  overflow: hidden;
}
.el-container {
  height: calc(100vh - 72px);
}

.aside {
  padding: 20px;
  width: 300px;
}

.vertical-flex {
  display: flex;
  flex-direction: column;
}

// waterfall
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  .test-item {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: 10px;
    animation: MoveAnimate 0.25s;
  }
  .test-item:hover {
    transform: scale(1.03);
    transition: transform 0.6s ease;
    // animation: RotationAnimate 0.3s;
    box-shadow: #ccc 0px 10px 10px;
  }
}
@keyframes MoveAnimate {
  from {
    opacity: 0;
    transform: translateY(200px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes RotationAnimate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(3deg);
  }
}
</style>
