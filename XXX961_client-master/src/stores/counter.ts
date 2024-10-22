//该文件创建了vuex中的store
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  //声明数据ref（）
  const count = ref(0)
  //声明基于数据派生的计算属性computed（）
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
},{
  persist:true//开启当前模块的持久化
  //path:[count]选择性配置数据
})
