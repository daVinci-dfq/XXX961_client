<<<<<<< HEAD
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {

  }

  return { count, doubleCount, increment }
=======
//该文件创建了vuex中的store
import { ref, computed } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    items: [],
    loading: false,
    error: ' '
  }),
  getters: {
    getitems: (state) => state.items,
    isloding: (state) => state.loading,
    hasError: (state) => !!state.error
  },
  actions: {
    async fetchItems() {
      this.error = ''
      this.loading = true
      try {
        const response = await axios.get('XXXXXXX') //替换为实际的地址
        this.items = response.data
      } catch (error) {
        this.error = '加载失败，请重新加载'
      } finally {
        this.loading = false
      }
    }
  }
>>>>>>> zzh
})
