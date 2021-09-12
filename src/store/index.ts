import { createStore } from 'vuex'
 
const store = createStore({
  state: {
    mytalents: [],
    property: {
      beauty: 0,
      intelligence: 0,
      health: 0,
      wealth: 0,
      happy: 0,
      life: 1, // 初始值为1，<1表示去世
    },
    theme: 'black',
  },
  mutations: {
    SAVE(state, obj) {
      for (var k in obj) {
        state[k as keyof typeof state] = obj[k]
      }
    },
  },
  actions: {
  },
  getters: {
  }
})
 
export default store
