import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [], //所有的任务列表
    inputValue: 'aaa' //文本框的内容
  },
  mutations: {
    initList(state, list) {
      state.list = list
    },
    changeInputValue(state, val) {
      console.log('changeInputValue', val)
      state.inputValue = val
    }
  },
  actions: {
    getList(context) {
      axios.get('/list.json').then(({ data }) => {
        console.log(data)
        context.commit('initList', data)
      })
    }
  },
  modules: {},
  getters: {
    showList(state) {
      return state.list
    }
  }
})
