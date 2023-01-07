import { ref, computed } from "vue";
import { defineStore } from "pinia";

const store = defineStore('store', {
  state: () => { 
    return {
      count: 0,
      name: 'Eduardo',
    }  
  },
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})

export default store;
